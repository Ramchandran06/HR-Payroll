import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isSameDay, format, subDays } from "date-fns";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HotelIcon from "@mui/icons-material/Hotel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// SummaryCard
const SummaryCard = ({ title, value, icon, bgColor, iconColor }) => (
  <Card
    sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: "16px" }}
  >
    <Avatar
      sx={{ bgcolor: bgColor, color: iconColor, width: 56, height: 56, mr: 2 }}
    >
      {icon}
    </Avatar>
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
      <Typography color="text.secondary">{title}</Typography>
    </Box>
  </Card>
);

const MonthlySummaryCard = ({ summary }) => {
  const getProgressColor = (value) => {
    if (value >= 90) return "success";
    if (value >= 75) return "warning";
    return "error";
  };

  return (
    <Card sx={{ borderRadius: "16px", p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ width: 48, height: 48, mr: 2 }}>
          {summary.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6">{summary.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {`${summary.percentage.toFixed(0)}% Attendance`}
          </Typography>
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={summary.percentage}
        color={getProgressColor(summary.percentage)}
        sx={{ height: 8, borderRadius: 5, mb: 2 }}
      />
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Present
          </Typography>
          <Typography variant="h6" color="success.main">
            {summary.present}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            On Leave
          </Typography>
          <Typography variant="h6" color="warning.main">
            {summary.leave}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Absent
          </Typography>
          <Typography variant="h6" color="error.main">
            {summary.absent}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Main Attendance
function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    return [
      {
        date: today,
        employeeId: 1,
        name: "Karthi",
        status: "Present",
        checkIn: "10:30 AM",
        checkOut: "05:10 PM",
      },
      {
        date: today,
        employeeId: 2,
        name: "Kathir",
        status: "Present",
        checkIn: "10:00 AM",
        checkOut: "06:00 PM",
      },
      {
        date: today,
        employeeId: 3,
        name: "Kabilan",
        status: "Leave",
        checkIn: null,
        checkOut: null,
      },
      {
        date: today,
        employeeId: 4,
        name: "Chandran",
        status: "Absent",
        checkIn: null,
        checkOut: null,
      },
      {
        date: today,
        employeeId: 5,
        name: "Raj",
        status: "Present",
        checkIn: "09:15 AM",
        checkOut: "06:05 PM",
      },
      {
        date: yesterday,
        employeeId: 1,
        name: "Karthi",
        status: "Present",
        checkIn: "09:02 AM",
        checkOut: "06:00 PM",
      },
      {
        date: yesterday,
        employeeId: 2,
        name: "Kathir",
        status: "Leave",
        checkIn: null,
        checkOut: null,
      },
      {
        date: yesterday,
        employeeId: 3,
        name: "Kabilan",
        status: "Present",
        checkIn: "08:55 AM",
        checkOut: "05:50 PM",
      },
      {
        date: yesterday,
        employeeId: 4,
        name: "Chandran",
        status: "Present",
        checkIn: "09:10 AM",
        checkOut: "06:15 PM",
      },
    ];
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [view, setView] = useState("daily");

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const dailyAttendance = useMemo(
    () =>
      attendanceRecords.filter((record) =>
        isSameDay(record.date, selectedDate)
      ),
    [selectedDate, attendanceRecords]
  );

  const summary = useMemo(
    () => ({
      present: dailyAttendance.filter((r) => r.status === "Present").length,
      leave: dailyAttendance.filter((r) => r.status === "Leave").length,
      absent: dailyAttendance.filter((r) => r.status === "Absent").length,
    }),
    [dailyAttendance]
  );

  const monthlySummary = useMemo(() => {
    if (view !== "monthly") return [];

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const monthRecords = attendanceRecords.filter(
      (r) => r.date.getFullYear() === year && r.date.getMonth() === month
    );

    const summaryByUser = {};
    monthRecords.forEach((record) => {
      if (!summaryByUser[record.employeeId]) {
        summaryByUser[record.employeeId] = {
          name: record.name,
          present: 0,
          leave: 0,
          absent: 0,
        };
      }
      if (record.status === "Present")
        summaryByUser[record.employeeId].present++;
      if (record.status === "Leave") summaryByUser[record.employeeId].leave++;
      if (record.status === "Absent") summaryByUser[record.employeeId].absent++;
    });

    return Object.values(summaryByUser).map((summary) => {
      const workingDays = summary.present + summary.absent;
      const percentage =
        workingDays > 0 ? (summary.present / workingDays) * 100 : 0;
      return { ...summary, percentage };
    });
  }, [selectedDate, attendanceRecords, view]);

  const handleMenuOpen = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedRecord) return;
    const updatedRecords = attendanceRecords.map((record) => {
      if (
        record.employeeId === selectedRecord.employeeId &&
        isSameDay(record.date, selectedDate)
      ) {
        const updatedRecord = { ...record, status: newStatus };

        if (newStatus === "Present") {
          if (!updatedRecord.checkIn) {
            updatedRecord.checkIn = "10:00 AM";
          }
          if (!updatedRecord.checkOut) {
            updatedRecord.checkOut = "06:00 PM";
          }
        } else {
          updatedRecord.checkIn = null;
          updatedRecord.checkOut = null;
        }

        return updatedRecord;
      }
      return record;
    });
    setAttendanceRecords(updatedRecords);
    handleMenuClose();
  };

  const getStatusChip = (status) => {
    let color;
    switch (status) {
      case "Present":
        color = "success";
        break;
      case "Absent":
        color = "error";
        break;
      case "Leave":
        color = "warning";
        break;
      default:
        color = "default";
    }
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
              Attendance
            </Typography>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              size="small"
              sx={{ mt: 1 }}
            >
              <ToggleButton value="daily">Daily</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <DatePicker
            label={view === "daily" ? "Select Date" : "Select Month"}
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            views={view === "daily" ? ["day"] : ["month", "year"]}
            format={view === "daily" ? "dd/MM/yyyy" : "MM/yyyy"}
            sx={{ width: "200px" }}
          />
        </Box>

        {view === "daily" ? (
          <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <SummaryCard
                  title="Present"
                  value={summary.present}
                  icon={<CheckCircleIcon />}
                  bgColor="success.light"
                  iconColor="success.dark"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SummaryCard
                  title="On Leave"
                  value={summary.leave}
                  icon={<HotelIcon />}
                  bgColor="warning.light"
                  iconColor="warning.dark"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SummaryCard
                  title="Absent"
                  value={summary.absent}
                  icon={<CancelIcon />}
                  bgColor="error.light"
                  iconColor="error.dark"
                />
              </Grid>
            </Grid>

            <Card sx={{ borderRadius: "16px" }}>
              <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                <Typography variant="h6">
                  Records for {format(selectedDate, "MMMM d, yyyy")}
                </Typography>
              </Box>
              <List>
                {dailyAttendance.length > 0 ? (
                  dailyAttendance.map((record) => (
                    <ListItem
                      key={`${record.employeeId}-${record.date}`}
                      divider
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={(event) => handleMenuOpen(event, record)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={record.name}
                        secondary={`Checked In: ${
                          record.checkIn || "--"
                        } | Checked Out: ${record.checkOut || "--"}`}
                      />
                      {getStatusChip(record.status)}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No records found for this date." />
                  </ListItem>
                )}
              </List>
            </Card>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleUpdateStatus("Present")}>
                <CheckCircleOutlineIcon
                  sx={{ mr: 1, color: "success.main" }}
                  fontSize="small"
                />
                Mark as Present
              </MenuItem>
              <MenuItem onClick={() => handleUpdateStatus("Absent")}>
                <CancelIcon
                  sx={{ mr: 1, color: "error.main" }}
                  fontSize="small"
                />
                Mark as Absent
              </MenuItem>
              <MenuItem onClick={() => handleUpdateStatus("Leave")}>
                <HotelIcon
                  sx={{ mr: 1, color: "warning.main" }}
                  fontSize="small"
                />
                Mark as Leave
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Summary for {format(selectedDate, "MMMM yyyy")}
            </Typography>
            <Grid container spacing={3}>
              {monthlySummary.length > 0 ? (
                monthlySummary.map((summaryItem, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <MonthlySummaryCard summary={summaryItem} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "center", mt: 4 }}>
                    No records found for this month.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default Attendance;
