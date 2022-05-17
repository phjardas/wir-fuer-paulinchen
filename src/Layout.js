import {
  Link,
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./auth";
import { auth } from "./firebase";

export default function Layout({ children }) {
  const { authenticated } = useAuth();

  return (
    <>
      <AppBar elevation={0} color="grey">
        <Container maxWidth="sm">
          <Toolbar disableGutters>
            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              Wir für Paulinchen
            </Typography>
            {authenticated && (
              <Box sx={{ ml: "auto" }}>
                <Button component={RouterLink} to="/admin">
                  Admin
                </Button>
                <Button onClick={() => signOut(auth)}>abmelden</Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mt: { xs: "56px", sm: "64px" }, py: 4 }}
      >
        {children}
      </Container>
      <Container component="footer" maxWidth="sm">
        <Box
          component={Typography}
          variant="caption"
          color="textSecondary"
          sx={{ display: "flex", gap: 2 }}
        >
          <Link
            href="https://www.rescuetablet.de/index.php/impressum"
            color="inherit"
          >
            Impressum
          </Link>
          <Link
            href="https://www.rescuetablet.de/index.php/datenschutzerklaerung"
            color="inherit"
          >
            Datenschutz
          </Link>
        </Box>
      </Container>
    </>
  );
}
