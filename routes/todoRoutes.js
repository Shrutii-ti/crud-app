const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate"); 
const todoController = require("../controller/todoController"); 

// Routes
router.post("/create", authenticate, todoController.createTodo);
router.get("/", authenticate, todoController.getAllTodos); // /api/todos/
router.get("/:id", authenticate, todoController.getTodoById);
router.put("/:id", authenticate, todoController.updateTodo);
router.delete("/:id", authenticate, todoController.deleteTodo);


module.exports = router;
