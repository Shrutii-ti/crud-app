const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan"); // ✅ Import morgan
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(morgan("dev")); // ✅ Log all HTTP requests in dev-friendly format

// ✅ Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todos", todoRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
