import {
  createTheme,
  CssBaseline,
  darken,
  GlobalStyles as MuiGlobalStyles,
  lighten,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { blueGrey, purple } from "@mui/material/colors";
import { useCallback, useMemo } from "react";

export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            primary: blueGrey,
            secondary: purple,
          },
          components: {
            MuiButton: {
              styleOverrides: {
                root: {
                  textTransform: "initial",
                  borderRadius: 20,
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
                  borderRadius: 20,
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
        <GlobalStyles />
        {children}
      </>
    </MuiThemeProvider>
  );
}

export function lightenColor(theme, color, coefficient) {
  const fn = theme.palette.mode === "dark" ? darken : lighten;
  return fn(color, coefficient);
}

function GlobalStyles() {
  const styles = useCallback(
    (theme) => ({
      body: {
        backgroundColor: lightenColor(theme, theme.palette.primary.light, 0.8),
      },
    }),
    []
  );

  return <MuiGlobalStyles styles={styles} />;
}
