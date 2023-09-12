import {
  API_NAT_SUM_WIDGET_REQ,
  API_NAT_SUM_WIDGET_SUCCESS,
  API_NAT_ZONE_WIDGET,
  API_NAT_MARKET_WIDGET,
  API_TARRITORY_SALES_REQ,
  API_TARRITORY_SALES_SUCCESS,
  API_DEPOT_SALES_PLAN_SUCCESS,
  API_SUMMARY_SUCCESS,
  API_MONTH_WISE_SALES_SUCCESS
} from "../constant/types";

export const fetchNatSumWidgetReq = () => ({
  type: API_NAT_SUM_WIDGET_REQ,
});

export const fetchNatSumWidgetSuccess = (data) => ({
  type: API_NAT_SUM_WIDGET_SUCCESS,
  payload: data,
});

export const fetchNatZoneWidget = () => ({
  type: API_NAT_ZONE_WIDGET,
});

export const fetchNatMarketWidget = () => ({
  type: API_NAT_MARKET_WIDGET,
});

export const fetchTarritorySalesReq = () => ({
  type: API_TARRITORY_SALES_REQ,
});

export const actionTarritorySales = (payload) => {
  return (dispatch) => {
    dispatch({
      type: API_TARRITORY_SALES_SUCCESS,
      payload,
    });
  };
};

export const actionDepotSalesPlan = (payload) => {
  return (dispatch) => {
    dispatch({
      type: API_DEPOT_SALES_PLAN_SUCCESS,
      payload,
    });
  };
};

export const actionSummaryData = (payload) => {
  return (dispatch) => {
    dispatch({
      type: API_SUMMARY_SUCCESS,
      payload
    })
  }
}

export const actionMonthWiseSalesData = (payload) => {
  return (dispatch) => {
    dispatch({
      type: API_MONTH_WISE_SALES_SUCCESS,
      payload
    })
  }

  
}

