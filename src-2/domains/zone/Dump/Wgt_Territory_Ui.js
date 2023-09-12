import { Link } from "react-router-dom";
import { actionTarritorySales } from "../../store/actions/National";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useEffect, useState } from "react";

const Wgt_Territory_Ui = ({ data }) => {
  const dispatch = useDispatch();
  const {territoryData} = useSelector((state)=>state.national);

  const [apiCalled, setApiCalled] = useState(false);
 

  useEffect(() => {
    console.log("-Wgt_Territory_Ui----")
    const payload = {
      Token: localStorage.getItem("access_token"),
      DepotId: 0,
      TerritoryId: 79
    };
    const fetchDepotSalesPlan = async () => {
      try {
        const response = await axiosInstance.post("TerritoryMonthPlan", payload);
        console.log("=====TerritoryMonthPlan====", response);
        if (response?.status === 200) {
          // dispatch(actionTarritorySales(response.data.Data));
        }
      } catch (error) {
        // Handle errors
        dispatch({ type: SHOW_TOAST, payload: error.message });
      }
    };

    if (!apiCalled && territoryData?.length === 0) {
      fetchDepotSalesPlan();
      setApiCalled(true);
    }
  }, [apiCalled, territoryData?.length, dispatch]);
  return (
    <>  

         <tr>   
            <th> 
            <Link className="link  w3-text-indigo" to={`/Statewise/${data.id}`}>  {data.depot} </Link> 
            <br />
            <span className="w3-small h6 w3-text-gray" >  
            Dealers .({data.dealers}) 
            </span> 
            </th> 
             <td>{data.ly} L  <i className="w3-text-gray"> </i></td>
             <td> {data.target} L <i className="w3-text-gray">({data.target_percentage}%)</i></td>  
            <td> {data.achieved} L <i className="w3-text-gray">({data.achieved_percentage}%)</i></td>  
          </tr> 

    </>
  );
};


export default Wgt_Territory_Ui;