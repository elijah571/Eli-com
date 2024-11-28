import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LogoutAction } from "../Redux/Actions/user"; // Corrected import
import { Link } from "react-router-dom";
import Checkout from "../pages/Checkout";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const quantity = useSelector((state) =>
    state.cartReducer.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const handleLogout = () => {
    dispatch(LogoutAction()); // Ensure this action is defined to log the user out
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ShopNow
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!userInfo ? (
              <Link to={"/login"}>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center shadow-md transition-transform transform hover:scale-105 dark:focus:ring-blue-800"
                >
                  Get Started
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logout
              </button>
            )}

            <div className="relative">
              <svg
                onClick={() => setOpen(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-transform transform hover:scale-110 dark:text-gray-300 dark:hover:text-blue-400 ml-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {quantity}
              </span>
            </div>
            <Checkout open={open} setOpen={setOpen}></Checkout>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
