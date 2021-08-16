import React from "react";
import ReactEcharts from "echarts-for-react";
import { echartOptions } from "@gull";

const DoughnutChart = ({ usuario, height, valores }) => {
  const option = {
    ...echartOptions.defaultOptions,
    legend: {
      show: true,
      bottom: 0,
    },
    series: [
      {
        type: "pie",
        ...echartOptions.pieRing,

        label: echartOptions.pieLabelCenterHover,
        data: valores.map((item, index) => ({
          name: item.tipo,
          value: item.cantidad,
          itemStyle: {
            color: item.color,
          },
        })),
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default DoughnutChart;
