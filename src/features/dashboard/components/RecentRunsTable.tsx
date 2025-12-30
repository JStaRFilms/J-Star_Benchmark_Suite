import { GlassPanel } from "@/components/ui/GlassPanel";
import { RunSummary } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, History } from "lucide-react";

interface RecentRunsTableProps {
    runs: RunSummary[];
}

export function RecentRunsTable({ runs }: RecentRunsTableProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-black text-text-main uppercase tracking-widest">
                        Audit Log / Recent Benchmarks
                    </h2>
                </div>
                <button className="text-text-muted text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1 group cursor-pointer">
                    View History <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <GlassPanel className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-black/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-gradient-to-r from-surfaceHighlight/50 to-transparent text-[10px] text-text-dim font-black uppercase tracking-[0.15em]">
                                <th className="p-4 pl-6">Identifier</th>
                                <th className="p-4">Timestamp</th>
                                <th className="p-4">Scope</th>
                                <th className="p-4">Victor</th>
                                <th className="p-4 pr-6 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {runs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-text-dim italic font-medium">
                                        No system logs detected. Run 'pnpm benchmark' to initialize data.
                                    </td>
                                </tr>
                            ) : (
                                runs.map((run) => (
                                    <tr
                                        key={run.id}
                                        className="border-b border-white/[0.02] last:border-0 hover:bg-primary/[0.02] transition-colors cursor-pointer group"
                                    >
                                        <td className="p-4 pl-6 font-black font-mono text-primary group-hover:text-primary group-hover:translate-x-1 transition-all">
                                            <Link href={`/runs/${run.id}`} className="flex items-center gap-1">
                                                <span className="opacity-50">#</span>{run.id}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-text-dim font-medium tabular-nums">
                                            {new Date(run.date).toLocaleString(undefined, {
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-text-main font-bold">{run.models.length}</span>
                                            <span className="text-text-dim text-xs ml-1 font-medium">Entities</span>
                                        </td>
                                        <td className="p-4 text-text-muted font-bold truncate max-w-[150px]">
                                            {run.winner.name}
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <div className="flex justify-end">
                                                <span
                                                    className={`text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full border shadow-sm ${run.status === "COMPLETED"
                                                            ? "text-success border-success/20 bg-success/10"
                                                            : "text-error border-error/20 bg-error/10"
                                                        }`}
                                                >
                                                    {run.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassPanel>
        </div>
    );
}


