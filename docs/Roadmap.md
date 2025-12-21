# Roadmap & Issues: J-Star Benchmark Suite

## Active Issues (MUS)

### [Issue-001] Benchmark Orchestrator (FR-001)
**Labels:** `MUS`, `enhancement`, `core`
**User Story:** As a developer, I want a script to iterate through my local Ollama models, so that I can automatically test all of them.
**Proposed Solution:**
- Create `src/scripts/benchmark-runner.ts`.
- Use `ai` and `@ai-sdk/ollama`.
- Implement a model discovery function (or config list).
- Loop through models and execute prompts using `generateText`.

### [Issue-002] The "John Factor" Test Suite (FR-002)
**Labels:** `MUS`, `enhancement`, `testing`
**User Story:** As a Creative Technologist, I want specific tests for FFmpeg and Canvas...
**Proposed Solution:**
- Define `PROMPTS` constant with:
  - FFmpeg: "Create 2x2 grid..."
  - Canvas: "Rotating Cube..."
  - Saxophone: "SVG Sax..."

### [Issue-003] Scoring Engine Implementation (FR-003)
**Labels:** `MUS`, `enhancement`, `logic`
**User Story:** As a user, I want a dual-layer scoring system...
**Proposed Solution:**
- **Hard Score:** Run `ts-morph` or simple regex to check for syntax errors. Deduct points for retries.
- **Soft Score:** Feed the output code back to an LLM (The Judge) with a grading prompt.

### [Issue-004] Dashboard UI (FR-004)
**Labels:** `MUS`, `enhancement`, `ui`
**User Story:** As a user, I want a Next.js web interface...
**Proposed Solution:**
- Initialize Next.js.
- Create `src/app/page.tsx` with a data table.
- Load `data/results.json` and display metrics.

## Future Scope

### [Issue-005] Live Stream Mode (FR-005)
**Labels:** `future-scope`, `ui`
**User Story:** As a streamer, I want a "Blind Test" interface...
**Proposed Solution:**
- Create a specific "Battle Mode" page.
- Hide model names until rated.
