import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCartAction, addToCartAction } from "../Redux/Actions/Cart";

const CartProduct = () => {
  // Accessing cart items from the Redux store
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const addToCartHandler = (id, quantity) => {
    dispatch(addToCartAction(id, quantity));
  };
  const total = cartItems
    ?.reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div className="mt-8">
      {cartItems.length > 0 ? (
        <ul className="-my-6 divide-y divide-gray-200">
          {cartItems.map((product) => (
            <li key={product.product} className="flex py-6">
              <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name || "Product image"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p className="ml-4">${product.price}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">
                    Quantity
                    <select
                      value={product.quantity}
                      onChange={(e) =>
                        addToCartHandler(
                          product.product,
                          Number(e.target.value)
                        )
                      }
                      className="ml-2 rounded border border-gray-300 py-1 px-2"
                    >
                      {Array.from(
                        { length: product.countInStock },
                        (_, i) => i + 1
                      ).map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.product)}
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartProduct;
