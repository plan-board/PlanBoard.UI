import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import LoadingPlaceholder from "../../components/LoadingPlaceholder";

const TerritorySales = ({ selectedZone, selectedDepot }) => {
  const dispatch = useDispatch();
  const [territoryMonthPlan, setTerritoryMonthPlan] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const tableScroll = {
    height: '400px',
    overflow: 'scroll'
  }
  useEffect(() => {
    const payload = {
      Token: localStorage.getItem("access_token"),
      ZoneId: 0,//selectedZone,
      DepotId: 0//selectedDepot
    };
    const fetchTerritoryMonthPlan = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.post("TerritoryMonthPlan", payload);
        console.log("=====TerritoryMonthPlan====", response);
        if (response?.status === 200) {
          setTerritoryMonthPlan(response.data.Data != null ? response.data.Data : [])
        }
        setLoading(false)
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    fetchTerritoryMonthPlan();
  }, [selectedZone]);

  return (
    <div className="w3-row w3-row-padding w3-padding-16 w3-margin-top  w3-margin-bottom w3-white ">
      <div className="w3-col l6 m6 s6 headingMB">
        <span className="w3-xlarge">
          Territory
          <span className=" w3-text-gray w3-opacity">({territoryMonthPlan.length})</span>
        </span>
      </div>
      <div className="w3-col 12 " style={tableScroll}>
        <table className="w3-table table-stripped w3-white table-bordered ">
          <tr>
            <th>
              Territory
            </th>
            <th>
              {" "}
              LLY
              <br /> 21-22{" "}
            </th>
            <th>
              LY
              <br /> 22-23
            </th>
            <th>
              Target V.1 <br />
              23-24
            </th>
            {/* <th>
              Target V.2 <br />
              23-24
            </th> */}
            <th> YTD (%) </th>
          </tr>
          {isLoading ? (
            <tr>
              <td colSpan="5">
                <LoadingPlaceholder numberOfRows={4}  ></LoadingPlaceholder>
              </td>
            </tr>) : (
            <>
              {territoryMonthPlan.length == 0 ? (
                <tr>
                  <td colSpan="5">No data found</td>
                </tr>
              ) : (
                territoryMonthPlan.map((ele, index) => (
                  <tr key={index}>
                    <th>
                      <Link className="link  w3-text-indigo" to={`/Statewise/${ele.id}`}>  {ele.depot_name} </Link>
                    </th>
                    <td>{ele.LLY_Value}<i className="w3-text-gray"> </i></td>
                    <td> {ele.LY_Value}<i className="w3-text-gray">({ele.LY_Volume}%)</i></td>
                    <td> {ele.YTD_Value}<i className="w3-text-gray">({ele.YTD_Volume}%)</i></td>
                    {/* <td> {ele.YTD_Value} L <i className="w3-text-gray">({ele.YTD_Volume}%)</i></td> */}
                    <td> {ele.YTD_Value} <i className="w3-text-gray">({ele.YTD_Volume}%)</i></td>
                  </tr>
                ))
              )}
            </>
          )}
        </table>
      </div>
    </div>
  )
}

export default TerritorySales;