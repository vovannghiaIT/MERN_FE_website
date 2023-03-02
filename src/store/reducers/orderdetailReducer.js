import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  orderdetails: [],
};

const orderdetailReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERDETAIL:
      return {
        ...state,
        orderdetails: action.orderdetails || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default orderdetailReducer;
