import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";

const TerritorySelectionBox = ({
  selectedZone,
  selectedDepot,
  selectedTerritory,
  onSelectedTerritoryChange,
  setSelectedTerritory,
}) => {
  console.log("--selectedZone", selectedZone);
  console.log("--selectedDepot", selectedDepot);
  console.log("--selectedTerritory", selectedTerritory);
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state?.auth);
  console.log("AuthData", AuthData);
  const [isLoading, setLoading] = useState(true);
  const [territoryArray, setTerritoryArray] = useState([]);
  const [selctedTerritory, setSelctedTerritory] = useState(
    selectedTerritory ?? 0
  );

  const handleChange = (event) => {
    const territorId = parseInt(event.target.value);
    onSelectedTerritoryChange(territorId);
    setSelctedTerritory(territorId);
  };
  
  
  const fetchTerritory = async () => {
    setLoading(true);
    try {
      const payload = {
        Token: localStorage.getItem("access_token"),
        ZoneId: selectedZone,
        DepotId: selectedDepot,
      };
      const response = await axiosInstance.post(
        "TerritoryMonthPlan",
        payload
      );
      console.log("=====TerritoryMonthPlan====", response);
      if (response?.status === 200) {
        let filteredTerr = [];
        if(AuthData?.Data[0].EmployeeTpye === "AM"){
          filteredTerr = (response?.data?.Data || []).filter((obj1) =>
            (AuthData?.Territory || []).some((obj2) => obj1.territoryid === obj2.TerritoryID)
          );
        }else{
          filteredTerr = response?.data?.Data || [];
        }
        setTerritoryArray(filteredTerr); 
      }
      setLoading(false);
    } catch (error) {
      // Handle errors
      dispatch({ type: SHOW_TOAST, payload: error.message });
    }
  };

  useEffect(() => {
    // if (AuthData?.Data[0].EmployeeTpye === "HOD" || (selectedZone != 0 && selectedDepot != 0)) {
     fetchTerritory();
    // }
  }, [selectedZone, selectedDepot]);

  return (
    <select
      className="form-control"
      value={selctedTerritory}
      onChange={handleChange}
    >
      <option value="0">{AuthData?.Data[0].EmployeeTpye === "HOD" ? "All Territory":"Select Territory"}</option> 
      {territoryArray?.map((item, index) => (
        <option key={index} value={item?.territoryid}>
          {item.territory_name}
        </option>
      ))}
    </select>
  );
};

export default TerritorySelectionBox;
