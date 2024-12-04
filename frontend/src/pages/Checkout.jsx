import React from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import CartProduct from "../Components/CartProduct";

const Checkout = ({ open, setOpen }) => {
  // Retrieve cart items from the Redux store
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  // Calculate the total price
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

                  {/* Pass cartItems directly to CartProduct */}
                  <CartProduct cartItems={cartItems} />
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
                    <Link to="/order">
                      <a className="w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        Checkout
                      </a>
                    </Link>
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
