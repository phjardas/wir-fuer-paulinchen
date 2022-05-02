import { Card, CardContent, Typography } from "@mui/material";
import { useAuth } from "./auth";
import Loader from "./Loader";
import Login from "./Login";

export default function Protected({ children }) {
  const { loading, authenticated, user } = useAuth();

  if (loading) return <Loader />;
  if (!authenticated) return <Login />;
  if (!user?.roles?.admin) return <Forbidden />;
  return children;
}

function Forbidden() {
  return (
    <Card>
      <CardContent>
        <Typography>Zugriff verweigert</Typography>
      </CardContent>
    </Card>
  );
}
