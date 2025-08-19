import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, Typography, Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
  scales: { y: { beginAtZero: true } },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data = {
  labels,
  datasets: [
    {
      label: "Check-ins",
      data: [95, 90, 96, 95, 92, 45, 40],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Check-outs",
      data: [88, 85, 90, 88, 85, 42, 38],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function WeeklyActivityChart() {
  return (
    <Card sx={{ borderRadius: "16px", boxShadow: 3, height: "100%", marginLeft:'50px', width:'400px' }}>
      <CardContent
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Weekly Activity
        </Typography>

        <Box sx={{ flexGrow:1, position: "relative", minHeight: '300px' }}>
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            data={data}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeeklyActivityChart;
