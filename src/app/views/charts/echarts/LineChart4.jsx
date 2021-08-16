import React from "react";
import ReactEcharts from "echarts-for-react";
import { echartOptions } from "@gull";
const LineChart4 = ({ height, moths, advertisement }) => {
  const option = {
    ...echartOptions.lineSplitNoAxis,
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: moths,
    },
    series: [
      {
        data: advertisement,
        lineStyle: {
          color: "#1565c0",
          width: 3,
          ...echartOptions.lineShadow,
        },
        label: { show: true, color: "#212121" },
        type: "line",
        smooth: true,
        itemStyle: {
          borderColor: "#1565c0",
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default LineChart4;
