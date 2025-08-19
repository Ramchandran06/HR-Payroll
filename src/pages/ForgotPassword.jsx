import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Link as MuiLink,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key"; 
import { useNavigate, Link as RouterLink } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSendLink = (e) => {
    e.preventDefault();
    console.log("Sending password reset link...");

    alert(
      "If an account with this email exists, a password reset link has been sent."
    );
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={12}
          sx={{
            padding: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <KeyIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center" }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSendLink}
            sx={{ mt: 3, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: "8px" }}
            >
              Send Reset Link
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <MuiLink component={RouterLink} to="/login" variant="body2">
                Back to Login
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
