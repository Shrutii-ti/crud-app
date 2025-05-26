const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/register", authController.register);
router.post("/verify", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/resend", authController.resendOTP);

module.exports = router;
