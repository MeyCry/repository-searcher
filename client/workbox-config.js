module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{html,css,png,ico,svg,js}"
  ],
  "swDest": "public/sw.js",
  "runtimeCaching": [{
    urlPattern: /https:\/\/api\.github\.com/,
    handler: "CacheFirst"
  }]
};
