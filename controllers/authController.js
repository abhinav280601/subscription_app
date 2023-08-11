const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");
const Users = require("../models/Users");
const { json } = require("sequelize");
const env = require("dotenv").config();

async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    console.log("we are in register");
    // Check if the user already exists
    const query = `SELECT username FROM users WHERE username = ?`;
    const [existingUser] = await sequelize.query(query, {
      replacements: [username],
    });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email is already in use
    const queryEmail = `SELECT email FROM users WHERE email = ?`;
    const [existingEmail] = await sequelize.query(queryEmail, {
      replacements: [email],
    });
    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user record
    const insertQuery = `
      INSERT INTO users (username, password, email) VALUES (?, ?, ?)
    `;
    const [user] = await sequelize.query(insertQuery, {
      replacements: [username, hashedPassword, email],
    });

    res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
}
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const query = `SELECT * FROM users WHERE username = ?`;
    const [user] = await sequelize.query(query, { replacements: [username] });
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user[0].id });
    // req.session.token = token;
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to login" });
  }
}

module.exports = {
  register,
  login,
};
