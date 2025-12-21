import { Crown } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface WinnerHighlightProps {
    modelName: string;
    score: string;
}

export function WinnerHighlight({ modelName, score }: WinnerHighlightProps) {
    return (
        <GlassPanel className="p-1 rounded-xl bg-gradient-to-r from-primary/20 via-transparent to-transparent">
            <div className="bg-surface/50 p-6 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                        <Crown className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-primary font-bold uppercase tracking-wider">
                            Run Winner
                        </p>
                        <h2 className="text-xl font-bold text-text-main">{modelName}</h2>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-text-main">{score}</p>
                    <p className="text-xs text-text-muted">Total Score</p>
                </div>
            </div>
        </GlassPanel>
    );
}
