export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message (string) is required' },
        { status: 400 }
      );
    }

    const { generateMentorResponse } = await import('@/lib/grounding-engine');

    const response = await generateMentorResponse(message, history ?? []);

    return NextResponse.json({ response }, { status: 200 });

  } catch (error) {
    console.error('[API_CHAT_ERROR]', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}