// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const cors = require("cors");

const router = express.Router();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
