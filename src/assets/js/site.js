(() => {
  const root = document.documentElement;
  const button = document.getElementById("theme");
  const storageKey = "sek-theme";

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      root.dataset.theme = savedTheme;
    }
  } catch (_) {
    // Theme toggle still works when storage is unavailable.
  }

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

  // Lightweight client-side search; the index is generated from Markdown posts.
  const input = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  const status = document.getElementById("search-status");
  const dataNode = document.getElementById("search-data");

  if (input && results && status && dataNode) {
    let posts = [];
    try {
      posts = JSON.parse(dataNode.textContent).map((item) => ({
        title: item.data.title,
        description: item.data.description,
        url: item.url,
        date: new Date(item.date).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit" })
      }));
    } catch (_) {
      status.textContent = "Indeks pencarian tidak dapat dibaca.";
    }

    const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[char]);

    input.addEventListener("input", () => {
      const query = input.value.trim().toLocaleLowerCase("id");
      results.replaceChildren();

      if (!query) {
        status.textContent = "Mulai mengetik untuk mencari tulisan.";
        return;
      }

      const matches = posts.filter((post) =>
        `${post.title} ${post.description}`.toLocaleLowerCase("id").includes(query)
      );

      status.textContent = matches.length
        ? `${matches.length} tulisan ditemukan.`
        : "Tidak ada tulisan yang cocok.";

      results.innerHTML = matches.map((post) => `
        <article class="archive-item">
          <span class="date">${escapeHTML(post.date)}</span>
          <div><h2><a href="${escapeHTML(post.url)}">${escapeHTML(post.title)}</a></h2>
          <p>${escapeHTML(post.description)}</p></div><span class="archive-arrow">↗</span>
        </article>`).join("");
    });
  }
})();