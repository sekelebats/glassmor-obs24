import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit", month: "long", year: "numeric", timeZone: "UTC"
    }).format(dateObj);
  });

  eleventyConfig.addFilter("shortDate", (dateObj) => {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit", month: "2-digit", year: "2-digit", timeZone: "UTC"
    }).format(dateObj);
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    const d = dateObj ? new Date(dateObj) : new Date();
    return d.getUTCFullYear();
  });

  eleventyConfig.addFilter("readTime", (content = "") => {
    const words = String(content).replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 220));
  });

  eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value));

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "11ty.js", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}