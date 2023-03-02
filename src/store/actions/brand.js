import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getBrand = () => async (dispatch) => {
  try {
    const response = await apis.apiGetBrands();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_BRAND,
        brands: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_BRAND,
        msg: response.data.msg,
        brands: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BRAND,
      brands: null,
    });
  }
};
