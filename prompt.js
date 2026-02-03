const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Adjust if needed

const genAi = new GoogleGenerativeAI("AIzaSyA5wp-q8GB_Qt7CceiUTNbl4kEdDa08RMs");
const model = genAi.getGenerativeModel({
    model: "gemini-1.5-pro",
});

app.use(bodyParser.json());

app.post('/enhance-prompt', async (req, res) => {
    const { corrected_text } = req.body;

    // Construct the formatted prompt
    const prompt = `
Enhance the following prompt and convert it into a single, cohesive passage that includes the following elements:

1. *Assume Expertise:* Implicitly include the expertise required for the prompt.
2. *Context/Challenge:* Describe the user's challenge related to the prompt.
3. *Expectation from AI:* Clearly state what is expected from the AI, but combine all these elements into a single passage without explicitly labeling them as sections.

User's Prompt:
${corrected_text}

Please generate a seamless, integrated prompt that contains all these elements naturally in a single paragraph.
`;

    try {
        const response = await model.generateContent(prompt);
        res.json({ enhanced_prompt: response.response.text() });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content.' });
    }
});

app.listen(port, () => {
    console.log(`Node.js server listening on port ${port}`);
});