const Todo = require("../models/ToDo");

exports.createTodo = async (data, userId) => {
  try {
    const todo = new Todo({
      ...data,
      owner: userId,
    });

    await todo.save();

    return {
      status: 201,
      message: "Todo created successfully",
      todo: todo.toObject({ getters: true }),
    };
  } catch (err) {
    console.error("❌ Error creating todo:", err.message);
    return { status: 500, message: "Error creating todo", error: err.message };
  }
};

exports.getAllTodosForUser = async (userId, filters = {}) => {
  const query = { owner: userId }; // base filter (only user's todos)

  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;

  return await Todo.find(query).populate("owner", "name email");
};


exports.getTodoById = async (id, userId) => {
  return await Todo.findOne({ _id: id, owner: userId }).populate('owner', 'name email');
};

exports.updateTodo = async (todoId, userId, updateData) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, owner: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return { status: 404, message: "Todo not found or unauthorized" };
    }

    return { status: 200, message: "Todo updated successfully", todo: updatedTodo };
  } catch (error) {
    return { status: 500, message: "Error updating todo", error: error.message };
  }
};

exports.deleteTodoById = async (todoId, userId) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: todoId, owner: userId });

    if (!todo) {
      return { status: 404, message: "Todo not found or unauthorized" };
    }

    return { status: 200, message: "Todo deleted successfully" };
  } catch (err) {
    return { status: 500, message: "Error deleting todo", error: err.message };
  }
};
