import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";

const DepoSelectionBox = ({
  selectedZone,
  selectedDepot,
  onSelectedDepoChange,
}) => {
  console.log(
    "🚀 ~ file: DepoSelectionBox.js:11 ~ selectedDepot:",
    selectedDepot
  );
  const dispatch = useDispatch();
  const { AuthData } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(true);
  const [depotArray, setDepotSalesPlanData] = useState([]);
  const [deptonameselect, setDeptonameselect] = useState(null);
  const [selctedDepo, setSelctedDepo] = useState(
    selectedDepot ?? depotArray[0]?.depotid
  );

  const handleChange = (event) => {
    const depotid = parseInt(event.target.value);
    setDeptonameselect(
      event.target.options[event.target.selectedIndex]?.textContent
    );
    onSelectedDepoChange(depotid);
    setSelctedDepo(depotid);
  };

  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: selectedZone,
      DepotId: AuthData?.Data[0].EmployeeTpye === "DM" ? selectedDepot : 0, //selectedDepot
    };
    const fetchDepotSalesPlan = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("DepotMonthPlan", payload);

        if (response?.status === 200) {
          setDepotSalesPlanData(
            response.data.Data != null ? response.data.Data : []
          );
          setSelctedDepo(selectedDepot ?? response?.data?.Data[0]?.depotid);
        }
        setLoading(false);
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };
    fetchDepotSalesPlan();
  }, [selectedZone, selectedDepot]);

  return (
    <>
      {AuthData?.Data[0].EmployeeTpye === "DM" && selectedDepot ? (
        <select
          className="form-control"
          value={selctedDepo}
          onChange={handleChange}
        >
          <option>{depotArray[0]?.depot_name}</option>
        </select>
      ) : (
        <select
          className="form-control"
          value={selctedDepo}
          onChange={handleChange}
        >
          <option value={0}>All Depot</option>
          {depotArray?.map((item, index) => (
            <option key={index} value={item?.depotid}>
              {item.depot_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default DepoSelectionBox;
