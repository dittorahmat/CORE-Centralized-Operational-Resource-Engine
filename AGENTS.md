# CORE Development Conventions & Agent Guidelines

Guidelines for AI Coding Assistants and Developers working on **CORE (Centralized Operational Resource Engine)**.

---

## 📐 Core Engineering Principles

1. **KISS (Keep It Simple, Stupid)**
   - Keep design, layout, and function structures direct and frictionless.
   - Avoid decorative fluff, redundant abstractions, or unnecessary code complexity.

2. **YAGNI (You Ain't Gonna Need It)**
   - Implement only features and parameters currently requested or specified in OpenSpec proposals.
   - Do not write speculative logic, dummy fallbacks, or unused future options.

3. **Modular File Refactoring**
   - Refactor files whenever they become too large or handle multiple responsibilities.
   - Separate UI views, storage providers, parsers, database schemas, and helper functions into clean, focused modules.

---

## 🛠️ Mandatory Code & Database Verification Pipeline

Every time code or database schemas are modified/added:

1. **Linting, Type-Checking, Build & Test Verification**:
   - Run `npm run lint` (or `tsc --noEmit`) to verify TypeScript type safety.
   - Run `npm run test` (or test runner) after code changes. Write new unit/integration tests whenever adding or modifying core features that require test coverage.
   - Run `npm run build` after completing any feature or fix to ensure production bundle integrity.

2. **Database Schema Synchronization**:
   - Whenever `server/db/schema.ts` is created, updated, or modified, **ALWAYS** execute `npx drizzle-kit push` immediately to synchronize changes with PostgreSQL / Neon DB.
