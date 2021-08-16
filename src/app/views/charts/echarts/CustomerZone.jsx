import React from "react";
import ReactEcharts from "echarts-for-react";

const CustomerZone = ({ height, dataZonas, color = [] }) => {
  const option = {
    // color: ["#62549c", "#7566b5", "#7d6cbb", "#8877bd", "#9181bd", "#6957af"],
    tooltip: {
      show: true,
      backgroundColor: "rgba(0, 0, 0, .8)",
    },

    series: [
      {
        name: "Zonas | Municipios",
        type: "pie",
        radius: "90%",
        center: ["50%", "50%"],
        data: dataZonas,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default CustomerZone;
