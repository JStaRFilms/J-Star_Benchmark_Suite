# Project Requirements: J-Star Benchmark Suite

## Functional Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-001 | **Benchmark Orchestrator** | As a developer, I want a script to iterate through my local Ollama models, so that I can automatically test all of them. | A `benchmark-runner.ts` script that detects/defines models and executes prompts against them via Vercel AI SDK. | MUS |
| FR-002 | **The "John Factor" Test Suite** | As a Creative Technologist, I want specific tests for FFmpeg and Canvas, so that I can verify models against my specific creative workflows. | System prompts models with "Mosaic Narrative" (FFmpeg) and "Visual Shapes" (Canvas) tasks. | MUS |
| FR-003 | **Scoring Engine (Judge)** | As a user, I want a dual-layer scoring system (Deterministic + AI Judge), so that I get accurate and nuanced ratings. | Implementation of "Penalty Box" (Hard Deductions) and "J-Star Reviewer" (Soft Score) logic. | MUS |
| FR-004 | **Dashboard UI** | As a user, I want a Next.js web interface, so that I can view and analyze the benchmark results. | A clean dashboard displaying tables of model performance, filtered by metrics (Size, Speed, John Score). | MUS |
| FR-005 | **Live Stream Mode (Manua Rating)** | As a streamer, I want a "Blind Test" interface, so that I can manually rate model outputs without bias during a live stream. | A specialized UI view with a code preview iframe and manual scoring sliders (Functionality, Aesthetics). | Future |
