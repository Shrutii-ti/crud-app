const todoService = require("../services/todoService");

exports.createTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await todoService.createTodo(req.body, userId);
    res.status(response.status).json(response);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
