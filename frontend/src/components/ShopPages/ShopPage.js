import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Product from "../Product/Product";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

import "./ShopPage.css";
import Select from "react-select";

const ShopPage = () => {
  const [products, setProducts] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [findProduct, setFindProduct] = useState(0);
  const [err, setErr] = useState(false);
  const [filterCate, setFilterCate] = useState("");
  const [categories, setCategories] = useState();
  const [sort, setSort] = useState();
  const [active, setActive] = useState();
  const [query, setQuery] = useState(searchParams.get("categories") || "");
  const [search, setSearch] = useState();

  // const handlePageClick = (dt) => {
  //   let numpage = dt.selected + 1;
  //   setCurrentPage(numpage);
  // };
  const options = [
    { value: "newest", label: "Newest" },
    { value: "lastest", label: "Lastest" },
    { value: "highreviews", label: "High reviews" },
    { value: "highprice", label: "Hight price" },
    { value: "lowprice", label: "Low price" },
  ];
  const handleFilterCate = (cate) => {
    if (active === cate?.id) {
      setActive("");
    } else {
      setActive(cate?.id);
      setQuery(cate?.id);
    }
  };

  useEffect(() => {
    const getAll = async (query) => {
      setLoading(true);
      setErr(false);
      let result = await axios.get(
        `http://localhost:8080/api/v1/products?categories=${query}`
      );
      // console.log(result?.data.products);
      if (result.data?.success === true) {
        setProducts(result.data?.products);
        setHeading(result.data.message);
        setFindProduct(result.data?.products?.length);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setErr(true);
        }, 500);
      }
    };
    let fetchCategory = async () => {
      let result = await axios.get("http://localhost:8080/api/v1/categories");
      if (result.data?.success === true) {
        setCategories(result.data?.categories);
      }
    };
    fetchCategory();
    getAll(query);
    return () => {
      clearTimeout();
    };
  }, [query]);
  return (
    <>
      <div className="ms-shoppage pt-127">
        <div className="home-section">
          <section className="bg-light py-5">
            <div className="container">
              <h2 className="text-black">{heading}</h2>
              <ol className="breadcrumb ondark mb-0">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Shop
                </li>
              </ol>
            </div>
          </section>

          <section className="padding-y">
            <div className="container">
              <div className="row">
                <aside className="col-lg-3">
                  <div className="filter-group text-start">
                    <div className="filter-heading py-2">
                      <strong>Category</strong>
                    </div>
                    <div className="filter-wrap">
                      <div className="filter-item"></div>
                      {categories &&
                        categories?.length > 0 &&
                        categories?.map((cate, index) => (
                          <div className="filter-item" key={cate?.id}>
                            <button
                              className={
                                active === cate?.id
                                  ? "filter-btn active"
                                  : "filter-btn"
                              }
                              onClick={() => handleFilterCate(cate)}
                            >
                              {cate?.name}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </aside>
                <main className="col-lg-9">
                  <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                    <strong className="d-block py-2">
                      {findProduct} Items found
                    </strong>
                    <div className="ms-auto d-flex align-items-center justify-content-center ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Select
                        options={options}
                        value={sort}
                        onChange={(choice) => setSort(choice)}
                        className="select-sort"
                        defaultValue={options[0]}
                      />
                    </div>
                  </header>
                  <div className="row gx-4 justify-content-center align-items-center gy-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    {loading ? (
                      <>
                        <div className="ms-loader text-center">
                          {err ? (
                            <>Load data failled</>
                          ) : (
                            <RingLoader
                              color="#36d7b7"
                              size={"100px"}
                              className="mx-auto"
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      products &&
                      products?.length > 0 &&
                      products
                        ?.filter((product) => {
                          if (!search) {
                            return product;
                          } else if (
                            product?.name
                              ?.toLowerCase()
                              ?.includes(search?.toLowerCase())
                          ) {
                            return product;
                          }
                        })
                        ?.sort((a, b) => {
                          if (sort?.value === "newest") {
                            return b.createdAt.localeCompare(a.createdAt);
                          } else if (sort?.value === "lastest") {
                            return a.createdAt.localeCompare(b.createdAt);
                          } else if (sort?.value === "highreviews") {
                            return b?.reviews?.length - a?.reviews?.length;
                          } else if (sort?.value === "highprice") {
                            return b?.price - a?.price;
                          } else {
                            return a?.price - b?.price;
                          }
                        })
                        ?.map((item, index) => (
                          <>
                            <div className="col-item">
                              <Product data={item} key={index} />
                            </div>
                          </>
                        ))
                    )}
                  </div>
                  <hr />
                  <footer className="d-flex mt-4"></footer>
                </main>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
