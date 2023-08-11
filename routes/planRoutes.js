// routes/authRoutes.js
const express = require("express");
const planController = require("../controllers/planController");
const authenticateToken = require("../middlewares/authMiddleware");
// const cors = require("cors");

const router = express.Router();
// router.use(cors);

router.post("/plan", authenticateToken, planController.createPlan);
router.put("/plan/:planId", authenticateToken, planController.updatePlan);

module.exports = router;
