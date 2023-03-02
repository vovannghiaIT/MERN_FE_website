import actionTypes from "../actions/actionTypes";

const initState = {
  currentData: {},
  users: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        currentData: action.currentData || {},
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        users: action.users || {},
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentData: {},
      };

    default:
      return state;
  }
};

export default userReducer;
