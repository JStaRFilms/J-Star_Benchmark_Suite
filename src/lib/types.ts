export interface BenchmarkResult {
    runId: string;
    timestamp: string;
    modelName: string;
    durationMs: number;
    tokensPerSecond: number;
    prompts: PromptResult[];
    totalScore: number;
}

export interface PromptResult {
    id: string; // e.g., "composite-video"
    prompt: string;
    response: string;
    isError: boolean;
    score: number; // 0-100
    metrics: {
        instructionFollowing: number;
        creativity: number;
        // Add other metrics as needed
    };
    feedback: string;
}

export interface RunSummary {
    id: string;
    date: string;
    models: string[]; // List of model names tested
    winner: {
        name: string;
        score: number;
    };
    status: "COMPLETED" | "FAILED" | "IN_PROGRESS";
}
