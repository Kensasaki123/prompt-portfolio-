const systemPrompt = (profile) => `You are a concise, friendly portfolio assistant. Answer only from the supplied portfolio data. If the data does not answer a question, say you do not have that information and suggest contacting the portfolio owner. Never invent personal facts, project results, repository URLs, or deployment URLs.\n\nPORTFOLIO DATA:\n${JSON.stringify(profile)}`;

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST to ask the assistant a question." });
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question || question.length > 500) return res.status(400).json({ error: "Enter a question of up to 500 characters." });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "The assistant is not configured yet. Please contact the portfolio owner." });
  const profile = require("../portfolio-data");
  const { email, avatar, ...chatProfile } = profile;
  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-6-luna", instructions: systemPrompt(chatProfile), input: question, max_output_tokens: 350 })
    });
    const result = await upstream.json();
    if (!upstream.ok) return res.status(502).json({ error: "The assistant service had a problem. Please try again later." });
    const answer = (result.output || []).flatMap((item) => item.content || []).filter((part) => part.type === "output_text").map((part) => part.text).join("\n").trim();
    return res.status(200).json({ answer: answer || "I couldn't find an answer in the portfolio information. Please try another question." });
  } catch {
    return res.status(502).json({ error: "The assistant could not be reached. Please try again later." });
  }
};
