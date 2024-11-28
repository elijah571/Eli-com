import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Items from "./Components/Products/Items";
import ProductInfo from "./pages/productInfo";
import Login from "./pages/Users/Login";
import Signup from "./pages/Users/Signup";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
const App = () => {
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route
          path="/login"
          element={userInfo ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={userInfo ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
