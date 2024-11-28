import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCartAction, addToCartAction } from "../Redux/Actions/Cart";

const Checkout = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

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
                                  onClick={() =>
                                    removeFromCart(product.product)
                                  }
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
                      <p className="text-center text-gray-500">
                        Your cart is empty.
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total || "0.00"}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button className="w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to="/">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping &rarr;
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Checkout;
