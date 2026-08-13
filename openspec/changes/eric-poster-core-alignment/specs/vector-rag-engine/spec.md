## Purpose

Implements a production vector search RAG pipeline using PostgreSQL with pgvector extension, multi-format file parsing (.pdf, .docx, .xlsx, .txt), and Gemini embeddings.

## ADDED Requirements

### Requirement: Database Vector Extension & Schema
The system SHALL initialize PostgreSQL with the `pgvector` extension and maintain a `document_embeddings` table storing chunk content, 768-dimensional vector embeddings, and metadata.

#### Scenario: Database initialization
- **WHEN** the backend server starts and connects to PostgreSQL
- **THEN** it executes `CREATE EXTENSION IF NOT EXISTS vector` and creates the `document_embeddings` table if not present.

### Requirement: Multi-Format File Parsing & Vector Ingestion
The system SHALL extract text from uploaded `.pdf` (using `pdf-parse`), `.docx` (using `mammoth`), `.xlsx`/`.csv` (using `xlsx`), and `.txt` files, generate chunk embeddings via Gemini `text-embedding-004`, and store vectors in PostgreSQL.

#### Scenario: Document upload vectorization
- **WHEN** a user uploads a `.pdf`, `.docx`, or `.xlsx` file in the Documents view
- **THEN** the backend parses text using the appropriate file parser, splits text into chunks, generates vector embeddings, and inserts them into `document_embeddings`.

### Requirement: Vector Similarity Search Retrieval
The system SHALL perform Cosine Similarity Search (`<=>`) against PostgreSQL to retrieve relevant context chunks before sending user prompts to Gemini.

#### Scenario: Query retrieval
- **WHEN** a user submits a question in Ask CORE chat
- **THEN** the system converts the query to a vector embedding, fetches top-k similar chunks from PostgreSQL, and injects them into the LLM system prompt.
