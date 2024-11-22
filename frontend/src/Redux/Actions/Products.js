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
    // Dispatch the request action to start loading
    dispatch({ type: Products_Req });

    // Fetch products data from the API
    const { data } = await axios.get(`${baseURL}/api/products`);

    // Dispatch success action with fetched data as payload
    dispatch({ type: Products_Success, payload: data });
  } catch (error) {
    // Dispatch fail action with the error message
    dispatch({
      type: Products_Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get a single Product by ID
export const productAction = (id) => async (dispatch) => {
  try {
    // Dispatch the request action to start loading
    dispatch({ type: Product_Details_Req });

    // Fetch product details for the specified ID
    const { data } = await axios.get(`${baseURL}/api/product/${id}`);

    // Dispatch success action with fetched data as payload
    dispatch({ type: Product_Details_Success, payload: data });
  } catch (error) {
    // Dispatch fail action with the error message
    dispatch({
      type: Product_Details_Fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
