const REWRITE_MODES = {
  paraphrase: "Rewrite the text with different wording while preserving meaning.",
  summarize: "Summarize the text into a shorter version covering key points.",
  formal: "Rewrite the text to sound more formal and professional.",
  concise: "Rewrite the text to be more concise while preserving core meaning.",
  translate_en: "Translate the text into natural English.",
};

const MAX_TEXT_LENGTH = 3000;

export async function rewriteText(req, res) {
  const { text, mode } = req.body ?? {};
  const normalizedText = typeof text === "string" ? text.trim() : "";

  if (!normalizedText) {
    return res.status(400).json({ error: "Text is required" });
  }

  if (normalizedText.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({ error: `Text cannot exceed ${MAX_TEXT_LENGTH} characters` });
  }

  if (!mode || typeof mode !== "string" || !REWRITE_MODES[mode]) {
    return res.status(400).json({ error: "Invalid mode" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "AI service is not configured" });
  }

  const prompt = [
    "You are a writing assistant.",
    "Only transform the user text according to the requested mode.",
    "Do not add explanations, labels, bullet points, or extra commentary.",
    "Return only the transformed text.",
    `Mode: ${mode} - ${REWRITE_MODES[mode]}`,
    "User text:",
    normalizedText,
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_REWRITE_MODEL || "gpt-4.1-mini",
      input: prompt,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[ai-rewrite] provider error", detail);
    return res.status(502).json({ error: "AI provider request failed" });
  }

  const payload = await response.json();
  const result = payload.output_text?.trim();

  if (!result) {
    console.error("[ai-rewrite] empty provider response", payload);
    return res.status(502).json({ error: "AI provider returned empty result" });
  }

  return res.json({ result });
}
