const express = require("express");
const authenticationHelper = require("../helpers/authenticationHelper");
const controller = require("../controllers/userController");

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

router.use(authenticationHelper.authenticateJwt);

router.get("/list", controller.listUsers);
router.get("/profile", controller.profile);

module.exports = router;
