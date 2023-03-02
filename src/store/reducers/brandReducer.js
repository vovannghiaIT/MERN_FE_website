import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  brands: [],
};

const brandReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_BRAND:
      return {
        ...state,
        brands: action.brands || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default brandReducer;
