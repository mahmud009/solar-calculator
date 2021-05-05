import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@material-ui/core";

export default function PlanChart({ chartData }) {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    let { chartLabels, charAnnualCosts, chartSavings, chartExtra } = chartData;
    let data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Total Cost",
          data: charAnnualCosts,
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.5,
          backgroundColor: ["#3361C5"],
          borderColor: ["#3361C5"],
        },
        {
          label: "Estimated Benifits",
          data: chartSavings,
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.5,

          backgroundColor: ["#4C9A5A"],
          borderColor: ["#4C9A5A"],
        },
        {
          label: "",
          data: chartExtra,
          // pointBackgroundColor: "trans",
          // pointBorderWidth: 1,
          pointRadius: 0,
          borderWidth: 0,
          tension: 0.5,

          backgroundColor: ["transparent"],
          // borderColor: ["#4C9A5A"],
        },
      ],
    };

    let options = {
      scales: {
        x: {
          ticks: {
            display: true,
            align: "center",
            // callback: function (val, index) {
            //   // Hide the label of every 2nd dataset
            //   return index % 2 === 0 ? this.getLabelForValue(val) : "";
            // },
          },
        },
        y: {
          ticks: {
            display: true,
            align: "center",
            callback: function (val, index) {
              // Hide the label of every 2nd dataset
              return `$ ${this.getLabelForValue(val)}`;
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 20,
          },
        },
        // tooltip: {
        //   // mode: "dataset",
        //   title: "hello",
        // },
      },
    };

    setData(data);
    setOptions(options);
  }, [chartData]);

  return (
    <Box width={250}>
      {data && options && <Line data={data} height={400} options={options} />}
    </Box>
  );
}
