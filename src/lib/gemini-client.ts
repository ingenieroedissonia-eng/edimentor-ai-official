import { VertexAI } from '@google-cloud/vertexai';

/**
 * AI Orchestrator Client — M.A.I.I.E. Architecture
 * Autenticación: Lee la variable BASE64 definida en .env.local
 */

// --- 1. VALIDACIÓN Y DIAGNÓSTICO (ACTUALIZADO A 2.0) ---
// Actualizamos el fallback a 2.0 para coherencia total
const MODEL_TO_USE = process.env.MODEL_NAME || 'gemini-2.0-flash-001';

console.log('----------------------------------------------------');
console.log('🤖 INICIALIZANDO CLIENTE GEMINI (M.A.I.I.E. 2.0)');
console.log('----------------------------------------------------');
console.log('📍 Project ID:', process.env.GOOGLE_PROJECT_ID);
console.log('📍 Location:', process.env.GOOGLE_LOCATION);
console.log('🧠 MODELO CARGADO:', MODEL_TO_USE);
console.log('----------------------------------------------------');

const base64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;

if (!base64) {
  throw new Error('❌ GOOGLE_APPLICATION_CREDENTIALS_BASE64 no está definida en el búnker.');
}

let credentials;

try {
  // 2) Decodificación: Base64 -> Texto -> Objeto JSON
  const decodedString = Buffer.from(base64.trim(), 'base64').toString('utf-8');
  credentials = JSON.parse(decodedString);
} catch (error) {
  console.error('❌ ERROR FATAL: La cadena Base64 no es válida.', error);
  throw error;
}

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID || 'triple-course-481522-e2',
  location: process.env.GOOGLE_LOCATION || 'us-central1', // Central es correcto para Gemini 2.0
  googleAuthOptions: { credentials },
});

export const geminiModel = vertexAI.getGenerativeModel({
  model: MODEL_TO_USE,
});