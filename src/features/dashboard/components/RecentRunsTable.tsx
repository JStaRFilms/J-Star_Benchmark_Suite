import { GlassPanel } from "@/components/ui/GlassPanel";

export function RecentRunsTable() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-text-main">
                    Recent Benchmarks
                </h2>
                <button className="text-text-muted text-sm hover:text-text-main transition-colors text-left cursor-pointer">
                    View All
                </button>
            </div>

            <GlassPanel className="rounded-xl overflow-hidden border border-border">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-surfaceHighlight/50 text-xs text-text-muted uppercase tracking-wider">
                            <th className="p-4 font-medium">Run ID</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Models Tested</th>
                            <th className="p-4 font-medium">Top Model</th>
                            <th className="p-4 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-border hover:bg-surfaceHighlight/50 transition-colors cursor-pointer">
                            <td className="p-4 font-mono text-accent">#RUN-205</td>
                            <td className="p-4 text-text-muted">Oct 24, 14:30</td>
                            <td className="p-4 text-text-main">4 Models</td>
                            <td className="p-4 text-text-muted">Llama 3.1</td>
                            <td className="p-4 text-right">
                                <span className="text-success text-xs font-bold border border-success/20 bg-success/10 px-2 py-1 rounded">
                                    COMPLETED
                                </span>
                            </td>
                        </tr>
                        <tr className="border-b border-border hover:bg-surfaceHighlight/50 transition-colors cursor-pointer">
                            <td className="p-4 font-mono text-accent">#RUN-204</td>
                            <td className="p-4 text-text-muted">Oct 23, 09:15</td>
                            <td className="p-4 text-text-main">12 Models</td>
                            <td className="p-4 text-text-muted">Mistral Nemo</td>
                            <td className="p-4 text-right">
                                <span className="text-success text-xs font-bold border border-success/20 bg-success/10 px-2 py-1 rounded">
                                    COMPLETED
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-surfaceHighlight/50 transition-colors cursor-pointer">
                            <td className="p-4 font-mono text-accent">#RUN-203</td>
                            <td className="p-4 text-text-muted">Oct 22, 18:00</td>
                            <td className="p-4 text-text-main">2 Models</td>
                            <td className="p-4 text-text-muted">-</td>
                            <td className="p-4 text-right">
                                <span className="text-error text-xs font-bold border border-error/20 bg-error/10 px-2 py-1 rounded">
                                    FAILED
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </GlassPanel>
        </div>
    );
}
