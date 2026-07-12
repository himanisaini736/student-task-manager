const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks
} = require("../controllers/taskController");

// Create Task
router.post("/", protect, createTask);

// get my tasks
router.get("/", protect, getTasks);

module.exports = router;