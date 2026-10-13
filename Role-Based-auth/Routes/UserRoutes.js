
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  getProfile,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Login token required
router.get("/users", auth, authorize("student", "teacher", "admin"), getUsers);
router.get("/profile", auth, getProfile);

// Teacher and Admin can update users
router.put(
  "/users/:id",
  auth,
  authorize("teacher", "admin"),
  updateUser
);

// Only Admin can delete users
router.delete(
  "/users/:id",
  auth,
  authorize("admin"),
  deleteUser
);

module.exports = router;