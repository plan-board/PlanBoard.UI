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
  const dispatch = useDispatch();

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

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
      DepotId: selectedDepot,
    };

    const fetchTerritory = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "TerritoryMonthPlan",
          payload
        );
        console.log("=====TerritoryMonthPlan====", response);
        if (response?.status === 200) {
          setTerritoryArray(
            response.data.Data != null ? response.data.Data : []
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchTerritory();
  }, [selectedZone, selectedDepot]);

  return (
    <select
      className="form-control"
      value={selctedTerritory}
      onChange={handleChange}
    >
      <option value="0">All Territory</option>
      {territoryArray?.map((item, index) => (
        <option key={index} value={item?.territoryid}>
          {item.territory_name}
        </option>
      ))}
    </select>
  );
};

export default TerritorySelectionBox;
