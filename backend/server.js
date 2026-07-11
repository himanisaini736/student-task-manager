const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log("My Name is " + process.env.MY_NAME);

app.get("/", (req, res) => {
    res.send("Student Task Manager Backend is Running 🚀");
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const User = require("./models/User");

console.log(User);