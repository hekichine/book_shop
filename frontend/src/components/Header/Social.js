import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { TbBrandTelegram } from "react-icons/tb";
import { SlSocialFacebook } from "react-icons/sl";
import { Link } from "react-router-dom";
import "./Social.css";
const Social = (props) => {
  const color = props?.color;
  return (
    <>
      <div className="social-media order-lg-last" data-color={color}>
        <p className="mb-0 d-flex justify-content-center">
          <Link
            to="https://www.facebook.com/luv.you.baka?mibextid=ZbWKwL"
            target={"_blank"}
            className="d-flex align-items-center justify-content-center"
          >
            <SlSocialFacebook />
          </Link>
          <Link
            to=""
            className="d-flex align-items-center justify-content-center"
          >
            <TbBrandTelegram />
          </Link>
          <Link
            to="https://instagram.com/luv.you.baka?igshid=YzgyMTM2MGM="
            target={"_blank"}
            className="d-flex align-items-center justify-content-center"
          >
            <AiOutlineInstagram />
          </Link>
        </p>
      </div>
    </>
  );
};

export default Social;
