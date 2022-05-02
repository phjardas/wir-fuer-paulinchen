import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export function useAuth() {
  const [state, setAuthState] = useState({
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthState({
          loading: false,
          authenticated: true,
          user: await loadUser(user),
        });
      } else {
        setAuthState({ loading: false, authenticated: false });
      }
    });
  }, []);

  return state;
}

async function loadUser(user) {
  const ref = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(ref);

  if (userDoc.exists()) {
    return { ...userDoc.data(), id: user.uid, displayName: user.displayName };
  }

  const data = { roles: {}, displayName: user.displayName };
  await setDoc(ref, data);
  return { ...data, id: user.uid };
}
