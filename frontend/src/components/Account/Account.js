import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useParams } from "react-router-dom";
import { BiLike, BiMessage } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import formatDate from "../ProductDetail/formatDate";

import "./account.css";
import { toast } from "react-toastify";

const Account = () => {
  let { id } = useParams();
  let auth = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState();
  const [reload, setReload] = useState(1);
  const [content, setContent] = useState();
  const [posts, setPosts] = useState();

  const handleAvt = async (e) => {
    let user_image = e.target.files[0];
    let form = new FormData();
    form.append("avatar", user_image);
    if (user_image) {
      let result = await axios.put(
        `http://localhost:8080/api/v1/users/avatar/${id}`,
        form
      );

      if (result?.data?.success === true) {
        setReload((pre) => pre + 1);
      }
    }
  };
  const handleCover = async (e) => {
    let cover_image = e.target.files[0];
    let form = new FormData();
    form.append("coveravatar", cover_image);
    if (cover_image) {
      let result = await axios.put(
        `http://localhost:8080/api/v1/users/coveravatar/${id}`,
        form
      );
      if (result?.data?.success === true) {
        setReload((pre) => pre + 1);
      }
    }
  };
  const Post = async () => {
    if (!content) {
      toast.error("Content not null", {
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
    }
    let post = {
      uid: auth?.id,
      content: content,
    };
    let result = await axios.post("http://localhost:8080/api/v1/posts", post);
    if (result.data.success === true) {
      setReload((pre) => pre + 1);
      toast.success("Post success !", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setContent("");
      return;
    }
  };
  const reactLike = async (post) => {
    let reaction = {
      reaction: post?.reaction + 1,
    };
    let result = await axios.put(
      `http://localhost:8080/api/v1/posts/react/${post?.id}`,
      reaction
    );
    console.log(reaction);
    if (result.data.success === true) {
      setReload((pre) => pre + 1);
    }
  };
  useEffect(() => {
    let fetchUser = async (id) => {
      let result = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
      if (result?.data?.success === true) {
        setUser(result?.data?.user);
      }
    };
    let fetchPost = async (id) => {
      let result = await axios.get(`http://localhost:8080/api/v1/posts/${id}`);
      if (result?.data?.success === true) {
        setPosts(result?.data?.posts);
      }
    };

    fetchUser(id);
    fetchPost(id);
  }, [id, reload]);

  return (
    <>
      <div className="container ms-account pt-127 ">
        <div className="row">
          <div className="ms-user_flag-image col-12 ">
            <div className="ms-pr">
              <div className="img-inner overflow-hidden ratio ratio-16x9">
                <img src={user?.coveravatar} alt="" />
                {user?.id === auth?.id ? (
                  <>
                    <div className="ms-photo-cover ms-pa">
                      <label
                        htmlFor="user_cover_image"
                        className="ms-btn-cover"
                      >
                        <MdAddAPhoto size={30} />
                      </label>
                      <input
                        type="file"
                        id="user_cover_image"
                        className="d-none"
                        onChange={(e) => handleCover(e)}
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="user-avt ms-pa overflow-hidden">
                <div className="user-img overflow-hidden ratio ratio-1x1">
                  <img src={user?.avatar} alt="" />
                </div>
                {user?.id === auth?.id ? (
                  <>
                    {" "}
                    <div className="ms-photo ms-pa">
                      <label htmlFor="user_avt" className="ms-btn-avt">
                        <MdAddAPhoto size={30} />
                      </label>
                      <input
                        type="file"
                        id="user_avt"
                        className="d-none"
                        onChange={(e) => handleAvt(e)}
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="user-info">
              <div className="user-name">{user?.fullname}</div>
            </div>
          </div>
        </div>
      </div>
      {user?.id === auth?.id ? (
        <>
          <div className="container mb-2 status mb-5">
            <div className="row">
              <div className="status-wrap col-12">
                <div className="status-inne d-flex">
                  <div className="status-avt">
                    <img src={user?.avatar} alt="" />
                  </div>
                  <div className="status-content w-100">
                    <textarea
                      type="text"
                      className="form-control"
                      value={content}
                      placeholder="What you're thinking..."
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="status-post text-end">
                  <button className="btn btn-primary" onClick={() => Post()}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="container post-user gx-0">
        <div className="row gx-0 gy-4">
          {posts &&
            posts?.length > 0 &&
            posts?.map((post, index) => (
              <div className="col-12 post-user-item">
                <div className="post-user-wrap">
                  <div className="post-user-info d-flex">
                    <div className="post-img me-3">
                      <img src={post?.uid?.avatar} alt="" />
                    </div>
                    <div className="post-uername text-start">
                      <div>
                        <strong>{post?.uid?.fullname} </strong> updated the post
                      </div>
                      <span>{formatDate(post?.createdAt)}</span>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>{post?.content}</p>
                  </div>
                  <div className="post-reaction">
                    <div
                      className="react d-flex align-items-center"
                      onClick={() => reactLike(post)}
                    >
                      <span className="me-2">
                        <BiLike />
                      </span>
                      <span>{post?.reaction}</span>
                    </div>
                    <div className="commented">
                      <span className="me-2">0</span>
                      <span>
                        <BiMessage />
                      </span>
                    </div>
                  </div>
                  <div className="post-send-comment">
                    <div className="post-user-auth-avt">
                      <img src={auth?.avatar} alt="" />
                    </div>
                    <input type="text" className="form-control auth-cmt" />
                    <button className="btn">
                      <AiOutlineSend />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Account;
