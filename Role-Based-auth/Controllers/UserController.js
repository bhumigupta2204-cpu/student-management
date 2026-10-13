
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters."
      });
    }

    const validRoles = ["student", "teacher", "admin"];
    const userRole = role || "student";

    if (!validRoles.includes(userRole)) {
      return res.status(400).json({
        message: "Invalid role."
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed.",
      error: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed.",
      error: error.message
    });
  }
};

// View all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch users."
    });
  }
};

// View own profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch profile."
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email.toLowerCase();

    // Only Admin can change a user's role
    if (role !== undefined) {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Only Admin can change user roles."
        });
      }

      if (!["student", "teacher", "admin"].includes(role)) {
        return res.status(400).json({
          message: "Invalid role."
        });
      }

      updates.role = role;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already in use."
      });
    }

    return res.status(500).json({
      message: "Update failed.",
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    return res.status(200).json({
      message: "User deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete failed."
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getProfile,
  updateUser,
  deleteUser
};