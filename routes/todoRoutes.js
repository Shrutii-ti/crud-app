const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { createTodo } = require("../controller/todoController.js");

router.post("/create", authenticate, createTodo);

module.exports = router;
