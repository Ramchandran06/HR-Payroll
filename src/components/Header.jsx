import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Typography,
  Badge,
  Breadcrumbs,
  Link as MuiLink,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  ClickAwayListener,
  Chip,
  Divider,
  Fade,
  Slide,
  Tooltip,
  Button,
  alpha,
} from "@mui/material";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import AssessmentIcon from "@mui/icons-material/Assessment";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmployeeIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PaymentIcon from "@mui/icons-material/Payment";

function Header({ onSidebarToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathnames = location.pathname.split("/").filter((x) => x);

  //  const [notifications, setNotifications] = useState([]);

  const hideSearchBarOn = "/employees";
  const shouldHideSearchBar = location.pathname.startsWith(hideSearchBarOn);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);
  const openNotificationMenu = Boolean(notificationAnchorEl);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchAnchorRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: "leave",
      title: "Leave Request Approved",
      message: "Your leave request for Dec 15-20 has been approved",
      time: "2 hours ago",
      read: false,
      icon: <AccountCircleIcon />,
    },
    {
      id: 2,
      type: "attendance",
      title: "Late Arrival Alert",
      message: "You arrived 15 minutes late today",
      time: "4 hours ago",
      read: false,
      icon: <HelpIcon />,
    },
    {
      id: 3,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance on Dec 10, 2-4 AM",
      time: "1 day ago",
      read: true,
      icon: <SettingsSuggestIcon />,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setOpenSearch(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const dummyResults = [
        {
          type: "Employee",
          name: "Karthi Kumar",
          id: 1,
          department: "Engineering",
          avatar: "KK",
        },
        {
          type: "Employee",
          name: "Kathir Velan",
          id: 2,
          department: "Design",
          avatar: "KV",
        },
        {
          type: "Page",
          name: "Leave Management",
          path: "/leave-management",
          icon: <CalendarIcon />,
        },
        {
          type: "Page",
          name: "Attendance Dashboard",
          path: "/attendance",
          icon: <CalendarTodayIcon />,
        },
        {
          type: "Page",
          name: "Employee Directory",
          path: "/employees",
          icon: <EmployeeIcon />,
        },
        { type: "Page", name: "Payroll System", path: "/payroll", icon: "💰" },
      ].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setResults(dummyResults);
      setLoading(false);
      setOpenSearch(true);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleResultClick = (result) => {
    setOpenSearch(false);
    setSearchTerm("");
    if (result.type === "Employee") {
      navigate(`/employees/${result.id}`);
    } else if (result.type === "Page") {
      navigate(result.path);
    }
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationOpen = (event) =>
    setNotificationAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    handleMenuClose();
    navigate("/login");
  };

  const getPageIcon = (pathname) => {
    const icons = {
      "/dashboard": <DashboardIcon sx={{ fontSize: 20 }} />,
      "/employees": <AccountCircleIcon sx={{ fontSize: 20 }} />,
      "/leave-management": (
        <span>
          <ExitToAppIcon />
        </span>
      ),
      "/attendance": (
        <span>
          <CalendarIcon sx={{ fontSize: 20 }} />
        </span>
      ),
      "/payroll": (
        <span>
          <PaymentIcon />
        </span>
      ),
    };
    return (
      icons[pathname] || (
        <span>
          <AssessmentIcon />
        </span>
      )
    );
  };

  return (
    <ClickAwayListener onClickAway={handleCloseSearch}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.95
          )} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          mb: 3,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, transparent 30%, ${alpha(
              theme.palette.common.white,
              0.1
            )} 50%, transparent 70%)`,
            animation: "shimmer 3s ease-in-out infinite",
          },
          "@keyframes shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        }}
      >
        <Toolbar sx={{ minHeight: 70, position: "relative", zIndex: 1 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onSidebarToggle}
              sx={{
                mr: 2,
                background: alpha(theme.palette.common.white, 0.1),
                "&:hover": {
                  background: alpha(theme.palette.common.white, 0.2),
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  borderRadius: 2,
                  background: alpha(theme.palette.common.white, 0.1),
                  backdropFilter: "blur(10px)",
                }}
              >
                {getPageIcon(location.pathname)}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "white" }}
                >
                  HR Portal
                </Typography>
              </Box>

              <Breadcrumbs
                separator={
                  <NavigateNextIcon fontSize="small" sx={{ color: "white" }} />
                }
                aria-label="breadcrumb"
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    color: alpha(theme.palette.common.white, 0.7),
                  },
                  "& .MuiLink-root": {
                    color: alpha(theme.palette.common.white, 0.8),
                    "&:hover": { color: "white" },
                  },
                  "& .MuiTypography-root": { color: "white" },
                }}
              >
                <MuiLink
                  component={RouterLink}
                  underline="hover"
                  to="/dashboard"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <DashboardIcon sx={{ fontSize: 16 }} />
                  Home
                </MuiLink>
                {pathnames.map((value, index) => {
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const breadcrumbName = value
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());
                  return index === pathnames.length - 1 ? (
                    <Typography key={to} sx={{ fontWeight: 600 }}>
                      {breadcrumbName}
                    </Typography>
                  ) : (
                    <MuiLink
                      component={RouterLink}
                      underline="hover"
                      to={to}
                      key={to}
                    >
                      {breadcrumbName}
                    </MuiLink>
                  );
                })}
              </Breadcrumbs>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Search Bar */}
            {!shouldHideSearchBar && (
              <Box ref={searchAnchorRef}>
                <TextField
                  variant="outlined"
                  placeholder="Search employees, pages..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ color: alpha(theme.palette.common.white, 0.7) }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: loading ? (
                      <InputAdornment position="end">
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      </InputAdornment>
                    ) : null,
                    sx: {
                      borderRadius: "25px",
                      background: alpha(theme.palette.common.white, 0.15),
                      backdropFilter: "blur(10px)",
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(theme.palette.common.white, 0.3),
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(theme.palette.common.white, 0.5),
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& input::placeholder": {
                        color: alpha(theme.palette.common.white, 0.7),
                        opacity: 1,
                      },
                    },
                  }}
                  sx={{
                    width: { xs: "180px", sm: "300px" },
                    "& .MuiInputBase-root": {
                      color: "white",
                    },
                  }}
                />
                <Popper
                  open={openSearch}
                  anchorEl={searchAnchorRef.current}
                  placement="bottom-end"
                  sx={{ zIndex: 1300, width: { xs: "280px", sm: "350px" } }}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper
                        sx={{
                          mt: 1,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <List sx={{ p: 0 }}>
                          {results.length > 0
                            ? results.map((result, index) => (
                                <ListItem
                                  key={index}
                                  onClick={() => handleResultClick(result)}
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      background: alpha(
                                        theme.palette.primary.main,
                                        0.08
                                      ),
                                    },
                                  }}
                                >
                                  <ListItemAvatar>
                                    {result.type === "Employee" ? (
                                      <Avatar
                                        sx={{
                                          bgcolor: theme.palette.primary.main,
                                          width: 32,
                                          height: 32,
                                          fontSize: 12,
                                        }}
                                      >
                                        {result.avatar}
                                      </Avatar>
                                    ) : (
                                      <Box
                                        sx={{
                                          width: 32,
                                          height: 32,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: 16,
                                        }}
                                      >
                                        {result.icon}
                                      </Box>
                                    )}
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={result.name}
                                    secondary={
                                      result.type === "Employee"
                                        ? result.department
                                        : result.type
                                    }
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                    secondaryTypographyProps={{
                                      fontSize: "0.75rem",
                                    }}
                                  />
                                </ListItem>
                              ))
                            : !loading && (
                                <ListItem>
                                  <ListItemText
                                    primary="No results found"
                                    sx={{
                                      textAlign: "center",
                                      color: "text.secondary",
                                    }}
                                  />
                                </ListItem>
                              )}
                        </List>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>
            )}

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                onClick={handleNotificationOpen}
                sx={{
                  background: alpha(theme.palette.common.white, 0.1),
                  color: "white",
                  position: "relative",
                  "&:hover": {
                    background: alpha(theme.palette.common.white, 0.2),
                  },
                }}
              >
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      background: theme.palette.error.main,
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Profile */}
            <Tooltip title="Account settings">
              <Button
                onClick={handleMenuOpen}
                sx={{
                  background: alpha(theme.palette.common.white, 0.15),
                  color: "white",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: "none",
                  "&:hover": {
                    background: alpha(theme.palette.common.white, 0.25),
                  },
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    mr: 1,
                    background: theme.palette.secondary.main,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  A
                </Avatar>
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, lineHeight: 1 }}
                  >
                    Admin User
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.8, lineHeight: 1 }}
                  >
                    Administrator
                  </Typography>
                </Box>
              </Button>
            </Tooltip>
          </Box>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchorEl}
            open={openNotificationMenu}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 380,
                maxHeight: 400,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                borderRadius: 2,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <Box
              sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {unreadCount} unread messages
              </Typography>
            </Box>

            <List sx={{ p: 0, maxHeight: 300, overflow: "auto" }}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      background: alpha(theme.palette.primary.main, 0.04),
                    },
                    ...(notification.read && {
                      opacity: 0.7,
                    }),
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: notification.read
                          ? "grey.300"
                          : theme.palette.primary.main,
                        width: 40,
                        height: 40,
                        fontSize: 16,
                      }}
                    >
                      {notification.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label="New"
                            size="small"
                            color="primary"
                            sx={{ height: 16, fontSize: "0.6rem" }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Divider />
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                variant="text"
                onClick={handleNotificationClose}
                sx={{ textTransform: "none" }}
              >
                View All Notifications
              </Button>
            </Box>
          </Menu>

          {/* User Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={openProfileMenu}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 280,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                borderRadius: 2,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <Box
              sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: theme.palette.primary.main,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Admin User
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    admin@sit.com
                  </Typography>
                  <Chip
                    label="Administrator"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 0.5, fontSize: "0.7rem" }}
                  />
                </Box>
              </Box>
            </Box>

            <List sx={{ p: 1 }}>
              <MenuItem
                onClick={handleMenuClose}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <AccountCircleIcon sx={{ mr: 2, color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    My Profile
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    View and edit profile
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem
                onClick={handleMenuClose}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <SettingsIcon sx={{ mr: 2, color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Settings
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Account preferences
                  </Typography>
                </Box>
              </MenuItem>

              <MenuItem
                onClick={handleMenuClose}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <HelpIcon sx={{ mr: 2, color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Help & Support
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Get help and contact support
                  </Typography>
                </Box>
              </MenuItem>
            </List>

            <Divider />

            <List sx={{ p: 1 }}>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  borderRadius: 1,
                  color: "error.main",
                  "&:hover": {
                    background: alpha(theme.palette.error.main, 0.08),
                  },
                }}
              >
                <LogoutIcon sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Sign Out
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Logout from your account
                  </Typography>
                </Box>
              </MenuItem>
            </List>
          </Menu>
        </Toolbar>
      </AppBar>
    </ClickAwayListener>
  );
}

export default Header;
