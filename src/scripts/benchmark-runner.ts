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
import { promisify } from "util";
import { exec } from "child_process";
import { BENCHMARK_PROMPTS } from "../lib/prompts";
import { calculateScore } from "../lib/scoring";
import { BenchmarkResult, PromptResult } from "../lib/types";

const execAsync = promisify(exec);

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
    // "ollama:llama3.2",
    // "ollama:deepseek-coder:1.3b",
    // "ollama:deepseek-r1:latest",
    // "ollama:gemma2:2b",
    // "ollama:llama3.1:8b",

    // "lmstudio:phi-3.1-mini-128k-instruct",
    // "lmstudio:llama-3.2-3b-instruct",
    // "lmstudio:qwen3-4b-instruct-2507",
    // "lmstudio:qwen3-4b-thinking-2507",
    // "lmstudio:gemma-3-4b-it",
    // "deepseek-r1-distill-qwen-7b",
    // "lmstudio:qwen3-vl-8b-instruct",
    // "lmstudio:openai/gpt-oss-20b",
    // "lmstudio:nvidia/nemotron-3-nano",

    "groq:openai/gpt-oss-120b",
    "groq:moonshotai/kimi-k2-instruct-0905",
    "groq:moonshotai/kimi-k2-instruct",
    "groq:openai/gpt-oss-20b",
    "groq:qwen/qwen3-32b",
    "groq:meta-llama/llama-4-scout-17b-16e-instruct",
    "groq:meta-llama/llama-4-maverick-17b-128e-instruct",
    "groq:llama-3.3-70b-versatile",
    "groq:llama-3.1-8b-instant",

    // "google:gemini-1.5-pro",
    // "google:gemini-1.5-flash",
    // "google:gemini-2.0-pro",
    // "google:gemini-2.0-flash",
    // "google:gemini-2.5-pro",
    // "google:gemini-2.5-flash",
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

                let outputVideo: string | undefined = undefined;

                // --- PHASE 6: VISUAL EXECUTION ---
                if (promptDef.id === "ffmpeg_mosaic_narrative" && !evaluation.feedback.includes("Invalid syntax")) {
                    try {
                        // Extract command (remove markdown code blocks and clean)
                        let command = text.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();
                        // Support multi-line commands with backslashes
                        command = command.replace(/\\\n/g, " ");

                        // Enforce our input and unique output
                        const outputFilename = `${runId}_${modelStr.replace(/:/g, "_")}.mp4`;
                        const outputPath = path.join(process.cwd(), "public", "outputs", outputFilename);

                        // Basic security/correctness: Ensure it uses input.mp4 and outputs to the right location
                        // We replace whatever output name the model chose with our unique path
                        command = command.replace(/mosaic_output\.mp4/g, `"${outputPath}"`);
                        // Ensure input path is relative to the cwd of the script
                        command = command.replace(/input\.mp4/g, '"public/assets/input.mp4"');

                        console.log(chalk.blue(`      🎬 Rendering video...`));
                        console.log(chalk.gray(`      🔍 Command: ${command}`));
                        await execAsync(command);

                        if (await fs.stat(outputPath).catch(() => null)) {
                            outputVideo = `/outputs/${outputFilename}`;
                            console.log(chalk.green(`      ✅ Rendered: ${outputFilename}`));
                        }
                    } catch (error: any) {
                        console.log(chalk.red(`      ❌ Render failed: ${error.message}`));
                        if (error.stderr) {
                            console.log(chalk.red(`      📜 Error detail: ${error.stderr.substring(0, 200)}...`));
                        }
                    }
                }

                modelPromptResults.push({
                    id: promptDef.id,
                    prompt: promptDef.prompt,
                    response: text,
                    isError: false,
                    score: evaluation.score,
                    metrics: evaluation.metrics,
                    feedback: evaluation.feedback,
                    outputVideo
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
