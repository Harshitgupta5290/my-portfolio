import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost, BlogGenerationRequest } from '@/lib/api/openai';
import { verifyAdminAuth } from '@/lib/auth/verify-token';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as BlogGenerationRequest;

    // Validate input
    if (!body.topic || body.topic.length < 3) {
      return NextResponse.json(
        { error: 'Topic must be at least 3 characters long' },
        { status: 400 }
      );
    }

    // Generate blog post
    const blogPost = await generateBlogPost({
      topic: body.topic,
      keywords: body.keywords,
      tone: body.tone || 'technical',
      length: body.length || 'medium',
      includeCodeExamples: body.includeCodeExamples !== false,
    });

    return NextResponse.json({
      success: true,
      data: blogPost,
    });
  } catch (error) {
    console.error('[AI Generate API Error]', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('API')) {
      return NextResponse.json(
        { error: 'AI Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Verify admin
  const auth = await verifyAdminAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'AI Blog Generation API',
    endpoint: 'POST /api/ai/generate',
    documentation: {
      description: 'Generate a blog post using AI',
      required: ['topic'],
      optional: ['keywords', 'tone', 'length', 'includeCodeExamples'],
      tones: ['technical', 'casual', 'professional', 'narrative'],
      lengths: ['short', 'medium', 'long'],
      example: {
        topic: 'How AI will change web development',
        keywords: ['AI', 'web development', 'future'],
        tone: 'technical',
        length: 'medium',
      },
    },
  });
}
