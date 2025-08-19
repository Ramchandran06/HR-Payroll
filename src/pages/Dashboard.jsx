import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

import WeeklyActivityChart from "../components/WeeklyActivityChart";
import DepartmentChart from "../components/DepartmentChart";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import AddIcon from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/FlagCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const KpiCard = ({ title, value, icon, trend, subText }) => {
  const trendColor = trend > 0 ? "green" : "red";

  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        height: "100%",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
        mr: 5,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
          {icon}
        </Box>
        <Box sx={{ my: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: trendColor }}
          >
            {trend > 0 ? `+${trend}% ` : `${trend}% `}
          </Typography>
          <Typography variant="body2" component="span" color="text.secondary">
            {subText}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

function Dashboard() {
  const kpiData = [
    {
      title: "Total Employees",
      value: "124",
      icon: <PeopleAltIcon color="primary" fontSize="large" />,
      trend: 12,
      subText: "from last month",
    },
    {
      title: "Present Today",
      value: "98",
      icon: <CoPresentIcon sx={{ color: "green" }} fontSize="large" />,
      trend: 79,
      subText: "attendance rate",
    },
    {
      title: "On Leave",
      value: "8",
      icon: <HourglassDisabledIcon sx={{ color: "orange" }} fontSize="large" />,
      trend: -6,
      subText: "of workforce",
    },
    {
      title: "Payroll Cost",
      value: "₹12.5L",
      icon: <MonetizationOnIcon sx={{ color: "purple" }} fontSize="large" />,
      trend: 5,
      subText: "increase this month",
    },
  ];

  const recentActivities = [
    {
      primaryText: "New leave request from Ram",
      secondaryText: "For 3 days from Aug 11",
      icon: <EventNoteIcon />,
      avatarColor: "primary.main",
    },
    {
      primaryText: "Chandran has been hired as a Developer",
      secondaryText: "Joined on July 14, 2025",
      icon: <PeopleAltIcon />,
      avatarColor: "success.main",
    },
  ];

  const upcomingEvents = [
    {
      primaryText: "Independence Day",
      secondaryText: "August 15, 2025",
      icon: <FlagIcon />,
      avatarColor: "secondary.main",
    },
    {
      primaryText: "Team Outing",
      secondaryText: "Plan for this weekend",
      icon: <WorkHistoryIcon />,
      avatarColor: "warning.main",
    },
  ];
  const ActivityList = ({ title, items }) => (
    <Card sx={{ height: "100%", borderRadius: "16px" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item.avatarColor }}>
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.primaryText}
                  secondary={item.secondaryText}
                />
              </ListItem>
              {index < items.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
          Dashboard
        </Typography>
        {/* <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Add Employee
        </Button> */}
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <KpiCard {...item} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <WeeklyActivityChart />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ ml: 10 }}>
          <DepartmentChart />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ ml: 10 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRadius: "16px",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 8,
            },
          }}
        >
          <ActivityList title="Recent Activities" items={recentActivities} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRadius: "16px",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 8,
            },
          }}
        >
          <ActivityList title="Upcoming Events" items={upcomingEvents} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
