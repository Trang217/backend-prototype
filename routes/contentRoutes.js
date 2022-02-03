const express = require("express");

const router = express.Router();

const controller = require("./../controllers/contentController");

router.post("/add", controller.createEcosystem);

module.exports = router;
