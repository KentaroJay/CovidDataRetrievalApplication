import { Typography, Box, ImageListItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { JSX } from "react";
import tutorial from "../assets/tutorial.png";

const Home = (): JSX.Element => {
  // Setting for Redux.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: "Home" });
  }, [dispatch]);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Covidsite for tracking covid cases in the world
      </Typography>
      <Typography>
        Go to the <RouterLink to="/statistics">Statistics</RouterLink> page to
        retrieve data about covid.
      </Typography>
      <Typography variant="h2">Detail</Typography>
      <Typography>There is:</Typography>
      <Typography component={"ul"}>
        <Typography component={"li"}>
          {"a Dropdown from which the user can pick a country or the 'world'."}
        </Typography>
        <Typography component={"li"}>
          {"a map shows which country is currently selected"}
        </Typography>
        <Typography component={"li"}>
          {
            "a table displays the different statistics for the world or the selected country."
          }
        </Typography>
      </Typography>
      <Typography>
        Selecting a country from the dropdown menu, the map will then display
        the selected country(As shown below). The table will display the
        statistics of the selected country.
      </Typography>
      <Box sx={{ height: 20 }}></Box>
      <ImageListItem>
        <img src={tutorial} alt="tutorial" />
      </ImageListItem>
    </>
  );
};

export default Home;
