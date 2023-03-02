import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  search: [],
};

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH:
      return {
        ...state,
        search: action.search || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default searchReducer;
