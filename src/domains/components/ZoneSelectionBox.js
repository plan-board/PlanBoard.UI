import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// { filteredZones, selectedZone, onValueChange }
const ZoneSelectionBox = ({selectedZone, onValueChange}) => {
  const { AuthData } = useSelector((state) => state.auth);
  const [selectedZones, setSelctedZone] = useState(0);

  console.log("-selectedZone==============================", selectedZone)
  const handleChange = (event) => {
    onValueChange(parseInt(event.target.value));
    setSelctedZone(parseInt(event.target.value));
  };

  useEffect(() => {
    setSelctedZone(selectedZone);
  },[selectedZone])

  return (
    <select
      className="form-control"
      value={selectedZones}
      onChange={handleChange}
    >
      <option value={0} >All Zone</option>
      {AuthData?.Zone.map((item, index) => (
        <option key={index} value={item?.ZoneID} >
          {item.ZoneName}
        </option>
      ))}
    </select>
  )
}

export default ZoneSelectionBox;