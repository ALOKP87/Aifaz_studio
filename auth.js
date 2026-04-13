import { app } from "./firebase-init.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function login(){
  const res = await signInWithPopup(auth, provider);
  return res.user;
}
