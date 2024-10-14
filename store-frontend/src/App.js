// src/App.js
import "./App.css";
import Navbar from "./components/Navbar/components/Navbar";
import CategoryNavbar from "./components/Categories/CategoryNavbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Navbar/components/Home";
import About from "./components/Drawers/components/About/components/About";
import Signup from "./components/Authentication/components/SignupForm";
import Login from "./components/Authentication/components/LoginForm";
import AdminDashboard from "./components/Pages/Dashboards/AdminDashboard/components/AdminDashboard";
import SellerDashboard from "./components/Pages/Dashboards/SellerDashboard/components/SellerDashboard";
import ProfileDrawer from "./components/Drawers/components/Profile/components/ProfileDrawer";
import Cart from "./components/Cart/Cart"; // Import Cart component
import { CartProvider } from "./components/Cart/CartContext"; // Import CartProvider context
import React, { useState, useEffect } from "react";
import Order from "./components/Orders/components/Order";
import OrderConfirmation from "./components/Orders/components/OrderConfirmation";
import MyOrders from "./components/Orders/components/MyOrders";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      // Decode the token to extract user info
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode payload
      setUserInfo({ id: decodedToken.userId, username: decodedToken.username }); // Set user info
    }
  }, []);

  const handleLogin = (token, user) => {
    sessionStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    // Decode the token to extract user info
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode payload
    setUserInfo({ id: decodedToken.userId, username: decodedToken.username,role: decodedToken.role }); // Set user info
    if (user.role === "admin") {
      navigate("/admin-dashboard", { state: { message: "Login successful!" } });
    } else if (user.role === "seller") {
      navigate("/seller-dashboard", {
        state: { message: "Login successful!" },
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/", {
      state: { message: "You have been logged out successfully." },
    });
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
          onLogout={handleLogout}
          onProfileClick={() => setShowProfileDrawer(true)}
        />
        <CategoryNavbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
            <Route path="/order" element={<Order />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders userID={userInfo?.id} />} /> 
          </Routes>
        </div>
        <ProfileDrawer
          isOpen={showProfileDrawer}
          onClose={() => setShowProfileDrawer(false)}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
          onLogout={handleLogout}
        />
      </div>
    </CartProvider>
  );
}

export default App;
