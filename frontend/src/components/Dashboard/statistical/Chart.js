import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = (props) => {
  const [dataChart, setDataChart] = useState();
  const data = {
    labels: monthNames,
    datasets: [
      {
        data: dataChart
          ?.sort((a, b) => a?._id - b?._id)
          ?.map((item, index) => item?.total),
        backgroundColor: "transparent",
        borderColor: "#f26c6d",
        pointBorderColor: "#000",
      },
    ],
  };
  useEffect(() => {
    let fetchData = async () => {
      let result = await axios.get(
        `http://localhost:8080/api/v1/orders/statis`
      );
      if (result?.data?.success === true) {
        setDataChart(result.data?.statis);
        console.log(result.data.statis);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Line data={data} />
    </>
  );
};

export default Chart;
