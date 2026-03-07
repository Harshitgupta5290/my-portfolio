import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BlogGenerationRequest {
  topic: string;
  keywords?: string[];
  tone?: 'technical' | 'casual' | 'professional' | 'narrative';
  length?: 'short' | 'medium' | 'long';
  includeCodeExamples?: boolean;
}

export interface BlogGenerationResponse {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  tags: string[];
  category: string;
  readingTime: number;
  seoTitle: string;
  seoDesc: string;
}

const SYSTEM_PROMPT = `You are an expert technical writer and developer. You write high-quality, SEO-optimized blog posts for developers.

Your posts should:
- Be well-researched and technically accurate
- Include practical examples and code snippets when relevant
- Be engaging and easy to understand
- Follow markdown formatting
- Include proper headers (H2, H3)
- Include code blocks with language specification

Always return valid JSON with the exact structure requested.`;

export async function generateBlogPost(request: BlogGenerationRequest): Promise<BlogGenerationResponse> {
  const { topic, keywords = [], tone = 'technical', length = 'medium', includeCodeExamples = true } = request;

  const lengthGuide = {
    short: '800-1200 words',
    medium: '1500-2000 words',
    long: '2500-3500 words',
  };

  const prompt = `Generate a high-quality blog post about: "${topic}"

Keywords to include: ${keywords.join(', ') || 'auto-generate relevant keywords'}

Requirements:
- Length: ${lengthGuide[length]}
- Tone: ${tone}
- Include code examples: ${includeCodeExamples ? 'Yes' : 'No'}
- Target audience: Software developers
- SEO optimized

Return ONLY a valid JSON object (no markdown code blocks, just raw JSON) with this exact structure:
{
  "title": "Article title",
  "slug": "url-slug-format",
  "excerpt": "2-3 sentence summary",
  "content": "Full markdown content here with proper ## headers",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "tags": ["tag1", "tag2"],
  "category": "technology",
  "readingTime": 5,
  "seoTitle": "SEO optimized title under 60 chars",
  "seoDesc": "SEO optimized description under 160 chars"
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from API');
    }

    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response');
    }

    const result: BlogGenerationResponse = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!result.title || !result.content || !result.slug) {
      throw new Error('Invalid response structure');
    }

    // Calculate reading time if not provided
    if (!result.readingTime) {
      const wordCount = result.content.split(/\s+/).length;
      result.readingTime = Math.ceil(wordCount / 200);
    }

    return result;
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}

export async function refineBlogContent(content: string, instruction: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert editor. Refine the provided content according to the instruction. Return only the refined markdown content.',
      },
      {
        role: 'user',
        content: `Please ${instruction}\n\nContent:\n${content}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const textContent = response.choices[0].message.content;
  if (!textContent) {
    throw new Error('Empty response from API');
  }

  return textContent;
}

export async function generateSocialMediaContent(blogTitle: string, blogExcerpt: string): Promise<{
  twitter: string;
  linkedin: string;
  facebook: string;
}> {
  const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a social media expert. Generate engaging social media posts. Return ONLY valid JSON with twitter, linkedin, and facebook keys.',
      },
      {
        role: 'user',
        content: `Generate social media content for this blog post:\nTitle: ${blogTitle}\nExcerpt: ${blogExcerpt}\n\nReturn JSON with keys: twitter (280 chars), linkedin (300 chars), facebook (500 chars)`,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  const textContent = response.choices[0].message.content;
  if (!textContent) {
    throw new Error('Empty response from API');
  }

  const jsonMatch = textContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not extract JSON');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Calculate API usage and cost
 */
export function calculateCost(inputTokens: number, outputTokens: number): number {
  const inputCost = inputTokens * 0.03 / 1000; // $0.03 per 1K input tokens (GPT-4)
  const outputCost = outputTokens * 0.06 / 1000; // $0.06 per 1K output tokens (GPT-4)
  return inputCost + outputCost;
}
