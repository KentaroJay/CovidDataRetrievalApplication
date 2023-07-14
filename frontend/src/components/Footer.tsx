import { Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { JSX } from "react";

const Footer = (): JSX.Element => {
  return (
    <>
      <Box height={20}></Box>
      <Typography color="text.secondary" align="center">
        {"Copyright © "}
        <RouterLink style={{ color: "inherit" }} to="/">
          Covidsite
        </RouterLink>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </>
  );
};

export default Footer;
