import { Send, VolunteerActivism } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
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

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string(),
  event: yup.string().oneOf(events).required(),
  amount: yup.number().min(1).integer().required(),
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
    <Success reset={() => setSubmitted(false)} />
  ) : (
    <Entry onSubmitted={() => setSubmitted(true)} />
  );
}

function Success({ reset }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <VolunteerActivism sx={{ fontSize: "5rem", color: "primary.main" }} />
          <Typography variant="h4">Vielen Dank für deine Teilnahme!</Typography>
          <Button variant="contained" onClick={reset}>
            Weiter
          </Button>
        </Stack>
      </CardContent>
    </Card>
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
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid, status }) => (
          <Form noValidate autoComplete="off">
            <CardContent>
              <Stack
                component="fieldset"
                spacing={3}
                sx={{ m: 0, p: 0, border: "none" }}
                disabled={isSubmitting}
              >
                <Typography>
                  Schön dass du bei unserem Gewinnspiel teilnimmst!
                  Blablabla&hellip;
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
                  min="1"
                  step="1"
                  component={TextField}
                  fullWidth
                  required
                  helperText="Bitte nur ganzzahlige Beträge"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </CardContent>
            {status && <Alert severity="error">{status.message}</Alert>}
            <CardActions>
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
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
