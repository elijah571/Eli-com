import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import ProductInfo from "./pages/productInfo.jsx"; // Capitalized the component name

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product-info" element={<ProductInfo />} />
      </Routes>
    </Router>
  </StrictMode>
);
