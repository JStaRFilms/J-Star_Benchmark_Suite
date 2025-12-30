import { ArrowLeft, Download, Sun, Moon, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { WinnerHighlight } from "@/features/dashboard/components/WinnerHighlight";
import { ModelResultCard } from "@/features/dashboard/components/ModelResultCard";
import { getRunDetails } from "@/lib/data-service";

export default async function RunDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const run = await getRunDetails(id);

    if (!run) {
        return (
            <div className="flex h-screen overflow-hidden bg-background items-center justify-center">
                <div className="text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-error mx-auto" />
                    <h1 className="text-xl font-bold text-text-main">Run Not Found</h1>
                    <p className="text-text-muted">The run #{id} does not exist in our records.</p>
                    <Link href="/" className="text-primary hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        );
    }

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
                                Run #{run.id}
                                <span className="text-xs font-normal text-text-muted bg-surfaceHighlight px-2 py-0.5 rounded border border-border">
                                    {run.date}
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center px-3 py-1.5 bg-surface hover:bg-surfaceHighlight text-text-muted text-xs font-medium rounded border border-border transition-all cursor-pointer">
                            <Download className="w-3.5 h-3.5 mr-2" /> Export JSON
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 z-10 space-y-8">
                    <WinnerHighlight
                        modelName={run.winner.name}
                        score={run.winner.score}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {run.results.map((result, i) => (
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

