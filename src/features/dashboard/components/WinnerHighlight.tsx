import { Crown, Sparkles } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface WinnerHighlightProps {
    modelName: string;
    score: string;
}

export function WinnerHighlight({ modelName, score }: WinnerHighlightProps) {
    return (
        <GlassPanel className="p-[2px] rounded-xl bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 shadow-2xl shadow-primary/10 relative group overflow-hidden">
            {/* Animated Glow Backdrop */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 blur-xl"></div>

            <div className="bg-background/80 backdrop-blur-md p-6 rounded-[10px] flex items-center justify-between relative overflow-hidden">
                {/* Subtle Sparkle Icons in Background */}
                <Sparkles className="absolute -bottom-1 -left-1 w-12 h-12 text-primary/5 -rotate-12" />

                <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent p-[1px] shadow-lg shadow-primary/20">
                        <div className="w-full h-full rounded-full bg-surface/90 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                            <Crown className="w-7 h-7" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                                Current Champion
                            </p>
                        </div>
                        <h2 className="text-2xl font-black text-text-main tracking-tight">
                            {modelName}
                        </h2>
                    </div>
                </div>

                <div className="text-right flex flex-col items-end relative z-10">
                    <div className="flex items-baseline gap-1">
                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-text-main to-text-muted">
                            {score}
                        </p>
                        <span className="text-sm font-bold text-text-muted">/100</span>
                    </div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                        Aggregate Performance
                    </p>
                </div>
            </div>
        </GlassPanel>
    );
}

