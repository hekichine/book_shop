import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Quickview from "./Quickview/Quickview";
import Feedback from "./Feedback/Feedback";

const HomePage = () => {
  return (
    <>
      <div className="ms-overlay-mobile"></div>
      <Header />
      <section className="ms-app-content">
        <Outlet />
      </section>
      <Footer />
      <Quickview />
      <Feedback />
    </>
  );
};

export default HomePage;
