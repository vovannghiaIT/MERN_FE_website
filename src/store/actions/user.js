import actionTypes from "./actionTypes";
import * as apis from "../../services";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT,
        msg: response.data.msg,
        currentData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT,
      currentData: null,
      msg: error,
    });
  }
};

export const getUserAll = () => async (dispatch) => {
  try {
    const response = await apis.apiGetAllUsers();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_USER,
        users: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_USER,
        msg: response.data.msg,
        users: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER,
      users: null,
    });
  }
};
