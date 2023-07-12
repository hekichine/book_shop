import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import handleTime from "../TimeHandle/TimeHandle";
import { AiOutlineDelete } from "react-icons/ai";

import "./comment.css";

const CommentItem = (props) => {
  let comments = props?.comments;
  let setReload = props?.setReload;
  let user = JSON.parse(localStorage.getItem("user"));
  let b = Date.now();

  const handleDelete = async (cmt) => {
    let result = await axios.delete(
      `http://localhost:8080/api/product/comment/delete/${cmt?.id}`
    );
    if (result?.data?.error === 0) {
      toast.success(result?.data?.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setReload((pre) => pre + 1);
      return;
    }
    toast.error(result.data.message, {
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
  };
  return (
    <>
      {comments &&
        comments.length > 0 &&
        comments?.map((cmt) => (
          <div className="col-12 comment-item" key={cmt?.id}>
            <div className="comment-inner text-start">
              <div className="comment-auth d-flex gx-3">
                <div className="comment-avt me-lg-4 me-3 ">
                  <img
                    src={`http://localhost:8080/${cmt?.user_image}`}
                    alt=""
                  />
                </div>
                <div className="comment-content">
                  <p className="ms-auth d-flex justify-content-between align-items-center">
                    <Link
                      to={`/account/${cmt?.user_id}`}
                      className="ms-auth-name"
                    >
                      {cmt?.fullname}
                    </Link>
                    <div className="comment-action">
                      <span>
                        <span>
                          {
                            handleTime(
                              new Date(b - cmt?.timestamp).getDate(),
                              new Date(b - cmt?.timestamp).getHours(),
                              new Date(b - cmt?.timestamp).getMinutes(),
                              new Date(b - cmt?.timestamp).getSeconds()
                            )?.result
                          }
                        </span>
                        <span className="mx-1">
                          {
                            handleTime(
                              new Date(b - cmt?.timestamp).getDate(),
                              new Date(b - cmt?.timestamp).getHours(),
                              new Date(b - cmt?.timestamp).getMinutes(),
                              new Date(b - cmt?.timestamp).getSeconds()
                            )?.define
                          }
                        </span>
                      </span>
                      {user?.role === 1 || cmt.user_id === user.id ? (
                        <>
                          <button
                            className="ms-btn-delete btn btn-danger d-inline-flex"
                            onClick={() => handleDelete(cmt)}
                          >
                            <AiOutlineDelete size={15} />
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </p>
                  <p className="ms-content">{cmt?.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CommentItem;
