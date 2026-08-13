# CORE — Centralized Operational Resource Engine

> **Your Company's Intelligence. Available Instantly.**  
> An enterprise-grade AI-powered platform that turns company information, documents, systems, spreadsheets, and knowledge into instant answers, insights, and recommendations.

---

## 📸 Poster Feature Alignment

CORE is designed to fulfill all feature pillars featured in the enterprise product brochure (`ERIC brosur.jpeg`):

1. **Ask CORE Intelligence**: Executive chat portal with role-based personas, instant answers, and citation cross-references.
2. **6 Knowledge Connectors**:
   - 📄 **Documents**: SOPs, Policies, Manuals, Contracts
   - ✉️ **Emails & Communications**: Outlook, Gmail, Teams/Slack
   - 📊 **Reports & Dashboards**: PDF Financial Reports, Executive Summaries
   - 🗄️ **Systems**: SAP ERP, Salesforce CRM, Workday HR
   - 📑 **Spreadsheets & Databases**: Excel, Google Sheets, PostgreSQL / Neon DB
   - 🧠 **Employee Knowledge**: Internal Wiki & Handbooks
3. **Business Impact Analytics**: Tracks Time Saved, Decision Accuracy, Productivity Gains, Knowledge Retention, and Compliance.
4. **100% Private & Secure**: Private tenant isolation with AES-256 encryption and zero AI model training retention.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Express.js (Node.js/TypeScript), Google Gemini API (`@google/genai`)
- **Database**: PostgreSQL (Neon Database with `pgvector` extension support)
- **Runtime**: Bun / Node.js

---

## 🚀 Quick Start

### 1. Installation

```bash
git clone https://github.com/dittorahmat/CORE-Centralized-Operational-Resource-Engine.git
cd CORE-Centralized-Operational-Resource-Engine
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY="your_gemini_api_key"
DATABASE_URL="postgresql://username:password@ep-lively-mouse.aws.neon.tech/neondb?sslmode=require"
PORT=3000
```

### 3. Development Server

Run frontend and backend simultaneously:

```bash
npm run dev
```

Server will run at: `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🧠 Vector RAG Architecture (`pgvector` Roadmap)

Current implementation supports **Instruction-based Contextual Ingestion** with Gemini `gemini-3.6-flash`. To upgrade to **Full Vector Search RAG**:

1. **Database Vector Extension**:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   
   CREATE TABLE document_embeddings (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       document_id VARCHAR(255),
       chunk_content TEXT,
       embedding vector(768),
       metadata JSONB,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Ingestion Pipeline**: Uploaded documents in `DocumentsView.tsx` are chunked and embedded via `text-embedding-004` before saving to Neon PostgreSQL.
3. **Query Pipeline**: User questions execute Cosine Distance search (`<=>`) in PostgreSQL to pull relevant chunks into the Gemini prompt context.

---

## 📁 Repository Structure

```
├── src/
│   ├── components/
│   │   ├── AskNexusView.tsx       # Ask CORE Chat Portal & Starter Questions
│   │   ├── DocumentsView.tsx      # Document Vault & Upload Analyzer
│   │   ├── SourcesView.tsx        # Enterprise Data Channel Connectors
│   │   ├── ImpactView.tsx         # Business Impact Dashboard
│   │   ├── InsightsView.tsx       # AI Executive Insights
│   │   └── KnowledgeGaps.tsx      # Institutional Risk Analysis
│   ├── data/
│   │   └── initialData.ts         # Initial mock enterprise data
│   ├── App.tsx                    # Main App Container & State
│   └── types.ts                   # Core Data Interface Definitions
├── server.ts                      # Express Backend & Gemini Integration
├── .env                           # Environment Credentials (Ignored in Git)
└── README.md
```
