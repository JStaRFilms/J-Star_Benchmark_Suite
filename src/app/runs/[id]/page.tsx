import { ArrowLeft, Download, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header"; // Reusing Header structure but customizing
import { WinnerHighlight } from "@/features/dashboard/components/WinnerHighlight";
import { ModelResultCard } from "@/features/dashboard/components/ModelResultCard";

// Mock Data from HTML
const MOCK_RUN = {
    id: "RUN-205",
    date: "Oct 24, 2025",
    winner: {
        name: "Llama 3.1 70B",
        score: "98.2",
    },
    results: [
        {
            modelName: "Llama 3.1 70B",
            totalScore: "98.2",
            scoreColor: "success" as const,
            metrics: [
                {
                    label: "Instruction Following",
                    value: 100,
                    color: "success" as const,
                },
                { label: "Creativity (Vibe)", value: 92, color: "primary" as const },
            ],
            snippet: {
                prompt: "Mosaic...",
                code: `ffmpeg -i input.mp4 -vf "split=4[a][b][c][d];[a]pad=iw*2:ih*2[x];[b]...`,
            },
        },
        {
            modelName: "Mistral Nemo 12B",
            totalScore: "84.2",
            scoreColor: "warning" as const,
            metrics: [
                {
                    label: "Instruction Following",
                    value: 80,
                    color: "warning" as const,
                },
                { label: "Creativity (Vibe)", value: 88, color: "primary" as const },
            ],
            snippet: {
                prompt: "Mosaic...",
                code: `// Error: Syntax incorrect for complex filter...
ffmpeg -i input.mp4 -filter_complex ...`,
                isError: false, // HTML showed gray code, comment implies error but color was gray-300. Keeping straightforward.
            },
        },
    ],
};

export default async function RunDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header Customization for Details Page */}
                <header className="h-16 border-b border-border flex items-center justify-between px-8 z-10 bg-background/50 backdrop-blur-sm sticky top-0">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-text-muted hover:text-text-main transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold text-text-main flex items-center gap-2">
                                Run #{MOCK_RUN.id}
                                <span className="text-xs font-normal text-text-muted bg-surfaceHighlight px-2 py-0.5 rounded border border-border">
                                    {MOCK_RUN.date}
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle placeholder - logic usually in a context or client island */}
                        <button className="p-2 rounded-lg hover:bg-surfaceHighlight text-text-muted transition-colors">
                            <Sun className="w-5 h-5 hidden dark:block" />
                            <Moon className="w-5 h-5 block dark:hidden" />
                        </button>
                        <button className="flex items-center px-3 py-1.5 bg-surface hover:bg-surfaceHighlight text-text-muted text-xs font-medium rounded border border-border transition-all cursor-pointer">
                            <Download className="w-3.5 h-3.5 mr-2" /> Export JSON
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 z-10 space-y-8">
                    <WinnerHighlight
                        modelName={MOCK_RUN.winner.name}
                        score={MOCK_RUN.winner.score}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {MOCK_RUN.results.map((result, i) => (
                            <ModelResultCard
                                key={i}
                                modelName={result.modelName}
                                totalScore={result.totalScore}
                                scoreColor={result.scoreColor}
                                metrics={result.metrics}
                                snippet={result.snippet}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
