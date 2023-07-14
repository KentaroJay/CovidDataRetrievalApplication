import {
  Typography,
  Box,
  MenuItem,
  Menu,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { JSX } from "react";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useFetchCountries, useFetchStatistics } from "../graphql/useCovidApi";
import type { Feature, FeatureCollection } from "geojson";
import type { PathOptions, StyleFunction } from "leaflet";
import Error from "../components/Error";
import "leaflet/dist/leaflet.css";

// Type guarding functions for GeoJSON
const isFeature = (item: any): item is Feature => {
  return item?.type === "Feature";
};
const isFeatureCollection = (item: any): item is FeatureCollection => {
  return item?.type === "FeatureCollection";
};

const Statistics = (): JSX.Element => {
  // Setting for the countries dropdown menu.
  // Countries are fetched from the GraphQL API to relflect the latest data.
  //
  //
  // countries is for storing the countries fetched from the GraphQL API.
  const [dropdownMenuCountries, setDropdownMenuCountries] = useState<
    string[] | null[]
  >([]);
  // selectedCountry is for storing the country selected from the dropdown menu.
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  // anchorEl is for storing the anchor element of the dropdown menu.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // open is for storing whether the dropdown menu is open or not.
  const open = Boolean(anchorEl);
  // handleClick, handleClose, and itemClicked are for handling the dropdown menu.
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const itemClicked = (country: string | null) => {
    setAnchorEl(null);
    setSelectedCountry(country);
  };

  // Setting for GraphQL.
  //
  //
  // fetchCountries is for fetching the countries from the GraphQL API.
  const {
    fetchCountries,
    data: countriesData,
    error: countriesError,
  } = useFetchCountries();
  // fetchStatistics is for fetching the statistics of the selected country
  const {
    fetchStatistics,
    data: statisticsData,
    error: statisticsError,
  } = useFetchStatistics({
    country: selectedCountry != null ? selectedCountry : "",
  });

  // Setting for the map.
  //
  //
  // countriesGrossGeoJSON is for lining all the countries.
  const [countriesGrossGeoJson, setCountriesGrossGeoJson] =
    useState<FeatureCollection | null>(null);
  // selectedCountryGeoJson is for highlighting the selected country.
  const [selectedCountryGeoJson, setSelectedGeoJson] = useState<
    Feature | FeatureCollection | null | undefined
  >(null);
  // style is for styling the map.
  // Seleted country is highlighted in red.
  // Other countries are colored in blue.
  const style: StyleFunction = (feature?: Feature): PathOptions => {
    if (feature?.properties?.name === selectedCountry) {
      return { color: "red" }; // Highlight the selected country in red
    } else {
      return { color: "blue" }; // Color other countries blue
    }
  };

  // When the page is loaded (Done only once)
  useEffect(() => {
    // Fetching countries displayed in the dropdown is
    // used to fetch the countries data once.
    fetchCountries().then(
      () => {},
      () => {}
    );
    // Importing polygon data of all the countries.
    // This is done asynchronously to avoid blocking the rendering
    // since the data is quite large.
    import("../assets/countries.json").then(
      (data: unknown) => {
        setCountriesGrossGeoJson(data as FeatureCollection);
      },
      () => {}
    );
  }, []);

  // When the countriesData is fetched
  useEffect(() => {
    if (countriesData?.countries?.countries != null) {
      // Set the countries as Dropdown Menu.
      setDropdownMenuCountries(
        countriesData.countries.countries.map((country) => country!)
      );
    }
  }, [countriesData]);

  // When the selected country is changed
  useEffect(() => {
    if (selectedCountry != null) {
      // Fetch the statistics of the selected country.
      fetchStatistics().then(
        () => {},
        () => {}
      );
      // Set the selected country's polygon data.
      if (selectedCountry === "World") {
        setSelectedGeoJson(countriesGrossGeoJson);
      } else {
        setSelectedGeoJson(
          countriesGrossGeoJson?.features.find((feature) => {
            return feature.properties?.ADMIN === selectedCountry;
          })
        );
      }
    }
  }, [selectedCountry]);

  // Setting for Redux.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: "Statistics" });
  }, [dispatch]);

  if (countriesError != null || statisticsError != null) return <Error />;

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Statistics
      </Typography>
      <Typography>
        {
          "You can investigate the statistics of the COVID-19 pandemic of one specific country or those of the world."
        }
      </Typography>
      <Typography>
        To do so, select a country from the dropdown menu below.
      </Typography>
      <Typography component={"ul"}>
        <Typography component={"li"}>
          {'If you select "World", you can see the statistics of the world.'}
        </Typography>
        <Typography component={"li"}>
          {
            "If you select a specific country, you can see the statistics of the country."
          }
        </Typography>
      </Typography>
      <Button
        id="dropdown-countries"
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ textTransform: "none", mb: 2 }}
      >
        {selectedCountry != null
          ? "You have selected " + selectedCountry
          : "Select a country"}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "dropdown-countries",
        }}
      >
        {dropdownMenuCountries.map((country) => (
          <MenuItem
            key={country}
            onClick={() => {
              itemClicked(country);
            }}
          >
            {country}
          </MenuItem>
        ))}
      </Menu>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        style={{
          height: "80vmin",
          width: "80vmin",
          maxHeight: "100vh",
          margin: "0 auto",
        }}
        scrollWheelZoom={false}
        touchZoom={false}
        maxBounds={[
          [-90, -180], // South west
          [90, 180], // North east
        ]}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedCountryGeoJson != null &&
          ((isFeature(selectedCountryGeoJson) && (
            <GeoJSON
              key={selectedCountryGeoJson.properties?.ADMIN}
              data={selectedCountryGeoJson}
              style={style}
            />
          )) ||
            (isFeatureCollection(selectedCountryGeoJson) && (
              <GeoJSON
                key={selectedCountryGeoJson.type}
                data={selectedCountryGeoJson}
                style={style}
              />
            )))}
      </MapContainer>
      <Box sx={{ height: 20 }}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Attributes of the data</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(
              statisticsData?.statistics != null
                ? statisticsData?.statistics
                : {
                    'No data to display. Tap "Select a country" above to retrieve data.':
                      "",
                  }
            )
              // Remove the __typename field from the table.
              .filter(([key]) => key !== "__typename")
              .map(([key, value]) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {key}
                  </TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Statistics;
