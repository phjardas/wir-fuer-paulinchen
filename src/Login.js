import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { auth } from "./firebase";

export default function Login() {
  const [pending, setPending] = useState(false);

  const signInGoogle = useCallback(async () => {
    setPending(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } finally {
      setPending(false);
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center", py: 2 }}>
          <Typography>Bitte melde dich an.</Typography>
          <LoadingButton
            variant="contained"
            size="large"
            loading={pending}
            onClick={signInGoogle}
          >
            Mit Google anmelden
          </LoadingButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
