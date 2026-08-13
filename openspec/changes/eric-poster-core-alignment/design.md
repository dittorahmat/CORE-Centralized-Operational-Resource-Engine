## Context

The system needs to reflect all feature pillars from the ERIC product brochure while preserving the `CORE` branding, existing React + Vite + Express + Gemini stack, enhanced with Drizzle ORM + PostgreSQL `pgvector` for vector RAG and dual-deployment storage abstraction (Cloudflare R2 vs On-Premise Local Storage).

## Goals / Non-Goals

**Goals:**
- Implement Drizzle ORM (`drizzle-orm`, `drizzle-kit`) for type-safe database queries and migrations.
- Implement `IStorageProvider` adapter pattern (`LocalStorageProvider` vs `R2StorageProvider`).
- Implement `pgvector` database connection and vector storage in PostgreSQL via Drizzle ORM.
- Support multi-format document parsing (`.pdf`, `.docx`, `.xlsx`, `.csv`).
- Implement text chunking and vector embedding generation via Gemini API.
- Add all 6 data source channel cards (Documents, Emails, Reports, Systems, Spreadsheets, Knowledge).
- Add poster-aligned executive starter questions in Landing / Ask CORE view.
- Update Business Impact view to present 5 core poster value pillars.

**Non-Goals:**
- Changing existing frontend framework architecture.

## Decisions

- **Decision 1: Drizzle ORM Layer**: Use Drizzle ORM with `@neondatabase/serverless` (Cloudflare) or `pg` (On-Premise) for type safety and automatic schema synchronization.
- **Decision 2: Storage Adapter Pattern**: Use environment variable `DEPLOYMENT_MODE` (`cloudflare` vs `on-premise`) to switch between Cloudflare R2 object storage and local server file storage.
- **Decision 3: Multi-Format Parser Selection**: Integrate `pdf-parse` for PDF, `mammoth` for DOCX, and `xlsx` for Excel files to extract clean plain text for RAG chunking.

## Risks / Trade-offs

- [Risk] Large binary document upload memory usage → Mitigation: Stream file uploads and set 25MB max size limit per document.
