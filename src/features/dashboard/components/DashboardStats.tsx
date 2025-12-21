import { Trophy, Zap, Activity } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <GlassPanel className="p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy className="w-16 h-16 text-accent" />
                </div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                    Top Performer
                </p>
                <h3 className="text-2xl font-bold text-text-main mb-1">
                    Llama 3.1 70B
                </h3>
                <p className="text-success text-xs font-medium flex items-center">
                    <span className="bg-success/10 px-1.5 py-0.5 rounded mr-2 border border-success/20">
                        98.2
                    </span>
                    Score
                </p>
            </GlassPanel>

            {/* Stat 2 */}
            <GlassPanel className="p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-16 h-16 text-warning" />
                </div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                    Avg. Speed
                </p>
                <h3 className="text-2xl font-bold text-text-main mb-1">112 tok/s</h3>
                <p className="text-text-dim text-xs font-medium">Across 8 models</p>
            </GlassPanel>

            {/* Stat 3 */}
            <GlassPanel className="p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Activity className="w-16 h-16 text-primary" />
                </div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                    Total Runs
                </p>
                <h3 className="text-2xl font-bold text-text-main mb-1">24</h3>
                <p className="text-text-dim text-xs font-medium">Last run: 2h ago</p>
            </GlassPanel>
        </div>
    );
}
