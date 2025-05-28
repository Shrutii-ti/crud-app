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