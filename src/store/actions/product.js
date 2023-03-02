import * as apis from "../../services";
import actionTypes from "./actionTypes";

export const getProduct = () => async (dispatch) => {
  try {
    const response = await apis.apiGetProducts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        products: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        msg: response.data.msg,
        products: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS,
      products: null,
    });
  }
};
export const getProductDetail = (payload) => async (dispatch) => {
  try {
    const response = await apis.apiGetDetailSlugProducts(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTDETAIL,
        dataDetail: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCTDETAIL,
        msg: response.data.msg,
        dataDetail: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTDETAIL,
      dataDetail: null,
    });
  }
};
// export const getProductCategory = (payload) => async (dispatch) => {
//   try {
//     const response = await apis.apiGetProductCategory(payload);
//     // console.log(response);

//     if (response?.data.err === 0) {
//       dispatch({
//         type: actionTypes.GET_PRODUCTCATEGORY,
//         dataProductCategory: response.data.response,
//       });
//     } else {
//       dispatch({
//         type: actionTypes.GET_PRODUCTCATEGORY,
//         msg: response.data.msg,
//         dataProductCategory: null,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.GET_PRODUCTCATEGORY,
//       dataProductCategory: null,
//     });
//   }
// };
