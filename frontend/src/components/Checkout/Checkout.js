import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { clearCart } from "../../redux/cartSlice";
import PropagateLoader from "react-spinners/PropagateLoader";

const Checkout = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let cart = useSelector((state) => state?.cart);
  const [fullname, setFullname] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [phone, setPhone] = useState(user?.phone);
  const [payment_method, setPayment_method] = useState();
  const [showpay, setShowpay] = useState();
  const [pending, setPending] = useState(false);
  const [cardNumber, setCardNumber] = useState();
  const [cardDate, setCardDate] = useState();
  const [cvv, setCvv] = useState();
  const [cardName, setCardName] = useState();

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = (e) => {
    setPayment_method(e.target.value);
    if (e.target.value === "payment_online") {
      setShowpay(true);
    } else {
      setShowpay(false);
    }
  };
  const PayNow = async () => {
    let orderItems = cart?.map((item) => {
      return { product: item?.id, quantity: item?.quantity };
    });
    let order = {
      orderItems: orderItems,
      shippingAddress: address,
      phone: phone,
      totalPrice: totalPrice(),
      user: user?.id,
      payment: payment_method,
    };
    if (!address || !phone) {
      toast.error("Address or phone isvalid", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!payment_method) {
      toast.error("Payment method isvalid", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (payment_method === "ship_cod") {
      let result = await axios.post(
        `http://localhost:8080/api/v1/orders`,
        order
      );
      if (result?.data?.success === true) {
        toast.success("Success", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(clearCart());
        navigation("/");
      }
    } else {
      if (!cardNumber) {
        toast.error("Card number isvalid", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!cardDate) {
        toast.error("Card date isvalid", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!cardName) {
        toast.error("Card name isvalid", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (!cvv) {
        toast.error("Card cvv isvalid", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      let result = await axios.post(
        `http://localhost:8080/api/v1/orders`,
        order
      );
      if (result?.data?.success === true) {
        setPending(true);
        setTimeout(() => {
          setPending(false);
          setShowpay(false);
        }, 3000);
        setTimeout(() => {
          toast.success("Success", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(clearCart());
          navigation(`/account/${user?.id}`);
        }, 3500);
      }
    }
  };

  const totalPrice = () => {
    let total = 0;
    let price = cart?.map(
      (item) =>
        (total +=
          (item?.price - (item?.price * item?.sale) / 100) * item?.quantity)
    );
    return total;
  };
  useEffect(() => {
    if (!user?.id) {
      navigation("/signin");
    }
    if (cart?.length === 0) {
      navigation("/");
      toast.error("Cart empty", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);
  return (
    <>
      <div className="container my-5 checkout-section pt-127">
        <div className="checkout-heading mb-5">
          <p className="d-flex align-items-center">
            <Link to={"/"}>Home</Link>
            <span className="mx-1">
              <IoIosArrowForward />
            </span>
            <span style={{ color: "#fb417f" }}>Checkout</span>
          </p>
        </div>
        <div className="row gx-5 gy-3">
          <div className="checkout-product-item col-lg-6 col-12 ms-pr">
            <div className="checkout-product-inner">
              <div className="products-wrap">
                {cart &&
                  cart?.length > 0 &&
                  cart?.map((product, index) => (
                    <div
                      className="products-item mb-4 pb-4 d-flex align-items-center"
                      key={product?.id}
                    >
                      <div className="pr-thumbnail ms-pr">
                        <div
                          className="pr-img overflow-hidden"
                          style={{ width: "100px", height: "120px" }}
                        >
                          <img src={product?.image} alt="" />
                        </div>
                        <span className="pr-quantity">{product?.quantity}</span>
                      </div>
                      <div className="pr-title">{product?.name}</div>
                      <div className="pr-price">
                        <CurrencyFormat
                          value={
                            product?.quantity * product?.price -
                            (product?.quantity *
                              product?.price *
                              product?.sale) /
                              100
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          className={"ms-pr-sale me-1"}
                        />
                        <CurrencyFormat
                          value={product?.quantity * product?.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          className={"ms-pr-price"}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="checkout-total">
                <div className="total-inner d-flex justify-content-between mb-2">
                  <strong>Total</strong>
                  <CurrencyFormat
                    value={totalPrice()}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    className={"ms-total me-2"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-item col-lg-6 col-12">
            <div className="checkout-item-inner">
              <div className="checkout-wrap text-start">
                <div className="checkout-user-info">
                  <div className="ms-ship-address d-lg-flex flex-wrap justify-content-between">
                    <div className="mb-3 w-lg-50">
                      <label
                        htmlhtmlhtmlhtmlFor="ship-fullname"
                        className="mb-2"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ship-fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 w-lg-50">
                      <label htmlhtmlhtmlhtmlFor="ship-email" className="mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        id="ship-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 w-lg-50">
                      <label
                        htmlhtmlhtmlhtmlFor="ship-address"
                        className="mb-2"
                      >
                        Address <span style={{ color: "#dd4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ship-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 w-lg-50">
                      <label htmlhtmlhtmlhtmlFor="ship-phone" className="mb-2">
                        Phone <span style={{ color: "#dd4444" }}>*</span>
                      </label>
                      <CurrencyFormat
                        format="+84 ####-###-###"
                        mask="_"
                        className="form-control"
                        id="ship-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <h4 className="mt-3 w-100">Payment</h4>
                    <div className="payment">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                        onChange={(e) => handlePayment(e)}
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio1"
                          autocomplete="off"
                          value={"ship_cod"}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio1"
                        >
                          Ship COD(Cash On Delivery)
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio2"
                          autocomplete="off"
                          value={"payment_online"}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio2"
                        >
                          Payment online
                        </label>
                      </div>
                      <div
                        className={
                          showpay
                            ? "payment_online-wrap mb-2 pt-4 active"
                            : "payment_online-wrap"
                        }
                      >
                        <div className="pay_inner d-flex w-100 justify-content-center align-items-center">
                          {pending ? (
                            <>
                              <PropagateLoader color="#36d7b7" />
                            </>
                          ) : (
                            <>
                              <div className="row gy-3 gx-3">
                                <div className="col-12 ">
                                  <div className="form__div">
                                    <label
                                      htmlFor="card_number"
                                      className="form__label"
                                    >
                                      CARD NUMBER
                                    </label>
                                    {/* <input
                                      type="text"
                                      className="form-control"
                                      placeholder="9999 9999 9999"
                                      id="card_number"
                                      value={cardNumber}
                                      onChange={(e) =>
                                        setCardNumber(e.target.value)
                                      }
                                    /> */}
                                    <CurrencyFormat
                                      format="#### #### #### ####"
                                      mask="_"
                                      className="form-control"
                                      id="card_number"
                                      value={cardNumber}
                                      onChange={(e) =>
                                        setCardNumber(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="form__div">
                                    <label
                                      htmlFor="card_date"
                                      className="form__label"
                                    >
                                      MM / YY
                                    </label>

                                    <CurrencyFormat
                                      format="##/##"
                                      placeholder="MM/YY"
                                      mask={["M", "M", "Y", "Y"]}
                                      className="form-control"
                                      id="card_date"
                                      value={cardDate}
                                      onChange={(e) =>
                                        setCardDate(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="form__div">
                                    <label
                                      htmlFor="card_cvv"
                                      className="form__label"
                                    >
                                      CVV
                                    </label>
                                    <CurrencyFormat
                                      format="###"
                                      mask="_"
                                      className="form-control"
                                      placeholder="CVV"
                                      id="card_cvv"
                                      value={cvv}
                                      onChange={(e) => setCvv(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form__div">
                                    <label
                                      htmlFor="card_name"
                                      className="form__label"
                                    >
                                      NAME ON THE CARD
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="LUU XUAN CHIEN"
                                      id="card_name"
                                      value={cardName}
                                      onChange={(e) =>
                                        setCardName(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-100 text-end">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => PayNow()}
                      >
                        {showpay ? <>Done</> : <> Order now</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
