import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./productdetail.css";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import CurrencyFormat from "react-currency-format";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { addToCart } from "../../redux/cartSlice";
import formatDate from "./formatDate";
import RelatedProducts from "./RelatedProducts";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
const ProductDetail = () => {
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [load, setLoad] = useState(0);
  const [content, setContent] = useState();
  const [submit, setSubmit] = useState(false);
  const [mainimg, setMainimg] = useState();
  const [images, setImages] = useState();

  let { id } = useParams();
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
    if (e.target.value <= 0) {
      setQuantity(1);
    }
    if (e.target.value >= product?.countInStock) {
      setQuantity(product?.countInStock);
    }
  };
  const btnPlus = () => {
    if (quantity >= product?.countInStock) {
      setQuantity(product?.countInStock);
      return;
    }
    setQuantity((pre) => pre + 1);
  };
  const btnMinus = () => {
    if (quantity <= 1) {
      setQuantity(1);
      return;
    }
    setQuantity((pre) => pre - 1);
  };
  const btnAddCart = () => {
    if (cart.some((item) => item?.id === product?.id)) {
      return;
    }
    let newpr = {
      ...product,
      quantity: quantity,
    };
    dispatch(addToCart(newpr));
  };
  const handleContent = (e) => {
    if (!e.target.value) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
    setContent(e.target.value);
  };
  const handleReview = async () => {
    let comment = {
      uid: user?.id,
      productid: product?.id,
      content: content,
    };
    let result = await axios.post(
      "http://localhost:8080/api/v1/reviews",
      comment
    );
    if (result.data?.success === true) {
      setContent("");
      setLoad((pre) => pre + 1);
      setSubmit(false);
    }
  };
  const deleteReview = async (review) => {
    let result = await axios.delete(
      `http://localhost:8080/api/v1/reviews/${review?.id}/${product?.id}`
    );
    if (result.data?.success === true) {
      setLoad((pre) => pre + 1);
    }
  };
  useEffect(() => {
    let fetchProduct = async (id) => {
      let result = await axios.get(
        `http://localhost:8080/api/v1/products/${id}`
      );
      console.log(result.data.product);
      if (result.data?.success === true) {
        setProduct(result?.data?.product);
        setImages(result.data?.product?.images);
        setMainimg(result.data?.product?.image);
      }
    };
    fetchProduct(id);
  }, [id, load]);
  return (
    <>
      <section className="ms-product-detail pt-127">
        <div className="container mb-4 heading-control">
          <div className="row">
            <Link
              to={"/"}
              className="d-inline col-auto"
              style={{ fontWeight: 500 }}
            >
              Home
            </Link>
            <span className="d-inline col-auto mx-0">/</span>
            <span className="d-inline col-auto">{product?.name}</span>
          </div>
        </div>
        <div className="container mb-5">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="pr-dt-inner d-flex">
                <div className="pr-dt-list-image d-flex flex-column justify-content-start">
                  <div
                    className="pr-dt-img-thumb"
                    onClick={() => setMainimg(product?.image)}
                  >
                    <img src={product?.image} alt="" />
                  </div>
                  {images &&
                    images?.length > 0 &&
                    images?.map((img) => (
                      <>
                        <div
                          className="pr-dt-img-thumb"
                          onClick={() => setMainimg(img)}
                        >
                          <img src={img} alt="" />
                        </div>
                      </>
                    ))}
                </div>
                <div className="pr-dt-img">
                  <Zoom>
                    <img
                      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                      src={mainimg}
                      width="500"
                    />
                  </Zoom>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 text-start">
              <div className="pr-dt-inner">
                <div className="pr-instock">
                  {product?.countInStock === 0 ? (
                    <>
                      <span className="pr-out_stock">OUT STOCK</span>
                    </>
                  ) : (
                    <>
                      <span className="pr-in_stock">IN STOCK</span>
                    </>
                  )}
                </div>
                <div className="pr-dt-name">
                  <h3 className="product-dt-title">{product?.name}</h3>
                  <span className="pr_author">
                    <span style={{ color: "#999", marginRight: "6px" }}>
                      Author:
                    </span>
                    {product?.author}
                  </span>
                </div>
                <div className="pr-dt-currentcy">
                  <div className="pr-dt-price">
                    <span className="pr-dt-sale-price">
                      <CurrencyFormat
                        value={
                          product?.price -
                          (product?.price * product?.sale) / 100
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                    <span
                      style={{
                        marginLeft: "6px",
                        color: "rgba(0,0,0,.4)",
                        textDecoration: "line-through",
                      }}
                    >
                      <CurrencyFormat
                        value={product?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                  </div>
                  <div className="pr-dt-des">
                    <p>{product?.description}</p>
                  </div>
                </div>
                <div className="pr-dt-count">
                  <p className="label_quantity">
                    <span style={{ fontWeight: "600", marginRight: "10px" }}>
                      Instock:
                    </span>
                    <CurrencyFormat
                      value={product?.countInStock}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </p>
                  <p className="label_quantity">
                    <span style={{ fontWeight: "600", marginRight: "10px" }}>
                      Seller:
                    </span>
                    <CurrencyFormat
                      value={product?.sell}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </p>

                  <div
                    className={
                      product?.countInStock === 0
                        ? "pr-dt-action disable"
                        : "pr-dt-action"
                    }
                  >
                    <div class="pr-dt-quantity">
                      <button
                        type="button"
                        class="minus"
                        onClick={() => btnMinus()}
                      >
                        <AiOutlineMinus />
                      </button>
                      <input
                        type="number"
                        class="form-control"
                        step="1"
                        min="1"
                        max={product?.countInStock}
                        name="quantity"
                        inputmode="numeric"
                        value={quantity}
                        onChange={(e) => handleQuantity(e)}
                      />
                      <button
                        type="button"
                        class="plus"
                        onClick={() => btnPlus()}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <div className="pr-dt-add-cart">
                      <button
                        className={
                          product?.countInStock === 0
                            ? "btn btn-secondary"
                            : "btn btn-primary"
                        }
                        onClick={() => btnAddCart()}
                      >
                        <BiShoppingBag size={24} className="me-1" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-5">
          <div className="row">
            <Tabs>
              <TabList>
                {product?.richDescription ? (
                  <>
                    <Tab>Description</Tab>
                  </>
                ) : (
                  <></>
                )}
                {product?.reviews ? (
                  <>
                    <Tab>Reviews ({product?.reviews?.length})</Tab>
                  </>
                ) : (
                  <></>
                )}
              </TabList>

              {product?.richDescription ? (
                <>
                  <TabPanel>
                    <p>{product?.richDescription}</p>
                  </TabPanel>
                </>
              ) : (
                <></>
              )}
              {product?.reviews ? (
                <>
                  <TabPanel>
                    <h3 className="text-start mb-3">
                      {product?.reviews?.length} review for "{product?.name}"
                    </h3>
                    {product?.reviews?.map((review) => (
                      <div className="cmt-item">
                        <div className="cmt-author">
                          <div className="cmt-avatar">
                            <img src={review?.uid?.avatar} alt="" />
                          </div>
                          <div className="cmt-author-content">
                            <p className="mb-0 d-flex align-items-center w-100">
                              <strong className="cmt-name me-2">
                                <Link to={`/account/${review?.uid?.id}`}>
                                  {review?.uid?.fullname}
                                </Link>
                              </strong>
                              <span>{formatDate(review?.createdAt)}</span>
                              {user?.isAdmin === true ||
                              review?.uid?.id === user?.id ? (
                                <>
                                  <div className="btn-delete-review ms-auto">
                                    <button
                                      onClick={() => deleteReview(review)}
                                    >
                                      <AiOutlineDelete size={16} />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </p>
                            <p className="cmt-content">{review?.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {user ? (
                      <>
                        <div className="review-wrap mb-3">
                          <h5 className="text-start mb-2">Add your review</h5>
                          <p className="color-xam text-start">
                            Your email address will not be published. Required
                            fields are marked *
                          </p>
                          <div className="review-inner mb-2">
                            <div className="cmt-author">
                              <div className="cmt-avatar">
                                <img src={user?.avatar} alt="" />
                              </div>
                              <div className="cmt-author-content">
                                <p className="mb-0">
                                  <strong className="cmt-name me-2">
                                    {user?.fullname}
                                  </strong>
                                </p>
                                <textarea
                                  className="form-control"
                                  cols="30"
                                  rows="5"
                                  value={content}
                                  onChange={(e) => handleContent(e)}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button
                              className={
                                submit
                                  ? "btn btn-primary"
                                  : "btn btn-danger disable"
                              }
                              onClick={() => handleReview()}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </TabPanel>
                </>
              ) : (
                <></>
              )}
            </Tabs>
          </div>
        </div>
        <RelatedProducts product={product} />
      </section>
    </>
  );
};

export default ProductDetail;
