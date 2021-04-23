import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@material-ui/core";

export default function PlanChart({ chartData }) {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);
  useEffect(() => {
    let { chartLabels, chartCosts, chartSavings } = chartData;
    let data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Total Cost",
          data: chartCosts,
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.5,
          backgroundColor: ["#4C9A5A"],
          borderColor: ["#4C9A5A"],
        },
        {
          label: "Estimated Benifits",
          data: chartSavings,
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.5,
          backgroundColor: ["#3361C5"],
          borderColor: ["#3361C5"],
        },
      ],
    };

    let options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          // mode: "dataset",
          title: "hello",
        },
      },
    };

    setData(data);
    setOptions(options);
  }, [chartData]);

  return <Box>{data && options && <Line data={data} options={options} />}</Box>;
}
