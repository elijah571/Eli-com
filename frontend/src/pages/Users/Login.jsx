import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../Components/Layout";
import { loginAction } from "../../Redux/Actions/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth); // Use the combined `auth` reducer
  const { loading, error, userInfo } = auth;

  const dispatch = useDispatch();

  // Redirect if user is logged in
  useEffect(() => {
    if (userInfo) {
      window.location.href = "/";
    }
  }, [userInfo]);

  // Form handling
  const formHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 className="text-red-600 text-center">Error: {error}</h1>
      ) : (
        <form
          className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10"
          onSubmit={formHandler}
        >
          <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">
            Login
          </h2>

          {/* Email Input */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 origin-[0] peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 origin-[0] peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium text-lg mt-4"
          >
            Login
          </button>
        </form>
      )}
    </Layout>
  );
};

export default Login;
