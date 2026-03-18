import axios from "axios";
import { HttpError } from "../utils/HttpError.js";

const OPENROUTER_BASE_URL = "https://api.openrouter.ai/v1";

function tryParseJson(content) {
  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");
  const jsonString = firstBrace !== -1 && lastBrace !== -1 ? content.slice(firstBrace, lastBrace + 1) : content;

  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

export async function fetchTravelInfoFromOpenRouter(city, model = "gpt-4o-mini") {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new HttpError(500, "OPENROUTER_API_KEY is not set on the server");
  }

  const prompt = `Return travel information for the city in valid JSON only (no markdown, no extra text).

Schema (all keys required):
{
  "weather": {
    "city": string,
    "country": string,
    "description": string,
    "temperatureC": number,
    "feelsLikeC": number,
    "humidity": number,
    "windSpeed": number
  },
  "images": [
    {
      "id": string,
      "alt": string,
      "thumb": string,
      "full": string,
      "creditName": string,
      "creditUrl": string
    }
  ]
}

Rules:
- Use plausible, non-extreme weather values.
- For images, provide 6-9 public image URLs (prefer Unsplash images). thumb and full must be valid URLs.
- creditName and creditUrl should be non-empty.

City: ${city}`;

  try {
    const res = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model,
        messages: [
          { role: "system", content: "You are a helpful travel assistant." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const content = res.data?.choices?.[0]?.message?.content ?? "";
    const parsed = tryParseJson(content);

    if (!parsed?.weather || !Array.isArray(parsed?.images)) {
      throw new HttpError(502, "OpenRouter returned invalid JSON structure");
    }

    return parsed;
  } catch (err) {
    const status = err?.response?.status;
    if (status) {
      const details = err?.response?.data;
      throw new HttpError(status, typeof details === "string" ? details : "OpenRouter request failed");
    }

    const code = err?.code;
    if (code === "ENOTFOUND") {
      throw new HttpError(502, "Cannot resolve api.openrouter.ai (DNS). Check network/DNS.");
    }

    throw new HttpError(502, err?.message || "OpenRouter request failed");
  }
}
