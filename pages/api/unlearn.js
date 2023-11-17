import OpenAI from 'openai'

const openAiSecretKey = process.env.OPEN_AI_SECRET_KEY;
const openai = new OpenAI({ apiKey: openAiSecretKey });

function constructPrompt(date, category, previousKeywords = []) {
  let exclusionPhrase = '';
  if (previousKeywords?.length > 0) {
    exclusionPhrase = `Use topics that do avoid these keywords: ${previousKeywords.join(', ')}.`;
  }

  return `Please generate a JSON-formatted response with a brief summary of a fact from the category "${category}" that was widely accepted but has been disproven or revised since ${date}. The JSON should include two keys: 'content' and 'keyword'. 'Content' should describe the original belief, the new understanding, and the specific year of revision. Write for a 7th grade reading level. 'keywords' should contain keywords related to your specific response. You will receive these keywords in subsequent queries to ensure you do not produce duplicate content. Do not fabricate facts. Cite sources when possible within a 250-character limit. Example JSON response: {"content": "Fact about [topic] goes here.", "keyword": "central-theme"}. ${exclusionPhrase}`;
}


async function getOutdatedFacts(date, category, previousKeywords) {
  if (!date || !category) return;
  const messageContent = constructPrompt(date, category, previousKeywords);
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
  const { date, category, previousKeywords } = req.body;
  getOutdatedFacts(date, category, previousKeywords)
    .then(factJson => {
      res.status(200).json(factJson);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}
