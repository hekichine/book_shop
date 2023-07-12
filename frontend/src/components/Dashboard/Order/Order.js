import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import formatDate from "../../ProductDetail/formatDate";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import "./Order.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState();
  const [filter, setFilter] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();
  const [idorder, setIdorder] = useState();
  const [load, setLoad] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setStatus(item?.status);
    setIdorder(item?.id);
  };
  const handleChange = async () => {
    if (!status) {
      toast.error("Status isvalid", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (idorder) {
      let order = {
        status: status,
      };
      let result = await axios.put(
        `http://localhost:8080/api/v1/orders/${idorder}`,
        order
      );
      if (result?.data?.success === true) {
        toast.success(`${result?.data?.message}`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setShow(false);
        setLoad(!load);
        return;
      }
      toast.error(`${result?.data?.message}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleDelte = async (item) => {
    if (item?.status?.toLowerCase() !== "failed") {
      toast.error("The order can't delete because isn't failed", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    let result = await axios.delete(
      `http://localhost:8080/api/v1/orders/${item?.id}`
    );
    if (result.data?.success === true) {
      toast.success(`${result?.data?.message}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShow(false);
      setLoad(!load);
      return;
    }
    toast.error(`${result?.data?.message}`, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    let fetchOrder = async () => {
      let orders = await axios.get(`http://localhost:8080/api/v1/orders`);
      if (orders?.data?.success === true) {
        setOrders(orders?.data?.orderList);
      }
    };
    fetchOrder();
  }, [load]);
  return (
    <>
      <h3 className="text-center m-5">Orders</h3>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-12 col-md-6 col-lg-4 mb-5 ">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="ms-order-table">
        <table className="table">
          <thead>
            <th scope="col"></th>
            <th scope="col">CODE</th>
            <th scope="col">Full name</th>
            <th scope="col">Items</th>
            <th scope="col">Total price</th>
            <th scope="col">Address</th>
            <th scope="col">Payment</th>
            <th scope="col">Phone</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <th></th>
          </thead>
          <tbody>
            {orders &&
              orders?.length > 0 &&
              orders
                ?.filter((item) => {
                  if (!filter) {
                    return item;
                  } else if (
                    item?.user?.fullname
                      ?.toLowerCase()
                      ?.includes(filter?.toLowerCase()) ||
                    item?.shippingAddress
                      ?.toLowerCase()
                      ?.includes(filter?.toLowerCase()) ||
                    item?.phone
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes(filter.toLowerCase()) ||
                    item?.payment
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes(filter.toLowerCase()) ||
                    item?.status
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes(filter.toLowerCase())
                  ) {
                    return item;
                  }
                })
                ?.map((order, index) => (
                  <tr
                    key={order?.id}
                    style={{ verticalAlign: "middle" }}
                    className={
                      order?.status === "Done"
                        ? "table-success"
                        : order?.status === "Pending"
                        ? "table-warning"
                        : order?.status === "Shipping"
                        ? "table-info"
                        : "table-danger"
                    }
                  >
                    <th scope="row">{index + 1}</th>
                    <td> {order?.id} </td>
                    <td>
                      <div style={{ minWidth: "200px" }}>
                        {order?.user?.fullname}
                      </div>
                    </td>
                    <td>
                      <ul style={{ minWidth: "350px" }}>
                        {order?.orderItems?.map((item, idx) => (
                          <li>
                            <div className="d-flex justify-content-between text-start">
                              {item?.product?.name}
                              <span>
                                <CurrencyFormat
                                  value={item?.quantity}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"x"}
                                />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <CurrencyFormat
                        value={order?.totalPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      />
                    </td>
                    <td>{order?.shippingAddress}</td>
                    <td>{order?.payment}</td>
                    <td>{order?.phone}</td>
                    <td>{order?.status}</td>
                    <td>{formatDate(order?.updatedAt)}</td>
                    <td>
                      <button
                        className="me-2"
                        variant="primary"
                        onClick={() => handleShow(order)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button onClick={() => handleDelte(order)}>
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
                onChange={(e) => setStatus(e.target.value)}
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  value={"Pending"}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">
                  Pending
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                  value={"Shipping"}
                />
                <label className="btn btn-outline-warning" htmlFor="btnradio2">
                  Shipping
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio23"
                  autocomplete="off"
                  value={"Done"}
                />
                <label className="btn btn-outline-success" htmlFor="btnradio23">
                  Done
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio24"
                  autocomplete="off"
                  value={"Failed"}
                />
                <label className="btn btn-outline-danger" htmlFor="btnradio24">
                  Failed
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleChange()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Order;
