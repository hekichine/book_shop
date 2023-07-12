import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import BackToTop from "react-back-to-top-button";
import { IoIosArrowUp } from "react-icons/io";

import ShopPage from "./components/ShopPages/ShopPage";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import Admin from "./components/Dashboard/Admin";
import PageContent from "./components/HomePage/PageContent";
import NotFound from "./components/404NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Register from "./components/Login/Register";
import { ToastContainer } from "react-toastify";
import Logout from "./components/Logout/Logout";
import ProductManager from "./components/Dashboard/Product/ProductManager/ProductManager";
import UserContent from "./components/Dashboard/User/UserContent";
import Account from "./components/Account/Account";
import Category from "./components/Dashboard/Category/Category";
import Checkout from "./components/Checkout/Checkout";
import Order from "./components/Order/Order";
import OrderAdmin from "./components/Dashboard/Order/Order";
import AboutUs from "./components/AbourUs/AboutUs";
import SettingsAccount from "./components/Account/SettingsAccount";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<PageContent />} />
          <Route path="account/:id" element={<Account />} />
          <Route path="settings" element={<SettingsAccount />} />
          <Route path="products" element={<ShopPage />} />
          <Route path="order" element={<Order />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Admin />} />
          <Route path="account" element={<UserContent />} />
          <Route path="product" element={<ProductManager />} />
          <Route path="order" element={<OrderAdmin />} />
          <Route path="category" element={<Category />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      {location.pathname.includes("/dashboard") ? (
        <div className="d-none">
          <BackToTop
            showOnScrollDown
            showAt={100}
            speed={1500}
            easing="easeInOutQuint"
          >
            <span
              className="d-inline-flex justify-content-between align-items-center"
              style={{
                border: "1px solid #000",
                borderRadius: "100%",
                width: "40px",
                height: "40px",
                padding: "5px",
              }}
            >
              <IoIosArrowUp />
            </span>
          </BackToTop>
        </div>
      ) : (
        <BackToTop
          showOnScrollDown
          showAt={100}
          speed={1500}
          easing="easeInOutQuint"
        >
          <span
            className="d-inline-flex justify-content-between align-items-center"
            style={{
              border: "1px solid #000",
              borderRadius: "100%",
              width: "40px",
              height: "40px",
              padding: "5px",
            }}
          >
            <IoIosArrowUp />
          </span>
        </BackToTop>
      )}
    </div>
  );
}

export default App;
