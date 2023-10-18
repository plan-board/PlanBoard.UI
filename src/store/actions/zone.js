import { API_ZONE_DATA } from "../constant/types";
import { API_TERRITORY_MONTH_SALE_DATA } from "../constant/types";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";

export const fetchZoneDataSuccess = (data) => ({ type: API_ZONE_DATA, data });
export const fetchTerritoryMonthSale = (data) => {
  console.log(data);
  return { type: API_TERRITORY_MONTH_SALE_DATA, payload: data };
};

// export const fetchZoneWiseDetails = (args) => {
//   return (dispatch) => {
//     axiosInstance
//       .post("DepotMonthPlan", args)
//       .then((res) => {
//         if (res?.status === 200) {
//           dispatch(
//             fetchZoneDataSuccess(res.data.Data != null ? res.data.Data : [])
//           );
//         }
//       })
//       .catch((err) => {
//         dispatch({ type: SHOW_TOAST, payload: err.message });
//       });
//   };
// };
