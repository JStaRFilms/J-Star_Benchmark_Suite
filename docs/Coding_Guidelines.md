# Coding Guidelines: J-Star Benchmark Suite

## The Blueprint and Build Protocol (Mandatory)

This protocol governs the entire lifecycle of creating any non-trivial feature.

### Phase 1: The Blueprint (Planning & Documentation)
Before writing code, a plan MUST be created in `docs/features/FeatureName.md`. This plan must detail:
- High-Level Goal
- Component Breakdown (label "Server" or "Client")
- Logic & Data Breakdown (hooks, API routes)
- Database Schema Changes (if any)
- Step-by-Step Implementation Plan

**This plan requires human approval before proceeding.**

### Phase 2: The Build (Iterative Implementation)
Execute the plan one step at a time. Present code AND updated documentation after each step.
Wait for "proceed" signal before continuing.

### Phase 3: Finalization
Announce completion. Present final documentation. Provide integration instructions.

---

## Tech-Specific Guidelines

### 1. Next.js & TypeScript
- **Server Components by Default:** Use `use client` only when interactivity is strictly required.
- **Strict Mode:** No `any`. Use generic types where appropriate.
- **Zod Validation:** All external inputs (user, API, or LLM) must be validated with Zod schemas.

### 2. Vercel AI SDK (Standard)
- **Unified Interface:** Use `generateText` for one-off benchmark tasks and `streamText` for UI-facing interactions.
- **Provider:** Use `@ai-sdk/ollama` (or check for OpenAI compatibility if needed) to connect to local models.
- **Deterministic:** Explicitly set `temperature: 0` in the SDK capability options.
- **Type Safety:** Use the SDK's built-in types for responses and tool calling.

### 3. File Structure
- `src/features/[FeatureName]`: Self-contained feature modules.
- `src/scripts`: Standalone Node.js/TS scripts (like the Orchestrator).
- `src/components/ui`: Reusable, dumb components.

### 4. Vibe Code
- **Aesthetics Matter:** The dashboard must look "Premium" (Dark mode, glassmorphism, smooth animations).
- **Proactive Refactoring:** If a file hits 200 lines, refactor immediately.

---

## Reference
- See `docs/Project_Requirements.md` for the current feature roadmap.
