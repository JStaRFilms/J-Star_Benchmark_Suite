import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

interface Metric {
    label: string;
    value: number; // 0-100
    color: "success" | "warning" | "error" | "primary";
}

interface ModelResultCardProps {
    modelName: string;
    totalScore: string; // e.g., "98.2"
    scoreColor: "success" | "warning" | "error";
    metrics: Metric[];
    snippet: {
        prompt: string;
        code: string;
        isError?: boolean;
    };
}

export function ModelResultCard({
    modelName,
    totalScore,
    scoreColor,
    metrics,
    snippet,
}: ModelResultCardProps) {
    const scoreBadgeColors = {
        success: "text-success bg-success/10 border-success/20",
        warning: "text-warning bg-warning/10 border-warning/20",
        error: "text-error bg-error/10 border-error/20",
    };

    const barColors = {
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        primary: "bg-primary",
    };

    return (
        <GlassPanel className="rounded-xl overflow-hidden border border-border flex flex-col">
            <div className="p-4 border-b border-border bg-surfaceHighlight/30 flex justify-between items-center">
                <h3 className="font-bold text-text-main">{modelName}</h3>
                <span
                    className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded border",
                        scoreBadgeColors[scoreColor]
                    )}
                >
                    {totalScore}
                </span>
            </div>
            <div className="p-6 space-y-6 flex-1">
                {/* Metrics */}
                {metrics.map((metric, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-text-muted">{metric.label}</span>
                            <span className="text-text-main">{metric.value}/100</span>
                        </div>
                        <div className="h-1.5 bg-surfaceHighlight rounded-full overflow-hidden">
                            <div
                                className={cn("h-full", barColors[metric.color])}
                                style={{ width: `${metric.value}%` }}
                            ></div>
                        </div>
                    </div>
                ))}

                {/* Code Snippet Preview (Always Dark) */}
                <div className="bg-gray-950 rounded-lg p-3 border border-white/5">
                    <p className="text-xs text-gray-400 mb-2 font-mono">
                        Output Snippet (Prompt: "{snippet.prompt}")
                    </p>
                    <pre
                        className={cn(
                            "font-mono text-xs overflow-x-auto",
                            snippet.isError ? "text-red-400" : "text-gray-300"
                        )}
                    >
                        <code>{snippet.code}</code>
                    </pre>
                </div>
            </div>
        </GlassPanel>
    );
}
