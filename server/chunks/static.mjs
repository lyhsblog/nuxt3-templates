import { eventHandler, createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"57e-q5kjB17ofg/ZCbQ22XPrxQMkoRQ\"",
    "mtime": "2022-05-09T06:03:05.860Z",
    "path": "../public/favicon.ico"
  },
  "/css/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26eed-Z0ftNnHryOR1syEUZGOTgK480PI\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/bootstrap.min.css"
  },
  "/css/elegant-icons.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"62a4-lc7YguuNUoXq74PoW0Hk8i476CE\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/elegant-icons.css"
  },
  "/css/font-awesome.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7918-USx9eQM+MCipvmG1QM8aaHDIlvg\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/font-awesome.min.css"
  },
  "/css/nice-select.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fa7-kxetKTBrxy6z+pKYG+gUH805Tnw\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/nice-select.css"
  },
  "/css/owl.carousel.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d17-+6RjU8+QRQ7z02KhI/Hnrz6MVh4\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/owl.carousel.min.css"
  },
  "/css/plyr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9307-icjgJLrXXuySGJjK5wJ4XXcnLdo\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/plyr.css"
  },
  "/css/slicknav.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9c9-xU5GyitYZXzpua94jExx2y8lh2g\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/slicknav.min.css"
  },
  "/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9704-9A/T1+FFqwq860bwHQg4fb5fT/I\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/css/style.css"
  },
  "/fonts/ElegantIcons.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"e8b4-OdUTGp/+H8+tKBZTwUlaIq88bko\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/ElegantIcons.eot"
  },
  "/fonts/ElegantIcons.svg": {
    "type": "image/svg+xml",
    "etag": "\"43b31-9NJPC/YwaV+ebFZFAN2kvEVTUFA\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/ElegantIcons.svg"
  },
  "/fonts/ElegantIcons.ttf": {
    "type": "font/ttf",
    "etag": "\"e7fc-64dpqVAQGdpLvwQqdlrUF3g7SSI\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/ElegantIcons.ttf"
  },
  "/fonts/ElegantIcons.woff": {
    "type": "font/woff",
    "etag": "\"f8b0-+b6H+i0dSpXoMFr7UXeNtLx1n7w\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/ElegantIcons.woff"
  },
  "/fonts/fontawesome-webfont.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2876e-2YDCzoc9xDr0YNTVctRBMESZ9AA\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/fontawesome-webfont.eot"
  },
  "/fonts/fontawesome-webfont.svg": {
    "type": "image/svg+xml",
    "etag": "\"6c7db-mKiqXPfWLC7/Xwft6NhEuHTvBu0\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/fontawesome-webfont.svg"
  },
  "/fonts/fontawesome-webfont.ttf": {
    "type": "font/ttf",
    "etag": "\"286ac-E7HqtlqYPHpzvHmXxHnWaUP3xss\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/fontawesome-webfont.ttf"
  },
  "/fonts/fontawesome-webfont.woff": {
    "type": "font/woff",
    "etag": "\"17ee8-KLeCJAs+dtuCThLAJ1SpcxoWdSc\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/fontawesome-webfont.woff"
  },
  "/fonts/fontawesome-webfont.woff2": {
    "type": "font/woff2",
    "etag": "\"12d68-1vSMun0Hb7by/Wupk6dbncHsvww\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/fontawesome-webfont.woff2"
  },
  "/fonts/FontAwesome.otf": {
    "type": "font/otf",
    "etag": "\"20e98-BIcHvFKsS2VjqqODv+hmCg3ckIw\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/fonts/FontAwesome.otf"
  },
  "/img/logo.png": {
    "type": "image/png",
    "etag": "\"332-vX/eKo+/zM11nCOy7SCGbZVwWbA\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/logo.png"
  },
  "/img/normal-breadcrumb.jpg": {
    "type": "image/jpeg",
    "etag": "\"119a6-83MHUYHcHKSJjRxtlWap9diLmQs\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/normal-breadcrumb.jpg"
  },
  "/js/bootstrap.min.js": {
    "type": "application/javascript",
    "etag": "\"ea40-i/CjHFao8EJH2WbLEhZD4F9I99A\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/bootstrap.min.js"
  },
  "/js/jquery-3.3.1.min.js": {
    "type": "application/javascript",
    "etag": "\"1538f-DcMttKqcXwPzs4xH2IPb1P7ROq4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/jquery-3.3.1.min.js"
  },
  "/js/jquery.nice-select.min.js": {
    "type": "application/javascript",
    "etag": "\"b7e-2VRfixOerls4feGmCoSr6UnH6I8\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/jquery.nice-select.min.js"
  },
  "/js/jquery.slicknav.js": {
    "type": "application/javascript",
    "etag": "\"51f1-wtcyPpud+IjHnPq9freJIJUUNZI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/jquery.slicknav.js"
  },
  "/js/main.js": {
    "type": "application/javascript",
    "etag": "\"abb-f3W/Wd9mSeDxHKKBneJDhsm+Eqw\"",
    "mtime": "2022-05-07T04:57:16.668Z",
    "path": "../public/js/main.js"
  },
  "/js/mixitup.min.js": {
    "type": "application/javascript",
    "etag": "\"15bc7-2VILGgXMwXLEJBYfaT+sorfOrFQ\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/mixitup.min.js"
  },
  "/js/owl.carousel.min.js": {
    "type": "application/javascript",
    "etag": "\"ad36-4qYA5DPfcrTP3pPXiA4xFJF6PL4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/owl.carousel.min.js"
  },
  "/js/player.js": {
    "type": "application/javascript",
    "etag": "\"4cb9b-kDcEDR88Q0lTDMK8nW8TRF5o4no\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/js/player.js"
  },
  "/videos/1.mp4": {
    "type": "video/mp4",
    "etag": "\"f7c842-ccfrjoZ9j5GHt/kmq8xlNCN+tR8\"",
    "mtime": "2022-05-05T06:49:57.000Z",
    "path": "../public/videos/1.mp4"
  },
  "/videos/anime-watch.jpg": {
    "type": "image/jpeg",
    "etag": "\"46114-HL9xLMQiOca5dYgS7/pzHXLNSUQ\"",
    "mtime": "2022-05-05T06:49:57.000Z",
    "path": "../public/videos/anime-watch.jpg"
  },
  "/_nuxt/about-04f881ce.mjs": {
    "type": "application/javascript",
    "etag": "\"19c-2b3ys/ZYTUpCvp3RShRQN2Mhbi0\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/about-04f881ce.mjs"
  },
  "/_nuxt/anime-details-ffac75e9.mjs": {
    "type": "application/javascript",
    "etag": "\"234-9scGsCZH+uJQCls+OgknJhYiz5s\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/anime-details-ffac75e9.mjs"
  },
  "/_nuxt/anime-watching-b1748d99.mjs": {
    "type": "application/javascript",
    "etag": "\"1ba-l1m359KNT4+EFdkRWqfXNCbv9wA\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/anime-watching-b1748d99.mjs"
  },
  "/_nuxt/base-a5d39d73.mjs": {
    "type": "application/javascript",
    "etag": "\"4f3-pQWY0VV9G9i+msTvdpvoeeYC8s0\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/base-a5d39d73.mjs"
  },
  "/_nuxt/base.aa8af2b0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e31c-qwQ2a1pJ2DylYYmHLrOCMHpskfg\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/base.aa8af2b0.css"
  },
  "/_nuxt/blog-98a2197e.mjs": {
    "type": "application/javascript",
    "etag": "\"5e9-gCuYtNVB8H6smhXJVCC0xKsfDDY\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/blog-98a2197e.mjs"
  },
  "/_nuxt/blog-details-82b7e5da.mjs": {
    "type": "application/javascript",
    "etag": "\"4b6-lwJR0yluTkM4yjtZW4K/BZQQCEs\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/blog-details-82b7e5da.mjs"
  },
  "/_nuxt/breadcrumb-9bda1287.mjs": {
    "type": "application/javascript",
    "etag": "\"bca1-WAy9gS5YiaIGT7fEw29lm0DhBUM\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/breadcrumb-9bda1287.mjs"
  },
  "/_nuxt/breadcrumb-ef78cb9d.mjs": {
    "type": "application/javascript",
    "etag": "\"bc6f-b6yOKSHiUZZ+KjUwpAFPOpgHs3I\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/breadcrumb-ef78cb9d.mjs"
  },
  "/_nuxt/breadcrumb.d7acab05.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"131ef-J8uJbCCzSTaziAK9QA8UhhvJ+0U\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/breadcrumb.d7acab05.css"
  },
  "/_nuxt/details-484b87f9.mjs": {
    "type": "application/javascript",
    "etag": "\"d78a-5bEgp/nnv/awiYiJHbvxeTDkLNw\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/details-484b87f9.mjs"
  },
  "/_nuxt/details.7bcef812.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"144cc-TKeiPzgPPsS2Uc/5/GoRqf2gbRE\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/details.7bcef812.css"
  },
  "/_nuxt/details.module-7a97fd65.mjs": {
    "type": "application/javascript",
    "etag": "\"2b44-EMVb7TbO/fF6koy3SXHRlS6Bz00\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/details.module-7a97fd65.mjs"
  },
  "/_nuxt/details.module.95cd0708.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a41-A3SBdLKUPWURWcsVagMh1uydD/g\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/details.module.95cd0708.css"
  },
  "/_nuxt/entry-cf157129.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee9f-42JyS6OGdaMfxw2ZLxW1SkR9Pb8\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/entry-cf157129.mjs"
  },
  "/_nuxt/entry.cde02adb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1fcbd-zndRltPjRfGpiHCuhr0D8Cs6eRc\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/entry.cde02adb.css"
  },
  "/_nuxt/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"57e-q5kjB17ofg/ZCbQ22XPrxQMkoRQ\"",
    "mtime": "2022-05-09T06:03:05.860Z",
    "path": "../public/_nuxt/favicon.ico"
  },
  "/_nuxt/footer-7408fe08.mjs": {
    "type": "application/javascript",
    "etag": "\"2ad0-WI6UuEYlj0E9MZVSh3+FWWtCcBQ\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/footer-7408fe08.mjs"
  },
  "/_nuxt/footer.31d171b8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d53-+9ClQ5q9LTbNXT/LM/uCKOhmFc8\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/footer.31d171b8.css"
  },
  "/_nuxt/header-36d352e1.mjs": {
    "type": "application/javascript",
    "etag": "\"314c-60sSFOboKmldOOgKMEgM0BYZ35o\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/header-36d352e1.mjs"
  },
  "/_nuxt/header.5a9f4c47.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7aad-yCMvo4tBUc9d5Qde3rodInnElLQ\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/header.5a9f4c47.css"
  },
  "/_nuxt/hero-036c1190.mjs": {
    "type": "application/javascript",
    "etag": "\"2a7c-ktQcBXvm6Zv7W3aMb9R95ihGA1A\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/hero-036c1190.mjs"
  },
  "/_nuxt/hero.e9c2778a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6762-aij5l0HH2I+mRkZ4oPN6JJOcQr4\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/hero.e9c2778a.css"
  },
  "/_nuxt/hook-64198010.mjs": {
    "type": "application/javascript",
    "etag": "\"cf-3Ll4qldqRHWYJbhF8ScEpelIO3c\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/hook-64198010.mjs"
  },
  "/_nuxt/hook.932f9524.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31-06FaH0ezs3kCVUTIXN8SPFlZ9x4\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/hook.932f9524.css"
  },
  "/_nuxt/index-a1f4dda2.mjs": {
    "type": "application/javascript",
    "etag": "\"278-Kefqcgf34SK9HumQ3YwJJuesfuM\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/index-a1f4dda2.mjs"
  },
  "/_nuxt/index-dac2a7d9.mjs": {
    "type": "application/javascript",
    "etag": "\"3a3d-6DUxRlKL3s8MMnRmN91pacNS19o\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/index-dac2a7d9.mjs"
  },
  "/_nuxt/index.ccdfe0ed.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5c70-cJX1zZ4/kKibwnNbocioTY/opjc\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/index.ccdfe0ed.css"
  },
  "/_nuxt/info-77edd06e.mjs": {
    "type": "application/javascript",
    "etag": "\"a96-Pf4miQcxOOBCv0MhcRI6y2pnbQ8\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/info-77edd06e.mjs"
  },
  "/_nuxt/login-09fd7dc3.mjs": {
    "type": "application/javascript",
    "etag": "\"1ab-EbsMpwh00Pe7Hmm6YuWwOAREQ/c\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/login-09fd7dc3.mjs"
  },
  "/_nuxt/login-df03d913.mjs": {
    "type": "application/javascript",
    "etag": "\"574-/XOK9A5Bz/06st8oXoyADsC4OKg\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/login-df03d913.mjs"
  },
  "/_nuxt/login-f1258c04.mjs": {
    "type": "application/javascript",
    "etag": "\"c13f-2UrDCE04mqyxltwgK7+9ezwunzY\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/login-f1258c04.mjs"
  },
  "/_nuxt/login.3cd88d13.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11201-jEpFxft7hZIy9o9dYo1rLIJpTss\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/login.3cd88d13.css"
  },
  "/_nuxt/login.94182ae2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14036-UhwSx6/EYCxlU04T4kdgEWIe/wU\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/login.94182ae2.css"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"2528-XUv+yHe8TUNI/EB/xktl/XYKY54\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/pagination-aacd394b.mjs": {
    "type": "application/javascript",
    "etag": "\"27f0-lfHI9wAC/pTlsgysXAIXH6jX4T0\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/pagination-aacd394b.mjs"
  },
  "/_nuxt/pagination.190ca005.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"59e4-hPlv0umlNkAuIbKKuJa7jE/6NE4\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/pagination.190ca005.css"
  },
  "/_nuxt/product-5f7b20dd.mjs": {
    "type": "application/javascript",
    "etag": "\"100f1-ackWcuwtFmryPtxxotk5i9cG5zo\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/product-5f7b20dd.mjs"
  },
  "/_nuxt/product.04e4e438.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13f3b-GLKtVZBtAp377rL+CE38yZMbZE8\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/product.04e4e438.css"
  },
  "/_nuxt/review-2734f2c6.mjs": {
    "type": "application/javascript",
    "etag": "\"8e2-2VSFH4i7CFpJySY5HZOwYqwqaZU\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/review-2734f2c6.mjs"
  },
  "/_nuxt/sidebar-9edca6c9.mjs": {
    "type": "application/javascript",
    "etag": "\"858-To4yJhlMki1JhlqDm0sHDgJ9f+c\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/sidebar-9edca6c9.mjs"
  },
  "/_nuxt/sidebar.module-69256e31.mjs": {
    "type": "application/javascript",
    "etag": "\"28b4-l5YagR1bp9oI29mYl187G/9K1sU\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/sidebar.module-69256e31.mjs"
  },
  "/_nuxt/sidebar.module.fadd615a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6729-F838opbmsNcxT/tCkM9nnRr62iY\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/sidebar.module.fadd615a.css"
  },
  "/_nuxt/signup-39d94b7e.mjs": {
    "type": "application/javascript",
    "etag": "\"1b5-/VJDX/y6DCOuXLDYOukihD2ot9M\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/signup-39d94b7e.mjs"
  },
  "/_nuxt/signup-bc26ebcb.mjs": {
    "type": "application/javascript",
    "etag": "\"c0d0-6yOnx6+9qTGwiiOqZ+Rz4bFMlQk\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/signup-bc26ebcb.mjs"
  },
  "/_nuxt/signup.43074213.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"143d8-NdoUbHfypu00Ke39AFS5MDVeEPQ\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/signup.43074213.css"
  },
  "/_nuxt/view-a7dd220f.mjs": {
    "type": "application/javascript",
    "etag": "\"92c-IbtpfaoRzjOCigwWyJFIW4v3xOw\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/view-a7dd220f.mjs"
  },
  "/_nuxt/wapper-333ac493.mjs": {
    "type": "application/javascript",
    "etag": "\"3c4-TUmm0HKmU16pvXzVk0ZZGodjtsw\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/wapper-333ac493.mjs"
  },
  "/_nuxt/wrapper-ef396bfc.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8d4-zFc878F1S2eyHJCDuvuCzZ+JgQU\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/wrapper-ef396bfc.mjs"
  },
  "/_nuxt/wrapper.c2e90a53.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e513-zcTPGn1vRfsISzeIEIMNDniM3O4\"",
    "mtime": "2022-05-10T03:10:40.127Z",
    "path": "../public/_nuxt/wrapper.c2e90a53.css"
  },
  "/img/anime/details-pic.jpg": {
    "type": "image/jpeg",
    "etag": "\"f0a9-VGG5dfEHiBKI+duDSzYsaLVIFVE\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/details-pic.jpg"
  },
  "/img/anime/review-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"f11-BaUEJAwdfupNpVOaFyzyAOvXJ9c\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/review-1.jpg"
  },
  "/img/anime/review-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"d4f-43d7kDTLIBjtWTRC+CuxuEyeX5k\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/review-2.jpg"
  },
  "/img/anime/review-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"de2-Mc/tKGvWjIG32HKpRFlmRxNqqcc\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/review-3.jpg"
  },
  "/img/anime/review-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"9da-rMTbwI/gB15VT0V3Fr9kuyIvhgY\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/review-4.jpg"
  },
  "/img/anime/review-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"11bf-jFJV1xDBgQcVv6BuCQ/IB5QqEbQ\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/review-5.jpg"
  },
  "/img/anime/review-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"f09-Cki+F8QHggQxFm4hhnljC/ajURQ\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/anime/review-6.jpg"
  },
  "/img/blog/blog-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"13b16-Oh2EdWgNH9qNx8gn+DLzvY+Mo+Q\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-1.jpg"
  },
  "/img/blog/blog-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bac-CdYO1hB9TbzG2MBA0JVamGx6eoo\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-10.jpg"
  },
  "/img/blog/blog-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"79f2-v8rKt+vpiAWsgPD/KSm2LJhIi8A\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-11.jpg"
  },
  "/img/blog/blog-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"2448c-tUWyX2AsxrlGycY+0HHucAwWZNY\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-12.jpg"
  },
  "/img/blog/blog-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"74d8-Qw98TJKu6UmDaDOMfvd9x+7cSis\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-2.jpg"
  },
  "/img/blog/blog-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"921d-w1+PH8SqgV3PJAoVTLlRcJfkoWs\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-3.jpg"
  },
  "/img/blog/blog-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"8d2f-SQLvxUxz7eU1ZeinRPPTPdQAzx0\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-4.jpg"
  },
  "/img/blog/blog-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"8e98-Po+u37dss85nakvTCwCjo20fAvI\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-5.jpg"
  },
  "/img/blog/blog-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fe49-zHQcIAA18A1zEkBcZZ2xvkveg+c\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-6.jpg"
  },
  "/img/blog/blog-7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b378-NAuMiZUkGQaRDhUT8D+a0CqZCiQ\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-7.jpg"
  },
  "/img/blog/blog-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bbd-7Fn1KTd5PUee4FMvd3iUzUceJnA\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-8.jpg"
  },
  "/img/blog/blog-9.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d74-wrQPV468e/yzt4SEVzR4vXt8z04\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/blog-9.jpg"
  },
  "/img/hero/hero-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"26f61-0ZjxmXeaGtJB0cap9QpJBNplQ2I\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/hero/hero-1.jpg"
  },
  "/img/live/live-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca87-wrE7PfybqA5cb6Q9Sh9cV8Chh1c\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/live/live-1.jpg"
  },
  "/img/live/live-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"58ed-QtAxe2rAbC3l5PG1q5bnvKtfbrw\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/live/live-2.jpg"
  },
  "/img/live/live-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9a1-FuTk3qReSFcT/DF2nBmrpjao5LI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/live/live-3.jpg"
  },
  "/img/live/live-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6af7-ttYCh+lFHCC7OnHzxtS4W0h+TkU\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/live/live-4.jpg"
  },
  "/img/live/live-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"6657-CRfuJrWKTEPkOu2dLMcpx6zMqzk\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/live/live-5.jpg"
  },
  "/img/live/live-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"9b40-QTHvpMMRjOT/8pc9g0ijCfPEaLA\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/live/live-6.jpg"
  },
  "/img/popular/popular-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b82e-E4/lNdCEtSUQmmXU6aQrh+ArNQo\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/popular/popular-1.jpg"
  },
  "/img/popular/popular-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"b79a-Ip2mSVGYvAA2RrcDDdK4CXZwwuI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/popular/popular-2.jpg"
  },
  "/img/popular/popular-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"9be3-XC6gsaj5rlLSTj9OGNtz9+rEaE4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/popular/popular-3.jpg"
  },
  "/img/popular/popular-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"dfb4-ggG+GOq3TNNqofXbEVzvRymP+G4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/popular/popular-4.jpg"
  },
  "/img/popular/popular-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"94fd-VQb/THeNTnYTXIkHF8M/teq+KD4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/popular/popular-5.jpg"
  },
  "/img/popular/popular-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"9538-YJVzafL7R9zTKJDCNg26JvrZwc0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/popular/popular-6.jpg"
  },
  "/img/recent/recent-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7cad-jlbOGp0dwuFUPNMqTLQyOQX0b7M\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/recent/recent-1.jpg"
  },
  "/img/recent/recent-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"7f60-psvaZQKy+m+VUzZGtaq/PRqzOB0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/recent/recent-2.jpg"
  },
  "/img/recent/recent-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"92c2-hmd07r1JQRijzNfRpQKVv4b+uB8\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/recent/recent-3.jpg"
  },
  "/img/recent/recent-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d55-Sfjp9DWssvbI2qvTIQ6HXPl1usI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/recent/recent-4.jpg"
  },
  "/img/recent/recent-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"9ad7-3EiyEYmIbEz3Y2SElweBeg08SoI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/recent/recent-5.jpg"
  },
  "/img/recent/recent-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"8b21-8Rzzs1gzUkGSaY08KLHR9OuL9q0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/recent/recent-6.jpg"
  },
  "/img/sidebar/comment-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2053-cV/JSfaGWtbm/323gXh7CMGKtgk\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/comment-1.jpg"
  },
  "/img/sidebar/comment-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b87-UmDVSfQDQjL9p9/UY+n6riecKXE\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/comment-2.jpg"
  },
  "/img/sidebar/comment-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"2a82-JxBFyaYH8jL7f8fYSjjTzVMK4aU\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/comment-3.jpg"
  },
  "/img/sidebar/comment-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f7f-FP304/spvHESm67z3kw2FIvzV7w\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/comment-4.jpg"
  },
  "/img/sidebar/tv-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"75e8-SSFjiyIMz3CTdz4/36VID/+zzoM\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/tv-1.jpg"
  },
  "/img/sidebar/tv-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3594-hQ7r8Pxro8GfIFrx+royr/ODwcc\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/tv-2.jpg"
  },
  "/img/sidebar/tv-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"50a8-VQI3TsNaunoGbMpONblSP6fsvvc\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/tv-3.jpg"
  },
  "/img/sidebar/tv-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"7689-jMK/+E0xnWvRxrqZ7wx7M9X5cCo\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/tv-4.jpg"
  },
  "/img/sidebar/tv-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"6533-oY04SPSxCZdTa6FbNx2fTSBt4Wk\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/sidebar/tv-5.jpg"
  },
  "/img/trending/trend-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9f0-C2fDFB3ED+fKCpJ8UBCZ4U4hyEo\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/trending/trend-1.jpg"
  },
  "/img/trending/trend-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"bcdc-JEG3i7ZIvmxoOIecG+4HYh4qIHM\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/trending/trend-2.jpg"
  },
  "/img/trending/trend-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4fcb-PTE17cDLu+LU/EKMXttbRQFtWQY\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/trending/trend-3.jpg"
  },
  "/img/trending/trend-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"7db4-nDBMD+pKxfGBWMWFls9lK/0zenI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/trending/trend-4.jpg"
  },
  "/img/trending/trend-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"a460-d5yJMQ9jD2VjeFdfqgpDUA8FXW0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/trending/trend-5.jpg"
  },
  "/img/trending/trend-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"a7c1-gxX7Kggj0v4SWvVm4HrqcrJ4NxQ\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/trending/trend-6.jpg"
  },
  "/_nuxt/css/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26eed-Z0ftNnHryOR1syEUZGOTgK480PI\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/bootstrap.min.css"
  },
  "/_nuxt/css/elegant-icons.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"62a4-lc7YguuNUoXq74PoW0Hk8i476CE\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/elegant-icons.css"
  },
  "/_nuxt/css/font-awesome.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7918-USx9eQM+MCipvmG1QM8aaHDIlvg\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/font-awesome.min.css"
  },
  "/_nuxt/css/nice-select.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"fa7-kxetKTBrxy6z+pKYG+gUH805Tnw\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/nice-select.css"
  },
  "/_nuxt/css/owl.carousel.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d17-+6RjU8+QRQ7z02KhI/Hnrz6MVh4\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/owl.carousel.min.css"
  },
  "/_nuxt/css/plyr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9307-icjgJLrXXuySGJjK5wJ4XXcnLdo\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/plyr.css"
  },
  "/_nuxt/css/slicknav.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9c9-xU5GyitYZXzpua94jExx2y8lh2g\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/slicknav.min.css"
  },
  "/_nuxt/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9704-9A/T1+FFqwq860bwHQg4fb5fT/I\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/css/style.css"
  },
  "/_nuxt/fonts/ElegantIcons.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"e8b4-OdUTGp/+H8+tKBZTwUlaIq88bko\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/ElegantIcons.eot"
  },
  "/_nuxt/fonts/ElegantIcons.svg": {
    "type": "image/svg+xml",
    "etag": "\"43b31-9NJPC/YwaV+ebFZFAN2kvEVTUFA\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/ElegantIcons.svg"
  },
  "/_nuxt/fonts/ElegantIcons.ttf": {
    "type": "font/ttf",
    "etag": "\"e7fc-64dpqVAQGdpLvwQqdlrUF3g7SSI\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/ElegantIcons.ttf"
  },
  "/_nuxt/fonts/ElegantIcons.woff": {
    "type": "font/woff",
    "etag": "\"f8b0-+b6H+i0dSpXoMFr7UXeNtLx1n7w\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/ElegantIcons.woff"
  },
  "/_nuxt/fonts/fontawesome-webfont.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2876e-2YDCzoc9xDr0YNTVctRBMESZ9AA\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/fontawesome-webfont.eot"
  },
  "/_nuxt/fonts/fontawesome-webfont.svg": {
    "type": "image/svg+xml",
    "etag": "\"6c7db-mKiqXPfWLC7/Xwft6NhEuHTvBu0\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/fontawesome-webfont.svg"
  },
  "/_nuxt/fonts/fontawesome-webfont.ttf": {
    "type": "font/ttf",
    "etag": "\"286ac-E7HqtlqYPHpzvHmXxHnWaUP3xss\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/fontawesome-webfont.ttf"
  },
  "/_nuxt/fonts/fontawesome-webfont.woff": {
    "type": "font/woff",
    "etag": "\"17ee8-KLeCJAs+dtuCThLAJ1SpcxoWdSc\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/fontawesome-webfont.woff"
  },
  "/_nuxt/fonts/fontawesome-webfont.woff2": {
    "type": "font/woff2",
    "etag": "\"12d68-1vSMun0Hb7by/Wupk6dbncHsvww\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/fontawesome-webfont.woff2"
  },
  "/_nuxt/fonts/FontAwesome.otf": {
    "type": "font/otf",
    "etag": "\"20e98-BIcHvFKsS2VjqqODv+hmCg3ckIw\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/fonts/FontAwesome.otf"
  },
  "/_nuxt/img/logo.png": {
    "type": "image/png",
    "etag": "\"332-vX/eKo+/zM11nCOy7SCGbZVwWbA\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/logo.png"
  },
  "/_nuxt/img/normal-breadcrumb.jpg": {
    "type": "image/jpeg",
    "etag": "\"119a6-83MHUYHcHKSJjRxtlWap9diLmQs\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/normal-breadcrumb.jpg"
  },
  "/_nuxt/js/bootstrap.min.js": {
    "type": "application/javascript",
    "etag": "\"ea40-i/CjHFao8EJH2WbLEhZD4F9I99A\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/bootstrap.min.js"
  },
  "/_nuxt/js/jquery-3.3.1.min.js": {
    "type": "application/javascript",
    "etag": "\"1538f-DcMttKqcXwPzs4xH2IPb1P7ROq4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/jquery-3.3.1.min.js"
  },
  "/_nuxt/js/jquery.nice-select.min.js": {
    "type": "application/javascript",
    "etag": "\"b7e-2VRfixOerls4feGmCoSr6UnH6I8\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/jquery.nice-select.min.js"
  },
  "/_nuxt/js/jquery.slicknav.js": {
    "type": "application/javascript",
    "etag": "\"51f1-wtcyPpud+IjHnPq9freJIJUUNZI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/jquery.slicknav.js"
  },
  "/_nuxt/js/main.js": {
    "type": "application/javascript",
    "etag": "\"abb-f3W/Wd9mSeDxHKKBneJDhsm+Eqw\"",
    "mtime": "2022-05-07T04:57:16.668Z",
    "path": "../public/_nuxt/js/main.js"
  },
  "/_nuxt/js/mixitup.min.js": {
    "type": "application/javascript",
    "etag": "\"15bc7-2VILGgXMwXLEJBYfaT+sorfOrFQ\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/mixitup.min.js"
  },
  "/_nuxt/js/owl.carousel.min.js": {
    "type": "application/javascript",
    "etag": "\"ad36-4qYA5DPfcrTP3pPXiA4xFJF6PL4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/owl.carousel.min.js"
  },
  "/_nuxt/js/player.js": {
    "type": "application/javascript",
    "etag": "\"4cb9b-kDcEDR88Q0lTDMK8nW8TRF5o4no\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/js/player.js"
  },
  "/_nuxt/videos/1.mp4": {
    "type": "video/mp4",
    "etag": "\"f7c842-ccfrjoZ9j5GHt/kmq8xlNCN+tR8\"",
    "mtime": "2022-05-05T06:49:57.000Z",
    "path": "../public/_nuxt/videos/1.mp4"
  },
  "/_nuxt/videos/anime-watch.jpg": {
    "type": "image/jpeg",
    "etag": "\"46114-HL9xLMQiOca5dYgS7/pzHXLNSUQ\"",
    "mtime": "2022-05-05T06:49:57.000Z",
    "path": "../public/_nuxt/videos/anime-watch.jpg"
  },
  "/img/blog/details/bd-item-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"17b8c-NsdFTXgRNsbsm8G+wdkQn5VGfY4\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/details/bd-item-1.jpg"
  },
  "/img/blog/details/bd-item-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fc1a-VS1fEDrJnWuVXWWkCh04/RYQ9jk\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/details/bd-item-2.jpg"
  },
  "/img/blog/details/bd-item-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"15974-CjgXgxphBEFZkP5zu1ONr5NUBPg\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/details/bd-item-3.jpg"
  },
  "/img/blog/details/blog-details-pic.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e8c2-dIw1rRxxK2deR5auQqXO87Igt4A\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/img/blog/details/blog-details-pic.jpg"
  },
  "/img/blog/details/comment-1.png": {
    "type": "image/png",
    "etag": "\"3040-q3ht+XrCX9+Pl+yYxA6NNBfLyhY\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/blog/details/comment-1.png"
  },
  "/img/blog/details/comment-2.png": {
    "type": "image/png",
    "etag": "\"2d3a-A5Bbb4I7Fe4+3E1V+7HqkZC6SXg\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/blog/details/comment-2.png"
  },
  "/img/blog/details/comment-3.png": {
    "type": "image/png",
    "etag": "\"2a3d-o0OGb3V4fNL/bniFBBVQ5hboRmM\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/img/blog/details/comment-3.png"
  },
  "/_nuxt/img/anime/details-pic.jpg": {
    "type": "image/jpeg",
    "etag": "\"f0a9-VGG5dfEHiBKI+duDSzYsaLVIFVE\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/details-pic.jpg"
  },
  "/_nuxt/img/anime/review-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"f11-BaUEJAwdfupNpVOaFyzyAOvXJ9c\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/review-1.jpg"
  },
  "/_nuxt/img/anime/review-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"d4f-43d7kDTLIBjtWTRC+CuxuEyeX5k\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/review-2.jpg"
  },
  "/_nuxt/img/anime/review-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"de2-Mc/tKGvWjIG32HKpRFlmRxNqqcc\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/review-3.jpg"
  },
  "/_nuxt/img/anime/review-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"9da-rMTbwI/gB15VT0V3Fr9kuyIvhgY\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/review-4.jpg"
  },
  "/_nuxt/img/anime/review-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"11bf-jFJV1xDBgQcVv6BuCQ/IB5QqEbQ\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/review-5.jpg"
  },
  "/_nuxt/img/anime/review-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"f09-Cki+F8QHggQxFm4hhnljC/ajURQ\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/anime/review-6.jpg"
  },
  "/_nuxt/img/blog/blog-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"13b16-Oh2EdWgNH9qNx8gn+DLzvY+Mo+Q\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-1.jpg"
  },
  "/_nuxt/img/blog/blog-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bac-CdYO1hB9TbzG2MBA0JVamGx6eoo\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-10.jpg"
  },
  "/_nuxt/img/blog/blog-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"79f2-v8rKt+vpiAWsgPD/KSm2LJhIi8A\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-11.jpg"
  },
  "/_nuxt/img/blog/blog-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"2448c-tUWyX2AsxrlGycY+0HHucAwWZNY\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-12.jpg"
  },
  "/_nuxt/img/blog/blog-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"74d8-Qw98TJKu6UmDaDOMfvd9x+7cSis\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-2.jpg"
  },
  "/_nuxt/img/blog/blog-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"921d-w1+PH8SqgV3PJAoVTLlRcJfkoWs\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-3.jpg"
  },
  "/_nuxt/img/blog/blog-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"8d2f-SQLvxUxz7eU1ZeinRPPTPdQAzx0\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-4.jpg"
  },
  "/_nuxt/img/blog/blog-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"8e98-Po+u37dss85nakvTCwCjo20fAvI\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-5.jpg"
  },
  "/_nuxt/img/blog/blog-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1fe49-zHQcIAA18A1zEkBcZZ2xvkveg+c\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-6.jpg"
  },
  "/_nuxt/img/blog/blog-7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b378-NAuMiZUkGQaRDhUT8D+a0CqZCiQ\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-7.jpg"
  },
  "/_nuxt/img/blog/blog-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bbd-7Fn1KTd5PUee4FMvd3iUzUceJnA\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-8.jpg"
  },
  "/_nuxt/img/blog/blog-9.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d74-wrQPV468e/yzt4SEVzR4vXt8z04\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/blog-9.jpg"
  },
  "/_nuxt/img/hero/hero-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"26f61-0ZjxmXeaGtJB0cap9QpJBNplQ2I\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/hero/hero-1.jpg"
  },
  "/_nuxt/img/live/live-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca87-wrE7PfybqA5cb6Q9Sh9cV8Chh1c\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/live/live-1.jpg"
  },
  "/_nuxt/img/live/live-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"58ed-QtAxe2rAbC3l5PG1q5bnvKtfbrw\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/live/live-2.jpg"
  },
  "/_nuxt/img/live/live-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9a1-FuTk3qReSFcT/DF2nBmrpjao5LI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/live/live-3.jpg"
  },
  "/_nuxt/img/live/live-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6af7-ttYCh+lFHCC7OnHzxtS4W0h+TkU\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/live/live-4.jpg"
  },
  "/_nuxt/img/live/live-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"6657-CRfuJrWKTEPkOu2dLMcpx6zMqzk\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/live/live-5.jpg"
  },
  "/_nuxt/img/live/live-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"9b40-QTHvpMMRjOT/8pc9g0ijCfPEaLA\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/live/live-6.jpg"
  },
  "/_nuxt/img/popular/popular-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b82e-E4/lNdCEtSUQmmXU6aQrh+ArNQo\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/popular/popular-1.jpg"
  },
  "/_nuxt/img/popular/popular-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"b79a-Ip2mSVGYvAA2RrcDDdK4CXZwwuI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/popular/popular-2.jpg"
  },
  "/_nuxt/img/popular/popular-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"9be3-XC6gsaj5rlLSTj9OGNtz9+rEaE4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/popular/popular-3.jpg"
  },
  "/_nuxt/img/popular/popular-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"dfb4-ggG+GOq3TNNqofXbEVzvRymP+G4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/popular/popular-4.jpg"
  },
  "/_nuxt/img/popular/popular-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"94fd-VQb/THeNTnYTXIkHF8M/teq+KD4\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/popular/popular-5.jpg"
  },
  "/_nuxt/img/popular/popular-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"9538-YJVzafL7R9zTKJDCNg26JvrZwc0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/popular/popular-6.jpg"
  },
  "/_nuxt/img/recent/recent-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7cad-jlbOGp0dwuFUPNMqTLQyOQX0b7M\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/recent/recent-1.jpg"
  },
  "/_nuxt/img/recent/recent-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"7f60-psvaZQKy+m+VUzZGtaq/PRqzOB0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/recent/recent-2.jpg"
  },
  "/_nuxt/img/recent/recent-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"92c2-hmd07r1JQRijzNfRpQKVv4b+uB8\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/recent/recent-3.jpg"
  },
  "/_nuxt/img/recent/recent-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d55-Sfjp9DWssvbI2qvTIQ6HXPl1usI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/recent/recent-4.jpg"
  },
  "/_nuxt/img/recent/recent-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"9ad7-3EiyEYmIbEz3Y2SElweBeg08SoI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/recent/recent-5.jpg"
  },
  "/_nuxt/img/recent/recent-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"8b21-8Rzzs1gzUkGSaY08KLHR9OuL9q0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/recent/recent-6.jpg"
  },
  "/_nuxt/img/sidebar/comment-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2053-cV/JSfaGWtbm/323gXh7CMGKtgk\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/comment-1.jpg"
  },
  "/_nuxt/img/sidebar/comment-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b87-UmDVSfQDQjL9p9/UY+n6riecKXE\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/comment-2.jpg"
  },
  "/_nuxt/img/sidebar/comment-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"2a82-JxBFyaYH8jL7f8fYSjjTzVMK4aU\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/comment-3.jpg"
  },
  "/_nuxt/img/sidebar/comment-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f7f-FP304/spvHESm67z3kw2FIvzV7w\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/comment-4.jpg"
  },
  "/_nuxt/img/sidebar/tv-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"75e8-SSFjiyIMz3CTdz4/36VID/+zzoM\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/tv-1.jpg"
  },
  "/_nuxt/img/sidebar/tv-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3594-hQ7r8Pxro8GfIFrx+royr/ODwcc\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/tv-2.jpg"
  },
  "/_nuxt/img/sidebar/tv-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"50a8-VQI3TsNaunoGbMpONblSP6fsvvc\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/tv-3.jpg"
  },
  "/_nuxt/img/sidebar/tv-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"7689-jMK/+E0xnWvRxrqZ7wx7M9X5cCo\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/tv-4.jpg"
  },
  "/_nuxt/img/sidebar/tv-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"6533-oY04SPSxCZdTa6FbNx2fTSBt4Wk\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/sidebar/tv-5.jpg"
  },
  "/_nuxt/img/trending/trend-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9f0-C2fDFB3ED+fKCpJ8UBCZ4U4hyEo\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/trending/trend-1.jpg"
  },
  "/_nuxt/img/trending/trend-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"bcdc-JEG3i7ZIvmxoOIecG+4HYh4qIHM\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/trending/trend-2.jpg"
  },
  "/_nuxt/img/trending/trend-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4fcb-PTE17cDLu+LU/EKMXttbRQFtWQY\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/trending/trend-3.jpg"
  },
  "/_nuxt/img/trending/trend-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"7db4-nDBMD+pKxfGBWMWFls9lK/0zenI\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/trending/trend-4.jpg"
  },
  "/_nuxt/img/trending/trend-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"a460-d5yJMQ9jD2VjeFdfqgpDUA8FXW0\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/trending/trend-5.jpg"
  },
  "/_nuxt/img/trending/trend-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"a7c1-gxX7Kggj0v4SWvVm4HrqcrJ4NxQ\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/trending/trend-6.jpg"
  },
  "/_nuxt/img/blog/details/bd-item-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"17b8c-NsdFTXgRNsbsm8G+wdkQn5VGfY4\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/details/bd-item-1.jpg"
  },
  "/_nuxt/img/blog/details/bd-item-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fc1a-VS1fEDrJnWuVXWWkCh04/RYQ9jk\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/details/bd-item-2.jpg"
  },
  "/_nuxt/img/blog/details/bd-item-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"15974-CjgXgxphBEFZkP5zu1ONr5NUBPg\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/details/bd-item-3.jpg"
  },
  "/_nuxt/img/blog/details/blog-details-pic.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e8c2-dIw1rRxxK2deR5auQqXO87Igt4A\"",
    "mtime": "2022-05-05T06:49:55.000Z",
    "path": "../public/_nuxt/img/blog/details/blog-details-pic.jpg"
  },
  "/_nuxt/img/blog/details/comment-1.png": {
    "type": "image/png",
    "etag": "\"3040-q3ht+XrCX9+Pl+yYxA6NNBfLyhY\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/blog/details/comment-1.png"
  },
  "/_nuxt/img/blog/details/comment-2.png": {
    "type": "image/png",
    "etag": "\"2d3a-A5Bbb4I7Fe4+3E1V+7HqkZC6SXg\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/blog/details/comment-2.png"
  },
  "/_nuxt/img/blog/details/comment-3.png": {
    "type": "image/png",
    "etag": "\"2a3d-o0OGb3V4fNL/bniFBBVQ5hboRmM\"",
    "mtime": "2022-05-05T06:49:56.000Z",
    "path": "../public/_nuxt/img/blog/details/comment-3.png"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));
function readAsset (id) {
  return promises.readFile(resolve(mainDir, assets[id].path)).catch(() => {})
}

const publicAssetBases = ["/_nuxt"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _static = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

export { _static as default };
//# sourceMappingURL=static.mjs.map
