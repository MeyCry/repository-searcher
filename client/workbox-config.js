module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{css,png,ico,svg,js}"
  ],
  "swDest": "public/sw.js",
  "runtimeCaching": [{
    urlPattern: /https:\/\/api\.github\.com/,
    handler: "CacheFirst"
  }]
};
