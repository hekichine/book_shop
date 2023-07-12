import React from "react";
import Product from "../../Product/Product";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SaleProduct = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    let fetch = async () => {
      let result = await axios.get(`http://localhost:8080/api/v1/products`);
      if (result?.data?.success === true) {
        setProducts(result?.data?.products);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div className="ms-trending" style={{ marginBottom: "40px" }}>
        <div className="container">
          <div className="ms-section-heading" style={{ marginBottom: "30px" }}>
            SALE
          </div>
          <div className="row gx-4 gy-4 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {products &&
              products?.length > 0 &&
              products
                ?.sort((a, b) => b?.sale - a?.sale)
                ?.slice(0, 5)
                ?.map((item, index) => (
                  <>
                    <div className="col-item">
                      <Product data={item} key={index} />
                    </div>
                  </>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleProduct;
