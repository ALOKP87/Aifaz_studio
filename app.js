async function generate() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output");
  const status = document.getElementById("status");

  if (!prompt) {
    alert("Enter prompt first!");
    return;
  }

  status.innerText = "⚡ Generating...";
  output.innerText = "";

  try {
    const res = await puter.ai.chat(
      `Act as a senior React developer.

Build a complete production-ready app with:
- Clean structure
- Components
- Responsive UI
- Modern design

Return ONLY code.

User request:
${prompt}`,
      {
        model: "claude-sonnet-4-6"
      }
    );

    const text =
      res?.message?.content?.[0]?.text ||
      "⚠️ No response received";

    output.innerText = text;
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
