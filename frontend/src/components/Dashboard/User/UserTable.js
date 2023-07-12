import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import "./userTable.css";

const UserTable = (props) => {
  let users = props?.users;
  let search = props?.search;
  let setLoad = props?.setLoad;

  const handleDelete = async (item) => {
    let data = await axios.delete(
      `${process.env.REACT_APP_URL}/users/${item.id}`
    );

    if (data.data?.success === true) {
      toast.success(`${data.data?.message}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoad((pre) => pre + 1);
      return;
    }
    toast.error(`${data.data?.message}`, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  };

  return (
    <>
      <table className="user-table table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>User avatar</th>
            <th>Full Name</th>
            <th>User name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users
              .filter((user) => {
                if (search === "") {
                  return user;
                } else if (
                  user.fullname
                    ?.toLowerCase()
                    .includes(search?.toLowerCase()) ||
                  user.username
                    ?.toLowerCase()
                    .includes(search?.toLowerCase()) ||
                  user.email?.toLowerCase().includes(search?.toLowerCase()) ||
                  user.phone?.toLowerCase().includes(search?.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((item, index) => (
                <>
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      <img
                        src={item?.avatar}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100%",
                        }}
                      />
                    </td>
                    <td>{item.fullname || "Chưa cập nhật"} </td>
                    <td>{item.username}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.isAdmin === true ? "Admin" : "Member"}</td>
                    <td>
                      {item.isAdmin === true ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="delete"
                            onClick={() => handleDelete(item)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
