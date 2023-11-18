import OpenAI from 'openai';

const openAiSecretKey = process.env.OPEN_AI_SECRET_KEY;
const openai = new OpenAI({ apiKey: openAiSecretKey });

function constructPrompt(date, category, previousKeywords = []) {
  let exclusionPhrase =
    previousKeywords.length > 0
      ? `Exclude any facts related to: "${previousKeywords.join(
          ', '
        )}". This is to avoid repetition, as these topics have been previously covered.`
      : 'Consider all topics within the specified category.';

  return `Create a JSON response summarizing a fact in the "${category}" category that has changed since ${date}. Ensure the fact aligns precisely with this category and timeframe.

  Content Requirements: Include a short description of the original belief, the revised understanding, and the year the new understanding was recognized. Limit the description to 275 characters and write for a 7th-grade reading level.

  Exclusion Criteria: ${exclusionPhrase}

  Keyword Instructions: Provide 1-3 specific, comma-separated keywords related to the fact. Avoid general terms and years. These keywords are crucial for preventing duplicate responses in subsequent queries.

  Fact Authenticity: Only factual information with verified dates is acceptable. Avoid fabricating details or dates. Where possible, cite sources.

  Example JSON Format: {"content": "In [year], it was found that [new understanding], revising the previous belief that [original belief].", "keyword": "specific-term,related-term"}`;
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
