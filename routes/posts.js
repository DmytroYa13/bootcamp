const express = require("express");
const passport = require('passport')

const controller = require("../controllers/posts");
const getAuthorizedUser = require('../middleware/getAuthorizedUser');

const router = express.Router();

router.get("/", getAuthorizedUser, controller.getAll);
router.get("/:id", getAuthorizedUser, controller.getById);
router.post("/", passport.authenticate('jwt', {session: false}), controller.create);
router.patch("/:id", passport.authenticate('jwt', {session: false}), controller.update);
router.delete("/:id", passport.authenticate('jwt', {session: false}), controller.remove);

//like
router.post("/:id/like", passport.authenticate('jwt', {session: false}), controller.toggleLike);

module.exports = router;
