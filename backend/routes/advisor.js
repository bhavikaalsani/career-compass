const express = require("express");
const router = express.Router();

// POST /api/advisor
router.post("/", (req, res) => {
  const { skills, interests, goal } = req.body;

  if (!skills || !interests || !goal) {
    return res.status(400).json({ msg: "Please provide skills, interests, and goal." });
  }

  // Mock advice (template-based)
  const advice = `Based on your skills in ${skills}, your interest in ${interests}, and your goal of becoming a ${goal}, you should focus on projects related to ${interests} and build a strong portfolio.`;

  // Send the mock advice back
  res.json({ advice });
});

module.exports = router;
