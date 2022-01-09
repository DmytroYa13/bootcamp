const express = require("express");
const router = express.Router();

const authorRoutes = require("./author");
const postsRoutes = require("../routes/posts");
const tagsRoutes = require("../routes/tags");

router.use("/auth", authorRoutes);
router.use("/posts", postsRoutes);
router.use("/tags", tagsRoutes);

module.exports = router;