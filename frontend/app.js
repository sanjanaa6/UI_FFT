import { getFavorites, toggleFavorite, isFavorite, getTheme, setTheme } from "./storage.js";

const els = {
  themeToggle: document.getElementById("themeToggle"),
  favoritesBtn: document.getElementById("favoritesBtn"),
  drawer: document.getElementById("drawer"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  drawerClose: document.getElementById("drawerClose"),
  favoritesList: document.getElementById("favoritesList"),

  searchForm: document.getElementById("searchForm"),
  cityInput: document.getElementById("cityInput"),
  errorBox: document.getElementById("errorBox"),
  loading: document.getElementById("loading"),

  result: document.getElementById("result"),
  resultMeta: document.getElementById("resultMeta"),
  resultCity: document.getElementById("resultCity"),
  resultDesc: document.getElementById("resultDesc"),
  favoriteToggle: document.getElementById("favoriteToggle"),

  statTemp: document.getElementById("statTemp"),
  statFeels: document.getElementById("statFeels"),
  statHumidity: document.getElementById("statHumidity"),
  statWind: document.getElementById("statWind"),

  gallery: document.getElementById("gallery"),

  plannerForm: document.getElementById("plannerForm"),
  planCity: document.getElementById("planCity"),
  planDays: document.getElementById("planDays"),
  planBudget: document.getElementById("planBudget"),
  planResult: document.getElementById("planResult"),

  lightbox: document.getElementById("lightbox"),
  lightboxBackdrop: document.getElementById("lightboxBackdrop"),
  lightboxClose: document.getElementById("lightboxClose"),
  lightboxImg: document.getElementById("lightboxImg"),
  lightboxTitle: document.getElementById("lightboxTitle"),
  lightboxCredit: document.getElementById("lightboxCredit"),
};

function setError(message) {
  els.errorBox.textContent = message;
  els.errorBox.style.display = message ? "block" : "none";
}

function setLoading(loading) {
  els.loading.style.display = loading ? "flex" : "none";
}

function showResult(show) {
  els.result.style.display = show ? "block" : "none";
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function titleCase(str) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function mockDestination(city) {
  const safeCity = city.trim();
  const desc = randomFrom([
    "clear sky",
    "few clouds",
    "scattered clouds",
    "sunny with a light breeze",
    "pleasant and calm",
    "bright day — perfect for walking tours",
  ]);

  const temperatureC = Math.round(randomBetween(18, 34));
  const feelsLikeC = clamp(temperatureC + Math.round(randomBetween(-2, 3)), 10, 45);
  const humidity = clamp(Math.round(randomBetween(35, 88)), 0, 100);
  const windSpeed = Number(randomBetween(1, 8).toFixed(1));

  const images = Array.from({ length: 9 }, (_, i) => {
    const sig = i + 1;
    const q = encodeURIComponent(safeCity);
    return {
      id: `${safeCity.toLowerCase().replace(/\s+/g, "-")}-${sig}`,
      alt: `${safeCity} photo ${sig}`,
      thumb: `https://source.unsplash.com/featured/600x450?${q}&sig=${sig}`,
      full: `https://source.unsplash.com/featured/1400x900?${q}&sig=${sig}`,
      creditName: "Unsplash",
      creditUrl: "https://unsplash.com",
    };
  });

  return {
    city: safeCity,
    description: desc,
    temperatureC,
    feelsLikeC,
    humidity,
    windSpeed,
    images,
  };
}

function renderStats(d) {
  els.resultCity.textContent = d.city;
  els.resultDesc.textContent = titleCase(d.description);

  els.statTemp.textContent = `${d.temperatureC}°C`;
  els.statFeels.textContent = `${d.feelsLikeC}°C`;
  els.statHumidity.textContent = `${d.humidity}%`;
  els.statWind.textContent = `${d.windSpeed} m/s`;
}

function openDrawer() {
  els.drawer.classList.add("open");
  els.drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  els.drawer.classList.remove("open");
  els.drawer.setAttribute("aria-hidden", "true");
}

function openLightbox({ full, alt, creditName, creditUrl }) {
  els.lightboxTitle.textContent = alt || "Preview";
  els.lightboxImg.src = full;
  els.lightboxImg.alt = alt || "";
  els.lightboxCredit.innerHTML = creditName && creditUrl
    ? `Source: <a href='${creditUrl}' target='_blank' rel='noreferrer'>${creditName}</a>`
    : "";

  els.lightbox.classList.add("open");
  els.lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  els.lightbox.classList.remove("open");
  els.lightbox.setAttribute("aria-hidden", "true");
  els.lightboxImg.src = "";
}

function renderGallery(images) {
  els.gallery.innerHTML = "";

  images.slice(0, 9).forEach((img) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile";

    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = img.thumb;
    image.alt = img.alt;

    const label = document.createElement("div");
    label.className = "tile__label";
    label.textContent = img.alt;

    btn.appendChild(image);
    btn.appendChild(label);

    btn.addEventListener("click", () => openLightbox(img));

    els.gallery.appendChild(btn);
  });
}

function updateFavoriteButton(city) {
  const fav = isFavorite(city);
  els.favoriteToggle.textContent = fav ? "Saved" : "Save";
}

function renderFavorites() {
  const favorites = getFavorites();
  els.favoritesList.innerHTML = "";

  if (!favorites.length) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.textContent = "No favorites yet. Save a destination after searching.";
    els.favoritesList.appendChild(empty);
    return;
  }

  favorites.slice().reverse().forEach((city) => {
    const row = document.createElement("div");
    row.className = "favItem";

    const left = document.createElement("div");
    left.textContent = city;

    const actions = document.createElement("div");
    actions.className = "favItem__actions";

    const openBtn = document.createElement("button");
    openBtn.className = "ghost";
    openBtn.type = "button";
    openBtn.textContent = "Open";
    openBtn.addEventListener("click", async () => {
      closeDrawer();
      els.cityInput.value = city;
      await search(city);
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "ghost";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      toggleFavorite(city);
      renderFavorites();
    });

    actions.appendChild(openBtn);
    actions.appendChild(removeBtn);

    row.appendChild(left);
    row.appendChild(actions);

    els.favoritesList.appendChild(row);
  });
}

function generatePlan(destination, days, budget) {
  const perDay = budget / days;

  const themes = {
    morning: ["Local market walk", "Landmark visit", "Museum / heritage tour"],
    afternoon: ["Signature food stop", "City highlights", "Relax at a park"],
    evening: ["Sunset viewpoint", "Street food crawl", "Cultural show"],
  };

  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    return {
      day,
      activities: [
        themes.morning[i % themes.morning.length],
        themes.afternoon[i % themes.afternoon.length],
        themes.evening[i % themes.evening.length],
      ],
      budget: Math.round(perDay),
    };
  });
}

function renderPlan(destination, days, budget) {
  const plan = generatePlan(destination, days, budget);
  els.planResult.innerHTML = "";

  const summary = document.createElement("div");
  summary.className = "dayCard";
  summary.innerHTML = `<div class='dayCard__title'>${destination} • ${days} days</div><div class='muted'>Budget: ₹${budget.toLocaleString()} • ~₹${Math.round(budget / days).toLocaleString()}/day</div>`;
  els.planResult.appendChild(summary);

  plan.forEach((p) => {
    const card = document.createElement("div");
    card.className = "dayCard";

    const title = document.createElement("div");
    title.className = "dayCard__title";
    title.textContent = `Day ${p.day}`;

    const ul = document.createElement("ul");
    p.activities.forEach((a) => {
      const li = document.createElement("li");
      li.textContent = a;
      ul.appendChild(li);
    });

    const budgetEl = document.createElement("div");
    budgetEl.className = "muted";
    budgetEl.textContent = `Suggested daily budget: ₹${p.budget.toLocaleString()}`;

    card.appendChild(title);
    card.appendChild(ul);
    card.appendChild(budgetEl);

    els.planResult.appendChild(card);
  });
}

async function search(city) {
  const query = city.trim();
  if (!query) {
    setError("Please enter a city name.");
    return;
  }

  setError("");
  showResult(false);
  setLoading(true);

  await sleep(650);

  const data = mockDestination(query);
  renderStats(data);
  renderGallery(data.images);

  els.resultMeta.textContent = `Updated ${new Date().toLocaleString()}`;

  els.planCity.value = data.city;
  updateFavoriteButton(data.city);

  els.favoriteToggle.onclick = () => {
    toggleFavorite(data.city);
    updateFavoriteButton(data.city);
    renderFavorites();
  };

  setLoading(false);
  showResult(true);
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    els.themeToggle.innerHTML = "<span aria-hidden='true'>☾</span>";
  } else {
    document.documentElement.removeAttribute("data-theme");
    els.themeToggle.innerHTML = "<span aria-hidden='true'>☀</span>";
  }
}

function initTheme() {
  const saved = getTheme();
  applyTheme(saved);

  els.themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "" : "dark";
    applyTheme(next);
    setTheme(next);
  });
}

function initDrawer() {
  els.favoritesBtn.addEventListener("click", () => {
    renderFavorites();
    openDrawer();
  });

  els.drawerBackdrop.addEventListener("click", closeDrawer);
  els.drawerClose.addEventListener("click", closeDrawer);
}

function initLightbox() {
  els.lightboxBackdrop.addEventListener("click", closeLightbox);
  els.lightboxClose.addEventListener("click", closeLightbox);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeDrawer();
    }
  });
}

function initSearch() {
  els.searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await search(els.cityInput.value);
  });

  document.querySelectorAll("[data-suggest]").forEach((b) => {
    b.addEventListener("click", async () => {
      const v = b.getAttribute("data-suggest") || "";
      els.cityInput.value = v;
      await search(v);
    });
  });
}

function initPlanner() {
  els.plannerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const destination = els.planCity.value.trim();
    const days = Number(els.planDays.value);
    const budget = Number(els.planBudget.value);

    if (!destination || !Number.isFinite(days) || days <= 0 || !Number.isFinite(budget) || budget <= 0) {
      els.planResult.innerHTML = "<div class='alert'>Please enter destination, days, and budget.</div>";
      return;
    }

    renderPlan(destination, days, budget);
  });
}

initTheme();
initDrawer();
initLightbox();
initSearch();
initPlanner();

showResult(false);
setLoading(false);
setError("");
