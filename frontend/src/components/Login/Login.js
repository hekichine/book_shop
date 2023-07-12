import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./Login.css";
import loginImage from "./1.webp";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      let user = {
        username: username,
        password: password,
      };
      let data = await axios.post(
        `http://localhost:8080/api/v1/users/signin`,
        user
      );

      if (data.data?.success === false) {
        toast.error(`${data.data?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      toast.success(`${data.data?.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      dispatch(addUser(data?.data?.user));
      setTimeout(() => {
        if (data.data.user?.isAdmin === true) {
          navigation("/dashboard");
        } else {
          navigation("/");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);
  return (
    <>
      <section className="ms-login">
        <div className="maincontainer">
          <div className="container-fluid">
            <div className="row no-gutter">
              <div
                className="col-md-6 d-none d-md-flex bg-image"
                style={{ backgroundImage: `url(${loginImage})` }}
              ></div>
              <div className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10 col-xl-7 mx-auto">
                        <h3 className="display-4">MINH SANG STORE</h3>
                        <p className="text-muted mb-4">
                          Create a account or login to use to website.
                        </p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="mb-3">
                            <input
                              id="inputUserName"
                              type="text"
                              placeholder="User name"
                              required=""
                              autoFocus=""
                              className="form-control rounded-pill border-0 shadow-sm px-4"
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              id="inputPassword"
                              type="password"
                              placeholder="Password"
                              required=""
                              className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="form-check text-end">
                            Dont's have a account?
                            <Link
                              to="/signup"
                              type="submit"
                              className=" text-uppercase ms-2 mb-2 me-2 rounded-pill shadow-sm  d-inline-block"
                            >
                              Register
                            </Link>
                          </div>
                          <div className="d-grid gap-2 mt-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase mb-2  rounded-pill shadow-sm"
                            >
                              Sign in
                            </button>

                            <Link
                              to="/"
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                            >
                              Back to home page
                            </Link>
                          </div>

                          {/* <div className="text-center d-flex justify-content-between mt-4">
                          <p>
                            Code by{" "}
                            <a href="#" className="font-italic text-muted">
                              <u>Chien luu xuan</u>
                            </a>
                          </p>
                        </div> */}
                        </form>
                      </div>
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

export default Login;
