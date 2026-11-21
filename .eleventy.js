import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2": "assets/fonts/inter-latin-wght-normal.woff2",
    "node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2": "assets/fonts/inter-latin-ext-wght-normal.woff2",
    "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2": "assets/fonts/jetbrains-mono-latin-wght-normal.woff2",
    "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-ext-wght-normal.woff2": "assets/fonts/jetbrains-mono-latin-ext-wght-normal.woff2",
    "node_modules/@fontsource-variable/inter/LICENSE": "assets/fonts/inter-OFL.txt",
    "node_modules/@fontsource-variable/jetbrains-mono/LICENSE": "assets/fonts/jetbrains-mono-OFL.txt"
  });

  const icons = {
    moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
    "arrow-left": '<path d="m12 19-7-7 7-7M5 12h14"/>',
    "arrow-right": '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    "arrow-up": '<path d="m5 12 7-7 7 7M12 5v14"/>',
    "share-2": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.4"/>'
  };
  eleventyConfig.addShortcode("icon", (name) => {
    const paths = icons[name];
    if (!paths) return "";
    return `<svg class="icon icon-${name}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  });

  eleventyConfig.addShortcode("responsiveImage", (src, alt, width, height, srcset, sizes = "100vw", loading = "lazy") => {
    const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const eager = loading === "eager";
    const dims = `${Number(width) > 0 ? ` width="${Number(width)}"` : ""}${Number(height) > 0 ? ` height="${Number(height)}"` : ""}`;
    const responsive = srcset ? ` srcset="${esc(srcset)}" sizes="${esc(sizes)}"` : "";
    return `<img src="${esc(src)}" alt="${esc(alt)}"${dims}${responsive} loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""}>`;
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("isoDate", (dateObj) => dateObj ? new Date(dateObj).toISOString() : "");
  eleventyConfig.addFilter("dateISO", (dateObj) => dateObj ? new Date(dateObj).toISOString().slice(0, 10) : "");
  eleventyConfig.addFilter("readableDate", (dateObj) => dateObj ? new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(dateObj) : "");
  eleventyConfig.addFilter("shortDate", (dateObj) => dateObj ? new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit", timeZone: "UTC" }).format(dateObj) : "");
  eleventyConfig.addFilter("pad2", (value) => String(value).padStart(2, "0"));
  eleventyConfig.addFilter("year", (dateObj) => (dateObj ? new Date(dateObj) : new Date()).getUTCFullYear());
  eleventyConfig.addFilter("readTime", (content = "") => {
    const words = String(content).replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
  });

  eleventyConfig.amendLibrary("md", (md) => {
    const defaultImage = md.renderer.rules.image;
    const defaultLinkOpen = md.renderer.rules.link_open;
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const href = tokens[idx].attrGet("href") || "";
      if (/^https?:\/\//i.test(href)) tokens[idx].attrJoin("rel", "external noopener noreferrer");
      return defaultLinkOpen(tokens, idx, options, env, self);
    };
    md.renderer.rules.task_checkbox = (tokens, idx) => tokens[idx].content;
    md.core.ruler.after("inline", "sek-task-lists", (state) => {
      for (let i = 0; i < state.tokens.length; i++) {
        const inline = state.tokens[i];
        if (inline.type !== "inline" || !/^\[[ xX]\]\s+/.test(inline.content)) continue;
        const checked = /^\[[xX]\]/.test(inline.content);
        inline.content = inline.content.replace(/^\[[ xX]\]\s+/, "");
        const firstText = inline.children?.find((child) => child.type === "text");
        if (firstText) firstText.content = firstText.content.replace(/^\[[ xX]\]\s+/, "");
        const checkbox = new state.Token("task_checkbox", "", 0);
        checkbox.content = `<input type="checkbox" disabled aria-hidden="true"${checked ? " checked" : ""}> `;
        inline.children = inline.children || [];
        inline.children.unshift(checkbox);
        for (let j = i - 1; j >= 0; j--) {
          if (state.tokens[j].type === "list_item_open") {
            state.tokens[j].attrJoin("class", "task-list-item");
            break;
          }
          if (state.tokens[j].type === "list_item_close") break;
        }
      }
    });
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      token.attrSet("loading", "lazy");
      token.attrSet("decoding", "async");
      token.attrSet("class", "content-image");
      const title = token.attrGet("title") || "";
      const width = title.match(/(?:^|\s)width=(\d+)/);
      const height = title.match(/(?:^|\s)height=(\d+)/);
      if (width) token.attrSet("width", width[1]);
      if (height) token.attrSet("height", height[1]);
      if (width || height) token.attrSet("title", title.replace(/(?:^|\s)(?:width|height)=\d+/g, "").trim());
      return defaultImage(tokens, idx, options, env, self);
    };
  });

  eleventyConfig.addCollection("posts", (api) => api.getFilteredByTag("post").sort((a, b) => b.date - a.date));
  eleventyConfig.addCollection("objects", (api) => api.getFilteredByTag("object").sort((a, b) => b.date - a.date));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "11ty.js", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}