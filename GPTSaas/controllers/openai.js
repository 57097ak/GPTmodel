require("dotenv").config({ path: "../config.env" });
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_SECRET, // This is also the default, can be omitted
});

exports.summarize = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5",
      prompt: `Summarize the following text:\n\n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const summary = response.data.choices[0].text.trim();
      return res.status(200).json({ summary });
    } else {
      return res.status(200).json({ summary: "No summary available" });
    }

  } catch (error) {
    console.error("Error generating summary:", error.message);
    return res.status(500).json({ message: "An error occurred while generating the summary." });
  }
};
