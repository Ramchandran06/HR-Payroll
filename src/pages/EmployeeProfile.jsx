import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import TodayIcon from "@mui/icons-material/Today";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import { initialEmployees } from "./EmployeeList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { isSameDay } from "date-fns";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";

 const dummyAttendance = [
   { date: new Date("2024-08-01"), status: "Present" },
   { date: new Date("2024-08-02"), status: "Present" },
   { date: new Date("2024-08-05"), status: "Leave" },
 ];

 const dummyLeaves = [
   {
     id: 1,
     type: "Sick Leave",
     from: "2024-08-05",
     to: "2024-08-05",
     days: 1,
     status: "Approved",
   },
   {
     id: 2,
     type: "Casual Leave",
     from: "2024-07-10",
     to: "2024-07-11",
     days: 2,
     status: "Approved",
   },
 ];

 const dummyDocuments = [
   {
     id: 1,
     name: "Offer_Letter.pdf",
     type: "Offer Letter",
     uploadedOn: "2022-01-10",
   },
   {
     id: 2,
     name: "Aadhaar_Card.pdf",
     type: "ID Proof",
     uploadedOn: "2022-01-15",
   },
 ];
 const StatusChip = ({ status }) => {
   let color;
   switch (status) {
     case "Approved":
       color = "success";
       break;
     case "Pending":
       color = "warning";
       break;
     case "Rejected":
       color = "error";
       break;
     default:
       color = "default";
   }
   return <Chip label={status} color={color} size="small" />;
 };

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
}

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);

  const employee = initialEmployees.find((emp) => emp.id === parseInt(id));

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (!employee) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="error">
          Employee Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          The employee with ID '{id}' does not exist.
        </Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => navigate("/employees")}
        >
          Back to Employee List
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Card sx={{ mb: 3, borderRadius: "16px" }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={employee.imageUrl}
                sx={{ width: 120, height: 120 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {employee.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {employee.role}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Employee ID: EMP-{String(employee.id).padStart(3, "0")}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained">Edit Profile</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: "16px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Profile Details" />
            <Tab label="Attendance" />
            <Tab label="Leave History" />
            <Tab label="Documents" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Contact Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={employee.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone"
                        secondary={employee.phone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Address"
                        secondary={employee.address || "N/A"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Job Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Department"
                        secondary={employee.department}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SupervisorAccountIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Manager"
                        secondary={employee.manager || "N/A"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TodayIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Joining Date"
                        secondary={employee.joinDate || "N/A"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Attendance Calendar
          </Typography>
          <Card>
            <CardContent>
              <Calendar
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const record = dummyAttendance.find((d) =>
                      isSameDay(d.date, date)
                    );
                    if (record) {
                      let color;
                      if (record.status === "Present") color = "green";
                      if (record.status === "Absent") color = "red";
                      if (record.status === "Leave") color = "orange";
                      return (
                        <Box
                          sx={{
                            height: "8px",
                            width: "8px",
                            backgroundColor: color,
                            borderRadius: "50%",
                            margin: "auto",
                            mt: 1,
                          }}
                        />
                      );
                    }
                  }
                  return null;
                }}
              />
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Leave History
          </Typography>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>{leave.from}</TableCell>
                      <TableCell>{leave.to}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>
                        <StatusChip status={leave.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Documents</Typography>
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              component="label"
            >
              Upload Document
              <input type="file" hidden />
            </Button>
          </Box>
          <Card>
            <List>
              {dummyDocuments.map((doc) => (
                <ListItem
                  key={doc.id}
                  secondaryAction={<Button size="small">Download</Button>}
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={`Type: ${doc.type} | Uploaded on: ${doc.uploadedOn}`}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </TabPanel>
      </Card>
    </Box>
  );
}

export default EmployeeProfile;
