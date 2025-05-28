const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const userController = require("../controller/userController");

// Protected route
router.get("/profile", authenticate,userController.getProfile);

module.exports = router;
