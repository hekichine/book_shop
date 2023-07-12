import React from "react";
import CurrencyFormat from "react-currency-format";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TbMoodEmpty } from "react-icons/tb";

import "./CartPopup.css";
import CartItem from "./CartItem";

const CartPopup = (props) => {
  let visible = props?.visible;
  let setVisible = props?.setVisible;
  let carts = useSelector((state) => state?.cart);
  const navigation = useNavigate();
  const totalPrice = () => {
    let total = 0;
    let price = carts?.map(
      (item) =>
        (total +=
          (item?.price - (item?.price * item?.sale) / 100) * item?.quantity)
    );
    return total;
  };
  const checkOut = () => {
    navigation("/checkout");
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end ms-cart-popup"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Shopping cart
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="offcanvas-body-inner d-flex flex-column h-100">
            {carts?.length === 0 ? (
              <>
                <div className="ms-cart-null">
                  <div className="d-flex justify-content-center align-items-center flex-column h-100">
                    <h2>Cart empty</h2>
                    <TbMoodEmpty size={40} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="ms-cart-content my-2">
                  {carts &&
                    carts?.length > 0 &&
                    carts?.map((item, index) => <CartItem product={item} />)}
                </div>
                <div className="ms-cart-bottom p-4 ">
                  <div className="ms-cart-total">
                    <span className="ms-total-title ">Total:</span>
                    <CurrencyFormat
                      value={totalPrice()}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      prefix={"$"}
                      className={"ms-total-price"}
                    />
                  </div>
                  <div className="text-start py-3">
                    <p className="label-tax">
                      Taxes and shipping calculated at checkout
                    </p>
                  </div>
                  <div className="ms-mini-cart-group-btns">
                    <button
                      type="button"
                      className="ms-checkout-btn ms-mini-cart-btn"
                      data-bs-dismiss="offcanvas"
                      onClick={() => checkOut()}
                    >
                      Check out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPopup;
