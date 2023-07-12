import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import UserTable from "./UserTable";
import axios from "axios";

import "./accountuser.css";

const AccountManager = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState();

  useEffect(() => {
    setLoading(true);
    let callDataUser = async () => {
      let data = await axios.get(`http://localhost:8080/api/v1/users`);
      if (data && data.data.success === true) {
        setUsers(data.data?.users);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    callDataUser();
    return () => {
      clearTimeout();
    };
  }, [load]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="card mb-4">
            <div className="card-header text-start d-flex justify-content-between">
              <div className="ms-table-title">
                <i className="fas fa-table me-1"></i>
                User Manager
              </div>
              <div className="ms-table-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search user"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <BeatLoader color="#36d7b7" />
              ) : (
                <UserTable users={users} search={search} setLoad={setLoad} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountManager;
