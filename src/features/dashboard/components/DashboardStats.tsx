import { Trophy, Zap, Activity, TrendingUp } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface DashboardStatsProps {
    topModel: string;
    topScore: number;
    avgSpeed: number;
    totalRuns: number;
    lastRunTime: string;
}

export function DashboardStats({
    topModel,
    topScore,
    avgSpeed,
    totalRuns,
    lastRunTime,
}: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <GlassPanel className="p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                    <Trophy className="w-24 h-24 text-primary" />
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Trophy className="w-3 h-3" /> Top Performer
                    </p>
                    <h3 className="text-2xl font-black text-text-main mb-1 tracking-tight group-hover:text-primary transition-colors">
                        {topModel || "N/A"}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-success/10 text-success text-[10px] font-black px-2 py-0.5 rounded border border-success/20">
                            {topScore.toFixed(1)}
                        </span>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                            Aggregate Score
                        </p>
                    </div>
                </div>
            </GlassPanel>

            {/* Stat 2 */}
            <GlassPanel className="p-6 relative overflow-hidden group hover:border-warning/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                    <TrendingUp className="w-24 h-24 text-warning" />
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] text-warning font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Performance Avg
                    </p>
                    <h3 className="text-2xl font-black text-text-main mb-1 tracking-tight">
                        {avgSpeed.toFixed(1)}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-warning/10 text-warning text-[10px] font-black px-2 py-0.5 rounded border border-warning/20">
                            Global
                        </span>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                            Cross-model Average
                        </p>
                    </div>
                </div>
            </GlassPanel>

            {/* Stat 3 */}
            <GlassPanel className="p-6 relative overflow-hidden group hover:border-accent/30 transition-all duration-500">
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                    <Zap className="w-24 h-24 text-accent" />
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> System Activity
                    </p>
                    <h3 className="text-2xl font-black text-text-main mb-1 tracking-tight">
                        {totalRuns} Runs
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-accent/10 text-accent text-[10px] font-black px-2 py-0.5 rounded border border-accent/20">
                            Live
                        </span>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                            Last run: {lastRunTime}
                        </p>
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
