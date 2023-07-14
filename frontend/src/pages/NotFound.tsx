import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { JSX } from "react";

const NotFound = (): JSX.Element => {
  // Setting for Redux.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: "404" });
  }, [dispatch]);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {"404 Error :("}
      </Typography>
      <Typography>The page you are looking for does not exisit.</Typography>
    </>
  );
};

export default NotFound;
