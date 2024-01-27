import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";

const ZoneDropDown = ({ selectedZone, onValueChange, asDropDown = false }) => {
  const dispatch = useDispatch();

  const { AuthData } = useSelector((state) => state.auth);
  const [filteredZones, setFilteredZones] = useState([]);

  const handleChange = (event) => {
    if (event.target.value != "") {
      onValueChange(parseInt(event.target.value));
    }
  };

  const fetchZoneMasters = async () => {
    try {
      const payload = {
        Token: localStorage.getItem("access_token"),
        entity_id: 0,
      };

      const response = await axiosInstance.post("api/Master/ZoneData", payload);
      console.log("=====api/Master/ZoneData====", response);

      if (response?.status === 200) {
        const filteredZoneArr = response.data.Data?.filter((item1) =>
          AuthData?.Zone.some((item2) => item2.ZoneID === item1.zone_id)
        );

        setFilteredZones(filteredZoneArr?.length ? filteredZoneArr : []);
        // console.log("testing", filteredZoneArr);
      }
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    fetchZoneMasters();
  }, []);

  return (
    <>
      {AuthData?.Data[0].EmployeeTpye === "ZM" ? (
        <select
          className="form-control"
          value={selectedZone}
          onChange={handleChange}
        >
          {AuthData?.Zone?.map((item, index) => (
            <option key={index} value={item?.ZoneID}>
              {item.ZoneName}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="form-control"
          value={selectedZone}
          onChange={handleChange}
        >
          <option value={0}>
            {AuthData?.Data[0].EmployeeTpye === "HOD"
              ? "All Zone"
              : "Select Zone"}
          </option>
          {/* <option value={0} >{asDropDown ? "Select Zone" : "All Zone"}</option> */}
          {filteredZones.map((item) => (
            <option value={item?.zone_id} key={item?.zone_id}>
              {item.zone_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default ZoneDropDown;
