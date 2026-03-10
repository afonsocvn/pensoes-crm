# Pensões CRM & AI Landing Page – Intelligent Lead Management

> **Note:** This is a personal project created with the goal of testing AI tools, modern web frameworks, and building a Minimum Viable Product (MVP) based on a real-world study case (Pension Funds).

The **Pensões CRM** project aims to revolutionize how pension funds (both personal and corporate) attract and manage their potential clients. The platform enables lead capture through an optimized landing page featuring an intelligent, AI-assisted chatbot. This eliminates hours of manual screening by automatically and empathetically qualifying potential investors. The primary focus is to optimize the sales team's time and maximize fund subscription opportunities.

## Tech Stack
- **Framework:** Next.js + React + Tailwind CSS (TSX)
- **Database & Authentication:** Supabase
- **Artificial Intelligence:** Google Gemini AI (gemini-1.5-flash) for natural conversation and data extraction
- **Design & Icons:** lucide-react

## Key Features and Workflow
- **Intelligent Capture (Chatbot):** Integration of a conversational virtual assistant capable of qualifying leads in real-time and routing them to the human team.
- **Dynamic Forms:** A lead capture form that instantly adapts to the user's profile (Individual Plan vs. Corporate Plan), reducing registration friction.
- **Efficient Management (CRM):** A dedicated dashboard featuring a table view and separated Kanban Pipelines (Individual / Corporate) with Drag & Drop support.
- **Data Export:** One-click lead export to CSV functionality for easy integration with other marketing tools.

## Process

### 1. Development Architecture and AI-Assisted Design
- Setup of the development environment (Next.js App Router).
- *During development:* Utilized artificial intelligence agents (Gemini) to act as *financial advisors*, employing customized *system prompts* to maintain an institutional tone focused on financial security and long-term yields.
### 2. Lead Capture and CRM Implementation (Development Phase)
- Created Supabase tables (`leads` and `chat_sessions`) for persistent storage.
- Built immersive interfaces (Landing Page) with a bifurcated journey (Individuals vs. Companies).
- Implemented a custom Kanban dashboard to manage the negotiation stages of the lead pipeline (New, In Negotiation, Closed, etc.).
### 3. Frontend, Deployment, and UX
- Designed an intuitive interface using trustworthy tones (dark blue and dynamic orange).
- Configured *Environment Variables* to protect API keys.
- Prepared for full deployment on **Vercel** for immediate team access and end-user testing.

## Key Findings (Beta Phase)
- Users highly value fast answers regarding profitability and tax benefits right at the initial contact (via chatbot).
- An intuitive Drag & Drop interface in the CRM accelerates daily management for the sales team.
- The dynamic form increases the conversion rate by omitting unnecessary fields for individual leads.

## Final Conclusion
To maximize the impact of **Pensões CRM**, future iterations could focus on expanding data analysis capabilities within the dashboard itself (overall conversion metrics) and directly integrating calls (automatic scheduling features). The current system proves that combining AI with lead capture substantially reduces initial friction.
