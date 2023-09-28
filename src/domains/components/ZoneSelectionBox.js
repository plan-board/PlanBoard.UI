import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const ZoneSelectionBox = ({ selectedZone, onValueChange }) => {
  const { AuthData } = useSelector((state) => state.auth);
  const [selectedZones, setSelctedZone] = useState(0);
 
  const handleChange = (event) => {
    if (event.target.value != "") {
      onValueChange(parseInt(event.target.value));
      setSelctedZone(parseInt(event.target.value));
    }
  };

  useEffect(() => {
    if (AuthData?.Data[0].EmployeeTpye === "HOD" || (selectedZone != "" )) {
      setSelctedZone(selectedZone);
    }
  }, [selectedZone])

  return (
    <>
      {AuthData?.Data[0].EmployeeTpye === "ZM" ? (
        <select
          className="form-control"
          value={selectedZones}
          onChange={handleChange}
        >
          <option value="">Select Zone</option>
          {AuthData?.Zone?.map((item, index) => (
            <option key={index} value={item?.ZoneID} >
              {item.ZoneName}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="form-control"
          value={selectedZones}
          onChange={handleChange}
        >
          <option value={0}>{AuthData?.Data[0].EmployeeTpye === "HOD" ? "All Zone" : "Select Zone"}</option>
          {AuthData?.Zone.map((item, index) => (
            <option key={index} value={item?.ZoneID} >
              {item.ZoneName}
            </option>
          ))}
        </select>
      )}
    </>
  )
}

export default ZoneSelectionBox;