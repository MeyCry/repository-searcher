/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "02f268252c5a9a99c61654742ecf769c"
  },
  {
    "url": "css/style.css",
    "revision": "9bb5f476bed6554e0e4d1dfe049d8e3b"
  },
  {
    "url": "images/favicons/favicon-16x16.png",
    "revision": "e99a05c05c11de507b174e82757f7200"
  },
  {
    "url": "images/favicons/favicon-32x32.png",
    "revision": "c8606cb88b46c9af76932cac99c27303"
  },
  {
    "url": "images/favicons/favicon.ico",
    "revision": "bd11c6189743404e7cf45a6242130a62"
  },
  {
    "url": "images/github.svg",
    "revision": "c172b5fdb72431eef6f3ca70cc2c3b22"
  },
  {
    "url": "images/iconfinder-error.svg",
    "revision": "b31e9a1edd3e295f41a70d2139cfe884"
  },
  {
    "url": "images/logo.svg",
    "revision": "cfa9f111fdbd9dc2bcff562985f1dc46"
  },
  {
    "url": "index.html",
    "revision": "02f268252c5a9a99c61654742ecf769c"
  },
  {
    "url": "js/index.js",
    "revision": "b940d70622c4b8a378395327ed87d528"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/api\.github\.com/, new workbox.strategies.CacheFirst(), 'GET');
