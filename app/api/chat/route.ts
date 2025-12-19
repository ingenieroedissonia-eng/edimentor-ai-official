export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

/**
 * API Route: /api/chat
 * Carga dinámica del motor RAG para evitar evaluación Edge en import-time.
 */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message (string) is required' },
        { status: 400 }
      );
    }

    // 🔴 IMPORT DINÁMICO (CLAVE DEL FIX)
    const { generateMentorResponse } = await import('@/lib/grounding-engine');

    const response = await generateMentorResponse(message);

    return NextResponse.json({ response }, { status: 200 });

  } catch (error) {
    console.error('[API_CHAT_ERROR]', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


