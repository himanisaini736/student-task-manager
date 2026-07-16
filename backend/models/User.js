const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImage: {
    type: String,
    default: ""
}
},
{
    timestamps: true
});

// Create Model
const User = mongoose.model("User", userSchema);

module.exports = User;