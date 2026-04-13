import { p1 } from "./core/part1.js";
import { p2 } from "./core/part2.js";
import { p3 } from "./core/part3.js";

const firebaseConfig = {
  apiKey: p1.a,
  authDomain: p3.c,
  projectId: p2.b,
  messagingSenderId: p3.d,
  appId: p3.e
};

// Firebase init
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

export const app = initializeApp(firebaseConfig);
