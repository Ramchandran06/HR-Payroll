import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography, Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Developers",
    "Data Analyst",
    "HR",
    "Digital Marketing",
    "UI/UX",
    "Data Engineer",
  ],
  datasets: [
    {
      label: "# of Employees",
      data: [40, 25, 15, 10, 20, 14],
      backgroundColor: [
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: ["rgba(255, 255, 255, 1)"],
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  cutout: "70%",
};

function DepartmentChart() {
  return (
    <Card sx={{ borderRadius: "16px", boxShadow: 3, height: "100%", width:'300px' }}>
      <CardContent
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Department Distribution
        </Typography>

        <Box sx={{ flexGrow: 1, position: "relative", minHeight: "300px" }}>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" } },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default DepartmentChart;
