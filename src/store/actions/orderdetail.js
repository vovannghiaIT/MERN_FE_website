import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getOrderDetail = () => async (dispatch) => {
  try {
    const response = await apis.apiGetOrderDetail();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ORDERDETAIL,
        orderdetails: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ORDERDETAIL,
        msg: response.data.msg,
        orderdetails: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ORDERDETAIL,
      orderdetails: null,
    });
  }
};
