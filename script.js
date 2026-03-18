(function () {
   const LOGIN_KEY = "tv_logged_in";
   const isLoggedIn = localStorage.getItem(LOGIN_KEY) === "true";
   const isLoginPage = /\/login\.html(?:[?#]|$)/i.test(window.location.pathname);
 
   if (!isLoggedIn && !isLoginPage) {
     const next = window.location.pathname.split("/").pop() || "index.html";
     window.location.replace(`login.html?next=${encodeURIComponent(next)}`);
     return;
   }
 })();

const destinations = [
  {
    id: "goa",
    name: "Goa",
    description:
      "Sun-kissed beaches, spicy cuisine, and a laid-back vibe make Goa a holiday favorite.",
    bestTime: "November - February",
    attractions: ["Calangute Beach", "Fort Aguada", "Anjuna Flea Market", "Dudhsagar Falls"],
    weather: { temp: "30°C", desc: "Warm & breezy" },
    images: [
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "mysore",
    name: "Mysore",
    description:
      "Royal palaces, lush gardens and calm mornings make Mysore a perfect heritage escape.",
    bestTime: "September - March",
    attractions: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens", "St. Philomena's Church"],
    weather: { temp: "26°C", desc: "Pleasant" },
    images: [
      "https://images.unsplash.com/photo-1659126574791-13313aa424bd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "manali",
    name: "Manali",
    description:
      "A mountain haven with snow-covered peaks, adrenaline sports and cozy cafés.",
    bestTime: "October - February",
    attractions: ["Rohtang Pass", "Hadimba Temple", "Solang Valley", "Old Manali"],
    weather: { temp: "5°C", desc: "Chilly" },
    images: [
      "https://images.unsplash.com/photo-1579689189009-874f5cac2db5?q=80&w=1004&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    description:
      "Backwaters, spice gardens, and serene houseboats make Kerala a timeless retreat.",
    bestTime: "October - March",
    attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Fort Kochi", "Periyar Wildlife"],
    weather: { temp: "28°C", desc: "Humid & calm" },
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1701489232332-1c3417cbe116?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Sunrise over the hills",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1400&q=80",
    caption: "Evening street market vibes",
  },
  {
    src: "https://images.unsplash.com/photo-1768667493301-c06605de45f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Coastal path at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    caption: "Mountain lookout point",
  },
  {
    src: "https://images.unsplash.com/photo-1528493695782-15c16f2c42f9?q=80&w=676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Colorful festival scene",
  },
  {
    src: "https://images.unsplash.com/photo-1501594852399-9b80db815224?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Quiet riverside walk",
  },
  {
    src: "https://images.unsplash.com/photo-1763702427799-6d336aae686b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Quiet riverside walk",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1673455002705-6b0b844b556b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Quiet riverside walk",
  },
];

const dom = {
  destGrid: document.getElementById("destGrid"),
  destSearch: document.getElementById("destSearch"),
  destSort: document.getElementById("destSort"),
  destChips: document.getElementById("destChips"),
  favoritesToggle: document.getElementById("favoritesToggle"),
  modal: document.getElementById("destinationModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalBestTime: document.getElementById("modalBestTime"),
  modalAttractions: document.getElementById("modalAttractions"),
  modalWeather: document.getElementById("modalWeather"),
  modalGallery: document.getElementById("modalGallery"),
  planForm: document.getElementById("plannerForm"),
  planResult: document.getElementById("planResult"),
  planSummary: document.getElementById("planSummary"),
  planHighlights: document.getElementById("planHighlights"),
  planReset: document.getElementById("planReset"),
  contactForm: document.getElementById("contactForm"),
  contactSuccess: document.getElementById("contactSuccess"),
  logoutBtn: document.getElementById("logoutBtn"),
  themeToggle: document.getElementById("themeToggle"),
  navToggle: document.querySelector(".nav-toggle"),
  navList: document.querySelector(".nav-list"),
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  year: document.getElementById("year"),
  galleryGrid: document.getElementById("galleryGrid"),
  lightbox: document.getElementById("lightbox"),
  lightboxImg: document.getElementById("lightboxImg"),
  lightboxCaption: document.getElementById("lightboxCaption"),
  toastStack: document.getElementById("toastStack"),
  header: document.querySelector(".site-header"),
  sections: Array.from(document.querySelectorAll("main section[id]")),
  navLinks: Array.from(document.querySelectorAll(".nav-list a[href^='#']")),
};

const state = {
  chipFilter: "",
  showFavoritesOnly: false,
  favorites: new Set(),
};

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function loadFavorites() {
  const stored = safeJsonParse(localStorage.getItem("favorites"), []);
  state.favorites = new Set(Array.isArray(stored) ? stored : []);
}

function persistFavorites() {
  localStorage.setItem("favorites", JSON.stringify(Array.from(state.favorites)));
}

function showToast(title, message = "") {
  if (!dom.toastStack) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div>
      <p>${title}</p>
      ${message ? `<small>${message}</small>` : ""}
    </div>
    <button type="button" aria-label="Dismiss">×</button>
  `;

  const close = () => {
    toast.remove();
  };

  toast.querySelector("button").addEventListener("click", close);
  dom.toastStack.appendChild(toast);

  setTimeout(close, 3200);
}

function setYear() {
  dom.year.textContent = new Date().getFullYear();
}

function toggleFavorite(destinationId) {
  if (state.favorites.has(destinationId)) {
    state.favorites.delete(destinationId);
    showToast("Removed from favorites");
  } else {
    state.favorites.add(destinationId);
    showToast("Saved to favorites");
  }
  persistFavorites();
  renderDestinations(dom.destSearch ? dom.destSearch.value : "");
}

function buildChips() {
  if (!dom.destChips) return;

  dom.destChips.innerHTML = "";
  const all = document.createElement("button");
  all.className = "chip";
  all.type = "button";
  all.textContent = "All";
  all.setAttribute("aria-pressed", state.chipFilter === "" ? "true" : "false");
  all.addEventListener("click", () => {
    state.chipFilter = "";
    buildChips();
    renderDestinations(dom.destSearch.value);
  });
  dom.destChips.appendChild(all);

  destinations.forEach((dest) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = dest.name;
    chip.setAttribute("aria-pressed", state.chipFilter === dest.id ? "true" : "false");
    chip.addEventListener("click", () => {
      state.chipFilter = state.chipFilter === dest.id ? "" : dest.id;
      buildChips();
      renderDestinations(dom.destSearch.value);
    });
    dom.destChips.appendChild(chip);
  });
}

function buildDestinationCard(dest) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  const isFav = state.favorites.has(dest.id);
  card.innerHTML = `
    <div class="card-media" style="background-image:url('${dest.images[0]}')"></div>
    <div class="card-body">
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
      <div class="card-actions">
        <button class="btn" type="button" data-dest="${dest.id}">View Details</button>
        <button class="btn btn-secondary" type="button" data-fav="${dest.id}" aria-pressed="${isFav}">${isFav ? "★" : "☆"}</button>
      </div>
    </div>
  `;

  card.querySelector("button").addEventListener("click", () => openModal(dest.id));
  const favButton = card.querySelector("button[data-fav]");
  favButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(dest.id);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      openModal(dest.id);
    }
  });

  return card;
}

function applyDestinationFilters(list, query) {
  const q = query.trim().toLowerCase();
  let filtered = list;
  if (q) {
    filtered = filtered.filter((dest) => dest.name.toLowerCase().includes(q));
  }
  if (state.chipFilter) {
    filtered = filtered.filter((dest) => dest.id === state.chipFilter);
  }
  if (state.showFavoritesOnly) {
    filtered = filtered.filter((dest) => state.favorites.has(dest.id));
  }

  const sortValue = dom.destSort ? dom.destSort.value : "featured";
  if (sortValue === "az") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

function renderDestinations(filter = "") {
  const query = filter.trim().toLowerCase();
  dom.destGrid.innerHTML = "";
  const filtered = applyDestinationFilters(destinations, query);
  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = state.showFavoritesOnly
      ? "No favorites yet. Star a destination to save it."
      : "No destinations match that search. Try a different keyword.";
    empty.style.color = "var(--muted)";
    dom.destGrid.appendChild(empty);
    return;
  }

  filtered.forEach((dest) => dom.destGrid.appendChild(buildDestinationCard(dest)));
}

function openModal(destinationId) {
  const dest = destinations.find((d) => d.id === destinationId);
  if (!dest) return;

  dom.modalTitle.textContent = dest.name;
  dom.modalDescription.textContent = dest.description;
  dom.modalBestTime.textContent = dest.bestTime;
  dom.modalWeather.innerHTML = `
    <span class="weather-temp">${dest.weather.temp}</span>
    <span class="weather-desc">${dest.weather.desc}</span>
  `;
  dom.modalAttractions.innerHTML = dest.attractions
    .map((a) => `<li>${a}</li>`)
    .join("");

  dom.modalGallery.innerHTML = dest.images
    .map(
      (src) => `
      <img src="${src}" alt="${dest.name} photo" data-large="${src}" />
    `
    )
    .join("");

  const galleryImgs = dom.modalGallery.querySelectorAll("img");
  galleryImgs.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img.src, `${dest.name} – photo`);
    });
  });

  dom.modal.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => dom.modal.classList.add("open"), 20);
}

function closeModal() {
  dom.modal.hidden = true;
  dom.modal.classList.remove("open");
  document.body.style.overflow = "";
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  dom.themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.documentElement.classList.add("dark");
    dom.themeToggle.textContent = "☀️";
  }
}

function validateForm(form) {
  const fields = Array.from(form.querySelectorAll("input, textarea"));
  const state = { valid: true };

  fields.forEach((field) => {
    const errorEl = field.parentElement.querySelector(".error");
    errorEl.textContent = "";

    if (!field.checkValidity()) {
      state.valid = false;
      if (field.validity.valueMissing) {
        errorEl.textContent = "This field is required.";
      } else if (field.validity.typeMismatch) {
        errorEl.textContent = "Please enter a valid value.";
      } else if (field.validity.rangeOverflow || field.validity.rangeUnderflow) {
        errorEl.textContent = "Value is out of range.";
      }
    }
  });

  return state.valid;
}

function handlePlannerSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateForm(form)) return;

  const dest = document.getElementById("planDestination").value.trim();
  const days = Number(document.getElementById("planDays").value);
  const budget = Number(document.getElementById("planBudget").value);

  const costPerDay = Math.round(budget / days);
  dom.planSummary.textContent = `A ${days}-day trip to ${dest} with a budget of ₹${budget.toLocaleString()} is ready!`;

  dom.planHighlights.innerHTML = `
    <li>Estimated daily spending: ₹${costPerDay.toLocaleString()}</li>
    <li>Book accommodations early for best rates</li>
    <li>Pack a small first-aid kit for peace of mind</li>
  `;

  dom.planResult.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Plan created", "Your quick itinerary is ready below.");
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateForm(form)) return;

  dom.contactSuccess.hidden = false;
  showToast("Message sent", "We will get back to you soon.");
  setTimeout(() => {
    dom.contactSuccess.hidden = true;
    form.reset();
  }, 2500);
}

function setupNavigation() {
  dom.navToggle.addEventListener("click", () => {
    const open = dom.navList.getAttribute("data-open") === "true";
    dom.navList.setAttribute("data-open", (!open).toString());
    dom.navToggle.setAttribute("aria-expanded", (!open).toString());
  });

  document.addEventListener("click", (event) => {
    const open = dom.navList.getAttribute("data-open") === "true";
    if (!open) return;
    const target = event.target;
    if (target.closest(".nav")) return;
    dom.navList.setAttribute("data-open", "false");
    dom.navToggle.setAttribute("aria-expanded", "false");
  });

  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      dom.navList.setAttribute("data-open", "false");
      dom.navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function updateHeaderState() {
  if (!dom.header) return;
  dom.header.classList.toggle("is-scrolled", window.scrollY > 10);
}

function setupScrollSpy() {
  if (!dom.sections.length || !dom.navLinks.length) return;

  const setActive = (id) => {
    dom.navLinks.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${id}`;
      if (isActive) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) {
        setActive(visible.target.id);
      }
    },
    { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -60% 0px" }
  );

  dom.sections.forEach((section) => observer.observe(section));
}

function setupRevealAnimations() {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealEls.length) return;

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function setupCarousel() {
  const carousel = document.getElementById("experienceCarousel");
  const track = document.getElementById("carouselTrack");
  const dots = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  if (!carousel || !track || !dots || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  if (!slides.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = null;
  let isPointerDown = false;
  let startX = 0;
  let deltaX = 0;

  const buildDots = () => {
    dots.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-dot";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.setAttribute("aria-selected", i === index ? "true" : "false");
      b.addEventListener("click", () => {
        goTo(i);
        restart();
      });
      dots.appendChild(b);
    });
  };

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dots.children).forEach((dot, i) => {
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  };

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    update();
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    if (prefersReduced) return;
    stop();
    timer = window.setInterval(next, 5200);
  };

  const restart = () => {
    stop();
    start();
  };

  prevBtn.addEventListener("click", () => {
    prev();
    restart();
  });
  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  carousel.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    startX = e.clientX;
    deltaX = 0;
    stop();
    carousel.setPointerCapture(e.pointerId);
  });

  carousel.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    deltaX = e.clientX - startX;
  });

  carousel.addEventListener("pointerup", () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    const threshold = 40;
    if (deltaX > threshold) {
      prev();
    } else if (deltaX < -threshold) {
      next();
    }
    start();
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prev();
      restart();
    }
    if (e.key === "ArrowRight") {
      next();
      restart();
    }
  });

  buildDots();
  update();
  start();
}

function setupLightbox() {
  const closeAll = (event) => {
    if (event.target.dataset.close === "true") {
      dom.lightbox.hidden = true;
    }
  };

  dom.lightbox.addEventListener("click", closeAll);
}

function openLightbox(src, caption) {
  dom.lightboxImg.src = src;
  dom.lightboxCaption.textContent = caption;
  dom.lightbox.hidden = false;
}

function renderGallery() {
  dom.galleryGrid.innerHTML = galleryImages
    .map(
      (item) => `
      <div class="gallery-item" data-src="${item.src}" data-caption="${item.caption}">
        <img src="${item.src}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-overlay"><span>View</span></div>
      </div>
    `
    )
    .join("");

  dom.galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      openLightbox(item.dataset.src, item.dataset.caption);
    });
  });
}

function setupHandlers() {
  if (dom.destSearch) {
    dom.destSearch.addEventListener("input", () => {
      renderDestinations(dom.destSearch.value);
    });
  }

  if (dom.destSort) {
    dom.destSort.addEventListener("change", () => {
      renderDestinations(dom.destSearch ? dom.destSearch.value : "");
    });
  }

  if (dom.favoritesToggle) {
    dom.favoritesToggle.addEventListener("click", () => {
      state.showFavoritesOnly = !state.showFavoritesOnly;
      dom.favoritesToggle.setAttribute("aria-pressed", state.showFavoritesOnly.toString());
      dom.favoritesToggle.textContent = state.showFavoritesOnly ? "Show All" : "Show Favorites";
      renderDestinations(dom.destSearch ? dom.destSearch.value : "");
    });
  }

  if (dom.searchBtn && dom.destSearch) {
    dom.searchBtn.addEventListener("click", () => {
      dom.destSearch.focus();
    });
  }

  if (dom.modal) {
    dom.modal.addEventListener("click", (event) => {
      if (event.target.dataset.close === "true") {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      if (dom.lightbox) dom.lightbox.hidden = true;
      if (dom.navList) dom.navList.setAttribute("data-open", "false");
      if (dom.navToggle) dom.navToggle.setAttribute("aria-expanded", "false");
    }
  });

  if (dom.planForm) {
    dom.planForm.addEventListener("submit", handlePlannerSubmit);
  }
  if (dom.planReset) {
    dom.planReset.addEventListener("click", () => {
      if (dom.planResult) dom.planResult.hidden = true;
      if (dom.planForm) dom.planForm.reset();
    });
  }

  if (dom.contactForm) {
    dom.contactForm.addEventListener("submit", handleContactSubmit);
  }

  if (dom.themeToggle) {
    dom.themeToggle.addEventListener("click", toggleTheme);
  }

  if (dom.logoutBtn) {
    dom.logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("tv_logged_in");
      window.location.href = "login.html";
    });
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function init() {
  setYear();
  loadTheme();
  loadFavorites();
  buildChips();
  updateHeaderState();
  setupScrollSpy();
  setupRevealAnimations();
  setupCarousel();
  renderDestinations();
  renderGallery();
  setupHandlers();
  setupNavigation();
  setupLightbox();
}

init();
