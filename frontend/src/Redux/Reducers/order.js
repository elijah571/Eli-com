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

// Order Reducer
export const orderReducer = (
  state = { order: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_REQ:
      return {
        ...state,
        loading: true,
      };
    case ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_RESET:
      return { order: null, loading: false, success: false, error: null }; // Reset all parts of the state
    default:
      return state;
  }
};

// Order Detail Reducer
export const orderDetailReducer = (
  state = { loading: true, order: null, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQ:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Order Payment Reducer
export const orderPaymentReducer = (
  state = { loading: false, success: false, paymentDetails: null, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQ:
      return {
        loading: true,
        success: false,
      };
    case ORDER_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        paymentDetails: action.payload,
      };
    case ORDER_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Order List Reducer
export const orderListReducer = (
  state = { orders: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQ:
      return {
        loading: true,
        orders: [],
        error: null, // Reset any existing errors
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
