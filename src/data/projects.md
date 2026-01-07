# Technical Projects Portfolio — Edisson A.G.C.

## 1. EdiMentor AI — Flagship Product (M.A.I.I.E. Ecosystem)
**Role:** AI Architect & Product Engineer  

**Problem**  
Lack of a 24/7 intelligent system capable of demonstrating real-world AI architecture, orchestration, and business-focused reasoning.

**Solution**  
Designed and implemented an enterprise-grade, RAG-based multimodal AI platform acting as an intelligent digital representative.  
The system structures decisions, guides learning, and supports task planning within a unified ecosystem, going beyond simple conversational interfaces.

**Architecture & Tech Stack**  
- Google Vertex AI (Gemini 2.0 Flash)  
- RAG architecture with controlled grounding  
- Specialized reasoning roles (Architect, Engineer, Auditor)  
- Next.js 15 (frontend)  
- Vercel (CI/CD & production deployment)  
- Deterministic JSON-based persistence for system state and tools  

**Key Achievements**  
- Implemented structured tool-calling with deterministic JSON outputs  
- Designed controlled role routing to reduce ambiguity and improve reasoning clarity  
- Established a scalable architectural foundation aligned with the M.A.I.I.E. ecosystem  

**Current Technical Status (Updated)**  
- Mobile chat layout finalized and stable using `h-[100dvh]` to prevent viewport issues on mobile devices  
- Grounding Engine correctly implemented using `systemInstruction` following official Vertex AI / Gemini SDK specifications  
- End-to-end communication (Next.js frontend → API → Vertex AI) fully operational and stable  
- No pending fixes required for mobile layout or system prompt handling at this stage  

---

## 2. SmartROI v2.0
**Role:** Full-Stack AI Developer  

**Problem**  
Manual financial calculations in import operations were error-prone, time-consuming, and limited strategic decision-making.

**Solution**  
Built a data-driven financial analysis web application that automates ROI calculations and provides real-time commercial insights to support better business decisions.

**Architecture & Tech Stack**  
- Python  
- Streamlit  
- Pandas  
- Google Cloud Platform  

**Key Achievements**  
- Reduced human error through automated financial logic  
- Enabled faster and more accurate profitability assessments  
- Delivered a practical, decision-oriented tool for commerce-focused scenarios  

---

## 3. Advanced CLI Agent (MVP)
**Role:** Backend Engineer  

**Problem**  
Need for fast, local productivity management through natural language without relying on cloud-based user interfaces.

**Solution**  
Developed a high-performance CLI-based AI agent capable of handling productivity and automation tasks using natural language commands in a local environment.

**Architecture & Tech Stack**  
- Python  
- LangChain  
- Groq LLM API  

**Technical Challenges Solved**  
- Resolved PowerShell execution policy restrictions on Windows  
- Solved complex Python dependency and virtual environment conflicts  
- Achieved sub-second response times in a local execution context  
