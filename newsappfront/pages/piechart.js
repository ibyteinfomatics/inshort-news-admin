import React from "react";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

chartjs.register(Tooltip, Legend, ArcElement);

export default function PieChart({ dashboard }) {
  let categories = [];
  // Object.keys(dashboard).map((key)=>{categories.push})
  const data = {
    labels: [
      "Sports",
      "Business",
      "Entertainment",
      "General",
      "Health",
      "Science",
      "Technology",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          dashboard?.sports,
          dashboard?.business,
          dashboard?.entertainment,
          dashboard?.general,
          dashboard?.health,
          dashboard?.science,
          dashboard?.technology,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(129, 159, 71, 0.5)",
          "rgba(221, 170, 53, 0.8)",
          "rgba(172, 244, 238, 1)",
          "rgba(181, 53, 64, 0.9)",
          "rgba(160, 138, 168, 0.9)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(129, 159, 71, 0.5)",
          "rgba(221, 170, 53, 0.8)",
          "rgba(172, 244, 238, 1)",
          "rgba(181, 53, 64, 0.9)",
          "rgba(160, 138, 168, 0.9)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
    maintainAspectRation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div style={{ width: "380px", marginLeft: "auto", marginRight: "auto" }}>
        <Pie data={data} height={200} options={options} />
      </div>
    </>
  );
}
