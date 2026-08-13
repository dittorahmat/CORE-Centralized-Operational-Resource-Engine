## Purpose

Provides a type-safe Drizzle ORM schema for documents, text chunks, and pgvector embeddings compatible with both Neon Serverless (Cloudflare) and local PostgreSQL (On-Premise).

## ADDED Requirements

### Requirement: Type-Safe Drizzle ORM Schema
The system SHALL define tables `documents` and `document_embeddings` using Drizzle ORM `pg-core` with native `vector(768)` column support.

#### Scenario: Database table generation
- **WHEN** Drizzle ORM migration or push is executed
- **THEN** it generates the exact PostgreSQL tables and vector indexes for fast cosine similarity search.
