const express = require("express");
const controller = require("../controllers/comments");

const router = express.Router();

router.post("/:postId", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
