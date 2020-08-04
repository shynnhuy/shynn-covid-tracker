import { render } from "react-dom";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import App from "./App.jsx";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Varela Round", sans-serif;`,
    fontSize: 16,
  },
});

// console.log(theme);

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
