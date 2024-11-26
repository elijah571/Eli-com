import {
  Products_Req,
  Products_Success,
  Products_Fail,
  Product_Details_Req,
  Product_Details_Success,
  Product_Details_Fail,
} from "../Constants/Products";
// Products Reducer
export const productsReducer = (
  state = { loading: false, error: null, products: [], totalPage: 0, page: 1 },
  action
) => {
  switch (action.type) {
    case Products_Req:
      return {
        loading: true,
        products: [],
        totalPage: 0, // Default value
        page: 1, // Default value
        error: null, // Clear any previous errors
      };
    case Products_Success:
      return {
        loading: false,
        products: action.payload.products, // Assuming payload contains a 'products' array
        totalPage: action.payload.totalPage || 0, // Ensure totalPage is set
        page: action.payload.page || 1, // Ensure page is set
        error: null, // No error on success
      };
    case Products_Fail:
      return {
        loading: false,
        error: action.payload.error, // Store error message
        products: [], // Clear the products list on error
        totalPage: 0,
        page: 1,
      };
    default:
      return state;
  }
};

// Product Details Reducer
export const productReducer = (
  state = { loading: false, error: null, product: { review: [] } },
  action
) => {
  switch (action.type) {
    case Product_Details_Req:
      return {
        loading: true,
        product: { review: [] }, // Reset the product details
        error: null, // Clear any previous errors
      };
    case Product_Details_Success:
      return {
        loading: false,
        product: action.payload, // Set the product details
        error: null, // No error on success
      };
    case Product_Details_Fail:
      return {
        loading: false,
        error: action.payload, // Store error message
        product: { review: [] },
      };
    default:
      return state;
  }
};
