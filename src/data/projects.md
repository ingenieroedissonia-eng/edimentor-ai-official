# Technical Projects Portfolio — Edisson A.G.C.

## 1. EdiMentor AI — Flagship Product (M.A.I.I.E. Ecosystem)
**Role:** Lead AI Architect & Product Engineer  

**Problem**  
Lack of a 24/7 intelligent system capable of demonstrating real-world AI architecture, orchestration, and business-focused reasoning.

**Solution**  
Designed and implemented an enterprise-grade, RAG-based multimodal AI platform acting as an intelligent digital representative.  
The system orchestrates multiple agents and tools to support learning, task planning, and expense management within a unified ecosystem.

**Architecture & Tech Stack**  
- Vertex AI (Gemini 1.5 Pro)  
- LangChain & LangGraph (multi-agent orchestration)  
- Next.js 15 (frontend)  
- Vercel (deployment)  
- JSON-based persistence for agent memory and tools  

**Key Achievements**  
- Implemented structured tool-calling with deterministic JSON outputs  
- Enabled seamless agent routing for tasks and expense management  
- Designed the foundation for scalable M.A.I.I.E. ecosystem expansion  

**Current Technical Status (Updated)**  
- Mobile chat layout finalized and stable using `h-[100dvh]` to prevent viewport issues on mobile devices.  
- Grounding Engine correctly uses `systemInstruction` following the official Vertex AI / Gemini SDK specification.  
- Frontend (Next.js) → API → Vertex AI communication is fully operational and stable.  
- No pending fixes required for mobile layout or system prompt handling at this stage.

---

## 2. SmartROI v2.0
**Role:** Full-Stack AI Developer  

**Problem**  
Manual financial calculations in import operations were error-prone, time-consuming, and limited strategic decision-making.

**Solution**  
Built a data-driven financial analysis web application that automates ROI calculations and provides real-time commercial insights.

**Architecture & Tech Stack**  
- Python  
- Streamlit  
- Pandas  
- Google Cloud Platform  

**Key Achievements**  
- Reduced human error through automated financial logic  
- Enabled faster and more accurate profitability assessments  
- Delivered a practical decision-support tool for commerce-focused scenarios  

---

## 3. Advanced CLI Agent (MVP)
**Role:** Backend Engineer  

**Problem**  
Need for fast, local productivity management through natural language without relying on cloud-based UIs.

**Solution**  
Developed a high-performance CLI-based AI agent capable of handling productivity tasks using natural language commands.

**Architecture & Tech Stack**  
- Python  
- LangChain  
- Groq LLM API  

**Technical Challenges Solved**  
- Resolved PowerShell execution policy restrictions on Windows  
- Solved complex Python dependency and environment conflicts  
- Achieved sub-second response times in a local execution context  
