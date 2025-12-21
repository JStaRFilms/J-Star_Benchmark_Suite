import { PromptResult } from "./types";

/**
 * FR-003: The Scoring Engine
 * Layer 1: Penalty Box (Deterministic Syntax Checks)
 * Layer 2: The Judge (Heuristic/AI Evaluation)
 */

export function calculateScore(
    promptId: string,
    response: string,
    durationMs: number
): { score: number; feedback: string; metrics: any } {
    let score = 100;
    const feedback: string[] = [];
    const metrics = { instructionFollowing: 100, creativity: 100 };

    // --- Layer 1: Penalty Box (Syntax Checks) ---
    if (promptId === "ffmpeg_mosaic_narrative") {
        // Check for critical FFmpeg components
        const required = [
            "ffmpeg",
            "-i",
            "filter_complex",
            "split",
            "pad",
            "hflip",
            "drawtext",
        ];
        for (const token of required) {
            if (!response.includes(token)) {
                score -= 10;
                metrics.instructionFollowing -= 10;
                feedback.push(`Missing critical token: ${token}`);
            }
        }

        // Check for "4 quadrants" logic (approximate)
        if ((response.match(/\[[a-z0-9]+\]/g) || []).length < 4) {
            score -= 15;
            feedback.push("Complex filter structure seems too simple for a mosaic.");
        }
    }

    // --- Layer 2: The Judge (Heuristics for Vibe) ---
    // In a real implementation, this would call a "Judge LLM"
    // For now, we use heuristics based on length and structure

    if (response.length < 50) {
        score -= 20;
        feedback.push("Response too short.");
    }

    // Speed Penalty (Soft)
    if (durationMs > 10000) {
        // Arbitrary threshold
        // score -= 5;
        // feedback.push("Response was slow.");
    }

    return {
        score: Math.max(0, score),
        feedback: feedback.join("; ") || "Perfect execution.",
        metrics,
    };
}
