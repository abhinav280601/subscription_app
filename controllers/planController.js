const sequelize = require("../config/database");
const Plans = require("../models/Plans");
const Users = require("../models/Users");
const { json } = require("sequelize");
const { QueryTypes } = require("sequelize");

async function createPlan(req, res) {
  try {
    const {
      type,
      monthlyPrice,
      yearlyPrice,
      videoQuality,
      resolution,
      devices,
      screens,
    } = req.body;
    const query = await sequelize.query(
      `INSERT INTO plans (type, monthlyPrice, yearlyPrice, videoQuality, resolution, devices, screens) VALUES (:type, :monthlyPrice, :yearlyPrice, :videoQuality, :resolution, :devices, :screens)`,
      {
        replacements: {
          type,
          monthlyPrice,
          yearlyPrice,
          videoQuality,
          resolution,
          devices,
          screens,
        },
        type: QueryTypes.INSERT,
      }
    );

    res.json({
      message: "Plan created successfully",
    });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Failed to create plan" });
  }
}

async function updatePlan(req, res) {
  try {
    const { planId } = req.params;
    const id = req.userId;
    const query = await sequelize.query(
      `UPDATE users SET planId = :planId WHERE id = :id`,
      {
        replacements: {
          planId: planId,
          id,
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({
      message: "Plan Updated successfully",
    });
  } catch (error) {
    console.error("Error changing plan:", error);
    res.status(500).json({ message: "Failed to change plan" });
  }
}

module.exports = {
  createPlan,
  updatePlan,
};
