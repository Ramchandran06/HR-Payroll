import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const initialLeaveRequests = [
  {
    id: 1,
    name: "Karthi",
    leaveType: "Sick Leave",
    from: "2024-08-10",
    to: "2024-08-11",
    days: 2,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 2,
    name: "Kathir",
    leaveType: "Casual Leave",
    from: "2024-08-12",
    to: "2024-08-12",
    days: 1,
    reason: "Personal work",
    status: "Approved",
  },
  {
    id: 3,
    name: "Kabilan",
    leaveType: "Earned Leave",
    from: "2024-09-01",
    to: "2024-09-05",
    days: 5,
    reason: "Vacation",
    status: "Pending",
  },
  {
    id: 4,
    name: "Chandran",
    leaveType: "Sick Leave",
    from: "2024-08-04",
    to: "2024-08-04",
    days: 1,
    reason: "Headache",
    status: "Rejected",
  },
  {
    id: 5,
    name: "Raj",
    leaveType: "Casual Leave",
    from: "2024-08-15",
    to: "2024-08-15",
    days: 1,
    reason: "Family function",
    status: "Approved",
  },
];

const StatusChip = ({ status }) => {
  let color;
  switch (status) {
    case "Pending":
      color = "warning";
      break;
    case "Approved":
      color = "success";
      break;
    case "Rejected":
      color = "error";
      break;
    default:
      color = "default";
  }
  return <Chip label={status} color={color} size="small" />;
};

function LeaveManagement() {
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [currentTab, setCurrentTab] = useState("All");

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleApprove = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

 
  const filteredRequests = useMemo(() => {
    if (currentTab === "All") {
      return requests;
    }
    return requests.filter((req) => req.status === currentTab);
  }, [currentTab, requests]); 

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
      >
        Leave Management
      </Typography>

      <Card sx={{ borderRadius: "16px" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="All Requests" value="All" />
          <Tab label="Pending" value="Pending" />
          <Tab label="Approved" value="Approved" />
          <Tab label="Rejected" value="Rejected" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No requests found in this category.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((req) => (
                  <TableRow key={req.id} hover>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.leaveType}</TableCell>
                    <TableCell>{`${req.from} to ${req.to}`}</TableCell>
                    <TableCell>{req.days}</TableCell>
                    <TableCell>
                      <StatusChip status={req.status} />
                    </TableCell>
                    <TableCell align="center">
                      {req.status === "Pending" && (
                        <Box>
                          <Tooltip title="Approve">
                            <IconButton
                              sx={{ color: "success.main" }}
                              onClick={() => handleApprove(req.id)}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              sx={{ color: "error.main" }}
                              onClick={() => handleReject(req.id)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default LeaveManagement;
