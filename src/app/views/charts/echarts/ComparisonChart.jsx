import React from "react";
import ReactEcharts from "echarts-for-react";

const ComparisonChart = ({ height, aanterior, aactual, color = [] }) => {
  const option = {
    legend: {
      borderRadius: 0,
      orient: "horizontal",
      x: "right",
      data: ["Año Anterior", "Año Actual"],
    },
    grid: {
      left: "8px",
      right: "8px",
      bottom: "0",
      containLabel: true,
    },
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, .8)",
    },
    xAxis: [
      {
        type: "category",
        data: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sept",
          "Oct",
          "Nov",
          "Dic",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "Q{value}",
        },
        min: 0,
        max: 100000,
        interval: 25000,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: "auto",
        },
      },
    ],

    series: [
      {
        name: "Año Actual",
        data: aactual,
        label: { show: false, color: "#0168c1" },
        type: "bar",
        barGap: 0,
        color: "#0e47a1",
        smooth: true,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: -2,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
      {
        name: "Año Anterior",
        data: aanterior,
        label: { show: false, color: "#639" },
        type: "bar",
        color: "#ecd20b",
        smooth: true,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: -2,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default ComparisonChart;
