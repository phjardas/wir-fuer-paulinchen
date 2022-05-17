import { Send, VolunteerActivism } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { firestore } from "../firebase";

const events = [
  "Erste Veranstaltung",
  "Zweite Veranstaltung",
  "Dritte Veranstaltung",
];

yup.setLocale({
  mixed: {
    required: "Bitte füllen Sie dieses Feld aus.",
  },
  string: {
    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  },
});

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string(),
  event: yup.string().oneOf(events).required(),
  amount: yup.number().integer().required(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  event: "",
  amount: "",
};

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <Success />
  ) : (
    <Entry onSubmitted={() => setSubmitted(true)} />
  );
}

function Success() {
  return (
    <Stack spacing={3} sx={{ alignItems: "center" }}>
      <VolunteerActivism sx={{ fontSize: "5rem", color: "primary.main" }} />
      <Typography variant="h4">Vielen Dank für deine Teilnahme!</Typography>
      <Button variant="contained" href="https://wir-fuer-paulinchen.de/">
        Zurück
      </Button>
    </Stack>
  );
}

function Entry({ onSubmitted }) {
  const onSubmit = useCallback(
    async (values, { setSubmitting, setStatus }) => {
      setStatus();
      try {
        await addDoc(collection(firestore, "submissions"), {
          ...values,
          submittedAt: serverTimestamp(),
        });
        onSubmitted();
      } catch (error) {
        console.error("error:", error);
        setStatus(error);
        setSubmitting(false);
      }
    },
    [onSubmitted]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid, status, values }) => (
        <Form autoComplete="off">
          <Stack
            component="fieldset"
            spacing={3}
            sx={{ m: 0, p: 0, border: "none" }}
            disabled={isSubmitting}
          >
            <Typography variant="h5">
              Gewinne einen original Amerikanischen Feuerwehrhelm des Typs
              Bullard UST – Sondermodell “Never Forget 9/11”
            </Typography>
            <Typography>
              Schon mit einem Loskauf ab € 2 kommt dein Los in den großen
              Lostopf und hat die Chance auf den Gewinn dieses Sondermodells des
              Bullard UST, das den 343 verstorbenen Feuerwehrleuten des
              Einsatzes der Terroranschläge am 11. September 2001 gewidmet ist.
              Bei höheren Beträgen erhöht sich die Anzahl der Lose entsprechend
              des Betrages je zwei Euro (€ 10 = 5 Lose, € 30 = 15 Lose, etc.).
            </Typography>
            <Typography>
              Alle Einnahmen der Aktion gehen 100% zu Gunsten von „Paulinchen –
              Initiative für brandverletzte Kinder e.V.“!
            </Typography>
            <Field
              name="firstName"
              label="Vorname"
              component={TextField}
              fullWidth
              required
            />
            <Field
              name="lastName"
              label="Nachname"
              component={TextField}
              fullWidth
              required
            />
            <Field
              name="email"
              label="E-Mail-Adresse"
              type="email"
              component={TextField}
              fullWidth
              required
            />
            <Field
              name="phone"
              label="Telefonnummer"
              type="phone"
              component={TextField}
              fullWidth
            />
            <Field
              name="event"
              label="Veranstaltung"
              component={Select}
              fullWidth
              required
            >
              {events.map((event) => (
                <MenuItem value={event} key={event}>
                  {event}
                </MenuItem>
              ))}
            </Field>
            <Field
              name="amount"
              label="Spendenbetrag"
              type="number"
              component={TextField}
              fullWidth
              required
              helperText={
                values.amount
                  ? `Entspricht ${Math.floor(values.amount / 2)} Losen`
                  : undefined
              }
              inputProps={{ min: 2, step: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
          </Stack>
          {status && <Alert severity="error">{status.message}</Alert>}
          <Box sx={{ py: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              startIcon={<Send />}
              loading={isSubmitting}
              loadingPosition="start"
              disabled={!isValid}
            >
              Am Gewinnspiel teilnehmen
            </LoadingButton>
            <Button type="reset">Formular zurücksetzen</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
