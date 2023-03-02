import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getOpera = () => async (dispatch) => {
  try {
    const response = await apis.apiGetOpera();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_OPERA,
        operas: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_OPERA,
        msg: response.data.msg,
        operas: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OPERA,
      operas: null,
    });
  }
};
