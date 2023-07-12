import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiCloseLine } from "react-icons/ri";

import "./quickview.css";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { removeQuickview } from "../../../redux/quickviewSlice";

const Quickview = () => {
  const quickview = useSelector((state) => state.quickview.product);
  const dispatch = useDispatch();

  const exitQv = () => {
    dispatch(removeQuickview());
  };
  return (
    <>
      <div
        className={
          quickview !== null
            ? "ms-quickview-popup active"
            : "ms-quickview-popup"
        }
      >
        <div className="ms-qickview-container container">
          <div className="row">
            <div className="col-12">
              <div className="heading-inner d-flex align-items-center m-3">
                <h3 className="qv-heading">Quickview</h3>
                <button className="btn-qv-exit" onClick={() => exitQv()}>
                  <RiCloseLine size={30} />
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="col-inner">
                <div className="qv-img ratio ratio-4x5">
                  <img src={quickview?.image} alt="" />
                </div>
              </div>
            </div>
            <div className="col-8 text-start">
              <div className="col-inner p-3">
                <Link to={"/"} className="product-name mb-3">
                  {quickview?.name}
                </Link>
                <p>
                  <CurrencyFormat
                    value={
                      quickview?.price -
                      (quickview?.price * quickview?.sale) / 100
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    className={"ms-product-sale me-1"}
                  />
                  <CurrencyFormat
                    value={quickview?.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    className={"ms-product-cost"}
                  />
                </p>
                <p>
                  Instock:
                  <CurrencyFormat
                    value={quickview?.countInStock}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    decimalScale={2}
                  />
                </p>
                <p>
                  Sell:
                  <CurrencyFormat
                    value={quickview?.sell}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    decimalScale={2}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quickview;
