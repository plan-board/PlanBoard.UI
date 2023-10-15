import { API_ZONE_DATA } from "../constant/types";
import axiosInstance from "./../../auth/api";
import { SHOW_TOAST } from "../../store/constant/types";
import { useDispatch } from "react-redux";

export const fetchZoneDataSuccess = (data) => ({ type: API_ZONE_DATA, data });

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
