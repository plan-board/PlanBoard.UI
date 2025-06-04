import { IS_AUTHENTICATED, SHOW_TOAST, AUTH_DATA } from "../constant/types";

const initialState = {
  isAuthenticated: false,
  ToastMsg: "",
  AuthData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SHOW_TOAST:
      return {
        ...state,
        ToastMsg: action.payload,
      };

    case AUTH_DATA:
      return {
        ...state,
        AuthData: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
