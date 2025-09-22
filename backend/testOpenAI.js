require('dotenv').config(); // load .env
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

(async () => {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello in one sentence." }],
    });
    console.log("OpenAI Response:", res.choices[0].message.content);
  } catch (err) {
    console.error("OpenAI Error:", err.response ? err.response.data : err.message);
  }
})();
