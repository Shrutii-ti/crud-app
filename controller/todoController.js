const todoService = require("../services/todoService");

exports.createTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await todoService.createTodo(req.body, userId);
    res.status(response.status).json(response);
  } catch (err) {
    console.error("Error in createTodo:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
    };

    const todos = await todoService.getAllTodosForUser(req.user._id, filters);

    res.status(200).json({
      message: "Fetched all todos successfully",
      todos,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching todos",
      error: err.message,
    });
  }
};


exports.getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await todoService.getTodoById(todoId, req.user._id); // secure by owner

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo fetched successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Error fetching todo", error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user._id;
  const updateData = req.body;

  const response = await todoService.updateTodo(todoId, userId, updateData);

  res.status(response.status).json(response);
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await todoService.deleteTodoById(id, req.user._id);
    res.status(response.status).json(response);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};