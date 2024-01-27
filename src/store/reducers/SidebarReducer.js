import { SidebarStatus } from "../constant/types";
const initialState = {
  flag: false,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SidebarStatus:
      return {
        ...state,
        flag: !state.flag,
      };

    default:
      return state;
  }
};

export default sidebarReducer;
