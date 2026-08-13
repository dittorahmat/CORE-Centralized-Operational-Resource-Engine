## Why

The current `CORE` repository has implemented basic RAG and chat capabilities, but it still lacks several key features, business impact views, connectors, vector database RAG capabilities, Drizzle ORM database management, dual-deployment storage abstraction (Cloudflare R2 for cloud demo vs Local Storage for On-Premise), and UI details shown in the official product poster (`ERIC brosur.jpeg`). Completing these missing requirements will align CORE with the exact capability set demonstrated in the brochure while establishing a flexible hybrid architecture for both cloud-hosted demo deployments and isolated enterprise on-premise installations.

## What Changes

- **Drizzle ORM Database & Schema Management**: Integrate Drizzle ORM (`drizzle-orm`, `drizzle-kit`) for type-safe database migrations, document metadata, and `pgvector` vector embedding schemas compatible with both Neon Serverless (Cloudflare) and local PostgreSQL (On-Premise).
- **Hybrid Storage Architecture (Cloudflare R2 & On-Premise Local Storage)**: Implement an abstract `IStorageProvider` adapter pattern supporting Cloudflare R2 object storage for cloud demo deployments and local disk storage for on-premise deployments.
- **PostgreSQL pgvector RAG Engine**: Implement full vector similarity search RAG using PostgreSQL with `pgvector`, multi-format file parsing (`.pdf` via `pdf-parse`, `.docx` via `mammoth`, `.xlsx`/`.csv` via `xlsx`), Gemini embedding (`text-embedding-004`), and chunking pipeline for custom uploaded documents.
- **Enterprise Knowledge Connectors**: Expand dataset and connector schemas to cover all 6 poster channels: Documents (SOPs, Contracts), Emails & Communications, Reports & Dashboards, ERP/CRM Systems, Spreadsheets & Databases, and Employee Knowledge.
- **Executive Starter Questions & Persona Alignment**: Implement the 5 core executive starter questions from the poster across roles and landing view.
- **Business Impact & Value Tracker**: Enhance the Business Impact dashboard to quantify time saved, decision accuracy, productivity gains, knowledge retention, and compliance.
- **Full Citation & Source Previewer**: Provide interactive document and system citation previews when AI answers questions, detailing source origin, page numbers, and confidence metrics.
- **100% Private & Secure Architecture View**: Add dedicated privacy and security status indicators highlighting tenant-bounded isolation, AES-256 encryption, and zero model retention.

## Capabilities

### New Capabilities
- `drizzle-orm-schema`: Type-safe schema definition for documents, chunks, vector embeddings (`drizzle-orm/pg-core` with `vector`), and database migrations.
- `hybrid-storage-adapter`: Abstract storage provider supporting Cloudflare R2 Bucket for cloud demo and Local File System for on-premise enterprise deployments.
- `vector-rag-engine`: PostgreSQL `pgvector` schema via Drizzle ORM, multi-format file parsing (`.pdf`, `.docx`, `.xlsx`), document chunking, Gemini embeddings, and cosine similarity retrieval pipeline.
- `enterprise-connectors`: Multi-channel ingestion and status management for Documents, Emails, Reports, ERP/CRM Systems, Spreadsheets, and Employee Knowledge.
- `executive-chat-intelligence`: Specialized Q&A engine supporting poster-aligned executive queries with source citations and dynamic chart metrics.
- `business-impact-analytics`: ROI and productivity analytics tracking time saved, decision accuracy, knowledge retention, and compliance metrics.

### Modified Capabilities
*(None - creating initial capabilities for spec-driven change)*

## Impact

- `server/db/`: Create `schema.ts`, `db.ts`, and Drizzle ORM database initialization.
- `drizzle.config.ts`: Create Drizzle Kit configuration for migrations.
- `server/storage/`: Create `IStorageProvider.ts`, `LocalStorageProvider.ts`, `R2StorageProvider.ts`, and factory switcher.
- `server.ts`: Integrate Drizzle ORM queries, multi-format document parsers (`pdf-parse`, `mammoth`, `xlsx`), `pgvector` database queries, embedding generation, RAG retrieval endpoints, and storage adapter.
- `src/data/initialData.ts`: Expand mock databases to include emails, spreadsheets, reports, and poster questions.
- `src/components/AskNexusView.tsx`: Enhance UI layout, starter questions, and citation modals to match poster aesthetics.
- `src/components/DocumentsView.tsx`: Add file upload drag-and-drop for `.pdf`, `.docx`, `.xlsx`, embedding indexing status, and original document preview links.
- `src/components/SourcesView.tsx` & `src/components/ImpactView.tsx`: Upgrade connectors grid and value metrics.
