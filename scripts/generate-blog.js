/**
 * AI Blog Post Generator
 *
 * Fetches trending tech topics from Hacker News,
 * calls the Anthropic API to generate a blog post,
 * and appends it to utils/data/blogs-data.js.
 *
 * Required env var: ANTHROPIC_API_KEY
 * Optional env var: TOPIC_HINT (override HN topic with a custom hint)
 *
 * Sets GitHub Actions output vars: BLOG_TITLE, BLOG_TOPIC, BLOG_TAGS, READING_TIME
 */

const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const TOPIC_HINT = process.env.TOPIC_HINT || '';

if (!ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
  process.exit(1);
}

// ─── Step 1: Fetch trending HN stories ────────────────────────────────────────

async function fetchHNTopStories() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const ids = await res.json();
  return ids.slice(0, 15); // top 15 story IDs
}

async function fetchHNItem(id) {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return res.json();
}

const TECH_KEYWORDS = [
  'python', 'flask', 'microservice', 'api', 'backend', 'llm', 'ai', 'ml',
  'machine learning', 'rag', 'vector', 'embedding', 'openai', 'claude',
  'docker', 'kubernetes', 'redis', 'celery', 'sql', 'database', 'react',
  'nextjs', 'javascript', 'typescript', 'devops', 'cloud', 'aws',
  'security', 'authentication', 'blockchain', 'nlp', 'opencv',
];

function isRelevant(title) {
  const lower = title.toLowerCase();
  return TECH_KEYWORDS.some((kw) => lower.includes(kw));
}

async function getTrendingTopic() {
  if (TOPIC_HINT) {
    console.log(`Using provided topic hint: "${TOPIC_HINT}"`);
    return TOPIC_HINT;
  }

  console.log('Fetching trending topics from Hacker News...');
  const ids = await fetchHNTopStories();
  const stories = await Promise.all(ids.map(fetchHNItem));

  const relevant = stories
    .filter((s) => s && s.title && isRelevant(s.title))
    .slice(0, 5)
    .map((s) => s.title);

  if (relevant.length === 0) {
    return 'Building scalable backend systems with Python and modern AI tools';
  }

  console.log('Relevant trending topics found:', relevant);
  return relevant[0];
}

// ─── Step 2: Generate blog post with Claude API ────────────────────────────────

async function generateBlogPost(topic) {
  console.log(`Generating blog post on: "${topic}"`);

  const systemPrompt = `You are a senior software engineer and technical writer named Harshit Gupta.
You specialize in Python, Flask, microservices, AI/ML, LLMs, RAG systems, and backend engineering.
Write in a practical, first-person, conversational style. Include real code examples.
Always write content relevant to your expertise areas.`;

  const userPrompt = `Write a technical blog post inspired by this trending topic: "${topic}"

The blog post should:
- Be relevant to your expertise (Python, Flask, microservices, AI/ML, RAG, LLMs, backend engineering)
- Have a clear intro, 3-5 main sections with H2 headings, and a conclusion
- Include at least one practical code snippet in a <pre><code> block
- Be 600-900 words in body content
- Be written in HTML (use <h2>, <h3>, <p>, <ul>, <li>, <pre><code>, <strong> tags only)

Also provide this metadata as a JSON block at the END of your response (after the HTML):
\`\`\`json
{
  "title": "...",
  "description": "One sentence summary under 160 chars",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "reading_time_minutes": 7
}
\`\`\`

Write only the HTML content first, then the JSON metadata block.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// ─── Step 3: Parse response and build blog entry ───────────────────────────────

function parseResponse(rawText, topic) {
  const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
  let meta = {};

  if (jsonMatch) {
    try {
      meta = JSON.parse(jsonMatch[1]);
    } catch {
      console.warn('Could not parse metadata JSON, using defaults.');
    }
  }

  const htmlContent = rawText.replace(/```json[\s\S]*?```/, '').trim();

  const title = meta.title || `Exploring ${topic}`;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);

  return {
    title,
    slug,
    description: meta.description || `A practical guide to ${topic}.`,
    tags: meta.tags || ['Engineering', 'Backend', 'AI'],
    reading_time_minutes: meta.reading_time_minutes || 7,
    content: htmlContent,
  };
}

// ─── Step 4: Append to blogs-data.js ──────────────────────────────────────────

function appendToBlogsData(entry) {
  const dataPath = path.join(__dirname, '..', 'utils', 'data', 'blogs-data.js');
  const existing = fs.readFileSync(dataPath, 'utf-8');

  // Find highest existing id
  const idMatches = [...existing.matchAll(/id:\s*(\d+)/g)];
  const maxId = idMatches.length > 0
    ? Math.max(...idMatches.map((m) => parseInt(m[1])))
    : 0;
  const newId = maxId + 1;

  const today = new Date().toISOString().split('T')[0];

  const newEntry = `
  {
    id: ${newId},
    slug: '${entry.slug}',
    title: '${entry.title.replace(/'/g, "\\'")}',
    description: '${entry.description.replace(/'/g, "\\'")}',
    published_at: '${today}',
    reading_time_minutes: ${entry.reading_time_minutes},
    tags: ${JSON.stringify(entry.tags)},
    ai_assisted: true,
    content: \`
      ${entry.content.replace(/`/g, '\\`')}
    \`,
  },`;

  // Insert before the closing ]; of the array
  const updated = existing.replace(/\];\s*$/, `${newEntry}\n];\n`);
  fs.writeFileSync(dataPath, updated, 'utf-8');
  console.log(`✓ Appended blog post (id: ${newId}) to blogs-data.js`);
}

// ─── Step 5: Set GitHub Actions environment variables ─────────────────────────

function setGHOutput(key, value) {
  const envFile = process.env.GITHUB_ENV;
  if (envFile) {
    fs.appendFileSync(envFile, `${key}=${value}\n`);
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const topic = await getTrendingTopic();
  const rawText = await generateBlogPost(topic);
  const entry = parseResponse(rawText, topic);

  appendToBlogsData(entry);

  setGHOutput('BLOG_TITLE', entry.title);
  setGHOutput('BLOG_TOPIC', topic);
  setGHOutput('BLOG_TAGS', entry.tags.join(', '));
  setGHOutput('READING_TIME', String(entry.reading_time_minutes));

  console.log('\n✓ Blog generation complete');
  console.log('  Title:', entry.title);
  console.log('  Slug:', entry.slug);
  console.log('  Tags:', entry.tags.join(', '));
  console.log('  Reading time:', entry.reading_time_minutes, 'min');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
