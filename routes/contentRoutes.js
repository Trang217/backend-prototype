const express = require("express");
const controller = require("../controllers/contentController");

const router = express.Router();

router.get("/game/:biome", controller.getGameContent);
router.get("/quiz/:biome", controller.getQuizContent);

module.exports = router;
