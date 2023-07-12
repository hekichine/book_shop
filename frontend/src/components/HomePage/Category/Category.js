import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import "./category.css";

const Category = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    let fetchCategory = async () => {
      let result = await axios.get("http://localhost:8080/api/v1/categories");

      if (result.data?.success === true) {
        setCategories(result.data?.categories);
      }
    };
    fetchCategory();
  }, []);
  return (
    <>
      <section className="ms-show-category">
        <div className="ms-cate-container container">
          <div className="ms-cate-row row justify-content-center gx-0 gy-0">
            <h2>Categories</h2>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {categories &&
                categories?.length > 0 &&
                categories?.map((category) => (
                  <SwiperSlide key={category?.id} className="ms-cate-item">
                    <Link to={`products/?categories=${category?.id}`}>
                      <img src={category?.image} alt="" />
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
