import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./category.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const Category = () => {
  const [cates, setCates] = useState();
  const [edit, setEdit] = useState(false);
  const [categoryname, setCategoryname] = useState();
  const [cateid, setCateid] = useState();
  const [image, setImage] = useState();
  const [load, setLoad] = useState(0);

  const handleEdit = (cate) => {
    setEdit(true);
    setCategoryname(cate?.name);
    setCateid(cate?.id);
  };
  const handleDelete = async (cate) => {
    let result = await axios.delete(
      `http://localhost:8080/api/v1/categories/${cate?.id}`
    );
    if (result?.data?.success === true) {
      toast.success(`${result?.data?.message}`, {
        position: "top-right",
        autoClose: 1000,
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
    toast.error(`${result?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleUpdate = async () => {
    if (!categoryname) {
      toast.error("Category name isvalid", {
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
    let category = new FormData();
    category.append("name", categoryname);
    category.append("image", image);
    let result = await axios.put(
      `http://localhost:8080/api/v1/categories/${cateid}`,
      category
    );
    if (result?.data?.success === true) {
      toast.success(`${result?.data?.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoad((pre) => pre + 1);
      setEdit(false);
      return;
    }
    toast.error(`${result?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleAddCate = async () => {
    if (!categoryname) {
      toast.error("Category name isvalid", {
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
    let category = new FormData();
    category.append("name", categoryname);
    category.append("image", image);

    let result = await axios.post(
      `http://localhost:8080/api/v1/categories`,
      category
    );
    if (result?.data?.success === true) {
      toast.success(`${result?.data?.message}`, {
        position: "top-right",
        autoClose: 1000,
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
    toast.error(`${result?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    let fetchData = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/categories`);
      // console.log(result?.data);
      if (result?.data?.success === true) {
        setCates(result?.data?.categories);
      }
    };
    fetchData();
  }, [load]);
  return (
    <>
      <div className="ms-category">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Category</p>
            </div>
            <div className="form-check my-3 text-start col-12 col-md-6 ">
              <label htmlFor="category_name">Category name</label>
              <input
                type="text"
                id="category_name"
                className="form-control my-2"
                value={categoryname}
                onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className="form-check my-3 text-start col-12 col-md-6 ">
              <label htmlFor="category_image">Category image</label>
              <input
                type="file"
                id="category_image"
                className="form-control my-2"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className=" col-12 text-start ms-3">
              {edit ? (
                <>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleUpdate()}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleAddCate()}
                  >
                    Add category
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category name</th>
                  <th scope="col">Category image</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cates &&
                  cates?.length > 0 &&
                  cates?.map((cate, index) => (
                    <tr>
                      <th scope="row" key={cate?.id}>
                        {index + 1}
                      </th>
                      <td>{cate?.name}</td>
                      <td>
                        <img src={cate?.image} width={50} height={50} alt="" />
                      </td>
                      <td>
                        <div className="ms-action" style={{ minWidth: "50px" }}>
                          <Link
                            to={"/dashboard/category"}
                            className="edit"
                            title=""
                            data-toggle="tooltip"
                            data-original-title="Edit"
                            onClick={() => handleEdit(cate)}
                          >
                            <AiOutlineEdit />
                          </Link>
                          <button
                            className="delete"
                            title=""
                            data-toggle="tooltip"
                            data-original-title="Delete"
                            onClick={() => handleDelete(cate)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
