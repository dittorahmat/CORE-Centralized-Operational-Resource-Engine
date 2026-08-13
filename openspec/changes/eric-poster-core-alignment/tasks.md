## 1. Drizzle ORM & Database Setup

- [x] 1.1 Add `drizzle-orm`, `drizzle-kit`, `pg`, `@neondatabase/serverless` to `package.json`.
- [x] 1.2 Create `drizzle.config.ts` and `server/db/schema.ts` defining `documents` and `document_embeddings` (with `pgvector`).
- [x] 1.3 Create `server/db/index.ts` connecting Drizzle ORM to PostgreSQL Neon or Local Postgres.

## 2. Storage Abstraction Layer

- [x] 2.1 Create `IStorageProvider.ts` interface in `server/storage/`.
- [x] 2.2 Implement `LocalStorageProvider.ts` for On-Premise disk storage.
- [x] 2.3 Implement `R2StorageProvider.ts` for Cloudflare R2 bucket storage.
- [x] 2.4 Implement storage factory switcher based on `DEPLOYMENT_MODE` environment variable / runtime detection.

## 3. Multi-Format File Parsing & Vector RAG Engine

- [x] 3.1 Add `pdf-parse`, `mammoth`, `xlsx`, and `multer` dependencies to `package.json`.
- [x] 3.2 Add multi-format file parsing (`.pdf`, `.docx`, `.xlsx`, `.txt`) and text chunking to upload endpoint `/api/analyze-document`.
- [x] 3.3 Add Gemini `text-embedding-004` embedding generation and insert into `document_embeddings` via Drizzle ORM.
- [x] 3.4 Implement Cosine Similarity Search (`<=>`) query retrieval in `/api/chat` RAG pipeline.

## 4. Enterprise Connectors Data & UI Alignment

- [x] 4.1 Update `initialData.ts` to add missing channels: Emails, Reports, Spreadsheets, Knowledge Wiki.
- [x] 4.2 Update `SourcesView.tsx` to render all 6 channel cards matching the poster.

## 5. Executive Questions & Ask CORE Views

- [x] 5.1 Update starter questions in `initialData.ts` to match the 5 poster executive questions.
- [x] 5.2 Enhance `AskNexusView.tsx` to display starter question pills prominently.

## 6. Business Impact & Value Dashboard

- [x] 6.1 Update `ImpactView.tsx` to mirror poster value pillars (Save Time, Better Decisions, Productivity, Knowledge, Compliance).

## 7. Verification & Testing

- [x] 7.1 Run full build, test Drizzle ORM migration, test `.pdf`/`.docx`/`.xlsx` file uploads, verify storage provider switching, and check RAG search accuracy.
