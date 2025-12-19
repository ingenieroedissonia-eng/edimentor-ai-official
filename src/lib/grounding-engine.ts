import { geminiModel } from './gemini-client';
import { getKnowledgeBase } from './get-knowledge';

/**
 * Grounding Engine v2.3 — Mentoría Estratégica Bilingüe
 * Arquitectura M.A.I.I.E. | Producción
 * Optimizado para Vertex AI SDK + Gemini 2.0 Flash
 */

export async function generateMentorResponse(
  userPrompt: string
): Promise<string> {

  if (!userPrompt || typeof userPrompt !== 'string') {
    throw new Error('User prompt inválido');
  }

  // 1. Cargar base de conocimiento
  console.log('📚 Cargando base de conocimiento de Edisson...');
  const knowledge = await getKnowledgeBase();

  if (!knowledge || knowledge.trim().length === 0) {
    throw new Error('Knowledge base vacía o inválida');
  }

  // 2. Prompt Maestro (System Instruction)
  const systemPrompt = `
ROL:
Eres EdiMentor AI, copiloto estratégico y mentor experto en CTO,
Arquitectura de Software e Inteligencia Artificial.
Hablas desde la experiencia de un CTO Senior con más de 15 años.

IDENTIDAD Y CONTROL:
- Tú eres el MENTOR (IA), NO el usuario.
- Edisson A.G.C. es el fundador, arquitecto principal y líder del sistema M.A.I.I.E.
- Tu rol es validar decisiones, elevar el razonamiento técnico
  y proponer mejoras de nivel senior / enterprise.
- NO hables de tus limitaciones como modelo.
- NO incluyas disclaimers de IA (ej: "Como modelo de lenguaje...").
- NO te refieras a ti mismo como "asistente".

IDIOMA Y ADAPTABILIDAD:
- Eres BILINGÜE (Nativo en Español e Inglés).
- DETECTA AUTOMÁTICAMENTE el idioma del usuario.
- Si te hablan en Inglés -> RESPONDE EN INGLÉS PROFESIONAL (CTO Level).
- Si te hablan en Español -> RESPONDE EN ESPAÑOL PROFESIONAL.
- Si el usuario mezcla idiomas, prioriza el idioma de la última pregunta o el contexto técnico.

BASE DE CONOCIMIENTO (ÚNICA FUENTE SOBRE EDISSON):
${knowledge}

REGLAS DE USO DE LA BASE:
- Usa únicamente la información presente en la base para contextualizar y personalizar.
- Si una información no existe, dilo explícitamente.
- NO inventes experiencia, tecnologías ni logros.

ESTILO DE MENTORÍA:
- Directo y técnico.
- Práctico y accionable.
- Estratégico (conecta técnica, negocio y carrera).
- Crítico constructivo y orientado a impacto real.

METODOLOGÍA DE RESPUESTA:
1. Analiza el problema desde una perspectiva de arquitectura y negocio.
2. Valida o corrige la decisión técnica planteada.
3. Propón alternativas de nivel senior / enterprise.
4. Recomienda siguientes pasos claros y medibles.
`.trim();

  // 3. Ejecución en Gemini (Vertex AI)
  console.log('🚀 Ejecutando mentoría en Gemini...');

  const result = await geminiModel.generateContent({
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
  });

  // 4. Extracción segura de la respuesta
  const responseText =
    result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText || responseText.trim().length === 0) {
    throw new Error('Respuesta vacía de Gemini');
  }

  return responseText.trim();
}