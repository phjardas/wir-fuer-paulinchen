import { Check, Close } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../firebase";
import Loader from "../Loader";
import Protected from "../Protected";

export default function AdminPage() {
  return (
    <Protected>
      <Admin />
    </Protected>
  );
}

const coll = collection(firestore, "submissions");

function Admin() {
  const [{ loading, error, data }, setState] = useState({ loading: true });

  useEffect(() => {
    onSnapshot(
      query(coll),
      ({ docs }) => {
        setState({
          data: docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort(compareSubmissions),
        });
      },
      (error) => setState({ error })
    );
  }, []);

  if (loading) return <Loader />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  return <Submissions submissions={data} />;
}

function Submissions({ submissions }) {
  return (
    <>
      <Typography variant="h5">{submissions.length} Teilnehmer</Typography>
      <Typography>
        Gesamtbetrag: €{" "}
        {submissions.reduce((a, b) => a + b.amount, 0).toLocaleString()}
      </Typography>
      <List>
        {submissions.map((sub, i) => (
          <ListItem
            key={sub.id}
            secondaryAction={<SubmissionActions submission={sub} />}
            divider={i < submissions.length - 1}
            disableGutters
          >
            <Stack spacing={1}>
              <Typography variant="h6">
                {[sub.firstName, sub.lastName].join(" ")}
              </Typography>
              <Typography>€ {sub.amount.toLocaleString()}</Typography>
              <Typography variant="body2">
                <Link href={`mailto:${sub.email}`}>{sub.email}</Link>
              </Typography>
              <Typography variant="body2">
                {sub.phone && (
                  <Link href={`tel:${sub.phone}`}>{sub.phone}</Link>
                )}
              </Typography>
              <Typography variant="caption">
                {new Date(sub.submittedAt.seconds * 1000).toLocaleString()}
              </Typography>
            </Stack>
          </ListItem>
        ))}
      </List>
    </>
  );
}

function SubmissionActions({ submission }) {
  return (
    <Stack direction="row">
      <VerifyButton submission={submission} />
      <RejectButton submission={submission} />
    </Stack>
  );
}

function VerifyButton({ submission: { id, status } }) {
  const verify = useSetStatus(id, "verified");

  return status === "verified" ? (
    <Avatar sx={{ bgcolor: "success.main" }}>
      <Check />
    </Avatar>
  ) : (
    <IconButton color="success" onClick={verify}>
      <Check />
    </IconButton>
  );
}

function RejectButton({ submission: { id, status } }) {
  const verify = useSetStatus(id, "rejected");

  return status === "rejected" ? (
    <Avatar sx={{ bgcolor: "error.main" }}>
      <Close />
    </Avatar>
  ) : (
    <IconButton color="error" onClick={verify}>
      <Close />
    </IconButton>
  );
}

function useSetStatus(id, status) {
  return useCallback(async () => {
    await updateDoc(doc(coll, id), { status });
  }, [id, status]);
}

function compareSubmissions(a, b) {
  const aResolved = Boolean(a.status);
  const bResolved = Boolean(b.status);
  if (aResolved !== bResolved) return aResolved ? 1 : -1;
  return b.submittedAt.seconds - a.submittedAt.seconds;
}
