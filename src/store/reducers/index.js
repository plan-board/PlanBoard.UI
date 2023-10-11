import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import nationalReducer from "./NationalReducer";
import sidebarReducer from "./SidebarReducer";

const reducers = combineReducers({
  auth: authReducer,
  national: nationalReducer,
  sidebarStatus: sidebarReducer,
});

export default reducers;
