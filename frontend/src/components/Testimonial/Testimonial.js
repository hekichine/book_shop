import React from "react";

import "./Testimonial.css";
import bg from "./Testimonial-BG.webp";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { BiLike, BiMessage } from "react-icons/bi";

const Testimonial = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    let fetchPost = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/posts`);
      if (result.data?.success === true) {
        setPosts(result.data?.posts);
      }
    };
    fetchPost();
  }, []);
  return (
    <>
      <section className="testimonials mb-5">
        <Swiper spaceBetween={0} slidesPerView={1}>
          {posts &&
            posts?.length > 0 &&
            posts?.slice(0, 5)?.map((post) => (
              <SwiperSlide
                className="ms-testimonial w-100"
                style={{
                  backgroundImage: `url(${post?.uid?.coveravatar})`,
                }}
              >
                <div className="ms-testi-inner align-items-center justify-content-center d-flex">
                  <div className="ms-testi-image">
                    <div className="post-avt">
                      <img src={post?.uid?.avatar} alt="" />
                    </div>
                    <p className="ms-testi-content my-2 color-white">
                      {post?.content}
                    </p>
                    <p className="ms-testi-author color-white">
                      {post?.uid?.fullname}
                    </p>
                    <div className="post-reaction d-flex justify-content-center color-white">
                      <div className="react d-flex align-items-center me-4">
                        <span className="me-2">
                          <BiLike />
                        </span>
                        <span>{post?.reaction}</span>
                      </div>
                      <div className="commented color-white">
                        <span>
                          <BiMessage />
                        </span>
                        <span className="me-2">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
};

export default Testimonial;
