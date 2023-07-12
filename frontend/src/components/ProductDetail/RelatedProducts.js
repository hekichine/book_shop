import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Product from "../Product/Product";

const RelatedProducts = (props) => {
  let product = props?.product;
  let category = product?.category?.id;
  const [products, setProducts] = useState();
  useEffect(() => {
    let fetchRelated = async (category) => {
      let result = await axios.get(
        `http://localhost:8080/api/v1/products?categories=${category}`
      );
      if (result?.data?.success === true) {
        setProducts(result.data?.products);
      }
    };
    fetchRelated(category);
  }, [category]);
  return (
    <>
      {products?.length > 1 ? (
        <>
          <div className="container mb-5">
            <h3 className="text-start mb-3">Related products</h3>
            <div className="row gx-4 gy-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              {products &&
                products?.length > 0 &&
                products
                  ?.filter((pr) => pr?.id !== product?.id)
                  ?.slice(0, 5)
                  ?.map((item, index) => <Product data={item} key={index} />)}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RelatedProducts;
