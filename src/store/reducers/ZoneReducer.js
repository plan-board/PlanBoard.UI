import { API_ZONE_DATA } from "../constant/types";

const initialState = {
  data: [],
};

const zoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_ZONE_DATA:
      return [...state, action.data];

    default:
      return state;
  }
};

export default zoneReducer;
