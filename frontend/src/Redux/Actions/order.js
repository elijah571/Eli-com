import axios from "axios";
import { baseURL } from "../Constants/Base_Url.js";
import {
  ORDER_REQ,
  ORDER_RESET,
  ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_DETAIL_REQ,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAYMENT_REQ,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_LIST_REQ,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "../Constants/order.js";

import { CLEAR_CART } from "../Constants/Cart.js";
import { LogoutAction } from "./user.js";

// Action to create an order
export const orderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQ });

    // Retrieve userInfo from Redux state
    const { userInfo } = getState().auth;

    // Config for the axios request with cookies
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Include token for protected routes
      },
      withCredentials: true, // Ensures cookies are sent with the request
    };

    const { data } = await axios.post(`${baseURL}/api/orders`, order, config);

    dispatch({ type: ORDER_SUCCESS, payload: data });
    dispatch({ type: CLEAR_CART });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("Order Action Error:", message);
    dispatch({ type: ORDER_FAIL, payload: message });
  }
};

// Action to handle order payment
export const OrderPaymentAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAYMENT_REQ });

      const { userInfo } = getState().auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${baseURL}/api/orders/${orderId}/payment`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
      dispatch({ type: CLEAR_CART });
      dispatch(orderDetailAction(orderId));
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error("Order Payment Action Error:", message);

      if (message === "Not authorized") {
        dispatch(LogoutAction());
      }

      dispatch({ type: ORDER_PAYMENT_FAIL, payload: message });
    }
  };

// Action to fetch order details
export const orderDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQ });

    const { userInfo } = getState().auth;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${baseURL}/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("Order Detail Action Error:", message);

    if (message === "Not authorized") {
      dispatch(LogoutAction());
    }

    dispatch({ type: ORDER_DETAIL_FAIL, payload: message });
  }
};

// Action to fetch the list of orders
export const orderListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQ });

    const { userInfo } = getState().auth;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${baseURL}/api/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("Order List Action Error:", message);

    if (message === "Not authorized") {
      dispatch(LogoutAction());
    }

    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};
