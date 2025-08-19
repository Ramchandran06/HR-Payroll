import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  CardContent,
  FormControlLabel,
  Switch,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PaletteIcon from "@mui/icons-material/Palette";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useTheme } from "@mui/material/styles"; 
import { ThemeContext } from "../contexts/ThemeContext"; 

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Settings() {
  const theme = useTheme(); 
  const { toggleTheme } = useContext(ThemeContext); 
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const handleThemeChange = (event) => {
     toggleTheme();

    console.log("Dark Mode:", event.target.checked);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
      >
        Settings
      </Typography>

      <Card sx={{ borderRadius: "16px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="settings tabs"
          >
            <Tab label="Profile" id="settings-tab-0" />
            <Tab label="General" id="settings-tab-1" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Profile Information
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 100, height: 100, m: "auto" }}>A</Avatar>
              <Button component="label" sx={{ mt: 1 }}>
                Upload Image
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                label="Full Name"
                defaultValue="Admin User"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email Address"
                defaultValue="admin@sit.com"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Password
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Current Password" type="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="New Password" type="password" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 3 }}>
            Update Password
          </Button>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Card sx={{ mb: 3, borderRadius: "16px" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="h6">Company Information</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company Name"
                    defaultValue="HR Portal Inc."
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Phone"
                    defaultValue="+91 98765 43210"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    defaultValue="123, Tech Park, Chennai, India"
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Website"
                    defaultValue="https://www.hrportal.com"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained">Save Changes</Button>
            </Box>
          </Card>

          <Card sx={{ mb: 3, borderRadius: "16px" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PaletteIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={theme.palette.mode === "dark"}
                    onChange={handleThemeChange}
                  />
                }
                label="Enable Dark Mode"
              />
              <Typography variant="body2" color="text.secondary">
                Switch between light and dark themes for the application.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3, borderRadius: "16px" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <NotificationsActiveIcon
                  sx={{ mr: 1, color: "text.secondary" }}
                />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Email Notifications"
              />
              <Typography variant="body2" color="text.secondary">
                Receive email notifications for new leave requests, approvals,
                etc.
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
      </Card>
    </Box>
  );
}

export default Settings;
