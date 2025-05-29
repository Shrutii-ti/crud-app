const dotenv = require("dotenv");
const express = require ("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

app.get("/", function(req,res) {
    res.send("hello world")
});

app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/todos", todoRoutes); 

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Adding morgan =GPT
// inside 