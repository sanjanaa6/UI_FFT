import { HttpError } from "../utils/HttpError.js";
import { fetchTravelInfoFromOpenRouter } from "../services/openRouterService.js";

export async function getCityTravelInfo(req, res, next) {
  try {
    const city = String(req.query.city ?? "").trim();
    if (!city) {
      throw new HttpError(400, "Query param 'city' is required");
    }

    if (city.length > 80) {
      throw new HttpError(400, "City name is too long");
    }

    const data = await fetchTravelInfoFromOpenRouter(city);

    res.json({
      city: data.weather.city,
      country: data.weather.country,
      weather: data.weather,
      images: data.images,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
}
