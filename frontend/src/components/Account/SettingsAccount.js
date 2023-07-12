import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import "./account.css";
import { useNavigate } from "react-router-dom";
const SettingsAccount = () => {
  let auth = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [newpassword, setNewPassword] = useState();
  const navigation = useNavigate();
  const handleChangePass = async () => {
    if (newpassword?.length < 6) {
      toast.warning("Password is less than 6 character", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let userupdate = {
      id: user?.id,
      password: newpassword,
    };
    let result = await axios.put(
      `http://localhost:8080/api/v1/users/password/${auth?.id}`,
      userupdate
    );
    if (result?.data?.success === true) {
      toast.success("Update success", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigation(`/account/${auth?.id}`);
      return;
    }
  };
  const handleComfirm = async () => {
    let userupdate = {
      id: user.id,
      fullname: fullname,
      email: email,
      phone: phone,
    };
    let result = await axios.put(
      `http://localhost:8080/api/v1/users/${auth?.id}`,
      userupdate
    );
    if (result?.data?.success === true) {
      toast.success(`${result?.data?.message}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigation(`/account/${auth?.id}`);
      return;
    }
    toast.error(`${result?.data?.message}`, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    let fetchUser = async () => {
      let result = await axios.get(
        `http://localhost:8080/api/v1/users/${auth?.id}`
      );
      if (result?.data?.success === true) {
        setUser(result?.data?.user);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="pt-127 my-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="ms-form-info col-12 col-lg-6">
            <div className="ms-form-info_inner mb-5">
              <p>Change info</p>
              <div className="user-fullname d-flex justify-content-between">
                <label htmlFor="ufullname">Full name</label>
                <input
                  type="text"
                  id="ufullname"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="user-fullname my-2 d-flex justify-content-between">
                <label htmlFor="uemail">Email</label>
                <input
                  type="email"
                  required
                  id="uemail"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hekichien@email.com"
                />
              </div>
              <div className="user-fullname my-2 d-flex justify-content-between">
                <label htmlFor="uphone">Phone</label>
                <input
                  type="text"
                  required
                  id="uphone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0312312312"
                />
              </div>
              <button
                className="btn btn-outline-primary ms-auto"
                onClick={() => handleComfirm()}
              >
                Comfirm
              </button>
            </div>
            <div className="ms-form-info_inner">
              <p>Change password</p>

              <div className="user-fullname my-2 d-flex justify-content-between">
                <label htmlFor="unewpass">New password</label>
                <input
                  type="password"
                  required
                  id="unewpass"
                  className="form-control"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="******"
                />
              </div>
              <button
                className="btn btn-outline-primary ms-auto"
                onClick={() => handleChangePass()}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
