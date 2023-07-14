import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./utils/reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { ReduxState, ReduxAction } from "./types/states";
import GlobalStyles from "@mui/material/GlobalStyles";

// Define Global Styles
// A tag being colored with the primary color of the theme, and not underlined
const globalStyles = (
  <GlobalStyles
    styles={{
      a: { color: theme.palette.primary.main, textDecoration: "none" },
      h2: { color: theme.palette.secondary.main },
    }}
  />
);

// Define Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

// Defining Redux
const initialState: ReduxState = {
  currentPage: "",
};
const reducer = (state = initialState, action: ReduxAction): ReduxState => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
const store = configureStore({
  reducer,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            {globalStyles}
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
              <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/statistics/`} element={<Statistics />} />
                <Route path={`/contact/`} element={<Contact />} />
                <Route path={`*`} element={<NotFound />} />
              </Routes>
            </Container>
            <Footer />
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
