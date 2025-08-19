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
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up...");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        {" "}
        <Paper
          elevation={12}
          sx={{
            padding: { xs: 2, sm: 4 },
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Create Account
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <TextField
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
              />
              <TextField name="lastName" required fullWidth label="Last Name" />
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile number"
              label="Mobile Number"
              name="Mobile Number"
              type="tel"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm password"
              label="Confirm Password"
              type="confirm password"
              id="confirm password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: "8px" }}
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h9" sx={{ color: "text.primary" }}>
                Already have an account?{" "}
              </Typography>
              <MuiLink component={RouterLink} to="/login" variant="body2">
                Sign in
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignUp;
