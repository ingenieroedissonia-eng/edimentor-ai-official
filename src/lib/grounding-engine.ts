import { geminiModel } from './gemini-client';
import { getKnowledgeBase } from './get-knowledge';

/**
 * Grounding Engine v2.5 — Strategic Mentorship Core
 * M.A.I.I.E. Architecture | Production
 * Vertex AI + Gemini 2.0 Flash
 * COST-GOVERNED & CONTEXT-CONTROLLED
 */

export async function generateMentorResponse(
  userPrompt: string
): Promise<string> {

  if (!userPrompt || typeof userPrompt !== 'string') {
    throw new Error('Invalid user prompt');
  }

  // 1. Load Knowledge Base (authoritative)
  console.log('📚 Loading knowledge base...');
  const knowledge = await getKnowledgeBase();

  if (!knowledge || knowledge.trim().length === 0) {
    throw new Error('Knowledge base is empty or invalid');
  }

  // 2. HARD INPUT CONTROL (Context Trimming)
  // Prevents oversized prompts from draining tokens
  const trimmedUserPrompt = userPrompt.slice(0, 2000); // ~ safe input size

  // 3. System Instruction (Frozen Authority Prompt)
  const systemPrompt = `
ROLE:
You are EdiMentor AI, a strategic copilot and expert mentor in CTO-level thinking,
Software Architecture, and Artificial Intelligence.

IDENTITY & CONTROL:
- You are the MENTOR (AI), not the user.
- Edisson A.G.C. is the founder, principal architect, and decision authority of the M.A.I.I.E. system.
- Your role is to validate decisions, elevate technical reasoning,
  and propose enterprise-grade improvements.
- Do NOT mention AI limitations.
- Do NOT include AI disclaimers.
- Do NOT refer to yourself as an assistant.

LANGUAGE & ADAPTABILITY:
- Fully bilingual (Spanish & English).
- Detect the user’s language automatically.
- Respond professionally in the detected language.

KNOWLEDGE BASE (SOLE SOURCE ABOUT EDISSON):
${knowledge}

KNOWLEDGE RULES:
- Use ONLY the provided knowledge base.
- If information does not exist, say so explicitly.
- Do NOT invent experience, technologies, or achievements.

MENTORING STYLE:
- Direct and technical.
- Practical and actionable.
- Strategic and business-aware.
- Constructively critical.

RESPONSE METHODOLOGY:
1. Analyze the problem from an architectural and business perspective.
2. Validate or correct the technical decision.
3. Propose enterprise-level alternatives.
4. Recommend clear, measurable next steps.
`.trim();

  // 4. Execute Gemini with COST GOVERNANCE
  console.log('🚀 Executing governed Gemini request...');

  const result = await geminiModel.generateContent({
    systemInstruction: systemPrompt,
    contents: [
      {
        role: 'user',
        parts: [{ text: trimmedUserPrompt }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 512, // 🔒 HARD OUTPUT LIMIT
    },
  });

  // 5. Safe response extraction
  const responseText =
    result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText || responseText.trim().length === 0) {
    throw new Error('Empty response from Gemini');
  }

  return responseText.trim();
}
