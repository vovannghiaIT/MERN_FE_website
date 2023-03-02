import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  categories: [],
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default categoryReducer;
