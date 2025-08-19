import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import AssessmentIcon from "@mui/icons-material/Assessment";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Employees", icon: <PeopleIcon />, path: "/employees" },
  { text: "Attendance", icon: <CalendarTodayIcon />, path: "/attendance" },
  {
    text: "Leave Management",
    icon: <ExitToAppIcon />,
    path: "/leave-management",
  },
  { text: "Payroll", icon: <PaymentIcon />, path: "/payroll" },
  { text: "Reports", icon: <AssessmentIcon />, path: "/reports" },
];

function Sidebar({
  isMobile,
  isSidebarOpen,
  onSidebarClose,
  drawerWidth,
  collapsedWidth,
  isCollapsed,
  onCollapse,
}) {
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Admin Panel
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={onCollapse} sx={{ color: "common.white" }}>
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>

      <List sx={{ p: 1, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: "8px",
                mb: 1,
                justifyContent: isCollapsed ? "center" : "initial",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={isMobile ? onSidebarClose : undefined}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 3,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isCollapsed ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box>
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/settings"
              selected={location.pathname === "/settings"}
              sx={{
                borderRadius: "8px",
                justifyContent: isCollapsed ? "center" : "initial",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={isMobile ? onSidebarClose : undefined}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 3,
                  justifyContent: "center",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{
                  opacity: isCollapsed ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {!isMobile && (
          <Box
            sx={{
              p: 2,
              textAlign: isCollapsed ? "center" : "right",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
           
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isSidebarOpen}
      onClose={onSidebarClose}
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",

          bgcolor: "#021d96f6",
          color: "common.white",
          "& .MuiListItemIcon-root": {
            color: "common.white",
          },
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;
