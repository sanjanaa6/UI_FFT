const KEY_FAVORITES = "travelhub:favorites";
const KEY_THEME = "travelhub:theme";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY_FAVORITES);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function setFavorites(list) {
  localStorage.setItem(KEY_FAVORITES, JSON.stringify(list));
}

export function toggleFavorite(city) {
  const favorites = getFavorites();
  const normalized = city.trim();
  const exists = favorites.some((c) => c.toLowerCase() === normalized.toLowerCase());
  const next = exists
    ? favorites.filter((c) => c.toLowerCase() !== normalized.toLowerCase())
    : [...favorites, normalized];
  setFavorites(next);
  return { next, exists: !exists };
}

export function isFavorite(city) {
  const favorites = getFavorites();
  return favorites.some((c) => c.toLowerCase() === city.trim().toLowerCase());
}

export function getTheme() {
  return localStorage.getItem(KEY_THEME) || "";
}

export function setTheme(theme) {
  localStorage.setItem(KEY_THEME, theme);
}
