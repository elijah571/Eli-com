import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CartProduct from "../Components/CartProduct"; // Ensure correct component import
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Redux/Constants/Base_Url";
import { orderAction } from "../Redux/Actions/order";
import { shippingAddressAction } from "../Redux/Actions/Cart";

const Order = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart || { cartItems: [] }; // Ensure fallback

  const addDecimal = (num) =>
    parseFloat((Math.round(num * 100) / 100).toFixed(2));

  const SubTotal = addDecimal(
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
  );
  const taxPrice = addDecimal(0.15 * SubTotal);
  const shippingPrice = SubTotal > 100 ? 0 : 20;
  const total = addDecimal(SubTotal + taxPrice + shippingPrice);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [clientId, setClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPaypalClientId = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/config/paypal`);
        setClientId(response.data);
      } catch (error) {
        console.error("Unable to fetch PayPal client ID. Please try again.");
      }
    };
    getPaypalClientId();
  }, []);

  const successPaymentHandler = (details) => {
    dispatch(
      orderAction({
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        totalPrice: total,
        paymentMethod: "PayPal",
        price: SubTotal,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        paymentResult: details,
      })
    );
  };

  const saveShippingAddress = () => {
    dispatch(
      shippingAddressAction({
        address,
        city,
        postalCode,
        country,
      })
    );
  };

  return (
    <Layout>
      <section className="text-gray-700 body-font overflow-hidden bg-gray-50">
        <div className="container px-5 py-12 mx-auto mt-10">
          <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white rounded-lg shadow-lg">
            {/* Order Summary */}
            <div className="lg:w-1/2 w-full p-6 lg:pr-12">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="mb-6">
                {cartItems.length ? (
                  <CartProduct cartItems={cartItems} />
                ) : (
                  <p className="text-gray-500">No items in the cart.</p>
                )}
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">${SubTotal}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Tax (15%)</span>
                <span className="font-medium text-gray-800">${taxPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-800">
                  ${shippingPrice}
                </span>
              </div>
              <div className="flex justify-between py-4 border-t border-b border-gray-300 mb-4">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-indigo-600">
                  ${total}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="lg:w-1/2 w-full bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping Address
              </h2>
              {["address", "city", "postalCode", "country"].map((field) => (
                <div className="mb-4" key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    value={eval(field)}
                    onChange={(e) =>
                      eval(
                        `set${
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }(e.target.value)`
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              ))}
              <button
                onClick={saveShippingAddress}
                className="mb-10 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Shipping Address"}
              </button>
              {clientId ? (
                <PayPalScriptProvider options={{ clientId }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { currency_code: "USD", value: total },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        successPaymentHandler(details);
                      });
                    }}
                    onError={(err) => {
                      console.error("PayPal payment error:", err);
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <p className="text-gray-500">
                  PayPal is not available at the moment. Please try again later.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
