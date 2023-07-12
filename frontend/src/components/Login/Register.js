import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import loginImage from "./1.webp";
const Login = () => {
  const [username, setUsername] = useState("");
  const [errname, setErrname] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errpass, setErrpass] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length <= 5) {
      setErrname("Account must be 6 character");
      return;
    }
    if (password.length <= 5) {
      setErrpass("Password must be 6 character");
      return;
    }
    if (username && email && password) {
      let user = {
        username: username,
        email: email,
        password: password,
      };
      let data = await axios.post(`http://localhost:8080/api/v1/users`, user);
      if (data.data.success === true) {
        toast(`🦄 Wow so easy! ${data.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigation("/signin");
        }, 2000);
      } else {
        toast.error(`${data.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  useEffect(() => {
    return clearTimeout();
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
                              onChange={(e) => {
                                setUsername(e.target.value);
                                setErrname("");
                              }}
                            />
                            <p
                              className="text-start my-2 mx-2"
                              style={{ color: "red" }}
                            >
                              {errname}
                            </p>
                          </div>
                          <div className="mb-3">
                            <input
                              id="inputEmail"
                              type="email"
                              placeholder="Email address"
                              required=""
                              autoFocus=""
                              className="form-control rounded-pill border-0 shadow-sm px-4"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="mb-3">
                            <input
                              id="inputPassword"
                              type="password"
                              placeholder="Password"
                              required=""
                              className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setErrpass("");
                              }}
                            />
                            <p
                              className="text-start my-2 mx-2"
                              style={{ color: "red" }}
                            >
                              {errpass}
                            </p>
                          </div>

                          <div className="d-grid gap-2 mt-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase mb-2  rounded-pill shadow-sm"
                            >
                              Sign up
                            </button>

                            <Link
                              to="/signin"
                              type="submit"
                              className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                            >
                              Back to Sign in
                            </Link>
                          </div>
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
