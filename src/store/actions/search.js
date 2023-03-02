import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getSearchProduct = (payload) => async (dispatch) => {
  try {
    const response = await apis.apiSearchProduct(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_SEARCH,
        search: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_SEARCH,
        msg: response.data.msg,
        search: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SEARCH,
      search: null,
    });
  }
};
