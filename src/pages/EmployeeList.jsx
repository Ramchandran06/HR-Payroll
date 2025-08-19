import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export const initialEmployees = [
  {
    id: 1,
    name: "Karthi",
    role: "Web Developer",
    department: "Development",
    email: "karthi@gmail.com",
    phone: "9876543210",
    imageUrl: "https://i.pravatar.cc/150?u=kathir",
    joinDate: "2020-01-15",
    manager: "Ram",
    address: "123 Main St, Chennai",
  },
  {
    id: 2,
    name: "Kathir",
    role: "UI/UX Designer",
    department: "Design",
    email: "kathir@gmail.com",
    phone: "9876543211",
    imageUrl: "https://i.pravatar.cc/150?u=kathir",
    joinDate: "2024-01-22",
    manager: "Ram",
    address: "123 Main St, Madurai",
  },
  {
    id: 3,
    name: "Kabilan",
    role: "Fullstack Developer",
    department: "Development",
    email: "kabilan@gmail.com",
    phone: "9876543212",
    imageUrl: "https://i.pravatar.cc/150?u=kabilan",
    joinDate: "2025-01-15",
    manager: "Ram",
    address: "123 East St, Ariyalur",
  },
  {
    id: 4,
    name: "Chandran",
    role: "Frontend Developer",
    department: "Development",
    email: "chandran@gmail.com",
    phone: "9876543213",
    imageUrl: "https://i.pravatar.cc/150?u=kabilan",
    joinDate: "2025-07-14",
    manager: "Ram",
    address: "42A1 Jayankondam, Ariyalur",
  },
  {
    id: 5,
    name: "Raj",
    role: "HR Manager",
    department: "Human Resources",
    email: "raj@gmail.com",
    phone: "9876543214",
    imageUrl: "https://i.pravatar.cc/150?u=kabilan",
    joinDate: "2023-01-15",
    manager: "Ram",
    address: "123 Main St, Chennai",
  },
  {
    id: 6,
    name: "Dharma",
    role: "QA Engineer",
    department: "Testing",
    email: "dharma@gmail.com",
    phone: "9876543215",
    imageUrl: "https://i.pravatar.cc/150?u=kathir",
    joinDate: "2023-09-14",
    manager: "Ram",
    address: "123 West St, Trichy",
  },
];

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Avatar
          alt={employee.name}
          src={employee.imageUrl}
          sx={{ width: 80, height: 80, margin: "0 auto 16px" }}
        />
        <Typography variant="h6" component="div" sx={{ fontWeight: "600" }}>
          {employee.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {employee.role}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </Box>
    </Card>
  );
};

function EmployeeList() {
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    console.log("New Employee Data:", newEmployee);
    handleClose();
  };

  const departments = [
    "All",
    ...new Set(initialEmployees.map((emp) => emp.department)),
  ];
  const roles = ["All", ...new Set(initialEmployees.map((emp) => emp.role))];
  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ];

  const sortedAndFilteredEmployees = useMemo(() => {
    let filtered = initialEmployees.filter((emp) => {
      const matchesDepartment =
        departmentFilter === "All" || emp.department === departmentFilter;
      const matchesRole = roleFilter === "All" || emp.role === roleFilter;
      const matchesSearch =
        searchTerm === "" ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesRole && matchesSearch;
    });

    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return filtered;
  }, [searchTerm, departmentFilter, roleFilter, sortBy]);

  const pageCount = Math.ceil(
    sortedAndFilteredEmployees.length / ITEMS_PER_PAGE
  );
  const currentEmployees = sortedAndFilteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Our Team
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search by name..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={departmentFilter}
              label="Department"
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map((dep) => (
                <MenuItem key={dep} value={dep}>
                  {dep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            sx={{ml: 100  }}
          >
            Add Employee
          </Button> */}

        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {sortedAndFilteredEmployees.length > 0 ? (
          sortedAndFilteredEmployees.map((employee) => (
            <EmployeeCard employee={employee} key={employee.id} />
          ))
        ) : (
          <Typography sx={{ gridColumn: "1 / -1", textAlign: "center", mt: 4 }}>
            No employees found matching your criteria.
          </Typography>
        )}
      </Box>
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please fill out the form below to add a new employee.
          </DialogContentText>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="role"
                  label="Role / Position"
                  value={newEmployee.role}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="department"
                  label="Department"
                  value={newEmployee.department}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEmployee} variant="contained">
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EmployeeList;
