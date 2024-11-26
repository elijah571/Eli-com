import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { productsReducer, productReducer } from "./Reducers/Products";
import authReducer from "./Reducers/user";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productReducer,
  auth: authReducer, // Combined user reducer
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
