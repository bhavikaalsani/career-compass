const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const auth = require("../middleware/authMiddleware");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// @route   POST /api/ai/career
// @desc    Get AI career advice
// @access  Private
router.post("/career", auth, async (req, res) => {
  try {
    const { skills, interests, goals } = req.body;

    const prompt = `
You are a career coach. Based on the following:
- Skills: ${skills}
- Interests: ${interests}
- Goals: ${goals}

Suggest 3 tailored career paths with a short explanation for each.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const advice = response.choices[0].message.content;

    res.json({ advice });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "AI service failed" });
  }
});

module.exports = router;
