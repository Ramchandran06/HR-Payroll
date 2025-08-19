import React from "react";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, createTheme } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import LeaveManagement from "./pages/LeaveManagement";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { ThemeProvider } from "./contexts/ThemeContext";
import Reports from "./pages/Reports";
import EmployeeProfile from "./pages/EmployeeProfile";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/:id" element={<EmployeeProfile />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave-management" element={<LeaveManagement />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
