import React from "react";
import { Link } from "react-router-dom";

const ShopPagedata = (props) => {
  let data = props.data;
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 card-data" key={data.id}>
        <figure className="card card-product-grid">
          <div className="img-wrap">
            <img src={data.image_url} />
          </div>
          <figcaption className="info-wrap border-top">
            <div className="price-wrap">
              <strong className="price">${data?.old}</strong>
              <del className="price-old">${data.price}</del>
            </div>
            <Link to={`/product/${data.id}`} className="title mb-2">
              {data.title}
            </Link>
            <button className="btn btn-primary">Add to cart</button>
            <Link to={""} className="btn btn-light btn-icon">
              {" "}
              <i className="fa fa-heart"></i>{" "}
            </Link>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default ShopPagedata;
