const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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"
});

// POST route to send a message to ChatGPT
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t-chimera:free", // can also be used gpt 4 but it is paid
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Something went wrong with Ai", details: err.message });
  }
});

module.exports = router;
