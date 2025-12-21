import { generateText } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { google } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ollama } from "ai-sdk-ollama";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import { BENCHMARK_PROMPTS } from "../lib/prompts";
import { calculateScore } from "../lib/scoring";
import { BenchmarkResult, PromptResult } from "../lib/types";

// Load .env.local for Next.js compatibility
dotenv.config({ path: ".env.local" });
dotenv.config(); // Fallback to .env

// Setup OpenRouter
const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Setup LM Studio (OpenAI Compatible)
const lmstudioProvider = createOpenAI({
    baseURL: "http://localhost:1234/v1",
    apiKey: "lm-studio",
});

// Models to test - Format: "provider:modelId"
const DEFAULT_MODELS = [
    "ollama:llama3.2",
    "groq:llama-3.1-70b-versatile",
    "google:gemini-1.5-pro",
    "openrouter:meta-llama/llama-3.1-405b",
];

const MODELS_TO_TEST = process.env.TEST_MODELS
    ? process.env.TEST_MODELS.split(",")
    : DEFAULT_MODELS;

const RESULTS_DIR = path.join(process.cwd(), "data");
const RESULTS_FILE = path.join(RESULTS_DIR, "results.json");

/**
 * Returns the appropriate provider model instance based on string format "provider:modelId"
 */
function getModel(modelString: string) {
    const [provider, ...modelParts] = modelString.split(":");
    const modelId = modelParts.join(":");

    switch (provider) {
        case "ollama":
            return ollama(modelId);
        case "groq":
            return groq(modelId);
        case "google":
            return google(modelId);
        case "openrouter":
            return openrouter(modelId);
        case "lmstudio":
            return lmstudioProvider(modelId || "local-model");
        default:
            // Fallback to Ollama if no provider specified
            return ollama(modelString);
    }
}

async function main() {
    console.log(chalk.bold.magenta("\n🚀 J-Star Multi-Provider Benchmark Orchestrator\n"));

    await fs.mkdir(RESULTS_DIR, { recursive: true });
    const existingData = await loadResults();
    const runId = `RUN-${Date.now().toString().slice(-4)}`;

    console.log(chalk.blue(`📌 Starting Run ID: ${runId}`));
    console.log(chalk.dim(`Found ${MODELS_TO_TEST.length} models to test.`));

    const runResults: BenchmarkResult[] = [];

    for (const modelStr of MODELS_TO_TEST) {
        console.log(chalk.yellow(`\n🧪 Testing: ${modelStr}`));

        const modelInstance = getModel(modelStr);
        const modelPromptResults: PromptResult[] = [];
        let totalScore = 0;

        for (const promptDef of BENCHMARK_PROMPTS) {
            process.stdout.write(`   - Prompt: ${promptDef.id}... `);

            const startTime = performance.now();
            try {
                const { text } = await generateText({
                    model: modelInstance,
                    prompt: promptDef.prompt,
                    temperature: 0,
                });
                const duration = performance.now() - startTime;

                const evaluation = calculateScore(promptDef.id, text, duration);

                modelPromptResults.push({
                    id: promptDef.id,
                    prompt: promptDef.prompt,
                    response: text,
                    isError: false,
                    score: evaluation.score,
                    metrics: evaluation.metrics,
                    feedback: evaluation.feedback
                });

                totalScore += evaluation.score;
                console.log(chalk.green(`Done (${Math.round(duration)}ms) - Score: ${evaluation.score}`));

            } catch (error: any) {
                console.log(chalk.red(`Failed: ${error.message}`));
                modelPromptResults.push({
                    id: promptDef.id,
                    prompt: promptDef.prompt,
                    response: "",
                    isError: true,
                    score: 0,
                    metrics: { instructionFollowing: 0, creativity: 0 },
                    feedback: `Error: ${error.message}`
                });
            }
        }

        const avgScore = totalScore / BENCHMARK_PROMPTS.length;

        runResults.push({
            runId,
            timestamp: new Date().toISOString(),
            modelName: modelStr,
            durationMs: 0,
            tokensPerSecond: 0,
            prompts: modelPromptResults,
            totalScore: Number(avgScore.toFixed(1))
        });
    }

    existingData.push(...runResults);
    await fs.writeFile(RESULTS_FILE, JSON.stringify(existingData, null, 2));

    console.log(chalk.bold.green(`\n✅ Run Complete. Results saved to ${RESULTS_FILE}`));
}

async function loadResults(): Promise<BenchmarkResult[]> {
    try {
        const data = await fs.readFile(RESULTS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

main().catch(console.error);
