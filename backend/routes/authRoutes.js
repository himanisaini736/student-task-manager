const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    updateProfileImage
} = require("../controllers/authController");
router.post(
    "/register",
    upload.single("profileImage"),
    registerUser
);
router.post("/login", loginUser);
router.put(
    "/profile-image",
    protect,
    upload.single("profileImage"),
    updateProfileImage
);

module.exports = router;