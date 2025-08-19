import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function KPICard({ title, value, icon, trendText, trendColor }) {
  return (
    <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
          {icon}
        </Box>
        <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: trendColor }}>
          {trendText}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default KPICard;
