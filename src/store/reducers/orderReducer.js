import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  orders: [],
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER:
      return {
        ...state,
        orders: action.orders || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default orderReducer;
