import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import api from "../api";
import { buildChartData } from "../utils";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callback: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgb(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgb(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgb(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const fetch = await api.get("/historical/all?lastdays=120");

      const chartData = buildChartData(fetch.data, casesType);
      setData(chartData);
    };

    getData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: casesTypeColors[casesType].half_op,
                borderColor: casesTypeColors[casesType].half_op,
              },
            ],
          }}
        ></Line>
      )}
    </div>
  );
};

export default LineGraph;
