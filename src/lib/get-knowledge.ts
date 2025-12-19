import fs from 'fs/promises';
import path from 'path';

/**
 * Centralized Knowledge Base loader for EdiMentor AI
 * Loads and consolidates professional context into a single structured prompt.
 *
 * This module is designed for:
 * - RAG context injection
 * - System prompt grounding
 * - Deterministic AI behavior
 */

// In-memory cache to avoid repeated disk reads
let cachedKnowledgeBase: string | null = null;

export async function getKnowledgeBase(): Promise<string> {
  // Return cached version if already loaded
  if (cachedKnowledgeBase) {
    return cachedKnowledgeBase;
  }

  try {
    // Resolve absolute path to data directory
    const dataPath = path.join(process.cwd(), 'src', 'data');

    // Read all context files in parallel
    const [profile, projects, goals] = await Promise.all([
      fs.readFile(path.join(dataPath, 'profile.md'), 'utf8'),
      fs.readFile(path.join(dataPath, 'projects.md'), 'utf8'),
      fs.readFile(path.join(dataPath, 'goals.md'), 'utf8'),
    ]);

    // Build structured knowledge base
    cachedKnowledgeBase = `
# EDISSON A.G.C. — KNOWLEDGE BASE

## PERSONAL & PROFESSIONAL PROFILE
${profile}

## PROJECTS & ENGINEERING EXPERIENCE
${projects}

## STRATEGIC GOALS & CAREER DIRECTION
${goals}
`.trim();

    return cachedKnowledgeBase;
  } catch (error) {
    // Production-grade logging (ready for GCP / Vercel)
    console.error('[KnowledgeBaseLoader] Failed to load context files', {
      error,
      timestamp: new Date().toISOString(),
    });

    return `
# KNOWLEDGE BASE ERROR
The professional context files could not be loaded.
Fallback to minimal system context.
`.trim();
  }
}
