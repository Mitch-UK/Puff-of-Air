import express from "express";

/**
 * @file Page routes module
 * @module routes/pageRoutes
 * @description Defines routes for rendering various pages such as "About", "News", and "FAQs".
 */
const router = express.Router();

router.get("/about", (req, res) =>
  res.render("about", {
    title: "Weather Hub - About",
    currentPage: "about",
    pageCss: "about",
    avatarImgSrc: "/images/avatar-omar.jpg",
  })
);

router.get("/news", (req, res) =>
  res.render("news", {
    title: "Weather Hub - News",
    currentPage: "news",
    pageCss: "news",
  })
);

router.get("/faqs", (req, res) =>
  res.render("faqs", {
    title: "Weather Hub - FAQs",
    currentPage: "faqs",
    pageCss: "faqs",
    scripts: "/js/scripts.js",
  })
);

export const pageRoutes = router;
