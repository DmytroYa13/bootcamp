const express = require("express");
const passport = require("passport")
const controller = require("../controllers/author");

const router = express.Router();

router.get("/", passport.authenticate('jwt', {session: false}), controller.getAuthor);
router.patch("/:id", passport.authenticate('jwt', {session: false}), controller.update);

module.exports = router;
