const dotenv = require("dotenv");
const express = require ("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

app.get("/", function(req,res) {
    res.send("hello world")
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("server is running on" +  PORT);
});