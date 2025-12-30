"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Code, BrainCircuit } from "lucide-react";

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
        outputVideo?: string;
    };
}

export function ModelResultCard({
    modelName,
    totalScore,
    scoreColor,
    metrics,
    snippet,
}: ModelResultCardProps) {
    const [isThinkingOpen, setIsThinkingOpen] = useState(false);

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

    // Parse Thinking vs Code
    const lowerCode = snippet.code.toLowerCase();
    const thinkStart = lowerCode.indexOf("<think>");
    const thinkEnd = lowerCode.indexOf("</think>");

    let thinking = null;
    let mainContent = snippet.code;

    if (thinkStart !== -1) {
        if (thinkEnd !== -1 && thinkEnd > thinkStart) {
            thinking = snippet.code.substring(thinkStart + 7, thinkEnd).trim();
            mainContent = (snippet.code.substring(0, thinkStart) + snippet.code.substring(thinkEnd + 8)).trim();
        } else {
            // No closing tag found, take everything after <think>
            thinking = snippet.code.substring(thinkStart + 7).trim();
            mainContent = snippet.code.substring(0, thinkStart).trim();
        }
    }

    return (
        <GlassPanel className="rounded-xl overflow-hidden border border-border flex flex-col group transition-all hover:border-border-highlight hover:shadow-lg hover:shadow-primary/5">
            <div className="p-4 border-b border-border bg-surfaceHighlight/30 flex justify-between items-center">
                <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
                    {modelName}
                </h3>
                <span
                    className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded border shadow-sm",
                        scoreBadgeColors[scoreColor]
                    )}
                >
                    {totalScore}
                </span>
            </div>

            <div className="p-6 space-y-6 flex-1">
                {/* Metrics */}
                <div className="space-y-4">
                    {metrics.map((metric, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-text-muted font-medium">{metric.label}</span>
                                <span className="text-text-main font-mono">{metric.value}/100</span>
                            </div>
                            <div className="h-2 bg-surfaceHighlight rounded-full overflow-hidden p-[1px] border border-white/5">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000 ease-out", barColors[metric.color])}
                                    style={{ width: `${metric.value}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dynamic Content Section */}
                <div className="space-y-3">
                    {/* Thinking Block */}
                    {thinking && (
                        <div className="rounded-lg border border-border bg-black/20 overflow-hidden">
                            <button
                                onClick={() => setIsThinkingOpen(!isThinkingOpen)}
                                className="w-full flex items-center justify-between p-3 text-xs text-text-muted hover:text-text-main transition-colors bg-white/5"
                            >
                                <div className="flex items-center gap-2">
                                    <BrainCircuit className="w-3.5 h-3.5 text-primary" />
                                    <span className="font-semibold uppercase tracking-wider">Thinking Process</span>
                                </div>
                                {isThinkingOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                            {isThinkingOpen && (
                                <div className="p-4 text-xs text-text-dim leading-relaxed border-t border-border bg-black/40 max-h-60 overflow-y-auto font-mono whitespace-pre-wrap">
                                    {thinking}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rendered Video Output */}
                    {snippet.outputVideo && (
                        <div className="bg-gray-950 rounded-lg overflow-hidden border border-primary/20 shadow-neon">
                            <div className="flex items-center justify-between px-3 py-2 bg-primary/10 border-b border-primary/10">
                                <div className="flex items-center gap-2">
                                    <BrainCircuit className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                                        Rendered AV Preview
                                    </span>
                                </div>
                                <span className="text-[10px] text-text-dim font-mono">
                                    SUCCESS
                                </span>
                            </div>
                            <video
                                src={snippet.outputVideo}
                                controls
                                className="w-full aspect-video bg-black"
                            />
                        </div>
                    )}

                    {/* Code Snippet Preview */}
                    <div className="bg-gray-950 rounded-lg overflow-hidden border border-white/5 shadow-inner">
                        <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Code className="w-3.5 h-3.5 text-accent" />
                                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                                    Output Result
                                </span>
                            </div>
                            <span className="text-[10px] text-text-dim font-mono">
                                {snippet.prompt}
                            </span>
                        </div>
                        <pre
                            className={cn(
                                "p-4 font-mono text-xs overflow-x-auto leading-relaxed custom-scrollbar",
                                snippet.isError ? "text-red-400" : "text-gray-300"
                            )}
                        >
                            <code className="block">{mainContent}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </GlassPanel>
    );
}

