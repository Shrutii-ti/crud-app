// title
// description
// due date ( type date)
// priority (String enumeration Low, medium, high)
// Status
// Tags {[type string}]
// recurrence enum {daily, weekly}
// Owner : type of user Id ref user
// createdAt
// UpdatedAt

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  dueDate: {
    type: Date,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },

  tags: {
    type: [String],
    default: [],
  },

recurrence: {
  type: String,
  enum: ['weekly', 'monthly'],  // example values, "daily" and "none" are missing
  required: true,
},


  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  }
}, {
  timestamps: true, // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("Todo", todoSchema);



// Post api- create a todo list
// TOdo controller- todo server -to do routes