import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Social from "../Header/Social";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";

const Dashboard = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const navigation = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));

  const handleNav = () => {
    setToggleNav(!toggleNav);
  };
  useEffect(() => {
    if (!user || user?.isAdmin !== true) {
      toast('🦄 You aren"t admin!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigation("/");
    }
  }, []);

  return (
    <>
      <section
        className={
          toggleNav
            ? "ms-dashboard sb-nav-fixed sb-sidenav-toggled"
            : "ms-dashboard sb-nav-fixed"
        }
      >
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* <!-- Navbar Brand--> */}
          <Link className="navbar-brand ps-3" to="">
            <img
              src="http://localhost:8080/uploads/shine_white.png"
              alt=""
              width={80}
              height={40}
            />
          </Link>
          {/* <!-- Sidebar Toggle--> */}
          <button
            onClick={handleNav}
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
          >
            {toggleNav ? (
              <>
                <AiOutlineMenuUnfold size={30} />
              </>
            ) : (
              <>
                <AiOutlineMenuFold size={30} />
              </>
            )}
          </button>

          {/* <!-- Navbar--> */}
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">
                    <div className="ms-menu-avt">
                      <img src={user?.avatar} alt="" />
                    </div>
                    <div className="ms-user-info">
                      <p>{user?.fullname}</p>
                      <span>Admin</span>
                    </div>
                  </div>
                  <Link className="nav-link" to="/dashboard">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    Dashboard
                  </Link>
                  <div className="sb-sidenav-menu-heading">Manager</div>
                  <Link
                    className="nav-link collapsed"
                    to=""
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    General
                    <div className="sb-sidenav-collapse-arrow">
                      <RiArrowDownSLine size={20} color={"#fff"} />
                    </div>
                  </Link>
                  <div
                    className="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" to="/dashboard/product">
                        Products
                      </Link>
                      <Link className="nav-link" to="/dashboard/order">
                        Orders
                      </Link>

                      <Link className="nav-link" to="/dashboard/category">
                        Categories
                      </Link>
                    </nav>
                  </div>
                  <Link
                    className="nav-link collapsed"
                    to=""
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-book-open"></i>
                    </div>
                    User
                    <div className="sb-sidenav-collapse-arrow">
                      <RiArrowDownSLine size={20} color={"#fff"} />
                    </div>
                  </Link>
                  <div
                    className="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav
                      className="sb-sidenav-menu-nested nav accordion"
                      id="sidenavAccordionPages"
                    >
                      <Link
                        className="nav-link collapsed"
                        to="/dashboard/account"
                      >
                        Account
                      </Link>
                    </nav>
                  </div>
                  <Link className="nav-link collapsed" to="/">
                    Home
                  </Link>
                  <Link className="nav-link collapsed" to="/signout">
                    Logout
                  </Link>
                </div>
              </div>
              <div className="ms-social ">
                <Social color={"#fff"} />
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Power by: HekiChien</div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
