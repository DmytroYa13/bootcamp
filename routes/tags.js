const express = require("express");
const passport = require("passport")
const controller = require("../controllers/tags");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", passport.authenticate('jwt', {session: false}), controller.create);

module.exports = router;
