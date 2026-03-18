(function () {
  const LOGIN_KEY = "tv_logged_in";
  const PROFILE_KEY = "tv_profile";

  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorEl = document.getElementById("loginError");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const params = new URLSearchParams(window.location.search);
  const next = params.get("next") || "dashboard.html";

  const showError = (message) => {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.style.display = "block";
  };

  const clearError = () => {
    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.style.display = "none";
  };

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearError();

    const username = (usernameInput?.value || "").trim();
    const password = (passwordInput?.value || "").trim();

    if (!username || !password) {
      showError("Please enter username and password.");
      return;
    }

    localStorage.setItem(LOGIN_KEY, "true");
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({
        username,
        lastLogin: new Date().toISOString(),
      })
    );
    window.location.href = next;
  });
})();
