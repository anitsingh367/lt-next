"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#FF0000",
        },
      },
    },
  },
  typography: {
    button: {
      color: "#000000de",
    },
  },
  palette: {
    primary: {
      main: "#29af8a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#435061",
      light: "rgba(67, 80, 97, 12%)",
      contrastText: "#ffffff88",
    },
  },
});
