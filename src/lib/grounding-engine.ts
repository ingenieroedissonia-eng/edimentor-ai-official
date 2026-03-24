import { geminiModel } from './gemini-client';
import { getKnowledgeBase } from './get-knowledge';

/**
 * Grounding Engine v7.0 — Conversational Memory
 * Arquitectura M.A.I.I.E. | Vertex AI + Gemini 2.0 Flash
 */

const MAX_INPUT_CHARS = 2000;
const MAX_OUTPUT_TOKENS = 400;

export async function generateMentorResponse(
  userPrompt: string,
  history: { role: 'user' | 'ai'; text: string }[] = []
): Promise<string> {

  if (!userPrompt || typeof userPrompt !== 'string') {
    throw new Error('User prompt inválido');
  }

  const trimmedPrompt = userPrompt.trim().slice(0, MAX_INPUT_CHARS);

  const knowledge = await getKnowledgeBase();

  if (!knowledge || knowledge.trim().length === 0) {
    throw new Error('Knowledge base vacía');
  }

  const systemPrompt = `
ROL:
Eres EdiMentor AI, mentor estratégico de nivel CTO.
Tu función es responder de forma clara, técnica y concisa.

REGLAS:
- Prioriza precisión sobre verbosidad.
- Evita respuestas excesivamente largas.
- Resume cuando sea posible sin perder rigor técnico.
- No repitas información innecesaria.
- Recuerda el contexto de la conversación actual.

BASE DE CONOCIMIENTO (ÚNICA FUENTE SOBRE EDISSON):
${knowledge}
`.trim();

  const result = await geminiModel.generateContent({
    systemInstruction: systemPrompt,
    generationConfig: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
      topP: 0.9,
    },
    contents: [
      ...history.slice(-6).map((msg) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user',
        parts: [{ text: trimmedPrompt }],
      },
    ],
  });

  const responseText =
    result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    throw new Error('Respuesta vacía de Gemini');
  }

  return responseText.trim();
}