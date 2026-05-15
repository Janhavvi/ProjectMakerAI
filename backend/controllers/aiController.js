// backend/controllers/aiController.js

const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    const aiPrompt = `
You are ProjectMaker AI, a professional website generator.

Create the exact website requested by the user.

User request:
${prompt}

Return ONLY one complete valid HTML file.

Rules:
- Must start with <!DOCTYPE html>
- Must end with </html>
- Use HTML, CSS, and JavaScript only
- CSS must be inside <style>
- JavaScript must be inside <script>
- No markdown
- No explanations
- No React
- No imports
- No backend code
- No lorem ipsum
- Website must match the prompt exactly
- If user asks for calculator, make working calculator
- If user asks for clone, create similar layout/style without using copyrighted logos/images
- If user asks for game, make playable game logic
- If user asks for todo, make working todo app
- If user asks for quiz, make working quiz app
- If user asks for ecommerce, make product cards/cart UI
- If user asks for education, make course/class UI
- Make UI modern, responsive, and attractive
`;

    const response = await fetch(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          model: 'meta/llama-3.3-70b-instruct',
          messages: [
            {
              role: 'system',
              content:
                'Return only complete valid HTML code. No explanation.'
            },
            {
              role: 'user',
              content: aiPrompt
            }
          ],
          temperature: 0.9,
          max_tokens: 4096
        })
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: text
      });
    }

    const data = JSON.parse(text);

    let html = data.choices?.[0]?.message?.content || '';

    html = html
      .replace(/```html/g, '')
      .replace(/```/g, '')
      .trim();

    const start =
      html.indexOf('<!DOCTYPE html>') !== -1
        ? html.indexOf('<!DOCTYPE html>')
        : html.indexOf('<html');

    if (start !== -1) {
      html = html.slice(start);
    }

    const end = html.lastIndexOf('</html>');

    if (end !== -1) {
      html = html.slice(0, end + 7);
    }

    res.json({
      success: true,
      data: html
    });

  } catch (error) {
    console.log('AI ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'AI generation failed'
    });
  }
};

module.exports = {
  generateWebsite
};