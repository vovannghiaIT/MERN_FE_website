import actionTypes from "../actions/actionTypes";

const initState = {
  msg: "",
  products: [],
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.products || [],
        msg: action.msg || "",
      };

    case actionTypes.GET_PRODUCTDETAIL:
      return {
        ...state,
        dataDetail: action.dataDetail || [],
        msg: action.msg || "",
      };
    // case actionTypes.GET_PRODUCTCATEGORY:
    //   return {
    //     ...state,
    //     dataProductCategory: action.dataProductCategory || [],
    //     msg: action.msg || "",
    //   };

    default:
      return state;
  }
};

export default productReducer;
