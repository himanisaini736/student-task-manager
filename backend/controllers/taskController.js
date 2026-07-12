const Task = require("../models/Task");

// ===========================
// Create Task
// ===========================
const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        // Create Task
        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user._id
        });

        res.status(201).json({
            message: "Task Created Successfully",
            task
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===========================
// Get All Tasks
// ===========================

const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user._id
        })
        .sort({
            createdAt: -1
        });

        res.status(200).json({
            count: tasks.length,
            tasks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createTask,
    getTasks
};