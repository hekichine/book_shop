import React from "react";

import Chart from "./statistical/Chart";
import CountUser from "./CountUser";
import "./Dashboard.css";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import formatDate from "../ProductDetail/formatDate";
import { useRef } from "react";
import MonthYearPicker from "react-month-year-picker";

const dataChart = [
  {
    id: 1,
    month: "January",
    total: 20,
  },
  {
    id: 2,
    month: "February",
    total: 41,
  },
  {
    id: 3,
    month: "Match",
    total: 2,
  },
  {
    id: 4,
    month: "April",
    total: 10,
  },
  {
    id: 5,
    month: "May",
    total: 68,
  },
  {
    id: 6,
    month: "June",
    total: 68,
  },
  {
    id: 7,
    month: "July",
    total: 68,
  },
  {
    id: 8,
    month: "August",
    total: 968,
  },
  {
    id: 9,
    month: "September",
    total: 368,
  },
  {
    id: 10,
    month: "October",
    total: 268,
  },
  {
    id: 11,
    month: "November",
    total: 168,
  },
  {
    id: 12,
    month: "December",
    total: 681,
  },
];

const Admin = () => {
  const [orders, setOrders] = useState();
  const tableRef = useRef(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [filter, setFilter] = useState("All order");
  useEffect(() => {
    let fetchOrder = async () => {
      let result = await axios.get(
        `http://localhost:8080/api/v1/orders?status=Done`
      );

      if (result?.data?.success === true) {
        setOrders(result.data?.orderList);
      }
    };
    fetchOrder();
  }, []);
  const totalPrice = () => {
    let total = 0;
    orders?.map((item) => (total += item?.totalPrice));
    return total;
  };
  const selectCelendar = async () => {
    let result = await axios.get(
      `http://localhost:8080/api/v1/orders/statisBy?month=${month}&year=${year}`
    );
    console.log(result.data.statis);
    if (result?.data?.success === true) {
      setOrders(result.data?.statis?.filter((item) => item?.status === "Done"));
      setFilter(`by ${month}, ${year}`);
    }
  };
  return (
    <>
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row ms-status-bar my-5">
            <CountUser />
          </div>
          <div className="row">
            <h3>Statis {filter}</h3>
            <div className="col-12 text-end">
              <div className=" d-flex justify-content-start filter-month position-relative">
                <button className="btn btn-primary mb-2 me-auto ">
                  Current celendar: {month}, {year}
                </button>

                <div className="mb-2 me-2 position-absolute bg-white ms-celendar">
                  <MonthYearPicker
                    selectedMonth={month}
                    selectedYear={year}
                    minYear={2000}
                    maxYear={2030}
                    onChangeYear={(year) => setYear(year)}
                    onChangeMonth={(month) => setMonth(month)}
                  />
                  <button
                    className="btn btn-success my-4 mx-3"
                    onClick={() => selectCelendar()}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
            <div className="order-filter-table">
              <table className="table" ref={tableRef}>
                <thead>
                  <tr className="table-primary">
                    <th scope="col"> </th>
                    <th scope="col">Order code</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders?.length > 0 &&
                    orders?.map((order, index) => (
                      <tr key={order?.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{order?.id}</td>
                        <td>
                          <Link to={`/account/${order?.user?.id}`}>
                            {order?.user?.fullname}
                          </Link>
                        </td>
                        <td>{formatDate(order?.updatedAt)}</td>
                        <td>
                          <CurrencyFormat
                            value={order?.totalPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            decimalScale={2}
                          />
                        </td>
                      </tr>
                    ))}
                  <tr className="table-success">
                    <th scope="row">Total</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <CurrencyFormat
                        value={totalPrice()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <DownloadTableExcel
              filename="Orders Report"
              sheet="Orders"
              currentTableRef={tableRef.current}
            >
              <button className="btn btn-primary"> Export excel </button>
            </DownloadTableExcel>
          </div>
          <div className="row">
            <div className="col-12 col-lg-12 my-3 text-start">
              <h3 className="my-3">
                Orders statis chart in {new Date().getFullYear()}
              </h3>
              <Chart dataChart={dataChart} />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
              Copyright &copy; MINHSANGSTORE 2022 by
              <Link className="ms-1" to="">
                HekiChien
              </Link>
            </div>
            <div>
              <Link to="">Privacy Policy</Link>
              &middot;
              <Link to="">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Admin;
