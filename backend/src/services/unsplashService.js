import axios from "axios";
import { HttpError } from "../utils/HttpError.js";

export async function getDestinationImages(city) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new HttpError(500, "UNSPLASH_ACCESS_KEY is not set on the server");
  }

  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      params: {
        query: city,
        per_page: 9,
        orientation: "landscape",
      },
      timeout: 15000,
    });

    const results = res.data?.results ?? [];
    return results.map((r) => ({
      id: r.id,
      alt: r.alt_description || `${city} photo`,
      thumb: r.urls?.small,
      full: r.urls?.regular,
      creditName: r.user?.name,
      creditUrl: r.user?.links?.html,
    })).filter((x) => x.thumb && x.full);
  } catch (err) {
    const message = err?.response?.data?.errors?.[0] || err?.message || "Unsplash request failed";
    throw new HttpError(502, message);
  }
}
