const Todo = require("../models/ToDo");

exports.createTodo = async (data, userId) => {
  try {
    const todo = new Todo({
      ...data,
      owner: userId
    });
   console.log("Saving todo with owner:", userId);  // check if it's undefined

    await todo.save();

    return { status: 201, message: "Todo created successfully", todo };
  } catch (err) {
    return { status: 500, message: "Error creating todo", error: err.message };
  }
};
