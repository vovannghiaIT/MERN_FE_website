import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  operas: [],
};

const brandReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_OPERA:
      return {
        ...state,
        operas: action.operas || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default brandReducer;
