import React from "react";
import { Link } from "react-router-dom";

import "./Banner.css";

const Banner = () => {
  return (
    <>
      <div className="ms-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="ms-banner-item col-12">
              <div className="ms-banner-inner">
                <img src="./assets/images/banner/Home-2-Slider-3.webp" alt="" />
                <div className="ms-banner-content ms-pe-none">
                  <h3>New Arrivals</h3>
                  <h4>lastest book</h4>
                  <h5>
                    Next generation LED lamp. A multi-function LED lamp that is
                    environmentally friendly <br /> and soft on the eyes.
                  </h5>
                  <Link to="/shop" className="ms-banner-btn ms-pe-auto">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
