# CORE Development Conventions & Gemini AI Guidelines

Instructions and standards for Gemini AI Pair-Programming on **CORE (Centralized Operational Resource Engine)**.

---

## 📐 Development Principles

1. **KISS & YAGNI Standards**
   - Strictly adhere to **KISS** (Keep It Simple, Stupid) and **YAGNI** (You Ain't Gonna Need It).
   - Write clean, straightforward TypeScript code without speculative or unused complexity.

2. **Modular File Refactoring**
   - If a component or server file grows too large, proactively refactor it into smaller, modular sub-components or utility modules.

---

## 🛠️ Mandatory Verification & Database Workflow

- **Code Quality & Testing Pipeline**:
  - Run `npm run lint` (or `tsc --noEmit`), execute automated tests (`bun test` / `npm test`), and run `npm run build` after **every** code addition or modification.
  - Create new unit/integration tests whenever introducing or changing code features that warrant testing.
  
- **Database Schema Sync**:
  - Run `npx drizzle-kit push` immediately after **any** addition or change to the Drizzle ORM schema (`server/db/schema.ts`).
