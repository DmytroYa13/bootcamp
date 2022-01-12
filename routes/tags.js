const passport = require('passport')
const express = require("express");
const controller = require("../controllers/tags");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", passport.authenticate('jwt', {session: false}), controller.create);

module.exports = router;
