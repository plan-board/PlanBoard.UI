import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";

const ZoneDropDown = ({ selectedZone, onValueChange }) => {
  const dispatch = useDispatch();

  const { AuthData } = useSelector((state) => state.auth)
  const [filteredZones, setFilteredZones] = useState([]);

  const handleChange = (event) => {
    onValueChange(parseInt(event.target.value));
  };

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      entity_id: 0
    };

    const fetchZoneMasters = async () => {
      try {

        const response = await axiosInstance.post("api/Master/ZoneData", payload);
        console.log("=====api/Master/ZoneData====", response);

        if (response?.status === 200) {
          const filteredZoneArr = response.data.Data?.filter(item1 =>
            AuthData?.Zone.some(item2 => item2.ZoneID === item1.zone_id)
          );

          setFilteredZones(filteredZoneArr?.length ? filteredZoneArr : [])
        }
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchZoneMasters();
  }, []);

  return (
    <select
      className="form-control"
      value={selectedZone}
      onChange={handleChange}
    >
      <option value={0} >All Zone</option>
      {filteredZones.map((item) => (
        <option value={item?.zone_id} key={item?.zone_id}>
          {item.zone_name}
        </option>
      ))}
    </select>
  )
}

export default ZoneDropDown;