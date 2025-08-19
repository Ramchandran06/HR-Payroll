import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const drawerWidth = 240;
const collapsedDrawerWidth = 88;

function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarOpenState = isMobile ? isSidebarOpen : true;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        isMobile={isMobile}
        isSidebarOpen={sidebarOpenState}
        onSidebarClose={() => setSidebarOpen(false)}
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedDrawerWidth}
        isCollapsed={isCollapsed}
        onCollapse={handleCollapseToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,

          width: {
            md: `calc(100% - ${
              isCollapsed ? collapsedDrawerWidth : drawerWidth
            }px)`,
          },

          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Header onSidebarToggle={handleSidebarToggle} />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
