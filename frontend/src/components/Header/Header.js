import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { RiCloseFill, RiMenu4Fill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { BsTelephone, BsSearch } from "react-icons/bs";

import "./Header.css";
import { useSelector } from "react-redux";
import CartPopup from "../HomePage/CartPopup/CartPopup";
import Product from "../Product/Product";
import axios from "axios";
import ProgressBar from "react-progressbar-on-scroll";

function MyVerticallyCenteredModal(props) {
  const [results, setResults] = useState();
  const [input, setInput] = useState("");
  useEffect(() => {
    let fetch = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/products`);
      if (result.data?.success === true) {
        setResults(result.data?.products);
      } else {
        setResults(null);
      }
    };
    fetch();
  }, []);
  const handleSearch = async () => {
    let result = await axios.get(
      `http://localhost:8080/api/v1/products?name=${input}`
    );
    if (result.data?.success === true) {
      setResults(result.data?.products);
    } else {
      setResults(null);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-primary ms-2"
              onClick={() => handleSearch()}
            >
              Search
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          {results?.length} result found with "{input}"
        </h4>
        <div className="row gx-4 gy-4 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {results?.length === 0 || results == null ? (
            <div style={{ color: "red", fontWeight: "700", fontSize: "30px" }}>
              no result found
            </div>
          ) : (
            <></>
          )}
          {results &&
            results?.length > 0 &&
            results?.map((item, index) => (
              <>
                <div className="col-item">
                  <Product data={item} key={index} />
                </div>
              </>
            ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Header = () => {
  const cart = useSelector((state) => state.cart);
  let user = JSON.parse(localStorage.getItem("user"));
  const [toggleNav, setToggleNav] = useState();
  const [visible, setVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".sticky-thc");
    const scrollTop = window.scrollY;
    scrollTop >= 43
      ? header?.classList?.add("is-sticky")
      : header?.classList?.remove("is-sticky");
  };
  const showMenu = () => {
    setToggleNav(true);
    document.querySelector(".ms-overlay-mobile")?.classList?.add("active");
  };
  const closeMenu = () => {
    setToggleNav(false);
    document.querySelector(".ms-overlay-mobile")?.classList?.remove("active");
  };

  return (
    <>
      <section className="ms-header" home="true">
        <div className="ms-header-top">
          <div className="ms-header-top-container container">
            <div className="ms-header-top-row row">
              <div className="ms-item-left col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="ms-item-left-content">
                  <div className="ms-item-tel">
                    <BsTelephone />
                    <Link to="#">+1-202-555-0184</Link>
                  </div>
                  <div className="ms-item-mail">
                    <MdOutlineMail />
                    <Link to="#">sayhello@punio.com</Link>
                  </div>
                </div>
              </div>
              <div className="ms-item-right col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="ms-item-right-content">
                  <div className="ms-item-contact">
                    <Link to="#">Contact</Link>
                  </div>
                  <div className="ms-item-faq">
                    <Link to="#">FAQs</Link>
                  </div>
                  <div className="ms-item-lenguage">
                    <div className="ms-lenguage-item ms-lenguage-item-hover">
                      <span>EN</span>
                      <i className="fa-solid fa-angle-down"></i>
                      <div className="ms-item-lenguage-select">
                        <ul>
                          <li>
                            <span>EN</span>
                          </li>
                          <li>
                            <span>VN</span>
                          </li>
                          <li>
                            <span>CN</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="ms-money-item ms-lenguage-item-hover">
                      <span>USD</span>
                      <i className="fa-solid fa-angle-down"></i>
                      <div className="ms-item-lenguage-select">
                        <ul>
                          <li>
                            <span>USD</span>
                          </li>
                          <li>
                            <span>VND</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-header-bottom ms-pr sticky-thc">
          <div className="ms-header-bottom-container container">
            <div className="ms-header-bottom-row row">
              <div className="col-md-4 d-xl-none col-3">
                <div className="ms-menu-mobie" onClick={() => showMenu()}>
                  <RiMenu4Fill />
                </div>
              </div>
              <div className="col-md-4 col-xl-2 col-6 text-xl-start text-center">
                <div className="ms-header-logo">
                  <Link to="/">
                    <img src="http://localhost:8080/uploads/shine.png" alt="" />
                  </Link>
                </div>
              </div>
              <div
                className={
                  toggleNav
                    ? "col col-item ms-menu-mobile active"
                    : "col col-item ms-menu-mobile"
                }
              >
                <div className="ms-navigation">
                  <div className="ms-mobile-show">
                    <div className="ms-logo-mobile">
                      <img
                        src="http://localhost:8080/uploads/shine.png"
                        alt=""
                      />
                    </div>
                    <div
                      className="ms-close-btn-mobile ms-menu-mobie"
                      onClick={() => closeMenu()}
                    >
                      <RiCloseFill color="#000" />
                    </div>
                  </div>
                  <ul>
                    <li>
                      <NavLink to="/" className="ms-name-nav ms-pr">
                        <span>Home</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/products" className="ms-name-nav ms-pr">
                        <span>shop</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 col-3 col-item col-xl-2">
                <div className="ms-mobile-slide-icon">
                  <div className="ms-site-nav-icons">
                    <div className="ms-nav_icon ms-icon_search">
                      <button
                        className="ms-pr"
                        onClick={() => setModalShow(true)}
                      >
                        <BsSearch size={20} />
                      </button>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </div>
                    <div className="ms-nav_icon ms-icon_account ms-pr ms-account">
                      <span className="">
                        <BiUser size={25} />
                      </span>
                      {user ? (
                        <>
                          <div className="ms-account-control">
                            <Link to={`/account/${user?.id}`}>Account</Link>
                            <Link to={`/settings`}>Settings</Link>
                            <Link to={`/order`}>Orders</Link>
                            {user?.isAdmin === true ? (
                              <Link to={"/dashboard"}>Dashboard</Link>
                            ) : (
                              <></>
                            )}
                            <Link to={"/signout"}>Sign out</Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="ms-account-control">
                            <Link to="/signin">Sign in</Link>
                            <Link to={"/signup"}>Sign up</Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="ms-nav_icon ms-icon_heart d-none">
                      <Link to="#" className="ms-pr">
                        <AiOutlineHeart size={25} />
                        <span className="ms-po ms-count-box">0</span>
                      </Link>
                    </div>
                    <div className="ms-nav_icon ms-icon_cart">
                      <button
                        className="ms-pr"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <FiShoppingBag size={23} />
                        <span className="ms-po ms-count-box">
                          {cart?.length || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-progress-bar">
            <ProgressBar gradientColor="#eee" color="#fb417f" />
          </div>
        </div>
        <CartPopup setVisible={setVisible} visible={visible} />
      </section>
    </>
  );
};

export default Header;
