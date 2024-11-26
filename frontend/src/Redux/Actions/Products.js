import axios from "axios";
import { baseURL } from "../Constants/Base_Url";
import {
  Products_Req,
  Products_Success,
  Products_Fail,
  Product_Details_Req,
  Product_Details_Success,
  Product_Details_Fail,
} from "../Constants/Products";

// Get all Products
export const allProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: Products_Req }); // Dispatch request action

    const { data } = await axios.get(`${baseURL}/api/products`);

    // Check if expected data exists in the response
    if (data && data.products) {
      dispatch({
        type: Products_Success,
        payload: {
          products: data.products, // List of products
          totalPage: data.totalPage || 1, // Default to 1 if not provided
          page: data.page || 1, // Default to 1 if not provided
        },
      });
    } else {
      throw new Error("Unexpected response structure from the server.");
    }
  } catch (error) {
    dispatch({
      type: Products_Fail,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Get a single Product by ID
export const productAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: Product_Details_Req }); // Dispatch request action

    const { data } = await axios.get(`${baseURL}/api/product/${id}`);

    // Check if 'data' contains the expected product details
    if (data && data.product) {
      dispatch({
        type: Product_Details_Success,
        payload: data.product, // Pass only the product details
      });
    } else {
      throw new Error("Product data is not available in the server response.");
    }
  } catch (error) {
    dispatch({
      type: Product_Details_Fail,
      payload: error.response?.data.message || error.message,
    });
  }
};
