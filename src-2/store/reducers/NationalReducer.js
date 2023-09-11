import {
  API_DEPOT_SALES_PLAN_SUCCESS,
  API_MONTH_WISE_SALES_SUCCESS,
  API_SUMMARY_SUCCESS,
  API_TARRITORY_SALES_SUCCESS,
} from "../constant/types";

const initialState = { territoryData: [], depotSalesPlanData: [], summaryData: [], monthWiseSalesData: [] };

const nationalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case API_TARRITORY_SALES_SUCCESS:
      return {
        ...state,
        territoryData: payload,
      };

    case API_DEPOT_SALES_PLAN_SUCCESS:
      return {
        ...state,
        depotSalesPlanData: payload,
      };

    case API_SUMMARY_SUCCESS:
      return {
        ...state,
        summaryData: payload,
      };

    case API_MONTH_WISE_SALES_SUCCESS:
      return {
        ...state,
        monthWiseSalesData: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default nationalReducer;
