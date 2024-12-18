import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { productsReducer, productReducer } from "./Reducers/Products";
import authReducer from "./Reducers/user";
import cartReducer from "./Reducers/Cart";
import {
  orderDetailReducer,
  orderListReducer,
  orderPaymentReducer,
  orderReducer,
} from "./Reducers/order";
const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productReducer,
  auth: authReducer,
  cartReducer,
  orderReducer,
  orderListReducer,
  orderPaymentReducer,
  orderDetailReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
