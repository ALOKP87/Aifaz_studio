export async function runAI(prompt) {
  try {
    const res = await puter.ai.chat(prompt, {
      model: "claude-sonnet-4-6"
    });

    return res?.message?.content?.[0]?.text || "No response";

  } catch (e) {
    return "AI Error";
  }
}
