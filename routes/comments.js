const express = require("express");
const passport = require('passport')

const controller = require("../controllers/comments");

const router = express.Router();

router.post("/:postId", passport.authenticate('jwt', {session: false}), controller.create);
router.patch("/:id", passport.authenticate('jwt', {session: false}), controller.update);
router.delete("/:id", passport.authenticate('jwt', {session: false}), controller.remove);

module.exports = router;
