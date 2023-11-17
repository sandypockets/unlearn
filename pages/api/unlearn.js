import OpenAI from 'openai';

const openAiSecretKey = process.env.OPEN_AI_SECRET_KEY;
const openai = new OpenAI({ apiKey: openAiSecretKey });

function constructPrompt(date, category, previousKeywords = []) {
  const contentInstructions = `Please include a brief description of both the original belief and the new understanding, along with the year the new understanding became widely recognized. The description should be suitable for a 7th grade reading level and not exceed 275 characters.`;

  const exclusionCriteria =
    previousKeywords.length > 0
      ? `Avoid topics related to "${previousKeywords.join(
          ', '
        )}" to prevent duplicate content in multiple API calls.`
      : '';

  const keywordGuidelines = `Provide 1-3 specific, comma-separated keywords related to the content. Avoid general terms or years. Keywords are used to ensure unique content in subsequent queries.`;

  const authenticityRequirement = `Only include accurate facts with known dates. Do not fabricate details or dates. Cite sources when possible.`;

  const exampleJSON = `{"content": "In [year], it was discovered that [new understanding], revising the previous belief that [original belief].", "keyword": "specific-term,related-term"}`;

  return `Generate a concise summary of a revised or disproven fact in the "${category}" category, specifically one that has changed since ${date}. The response should be JSON-formatted, containing two keys: 'content' and 'keyword'.
  
  Content Requirements: ${contentInstructions}

  ${exclusionCriteria}

  Keyword Guidelines: ${keywordGuidelines}

  Fact Authenticity: ${authenticityRequirement}

  Example JSON: ${exampleJSON}`;
}

async function getOutdatedFacts(date, subcategory, previousKeywords) {
  if (!date || !subcategory) return;
  const messageContent = constructPrompt(date, subcategory, previousKeywords);
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: messageContent }],
    model: 'gpt-3.5-turbo',
  });

  const factString = completion.choices[0].message.content.trim();
  try {
    return JSON.parse(factString);
  } catch (error) {
    console.error('Error parsing fact JSON:', error);
    return { content: 'Error in parsing response', keyword: '' };
  }
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { date, subcategory, previousKeywords } = req.body;
  getOutdatedFacts(date, subcategory, previousKeywords)
    .then(factJson => {
      res.status(200).json(factJson);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}
