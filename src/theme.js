import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { useMemo } from "react";

export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            primary: { main: "#c00000" },
            secondary: purple,
            grey: { main: "#f6f7ff" },
          },
          typography: {
            fontFamily: "Krub,Roboto,Helvetica,Arial,sans-serif",
          },
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  textTransform: "initial",
                  borderRadius: 5,
                  padding: "6px 20px",
                },
                contained: {
                  boxShadow: "none",
                },
              },
            },
            MuiCard: {
              defaultProps: {
                elevation: 0,
              },
              styleOverrides: {
                root: {
                  borderRadius: 5,
                },
              },
            },
            MuiCardContent: {
              styleOverrides: {
                root: {
                  padding: 24,
                },
              },
            },
            MuiCardActions: {
              styleOverrides: {
                root: {
                  padding: 16,
                },
              },
            },
          },
        })
      ),
    [prefersDarkMode]
  );

  if (process.env.NODE_ENV === "development") console.log("Theme:", theme);

  return (
    <MuiThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {children}
      </>
    </MuiThemeProvider>
  );
}
