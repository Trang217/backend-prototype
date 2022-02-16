//--------------------IMPORT MODULES------------------------
const express = require("express");

//--------------------IMPORT HELPERS------------------------
const authenticationHelper = require("../helpers/authenticationHelper");

//--------------------IMPORT CONTROLLER--------------------------
const controller = require("../controllers/userController");

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

router.post("/forgotPassword", controller.forgotPassword);
router.patch("/resetPassword/:token", controller.resetPassword);

router.use(authenticationHelper.authenticateJwt);

router.get("/list", controller.listUsers);
router.get("/profile", controller.profile);

//badges

router.get("/badges", controller.getUserBadges);
router.patch("/update/badges/:type", controller.updateBadges);

// update user account

router.patch("/update", controller.updateAccountDetail);

router.patch("/update/firstName", controller.updateFirstName);
router.patch("/update/userName", controller.updateUsername);
router.patch("/update/email", controller.updateEmail);
router.patch("/update/password", controller.updatePassword);

// delete user account
router.patch("/delete", controller.deleteUser);

// hall-of-fame
router.get("/hall-of-fame", controller.getUsers);

module.exports = router;
