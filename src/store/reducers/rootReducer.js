import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import brandReducer from "./brandReducer";
import operaReducer from "./operaReducer";
import searchReducer from "./searchReducer";
import orderReducer from "./orderReducer";
import orderdetailReducer from "./orderdetailReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  brand: brandReducer,
  opera: operaReducer,
  search: searchReducer,
  order: orderReducer,
  orderdetail: orderdetailReducer,
});

export default rootReducer;
