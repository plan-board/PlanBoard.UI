import { IS_AUTHENTICATED,AUTH_DATA } from "../constant/types";

export const setIsAuth = (flag) => {
  return (dispatch) => {
    dispatch({ type: IS_AUTHENTICATED, payload: flag });
  };
};

export const setAuthData = (flag) => {
  console.log("---flag", flag)
  return (dispatch) => {
    dispatch({ type: AUTH_DATA, payload: flag });
  };
};
