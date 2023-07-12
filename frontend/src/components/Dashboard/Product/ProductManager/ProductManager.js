import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import ProductTable from "./ProductTable";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "./productManager.css";
import { AiOutlineClose } from "react-icons/ai";
import { removeProduct } from "../../../../redux/productSlice";

const ProductManager = () => {
  const pr = useSelector((state) => state?.product?.product);
  const dispatch = useDispatch();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState();
  const [load, setLoad] = useState(0);
  const [prid, setPrid] = useState();
  const [productname, setProductname] = useState();
  const [description, setDescription] = useState();
  const [richdes, setRichDes] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [sale, setSale] = useState();
  const [category, setCategory] = useState();
  const [countInStock, setCountInStock] = useState();
  const [author, setAuthor] = useState();
  const [isFeatured, setIsfeatured] = useState();
  const [edit, setEdit] = useState(false);

  const reset = () => {
    setProductname("");
    setPrice("");
    setSale("");
    setCountInStock("");
    setDescription("");
    setRichDes("");
    setAuthor("");
    setImage("");
  };
  const handleEdit = (item) => {
    setEdit(true);
    setPrid(item?.id);
    setProductname(item?.name);
    setPrice(item?.price);
    setSale(item?.sale);
    setCountInStock(item?.countInStock);
    setDescription(item?.description);
    setRichDes(item?.richDescription);
    setAuthor(item?.author);
    setCategory(item?.category?.id);
    setIsfeatured(item?.isFeatured);
  };
  const handleAdd = async () => {
    if (!image || !productname) {
      toast.error("Image not null", {
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
    let product = new FormData();
    product.append("name", productname);
    product.append("price", price);
    product.append("sale", sale);
    product.append("description", description);
    product.append("richDescription", richdes);
    product.append("image", image);
    product.append("countInStock", countInStock);
    product.append("category", category);
    product.append("author", author);
    product.append("isFeatured", isFeatured);

    let result = await axios.post(
      "http://localhost:8080/api/v1/products",
      product
    );
    if (result.data?.success === true) {
      toast.success("🦄 Wow add product successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
      setLoad((pre) => pre + 1);
      return;
    }
    toast.error(result?.data?.message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleEditProduct = async () => {
    let product = {
      name: productname,
      description: description,
      richDescription: richdes,
      price: price,
      sale: sale,
      category: category,
      author: author,
      countInStock: countInStock,
      isFeatured: isFeatured,
    };

    let result = await axios.put(
      `http://localhost:8080/api/v1/products/${prid}`,
      product
    );
    if (result.data?.success === true) {
      toast.success("Update product successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
      setLoad((pre) => pre + 1);
      setEdit(false);
      return;
    }
    toast.error(result?.data?.message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const closePopup = () => {
    dispatch(removeProduct());
  };
  const updateImage = async (e) => {
    let pro = new FormData();
    pro.append("image", e.target.files[0]);
    if (!pr?.id) {
      console.log("invalid id");
    }
    let result = await axios.put(
      `http://localhost:8080/api/v1/products/image/${pr?.id}`,
      pro
    );
    if (result?.data?.success === true) {
      dispatch(removeProduct());
      toast.success("Update image successfully!", {
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
    toast.error("Update image false!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const updateGallery = async (e) => {
    let po = new FormData();
    let files = e.target.files;

    for (const file of files) {
      po.append("images", file);
    }

    if (!pr?.id) {
      console.log("invalid id");
    }
    let result = await axios.put(
      `http://localhost:8080/api/v1/products/gallery/${pr?.id}`,
      po
    );
    console.log(result);
    if (result?.data?.success === true) {
      dispatch(removeProduct());
      toast.success(result?.data?.message, {
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
    toast.error(result?.data?.message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    setLoading(true);
    let callDataCategory = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/categories`);
      if (result) {
        setCategories(result.data?.categories);
      }
    };

    let callDataProduct = async () => {
      let data = await axios.get(`http://localhost:8080/api/v1/products`);
      if (data && data.data.success === true) {
        setProducts(data.data?.products);
        setPage(data.data.pageCount);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    callDataProduct();
    callDataCategory();
    return () => {
      clearTimeout();
    };
  }, [load]);
  return (
    <>
      <div className="ms-product-manager ms-pr">
        <div className="container">
          <div className="">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Add product
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="mb-3 col-12 col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={productname}
                            onChange={(e) => setProductname(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Product name</label>
                        </div>
                      </div>
                      <div className="mb-3 col-12 col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Price</label>
                        </div>
                      </div>
                      <div className="mb-3 col-12 col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={sale}
                            onChange={(e) => setSale(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Sale</label>
                        </div>
                      </div>
                      <div className="mb-3 col-12 col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Count in stock</label>
                        </div>
                      </div>
                      <div className="mb-3 col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: "150px" }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                          <label htmlFor="floatingTextarea2">Description</label>
                        </div>
                      </div>
                      <div className="mb-3 col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea22"
                            style={{ height: "150px" }}
                            value={richdes}
                            onChange={(e) => setRichDes(e.target.value)}
                          ></textarea>
                          <label htmlFor="floatingTextarea22">
                            Rich description
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 col-12 col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                          />
                          <label htmlFor="floatingInput">Author</label>
                        </div>
                      </div>
                      <div className="mb-3 col-12 col-md-6">
                        <select
                          className=" form-select"
                          aria-label="Category"
                          id="formSelectCategory"
                          onChange={(e) => setCategory(e.target.value)}
                          style={{ height: "100%" }}
                        >
                          {categories &&
                            categories?.map((item, index) => (
                              <option
                                value={`${item.id}`}
                                selected={index == 1 ? "true" : "false"}
                              >
                                {item?.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      {edit ? (
                        <></>
                      ) : (
                        <>
                          <div className="mb-3 col-12 col-md-6 text-start">
                            <label
                              htmlFor="formFileMultiple"
                              className="form-label"
                            >
                              Choose image
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              id="formFileMultiple"
                              onChange={(e) => setImage(e.target.files[0])}
                              accept={"image/jpg image/jpeg image/png"}
                            />
                          </div>
                        </>
                      )}
                      <div className="mb-3 col-12 col-md-6 text-start ">
                        <div className="inner d-flex h-100 flex-column">
                          <label className="form-label">Featured</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setIsfeatured(e.target.value)}
                          >
                            <option value="1" selected>
                              Enable
                            </option>
                            <option value="0">Disable</option>
                          </select>
                        </div>
                      </div>

                      {edit ? (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditProduct()}
                          >
                            Edit product
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleAdd()}
                          >
                            Add product
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="card mb-4">
              <div className="card-header text-start d-flex justify-content-between">
                <div className="ms-table-title">
                  <i className="fas fa-table me-1"></i>
                  Product Manager
                </div>
                <div className="ms-table-search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-body">
                {loading ? (
                  <BeatLoader color="#36d7b7" />
                ) : (
                  <ProductTable
                    products={products}
                    search={search}
                    setLoad={setLoad}
                    handleEdit={handleEdit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            pr !== null
              ? "ms-admin-product-popup active"
              : "ms-admin-product-popup "
          }
        >
          <div className="container p-2">
            <div className="row">
              <div className="col-12 text-end">
                <button onClick={() => closePopup()}>
                  <AiOutlineClose />
                </button>
              </div>
              <h3 className="text-center mb-3">Product image</h3>
              <div className="pr_main-ima col-6 d-flex flex-column">
                <div class="mb-3 text-start">
                  <label for="formFile" class="form-label">
                    Main product image
                  </label>
                  <input
                    class="form-control mb-3"
                    type="file"
                    id="formFile"
                    accept={"image/jpg image/jpeg image/png"}
                    onChange={(e) => updateImage(e)}
                  />
                </div>
                <img src={pr?.image} alt="" width={80} height={100} />
              </div>
              <div className="pr_main_gallery col-6">
                <div class="mb-3 text-start">
                  <label for="formFile" class="form-label">
                    Gallery product
                  </label>
                  <input
                    class="form-control mb-3"
                    type="file"
                    id="formFile"
                    multiple
                    accept={"image/jpg image/jpeg image/png"}
                    onChange={(e) => updateGallery(e)}
                  />
                </div>
                {pr?.images?.map((img) => (
                  <>
                    <img
                      src={img}
                      alt=""
                      width={80}
                      height={100}
                      className="me-2"
                    />
                  </>
                ))}
                {pr?.images?.length === 0 ? <>No gallery</> : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManager;
