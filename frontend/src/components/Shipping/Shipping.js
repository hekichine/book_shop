import React from "react";

import { AiOutlineCodeSandbox } from "react-icons/ai";
import { MdSettingsBackupRestore } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";

import "./Shipping.css";

const Shipping = () => {
  return (
    <>
      <section className="ms-shipping">
        <div className="ms-section-shipping-inner">
          <div className="ms-container container">
            <div className="row ms-shipping-list justify-content-center gy-4">
              <div className="ms-shipping-item col-item col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                <div className="ms-shipping-inner">
                  <div className="ms-shipping-icon">
                    <AiOutlineCodeSandbox size={65} />
                  </div>
                  <div className="ms-shipping-content col">
                    <h3 className="ms-shipping-title">Shipping Worldwide</h3>
                    <div className="ms-shipping-des">
                      <p>Special financing and earn rewards.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-shipping-item col-item col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                <div className="ms-shipping-inner">
                  <div className="ms-shipping-icon">
                    <MdSettingsBackupRestore size={65} />
                  </div>
                  <div className="ms-shipping-content">
                    <h3 className="ms-shipping-title">14 Days Return</h3>
                    <div className="ms-shipping-des">
                      <p>14-days free return policy.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-shipping-item col-item col-lg-4 col-md-6 col-sm-6 col-12 text-center">
                <div className="ms-shipping-inner">
                  <div className="ms-shipping-icon col-auto">
                    <BsShieldCheck size={65} />
                  </div>
                  <div className="ms-shipping-content">
                    <h3 className="ms-shipping-title">Security Paymsnt</h3>
                    <div className="ms-shipping-des">
                      <p>We accept all major credit cards.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
