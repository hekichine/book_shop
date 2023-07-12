import React from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { GrFormClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { increment, decrement, removeToCart } from "../../../redux/cartSlice";

import "./CartItem.css";

const CartItem = (props) => {
  const product = props?.product;
  const dispatch = useDispatch();
  const inCre = () => {
    if (product?.quantity === product?.countInStock) {
      return;
    }
    dispatch(increment(product));
  };
  const deCre = () => {
    if (product?.quantity === 1) {
      return;
    }
    dispatch(decrement(product));
  };
  const removeCart = () => {
    dispatch(removeToCart(product));
  };

  return (
    <>
      <div className="ms-cart-item my-4">
        <div className="ms-cart-item-img">
          <Link to={`/products/${product?.id}`}>
            <img src={product?.image} alt="" />
          </Link>
        </div>
        <div className="ms-cart-info ms-pr text-start">
          <Link to={""} className="ms-cart-pr-name">
            {product?.name}
          </Link>
          <div className="ms-cart-metas">
            {" "}
            <CurrencyFormat
              value={product?.price - (product?.price * product?.sale) / 100}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              className={"ms-cart-sale me-2"}
            />
            <CurrencyFormat
              value={product?.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              className={"ms-cart-price"}
            />
          </div>
          <div className="ms-cart-action">
            <div className="ms-quantity-wrap">
              <button onClick={() => deCre()}>-</button>
              <input
                type="text"
                value={product?.quantity}
                disabled={true}
                className="pe-none"
              />
              <button onClick={() => inCre()}>+</button>
            </div>
          </div>
          <button className="btn-del-cart-item" onClick={() => removeCart()}>
            <GrFormClose />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
