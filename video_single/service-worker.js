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
    "revision": "7b8a639b8c587e391e26ede283de7815"
  },
  {
    "url": "about/index.html",
    "revision": "e7d766c31af71d72d4cbf5e4ffee2fff"
  },
  {
    "url": "app-icon-144x144.png",
    "revision": "83011e228238e66949f0aa0f28f128ef"
  },
  {
    "url": "app-icon-192x192.png",
    "revision": "f927cb7f94b4104142dd6e65dcb600c1"
  },
  {
    "url": "app-icon-256x256.png",
    "revision": "86c18ed2761e15cd082afb9a86f9093d"
  },
  {
    "url": "app-icon-384x384.png",
    "revision": "fbb29bd136322381cc69165fd094ac41"
  },
  {
    "url": "app-icon-48x48.png",
    "revision": "45eb5bd6e938c31cb371481b4719eb14"
  },
  {
    "url": "app-icon-512x512.png",
    "revision": "d42d62ccce4170072b28e4ae03a8d8d6"
  },
  {
    "url": "app-icon-96x96.png",
    "revision": "56420472b13ab9ea107f3b6046b0a824"
  },
  {
    "url": "assets/css/0.styles.a08094cf.css",
    "revision": "aa69da7959d9f190c278339243751d86"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.e6d9d04d.js",
    "revision": "127fe284bfc4e2079336c4c2f4a4466b"
  },
  {
    "url": "assets/js/2.5d3fa82a.js",
    "revision": "7c52a2f684553917af99d8688767b42d"
  },
  {
    "url": "assets/js/3.a7a0bc1f.js",
    "revision": "d73d30b08837f9b028191fc0a458c3b9"
  },
  {
    "url": "assets/js/4.0d1ff86a.js",
    "revision": "2a34ce0e0d54b3f1be17b028469e6ece"
  },
  {
    "url": "assets/js/5.8267a364.js",
    "revision": "caa6fc4fe18166ba715e59166fe3bc74"
  },
  {
    "url": "assets/js/6.db0e7088.js",
    "revision": "7ab99e333c6427ff2e1e5d476c3419e4"
  },
  {
    "url": "assets/js/7.b477eedb.js",
    "revision": "3e1f4438e1c2d09075dab48ef5b89f1e"
  },
  {
    "url": "assets/js/8.51b0f0ed.js",
    "revision": "8e5a3a98773a74b86572c10796075278"
  },
  {
    "url": "assets/js/9.1de7cc61.js",
    "revision": "78b7e3c84476cfa36ccd765317526855"
  },
  {
    "url": "assets/js/app.5cb4fccb.js",
    "revision": "096f6904c84fdf74782c17570419ea71"
  },
  {
    "url": "category/futurama/index.html",
    "revision": "a30aa7e56a45b608eb2b04f8958eeb6e"
  },
  {
    "url": "category/index.html",
    "revision": "7ec4c0419975f531fd6794d88278e748"
  },
  {
    "url": "cover.jpg",
    "revision": "f55e924eff608d71da37e57b398c587d"
  },
  {
    "url": "index.html",
    "revision": "6b2611f0bc4180ed3474db8c63a151fc"
  },
  {
    "url": "logo.png",
    "revision": "2b5eaa0de166a8b5faebad4955c2200c"
  },
  {
    "url": "maskable_icon_x128.png",
    "revision": "e8effd8f0122b90c5f52ef64958e9d95"
  },
  {
    "url": "maskable_icon_x192.png",
    "revision": "8ddbae59e40609a551e70bc26c3003bd"
  },
  {
    "url": "maskable_icon_x384.png",
    "revision": "80c6c0587dcf84bb540bbc078847c3b5"
  },
  {
    "url": "maskable_icon_x48.png",
    "revision": "e494934c181624089ba9e154b6091d6f"
  },
  {
    "url": "maskable_icon_x512.png",
    "revision": "cdeccc27507bf18d9d5897caae746520"
  },
  {
    "url": "maskable_icon_x72.png",
    "revision": "10e3ceaa422e05df11887a338a8fc24a"
  },
  {
    "url": "maskable_icon_x96.png",
    "revision": "8f2efd91762e1cb6855a80f1dc71a816"
  },
  {
    "url": "tag/about/index.html",
    "revision": "a59328e6855eec78f881bf52ee06d609"
  },
  {
    "url": "tag/index.html",
    "revision": "e90b2c8ac914afdb6a794bad2a90c055"
  },
  {
    "url": "tag/test/index.html",
    "revision": "215096b6746093210215113854370f29"
  },
  {
    "url": "video/av1.html",
    "revision": "b1751198da6eba3abef09e95c1ddd856"
  },
  {
    "url": "video/av2.html",
    "revision": "a8820cb79fb427143324c527837a8ffc"
  },
  {
    "url": "video/av3.html",
    "revision": "b9d47f6c4b7a0a7b44ba74af83a3d1a7"
  },
  {
    "url": "video/av4.html",
    "revision": "cc6d489098d23ecf61ef173ed669bac9"
  },
  {
    "url": "video/index.html",
    "revision": "fdba6684b8e4d048f12b829da3bfd8fd"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
