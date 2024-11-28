import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_CART_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../Constants/Cart";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product, name, image, price, countInStock, quantity } =
        action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item.product === product
      );

      if (existingItem) {
        // If the item exists, update the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existingItem.product
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // Otherwise, add the new item to the cart
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { product, name, image, price, countInStock, quantity },
          ],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case SAVE_CART_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
