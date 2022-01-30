const express = require("express");
const router = express.Router();

const authRoutes = require("../routes/auth");
const authorRoutes = require("../routes/author");
const postsRoutes = require("../routes/posts");
const tagsRoutes = require("../routes/tags");
const commentsRoutes = require("../routes/comments");

router.use("/auth", authRoutes);
router.use("/author", authorRoutes);
router.use("/posts", postsRoutes);
router.use("/tags", tagsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
