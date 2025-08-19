import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Tabs,
  Tab,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";

ChartJS.register(ArcElement, Tooltip, Legend);

const attendanceRecords = [
  { date: "2024-08-01", name: "Karthi", status: "Present" },
  { date: "2024-08-01", name: "Kathir", status: "Leave" },
    { date: "2024-08-01", name: "Kabilan", status: "Absent" },
    { date: "2024-08-01", name: "Chandran", status: "Present" },
    

  { date: "2024-08-02", name: "Karthi", status: "Present" },
  { date: "2024-08-02", name: "Kathir", status: "Present" },
  { date: "2024-07-25", name: "Karthi", status: "Present" },
];

const leaveRequests = [
  { leaveType: "Sick Leave", status: "Approved" },
  { leaveType: "Casual Leave", status: "Approved" },
  { leaveType: "Sick Leave", status: "Approved" },
  { leaveType: "Earned Leave", status: "Approved" },
];

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

function Reports() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const attendanceSummary = useMemo(() => {
    const monthRecords = attendanceRecords.filter(
      (r) => new Date(r.date).getMonth() === selectedMonth.getMonth()
    );
    const summary = {};
    monthRecords.forEach((rec) => {
      summary[rec.name] = summary[rec.name] || {
        Present: 0,
        Leave: 0,
        Absent: 0,
      };
      summary[rec.name][rec.status]++;
    });
    return Object.entries(summary).map(([name, counts]) => ({
      name,
      ...counts,
    }));
  }, [selectedMonth]);

  const leaveChartData = useMemo(() => {
    const counts = leaveRequests.reduce((acc, req) => {
      acc[req.leaveType] = (acc[req.leaveType] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Reports
        </Typography>
        <Card sx={{ borderRadius: "16px" }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Attendance" />
            <Tab label="Leave" />
            <Tab label="Headcount" />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Monthly Attendance Summary</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <DatePicker
                  label="Select Month"
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  views={["month", "year"]}
                />
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  component={CSVLink}
                  data={attendanceSummary}
                  filename="attendance-report.csv"
                >
                  Export
                </Button>
              </Box>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Present</TableCell>
                    <TableCell>Leave</TableCell>
                    <TableCell>Absent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceSummary.map((emp) => (
                    <TableRow key={emp.name}>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.Present}</TableCell>
                      <TableCell>{emp.Leave}</TableCell>
                      <TableCell>{emp.Absent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Leave Type Distribution
            </Typography>
            <Box sx={{ maxWidth: "400px", margin: "auto" }}>
              <Pie data={leaveChartData} />
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Typography variant="h6">Headcount Report</Typography>
            <Typography color="text.secondary">
              This report will show employee join and exit trends.
            </Typography>
          </TabPanel>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}

export default Reports;
