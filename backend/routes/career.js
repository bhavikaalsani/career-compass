const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/career/suggest
// @desc    Suggest career paths based on skills
// @access  Private
router.post('/suggest', authMiddleware, async (req, res) => {
  const { skills, interests } = req.body;

  try {
    // Simple suggestion logic for now (can upgrade later with AI API)
    let suggestions = [];

    if (skills.includes('javascript') || skills.includes('react')) {
      suggestions.push('Frontend Developer');
    }
    if (skills.includes('node') || skills.includes('express')) {
      suggestions.push('Backend Developer');
    }
    if (skills.includes('python') || interests.includes('data')) {
      suggestions.push('Data Scientist');
    }
    if (skills.includes('aws') || skills.includes('devops')) {
      suggestions.push('DevOps Engineer');
    }

    if (suggestions.length === 0) {
      suggestions.push('Explore general Software Engineering');
    }

    res.json({ suggestions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
