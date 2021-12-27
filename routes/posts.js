const express = require("express");
const controller = require("../controllers/posts");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

//likes
router.post("/:id/like", controller.addLike);
router.delete("/:id/like", controller.removeLike);

module.exports = router;
