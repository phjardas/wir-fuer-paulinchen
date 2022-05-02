import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuth } from "./auth";
import { auth } from "./firebase";

export default function Layout({ children }) {
  const { authenticated } = useAuth();

  return (
    <>
      <AppBar elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              Wir für Paulinchen
            </Typography>
            {authenticated && (
              <Box sx={{ ml: "auto" }}>
                <Button component={Link} to="/admin" variant="contained">
                  Admin
                </Button>
                <Button variant="contained" onClick={() => signOut(auth)}>
                  abmelden
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        component="main"
        sx={{ mt: { xs: "56px", sm: "64px" }, py: 4 }}
      >
        {children}
      </Container>
    </>
  );
}
