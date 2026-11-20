(() => {
  const root = document.documentElement;
  const button = document.getElementById("theme");
  const storageKey = "sek-theme";

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") root.dataset.theme = savedTheme;
  } catch (_) {}

  function syncThemeButton() {
    if (!button) return;
    const isDark = root.dataset.theme === "dark";
    button.textContent = isDark ? "☼" : "◐";
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  syncThemeButton();
  button?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(storageKey, root.dataset.theme); } catch (_) {}
    syncThemeButton();
  });
})();