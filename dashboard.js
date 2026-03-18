(function () {
  const LOGIN_KEY = "tv_logged_in";
  const PROFILE_KEY = "tv_profile";

  const isLoggedIn = localStorage.getItem(LOGIN_KEY) === "true";
  if (!isLoggedIn) {
    window.location.replace("login.html?next=dashboard.html");
    return;
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const profileNameEl = document.getElementById("profileName");
  const lastLoginEl = document.getElementById("profileLastLogin");
  const clearBtn = document.getElementById("clearProfileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const safeParse = (value, fallback) => {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const profile = safeParse(localStorage.getItem(PROFILE_KEY), null);
  if (profileNameEl) profileNameEl.textContent = profile?.username || "User";
  if (lastLoginEl) {
    lastLoginEl.textContent = profile?.lastLogin
      ? new Date(profile.lastLogin).toLocaleString()
      : "—";
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem(PROFILE_KEY);
      if (profileNameEl) profileNameEl.textContent = "User";
      if (lastLoginEl) lastLoginEl.textContent = "—";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(LOGIN_KEY);
      window.location.href = "login.html";
    });
  }
})();
