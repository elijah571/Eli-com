import { baseURL } from "../Constants/Base_Url";
import axios from "axios"; // Corrected axios import
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_CART_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../Constants/Cart";

// Add to Cart
export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  try {
    // Fetch product data from API
    const { data } = await axios.get(`${baseURL}/api/product/${id}`);
    console.log(data); // Verify the structure of the response

    // Ensure the product is correctly extracted from the response
    const product = data.product; // Assuming the product data is nested under `data.product`
    console.log(product); // Log to verify the structure

    // Dispatch ADD_TO_CART action with product details and selected quantity
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: product._id, // Correctly passing _id as product
        name: product.name, // Make sure these fields are returned by your backend
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        quantity,
      },
    });

    // Get the updated cart items from the state
    const cartItems = getState().cartReducer.cartItems;

    // Save cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems); // Verify that the cart items are correct in the state
  } catch (error) {
    console.error("Error adding to cart", error);
  }
};

// Remove from Cart
export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  // Update cart items in localStorage
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Shipping Address
export const shippingAddressAction = (data) => (dispatch) => {
  dispatch({
    type: SAVE_CART_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Payment Method
export const paymentMethodAction = (data) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
