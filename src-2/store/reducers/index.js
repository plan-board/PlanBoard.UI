import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import nationalReducer from "./NationalReducer";

const reducers = combineReducers({
  auth: authReducer,
  national: nationalReducer,
});

export default reducers;
