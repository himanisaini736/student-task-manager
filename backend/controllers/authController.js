const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if all fields are present
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    registerUser
};