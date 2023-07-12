import React from "react";
import Banner from "../Banner/Banner";
import BestSeller from "../ProductList/BestSeller/BestSeller";
import SaleProduct from "../ProductList/Sale/SaleProduct";
import Trending from "../ProductList/Trending/Trending";
import Shipping from "../Shipping/Shipping";
import Testimonial from "../Testimonial/Testimonial";

import Slider from "./Slider/Slider";
import Category from "./Category/Category";

const PageContent = () => {
  return (
    <>
      <div className="ms-page-content">
        <Slider />
        <Category />
        <BestSeller />
        <Shipping />
        <SaleProduct />
        <Testimonial />
        <Trending />
      </div>
    </>
  );
};

export default PageContent;
