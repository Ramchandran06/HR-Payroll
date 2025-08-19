import React, { useState, Fragment } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  IconButton,
} from "@mui/material";
import { format, subMonths } from "date-fns";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const last12Months = Array.from({ length: 12 }, (_, i) =>
  subMonths(new Date(), i)
);

const Row = ({ employee, selectedMonth, handleGeneratePayslip }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{employee.name}</TableCell>
        <TableCell>
          ₹{(employee.basic + employee.allowance).toLocaleString()}
        </TableCell>
        <TableCell>₹{employee.deductions.toLocaleString()}</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>
          ₹{employee.netSalary.toLocaleString()}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            size="small"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => handleGeneratePayslip(employee, selectedMonth)}
          >
            Payslip
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                p: 2,
                bgcolor: "background.default",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" gutterBottom component="div">
                Salary Breakup
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Basic Salary
                    </TableCell>
                    <TableCell align="right">
                      ₹{employee.basic.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Allowances</TableCell>
                    <TableCell align="right">
                      ₹{employee.allowance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Provident Fund (PF)</TableCell>
                    <TableCell align="right">
                      - ₹{employee.deductions.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

function Payroll() {
  const thisMonthKey = format(new Date(), "yyyy-MM");
  const lastMonthKey = format(subMonths(new Date(), 1), "yyyy-MM");

  const payrollData = {
    [thisMonthKey]: [
      {
        id: 1,
        name: "Karthi",
        basic: 50000,
        allowance: 15000,
        deductions: 5000,
        netSalary: 60000,
        status: "Paid",
      },
      {
        id: 2,
        name: "Kathir",
        basic: 45000,
        allowance: 12000,
        deductions: 4500,
        netSalary: 52500,
        status: "Paid",
      },
      {
        id: 3,
        name: "Kabilan",
        basic: 60000,
        allowance: 18000,
        deductions: 6000,
        netSalary: 72000,
        status: "Paid",
      },
    ],
    [lastMonthKey]: [
      {
        id: 1,
        name: "Karthi",
        basic: 50000,
        allowance: 15000,
        deductions: 5000,
        netSalary: 60000,
        status: "Paid",
      },
      {
        id: 2,
        name: "Kathir",
        basic: 45000,
        allowance: 12000,
        deductions: 4500,
        netSalary: 52500,
        status: "Paid",
      },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState(thisMonthKey);
  const currentMonthData = payrollData[selectedMonth] || [];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const totalPayroll = currentMonthData.reduce(
    (acc, emp) => acc + emp.netSalary,
    0
  );
  const totalDeductions = currentMonthData.reduce(
    (acc, emp) => acc + emp.deductions,
    0
  );

  const handleGeneratePayslip = (employee, month) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Shanthi IT Solution", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("123, Valasaravakam, Chennai", 105, 27, {
      align: "center",
    });
    doc.setFontSize(16);
    doc.text("Payslip", 105, 40, { align: "center" });

    doc.setFontSize(11);
    doc.text(
      `Payslip for the month of: ${format(
        new Date(selectedMonth),
        "MMMM yyyy"
      )}`,
      14,
      55
    );
    doc.line(14, 57, 196, 57);

    const employeeDetails = [
      ["Employee ID:", `${employee.id}`],
      ["Employee Name:", `${employee.name}`],
      ["Designation:", `${employee.role || "N/A"}`],
      ["Department:", `${employee.department || "N/A"}`],
      ["PAN Number:", `${employee.pan || "N/A"}`],
      ["Bank A/C No:", `******${employee.bankAccount?.slice(-4) || "N/A"}`],
    ];

    autoTable(doc, {
      body: employeeDetails,
      startY: 60,
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 1.5 },
      columnStyles: { 0: { fontStyle: "bold" } },
    });

    const grossEarnings = employee.basic + employee.allowance;
    const totalDeductions = employee.deductions;

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Earnings", "Amount ", "Deductions", "Amount "]],
      body: [
        [
          "Basic Salary",
          employee.basic.toLocaleString(),
          "Provident Fund (PF)",
          employee.deductions.toLocaleString(),
        ],
        [
          "Allowances",
          employee.allowance.toLocaleString(),
          "Professional Tax (PT)",
          "200.00",
        ],
      ],
      foot: [
        [
          { content: "Gross Earnings", styles: { fontStyle: "bold" } },
          {
            content: grossEarnings.toLocaleString(),
            styles: { fontStyle: "bold" },
          },
          { content: "Total Deductions", styles: { fontStyle: "bold" } },
          {
            content: totalDeductions.toLocaleString(),
            styles: { fontStyle: "bold" },
          },
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      footStyles: { fillColor: [25, 150, 133] },
    });
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Net Salary Payable:", 14, finalY + 15);
    doc.text(` ${employee.netSalary.toLocaleString()}`, 196, finalY + 15, {
      align: "right",
    });

    doc.setFont("helvetica", "bold");
    doc.text(`In Words: Sixty Thousand Rupees Only`, 14, finalY + 22);

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      "This is a computer-generated payslip and does not require a signature.",
      105,
      280,
      { align: "center" }
    );

    doc.save(`Payslip-${employee.name}-${month}.pdf`);
  };

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
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Payroll Management
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Select Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Select Month"
            onChange={handleMonthChange}
          >
            {last12Months.map((date) => (
              <MenuItem
                key={format(date, "yyyy-MM")}
                value={format(date, "yyyy-MM")}
              >
                {format(date, "MMMM yyyy")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography color="text.secondary">Total Payroll</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₹{totalPayroll.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography color="text.secondary">Employees Paid</Typography>
            <Typography variant="h5" fontWeight="bold">
              {currentMonthData.length}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography color="text.secondary">Total Deductions</Typography>
            <Typography variant="h5" fontWeight="bold">
              ₹{totalDeductions.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: "16px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Employee Name</TableCell>
                <TableCell>Gross Salary</TableCell>{" "}
                <TableCell>Total Deductions</TableCell>{" "}
                <TableCell>Net Salary</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentMonthData.map((emp) => (
                <Row
                  key={emp.id}
                  employee={emp}
                  selectedMonth={selectedMonth}
                  handleGeneratePayslip={handleGeneratePayslip}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default Payroll;
