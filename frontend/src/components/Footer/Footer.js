import React from "react";
import { Link } from "react-router-dom";
import Social from "../Header/Social";

import payment from "./payments.png";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="ms-footer">
        <div className="container ms-ft-top">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xl-4 text-start">
              <Link to="/" className="ms-footer-logo">
                <img src="http://localhost:8080/uploads/shine.png" alt="" />
              </Link>
              <div className="ms-ft-content">
                <p>Address : Dai Tu, Thai Nguyen City, Viet Nam</p>
                <p>Phone : +1 222 3333 578</p>
                <p>Email : hekichien@gmail.com</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-4 text-start">
              <div className="ms-ft-heading">Business Hours</div>
              <div className="ms-ft-content">
                <p>Mon - Fri: 8AM - 10PM</p>
                <p>Sat: 9AM - 8PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-4 text-start">
              <div className="ms-ft-heading">Contact</div>
              <div className="ms-ft-content">
                <Link to="/about">Support</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-ft-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-4 col-xl-4 text-start">
                <p className="power">
                  Copyright & <Link to="">MINHSANGSTORE</Link> All Rights
                  Reserved by <Link to="">HekiChien</Link>
                </p>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-4 ">
                <Social />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-4 text-end">
                <img src={payment} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
