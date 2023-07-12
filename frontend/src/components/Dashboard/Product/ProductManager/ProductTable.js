import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

import "../../User/userTable.css";
import CurrencyFormat from "react-currency-format";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RiImageEditLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/productSlice";

const ProductTable = (props) => {
  const dispatch = useDispatch();
  let products = props?.products;
  let search = props.search;
  let setLoad = props?.setLoad;
  let handleEdit = props?.handleEdit;

  const handlePopup = (item) => {
    dispatch(addProduct(item));
  };
  const handleDelete = async (item) => {
    let data = await axios.delete(
      `http://localhost:8080/api/v1/products/${item.id}`
    );

    if (data.data?.success === true) {
      toast.success(`${data.data?.message}`, {
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
    toast.error(`${data.data?.message}`, {
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
  };
  return (
    <>
      <table className="product-table table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Product name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Product image</th>
            <th>InStock</th>
            <th>Sale</th>
            <th>Author</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products?.length > 0 &&
            products
              .filter((product) => {
                if (search === "") {
                  return product;
                } else if (
                  product?.name
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase()) ||
                  product?.author
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase()) ||
                  product?.price
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((item, index) => (
                <>
                  <tr
                    key={item?.id}
                    className={item?.countInStock === 0 ? "outStock" : ""}
                  >
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>
                      <CurrencyFormat
                        value={item?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                        decimalScale={2}
                        className={"me-1"}
                      />
                    </td>
                    <td
                      className="product-description"
                      style={{ maxWidth: "550px" }}
                    >
                      <div className="ms-des">{item?.description}</div>
                    </td>
                    <td>{item?.category?.name}</td>
                    <td>
                      <img
                        src={item?.image}
                        style={{
                          width: "60px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>
                      <CurrencyFormat
                        value={item?.countInStock}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                        className={"me-1"}
                      />
                    </td>
                    <td>{item?.sale} %</td>
                    <td>{item?.author}</td>
                    <td>
                      {item?.isFeatured === 1 ? <>Enable</> : <>Disable</>}
                    </td>
                    <td>
                      <div className="ms-action" style={{ minWidth: "50px" }}>
                        <button
                          className="edit"
                          onClick={() => handleEdit(item)}
                        >
                          <AiOutlineEdit />
                        </button>
                        <button
                          className="edit"
                          onClick={() => handlePopup(item)}
                        >
                          <RiImageEditLine />
                        </button>

                        <button
                          className="delete"
                          title=""
                          data-toggle="tooltip"
                          data-original-title="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
        </tbody>
      </table>
      {products?.length === 0 ? (
        <>
          <div className="d-flex justify-content-center color-red">
            Data Null or Error
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductTable;
