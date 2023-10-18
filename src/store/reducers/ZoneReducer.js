import {
  API_TERRITORY_MONTH_SALE_DATA,
  API_ZONE_DATA,
} from "../constant/types";

const initialState = {
  data: [],
};

const zoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_ZONE_DATA:
      return [...state, action.data];
    case API_TERRITORY_MONTH_SALE_DATA:
      console.log(action.payload);
      return [...state, action.payload];

    default:
      return state;
  }
};

export default zoneReducer;
