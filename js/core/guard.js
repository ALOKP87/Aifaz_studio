import { app } from "./firebase-init.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

export async function checkAccess() {
  const user = auth.currentUser;

  if (!user) return false;

  const ref = doc(db, "usersauth", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return true;
  } else {
    alert("Access denied");
    return false;
  }
}
