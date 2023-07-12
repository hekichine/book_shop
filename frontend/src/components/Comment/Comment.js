import React from "react";
import { Link } from "react-router-dom";

import "./comment.css";
import "../TimeHandle/TimeHandle";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CommentItem from "./CommentItem";

const Comment = (props) => {
  const [comments, setComment] = useState();
  const [content, setContent] = useState();
  const [reload, setReload] = useState(0);
  let user = JSON.parse(localStorage.getItem("user"));

  let id = props?.id;
  let b = Date.now();

  const handleComment = async () => {
    if (!content) {
      toast.error("Comment invalid!", {
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
    let comment = {
      user_id: user.id,
      product_id: id,
      content: content,
      timestamp: Date.now(),
    };
    // return;
    let result = await axios.post(
      `http://localhost:8080/api/product/comment/add`,
      comment
    );
    if (result && result.data.error === 0) {
      toast.success("Comment succes", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setContent("");
      setReload((pre) => pre + 1);
      return;
    } else {
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
    }
  };
  useEffect(() => {
    let fetchComment = async () => {
      let result = await axios.get(
        `http://localhost:8080/api/product/comment/${id}`
      );
      if (result) {
        setTimeout(() => {
          setComment(result?.data?.comment);
        }, 500);
      }
    };
    fetchComment();

    return () => {
      clearTimeout();
    };
  }, [reload]);
  return (
    <>
      <div className="container my-5 border-1 ms-comment">
        <div className="row text-start gx-5 gy-3">
          <div className="col-12 comment-heading text-start">
            <p>comment</p>
            <span>{comments?.length | 0} comments</span>
          </div>
        </div>
        <div className="ms-comment-wrap row gx-3 gy-3 text-start">
          <CommentItem comments={comments} setReload={setReload} />
        </div>
        {user ? (
          <>
            <div className="row">
              <div className="col-12 ms-richtext">
                <div className="ms-richtext-inner text-end my-3">
                  <textarea
                    name="richtext"
                    id="comment"
                    className="ms-comment-richtext form-control"
                    placeholder="Type your comment........"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <button
                    className="ms-btn-comment btn btn-primary"
                    onClick={() => handleComment()}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Comment;
