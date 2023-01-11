import { Typography } from "@mui/material";
import React from "react";
import SimpleMaps from "./SimpleMaps";

const MapForm = () => {
  return (
    <>
      <Typography variant="h3" component="div">
        Step 1: Select location and weather year
      </Typography>
      <Typography component="div" padding={1}>
        <SimpleMaps />
      </Typography>
    </>
  );
};

export default MapForm;
