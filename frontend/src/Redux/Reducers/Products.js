import {
  Products_Req,
  Products_Success,
  Products_Fail,
  Product_Details_Req,
  Product_Details_Success,
  Product_Details_Fail,
} from "../Constants/Products";

// Products Reducer
export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Products_Req:
      return {
        loading: true,
        products: [],
      };
    case Products_Success:
      return {
        loading: false,
        products: action.payload.products,
        totalPage: action.payload.totalPage,
        page: action.payload.page,
      };
    case Products_Fail:
      return {
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// Product Details Reducer
export const productReducer = (state = { product: { review: [] } }, action) => {
  switch (action.type) {
    case Product_Details_Req:
      return {
        loading: true,
        ...state,
      };
    case Product_Details_Success:
      return {
        loading: false,
        product: action.payload,
      };
    case Product_Details_Fail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
