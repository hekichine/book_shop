import React from "react";
import { Link } from "react-router-dom";

import "./Product.css";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";

import { addToCart } from "../../redux/cartSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { addQuickview } from "../../redux/quickviewSlice";
import { ImSad } from "react-icons/im";

const Product = (props) => {
  const dispatch = useDispatch();
  let product = props.data;

  const handleAddCart = () => {
    let action = {
      ...product,
    };
    dispatch(addToCart(action));
    return;
  };
  const handleQuickview = () => {
    dispatch(addQuickview(product));
  };

  return (
    <>
      <div
        className="ms-product-item"
        instock={product?.countInStock !== 0 ? "true" : "false"}
      >
        <div className="ms-product-inner ms-pr ms-oh">
          <div className="ms-product-img ms-pr ratio ratio-14x10">
            <Link to={`/products/${product?.id}`}>
              <img src={product?.image} alt="" />
            </Link>
            <div className="ms-instock ms-pa">
              <ImSad size={30} />
            </div>
            <div className="ms-product-image-overlay ms-pe-none"></div>
            <div className="ms-product-btn-group ms-pe-none">
              <button
                className="ms-quickview ms-pe-auto ms-button-cart"
                onClick={() => handleQuickview()}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Quick view"
              >
                Quick view
              </button>
              <button
                className="ms-addcart ms-pe-auto ms-button-cart"
                onClick={() => handleAddCart()}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Add to cart"
              >
                Add to cart
              </button>
            </div>
            <span className="ms-title-size">xs,s,m,l,xl</span>

            {product?.sale !== 0 ? (
              <>
                <div className="ms-sale ms-po">
                  <span>{product?.sale}%</span>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="ms-heart ms-po">
              <Link to="#">
                <AiOutlineHeart />
              </Link>
            </div>
          </div>
          <div className="ms-product-info">
            <div className="ms-product-info-inner">
              <p className="ms-product-title">
                <Link to={`/products/${product?.id}`}>{product?.name}</Link>
              </p>
              <div className="ms-product-price">
                <CurrencyFormat
                  value={
                    product?.price - (product?.price * product?.sale) / 100
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  className={"ms-product-cost me-1"}
                />
                {product?.sale !== 0 ? (
                  <>
                    <CurrencyFormat
                      value={product?.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      className={"ms-product-sale"}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
