import fs from "fs/promises";
import path from "path";
import { BenchmarkResult, RunSummary } from "./types";

const RESULTS_FILE = path.join(process.cwd(), "data", "results.json");

export async function getAllResults(): Promise<BenchmarkResult[]> {
    try {
        const data = await fs.readFile(RESULTS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading results.json:", error);
        return [];
    }
}

export async function getRecentRuns(): Promise<RunSummary[]> {
    const allResults = await getAllResults();

    // Group by runId
    const runsMap = new Map<string, BenchmarkResult[]>();
    allResults.forEach(res => {
        if (!runsMap.has(res.runId)) {
            runsMap.set(res.runId, []);
        }
        runsMap.get(res.runId)?.push(res);
    });

    const summaries: RunSummary[] = Array.from(runsMap.entries()).map(([id, results]) => {
        const winner = results.reduce((prev, current) =>
            (prev.totalScore > current.totalScore) ? prev : current
        );

        return {
            id,
            date: results[0].timestamp,
            models: results.map(r => r.modelName),
            winner: {
                name: winner.modelName,
                score: winner.totalScore
            },
            status: "COMPLETED" as const
        };
    });

    // Sort by date descending
    return summaries.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export async function getRunDetails(id: string): Promise<{
    id: string;
    date: string;
    winner: { name: string; score: string };
    results: any[];
} | null> {
    const allResults = await getAllResults();
    const runResults = allResults.filter(r => r.runId === id);

    if (runResults.length === 0) return null;

    const winner = runResults.reduce((prev, current) =>
        (prev.totalScore > current.totalScore) ? prev : current
    );

    return {
        id: runResults[0].runId,
        date: new Date(runResults[0].timestamp).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        winner: {
            name: winner.modelName,
            score: winner.totalScore.toString()
        },
        results: runResults.map(r => ({
            modelName: r.modelName,
            totalScore: r.totalScore.toString(),
            scoreColor: r.totalScore > 80 ? "success" : r.totalScore > 50 ? "warning" : "error",
            metrics: r.prompts[0]?.metrics ? [
                { label: "Instruction Following", value: r.prompts[0].metrics.instructionFollowing, color: "success" },
                { label: "Creativity (Vibe)", value: r.prompts[0].metrics.creativity, color: "primary" }
            ] : [],
            snippet: {
                prompt: r.prompts.find(p => p.outputVideo)?.id || r.prompts[0]?.id || "N/A",
                code: r.prompts.find(p => p.outputVideo)?.response || r.prompts[0]?.response || "No response",
                outputVideo: r.prompts.find(p => p.outputVideo)?.outputVideo
            }
        }))
    };
}
