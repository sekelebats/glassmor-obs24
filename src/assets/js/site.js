(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById("theme");
  const storageKey = "sek-theme";

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") root.dataset.theme = savedTheme;
  } catch (_) {}

  function syncThemeButton() {
    if (!themeButton) return;
    const isDark = root.dataset.theme === "dark";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#121212" : "#f8f8f6");
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeButton.setAttribute("aria-pressed", String(isDark));
  }

  syncThemeButton();
  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(storageKey, root.dataset.theme); } catch (_) {}
    syncThemeButton();
  });

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", async () => {
      const status = button.parentElement?.querySelector("[data-share-status]");
      const shareData = {
        title: button.dataset.shareTitle || document.title,
        text: document.querySelector('meta[name="description"]')?.content || document.title,
        url: button.dataset.shareUrl || window.location.href
      };
      const setStatus = (message) => { if (status) status.textContent = message; };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          setStatus("Shared");
          return;
        } catch (error) {
          if (error?.name === "AbortError") return;
        }
      }

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareData.url);
        } else {
          const field = document.createElement("textarea");
          field.value = shareData.url;
          field.setAttribute("readonly", "");
          field.style.position = "absolute";
          field.style.left = "-9999px";
          document.body.appendChild(field);
          field.select();
          const copied = document.execCommand("copy");
          field.remove();
          if (!copied) throw new Error("Copy failed");
        }
        setStatus("Link copied");
      } catch (_) {
        setStatus("Copy not available on this device");
      }
    });
  });
})();