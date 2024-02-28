"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100" , "300" , "400" , "500" , "700" , "900"],
  subsets: ['latin'],
  display: 'swap',
});

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
    fontFamily: roboto.style.fontFamily,
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
