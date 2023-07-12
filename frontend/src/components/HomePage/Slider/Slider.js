import React from "react";
import { Link } from "react-router-dom";
import "./slider.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";

const dataSlide = [
  {
    img_url: "./assets/slide_image/slide2.png",
    title: `Study, Learn More, Learn Forever`,
    heading: "Shine beauty",
    subheading: " Here to bring your life to the next level.",
    button: "shop now",
    button_link: "/products",
  },
  {
    img_url: "./assets/slide_image/slide1.png",
    title: `don't miss today's featured deals`,
    heading: "Shopping now",
    subheading: "Learn more useful knowledge",
    button: "shop now",
    button_link: "/products",
  },
];
const Slider = () => {
  return (
    <>
      <section className="ms-slide">
        <div className="ms-section-inner container-fluid gx-0 gy-0">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="row gx-0 gy-0"
          >
            {dataSlide?.map((item) => (
              <SwiperSlide className="ms-slideshow-item col-12 col-item">
                <div className="ms-slideshow-inner">
                  <div className="ms-content-image">
                    <img src={item.img_url} alt="slideimage" />
                  </div>
                  <div className="ms-content-wrap ms-po">
                    <div className="ms-content-inner container ms-po text-start">
                      <div className="ms-content-row row">
                        <div className="ms-content-item col-xl-5 col-lg-6 col-md-8 col-sm-12 text-lg-center text-sm-start text-center">
                          <p className="ms-text-title">{item.title}</p>
                          <p className="ms-text-heading">{item.heading}</p>
                          <p className="ms-text-subheading">
                            {item.subheading}
                          </p>
                          <Link
                            to={item.button_link}
                            className="ms-slideshow-btn"
                          >
                            {item.button}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slider;
