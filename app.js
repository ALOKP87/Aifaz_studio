import { login } from "./auth.js";
import { checkAccess } from "./guard.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();

// ✅ Bind button after load
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");

  if (btn) {
    btn.addEventListener("click", startApp);
  }
});

// ✅ Login Flow
async function startApp() {
  try {
    const user = await login();
    if (!user) return;

    const ok = await checkAccess();
    if (!ok) return;

    showApp();

  } catch (e) {
    alert("Login failed: " + e.message);
  }
}

// ✅ Auto login (important)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const ok = await checkAccess();
    if (ok) {
      showApp();
    }
  }
});

// ✅ Show App
function showApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}  document.getElementById("status").innerText="Generating...";

  const code = await runAI(buildPrompt(input,mode));

  document.getElementById("codeTab").innerText = code;
  document.getElementById("previewFrame").srcdoc = code;

  saveHistory(code);
}

window.copyCode = function(){
  navigator.clipboard.writeText(
    document.getElementById("codeTab").innerText
  );
}

window.downloadCode = function(){
  const blob = new Blob(
    [document.getElementById("codeTab").innerText],
    {type:"text/html"}
  );

  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="app.html";
  a.click();
}

window.fixCode = async function(){
  const code=document.getElementById("codeTab").innerText;

  const fixed = await runAI("Fix this code:\n"+code);

  document.getElementById("codeTab").innerText=fixed;
}

function saveHistory(code){
  let h=JSON.parse(localStorage.getItem("h")||"[]");
  h.unshift(code);
  localStorage.setItem("h",JSON.stringify(h));

  renderHistory();
}

function renderHistory(){
  const h=JSON.parse(localStorage.getItem("h")||"[]");

  document.getElementById("history").innerHTML =
    h.map(c=>`<div onclick="loadHist(this)">${c.substring(0,50)}</div>`).join("");
}

window.loadHist = function(el){
  document.getElementById("codeTab").innerText = el.innerText;
}

window.toggleTheme = function(){
  document.body.classList.toggle("light");
}    output.innerText = text;
    status.innerText = "✅ Generated successfully!";

  } catch (err) {
    status.innerText = "❌ Error: " + err.message;
  }
}

function copyCode() {
  const text = document.getElementById("output").innerText;

  if (!text) return alert("Nothing to copy!");

  navigator.clipboard.writeText(text);
  alert("✅ Code copied!");
}

function previewCode() {
  const code = document.getElementById("output").innerText;
  const iframe = document.getElementById("preview");

  if (!code) {
    alert("Generate code first!");
    return;
  }

  iframe.srcdoc = code;
}
