const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// environments variables - load
dotenv.config();

// Connect to Mongo DB 
connectDB();


// create app
const app = express();

app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");

// Routing to appropriate functions
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Student Task Manager Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});