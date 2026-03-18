import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(process.cwd()));

app.post("/api/openrouter/chat", async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY is not set on the server. Create a .env file.",
      });
    }

    const { prompt, model } = req.body ?? {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'prompt'" });
    }

    let openRouterResponse;
    try {
      openRouterResponse = await fetch(
        "https://api.openrouter.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: typeof model === "string" && model.trim() ? model : "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful travel assistant." },
              { role: "user", content: prompt },
            ],
          }),
        }
      );
    } catch (err) {
      const anyErr = /** @type {any} */ (err);
      const cause = anyErr?.cause;
      const code = cause?.code || anyErr?.code;
      const message = anyErr?.message || String(anyErr);
      const causeMessage = cause?.message;

      // Most common cases:
      // - ENOTFOUND: DNS resolution failed
      // - ECONNRESET / ETIMEDOUT: network blocked/unstable
      return res.status(502).json({
        error: "Unable to reach OpenRouter from server",
        details: {
          message,
          code,
          causeMessage,
        },
      });
    }

    const text = await openRouterResponse.text();

    if (!openRouterResponse.ok) {
      return res.status(openRouterResponse.status).json({
        error: `OpenRouter request failed (${openRouterResponse.status})`,
        details: text,
      });
    }

    try {
      const json = JSON.parse(text);
      return res.json(json);
    } catch {
      return res.status(502).json({
        error: "Invalid JSON received from OpenRouter",
        details: text,
      });
    }
  } catch (err) {
    const anyErr = /** @type {any} */ (err);
    return res.status(500).json({
      error: "Unexpected server error",
      details: {
        message: anyErr?.message ?? String(anyErr),
      },
    });
  }
});

app.listen(port, () => {
  console.log(`TravelHub server running at http://localhost:${port}`);
});
