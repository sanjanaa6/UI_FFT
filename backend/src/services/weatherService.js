import axios from "axios";
import { HttpError } from "../utils/HttpError.js";

export async function getCurrentWeatherByCity(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new HttpError(500, "OPENWEATHER_API_KEY is not set on the server");
  }

  try {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
      timeout: 15000,
    });

    const data = res.data;
    return {
      city: data?.name ?? city,
      country: data?.sys?.country ?? "",
      description: data?.weather?.[0]?.description ?? "",
      icon: data?.weather?.[0]?.icon ?? "",
      temperatureC: data?.main?.temp ?? null,
      feelsLikeC: data?.main?.feels_like ?? null,
      humidity: data?.main?.humidity ?? null,
      windSpeed: data?.wind?.speed ?? null,
    };
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404) {
      throw new HttpError(404, "City not found");
    }

    const message = err?.response?.data?.message || err?.message || "Weather request failed";
    throw new HttpError(502, message);
  }
}
