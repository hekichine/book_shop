import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import formatDate from "../ProductDetail/formatDate";

const Order = () => {
  const [orders, setOrders] = useState();
  let auth = JSON.parse(localStorage.getItem("user"));
  const navigation = useNavigate();
  const [filter, setFilter] = useState();

  useEffect(() => {
    if (!auth) {
      navigation("/signin");
      return;
    }
    let fetchOrder = async () => {
      let result = await axios.get(
        `http://localhost:8080/api/v1/orders?user=${auth?.id}`
      );
      console.log(1);
      console.log(result.data);
      if (result.data?.success === true) {
        setOrders(result.data?.orderList);
      }
    };
    fetchOrder();
  }, []);
  return (
    <>
      <h3 className="text-center m-5 pt-127">Orders</h3>
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
      <div className="container">
        <div className="row">
          <div className="ms-order-table">
            <table className="table table-striped">
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

export default Order;
