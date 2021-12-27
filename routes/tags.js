const express = require("express");
const controller = require("../controllers/tags");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = router;