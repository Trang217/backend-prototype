const express = require("express");
const authenticationHelper = require("../helpers/authenticationHelper");
const router = express.Router();

const controller = require("./../controllers/badgeController");

router.use(authenticationHelper.authenticateJwt);

router.post("/add", controller.CreateBadge);

router.get("/list/:user_id", controller.listBadgeByUser);

module.exports = router;
