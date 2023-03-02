import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getOrder = () => async (dispatch) => {
  try {
    const response = await apis.apiGetOrder();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ORDER,
        orders: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ORDER,
        msg: response.data.msg,
        orders: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ORDER,
      orders: null,
    });
  }
};
