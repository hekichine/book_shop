import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

import "./fb.css";

const Feedback = () => {
  return (
    <>
      <div className="feedback">
        <div className="feedback-wrap">
          <Link
            to={"https://www.facebook.com/shine.bake.luchin"}
            target="_blank"
          >
            <BsFacebook />
          </Link>
          <Link to={"https://t.me/shine_luu"} target="_blank">
            <FaTelegramPlane />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Feedback;
