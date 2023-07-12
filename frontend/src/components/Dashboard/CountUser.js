import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import {
  AiOutlineReconciliation,
  AiOutlineRedEnvelope,
  AiOutlineProfile,
} from "react-icons/ai";
import { GoPencil } from "react-icons/go";

import "./countUser.css";
const CountUser = () => {
  const [dataCount, setDataCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categories, setCategories] = useState(0);
  const [comments, setComment] = useState(0);
  useEffect(() => {
    let fetchUser = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/users`);
      if (result.data?.success === true) {
        setDataCount(result.data?.users?.length);
      }
    };

    let fetchProduct = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/products`);
      if (result.data?.success === true) {
        let totalPr = 0;
        await result.data?.products?.map((pr) => (totalPr += pr?.countInStock));
        setProductCount(totalPr);
      }
    };
    let fetchComment = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/reviews`);
      if (result.data?.success === true) {
        setComment(result.data?.reviews?.length);
      }
    };
    let fetchCategory = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/categories`);
      if (result?.data?.success === true) {
        setCategories(result?.data?.categories?.length);
      }
    };
    let fetchOrders = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/orders`);
      if (result?.data?.success === true) {
        setOrderCount(result?.data?.orderList?.length);
      }
    };
    fetchCategory();
    fetchProduct();
    fetchUser();
    fetchComment();
    fetchOrders();
  }, []);
  return (
    <>
      <div className="total-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="total-inner d-flex justify-content-center align-items-center ">
          <div className="total-user pe-3">
            <FiUsers />
          </div>
          <div className="total-user-count">
            <p>{dataCount}</p>
            <p>User</p>
          </div>
        </div>
      </div>
      <div className="total-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="total-inner d-flex justify-content-center align-items-center ">
          <div className="total-user pe-3">
            <AiOutlineReconciliation />
          </div>
          <div className="total-user-count">
            <p>{orderCount}</p>
            <p>Order</p>
          </div>
        </div>
      </div>
      <div className="total-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="total-inner d-flex justify-content-center align-items-center ">
          <div className="total-user pe-3">
            <AiOutlineRedEnvelope />
          </div>
          <div className="total-user-count">
            <p>{productCount}</p>
            <p>Products</p>
          </div>
        </div>
      </div>
      <div className="total-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="total-inner d-flex justify-content-center align-items-center ">
          <div className="total-user pe-3">
            <AiOutlineProfile />
          </div>
          <div className="total-user-count">
            <p>{categories}</p>
            <p>Categories</p>
          </div>
        </div>
      </div>
      <div className="total-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="total-inner d-flex justify-content-center align-items-center ">
          <div className="total-user pe-3">
            <GoPencil />
          </div>
          <div className="total-user-count">
            <p>{comments}</p>
            <p>Comments</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountUser;
