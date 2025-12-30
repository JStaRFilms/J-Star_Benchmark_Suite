import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { RecentRunsTable } from "@/features/dashboard/components/RecentRunsTable";
import { getRecentRuns } from "@/lib/data-service";

export default async function Home() {
  const runs = await getRecentRuns();

  const topRun = [...runs].sort((a, b) => b.winner.score - a.winner.score)[0];
  const avgScore =
    runs.reduce((acc, run) => acc + run.winner.score, 0) / (runs.length || 1);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Header title="Dashboard Overview" />

        <div className="flex-1 overflow-y-auto p-8 z-10 space-y-8">
          <DashboardStats
            topModel={topRun?.winner.name || "N/A"}
            topScore={topRun?.winner.score || 0}
            avgSpeed={avgScore}
            totalRuns={runs.length}
            lastRunTime={runs[0] ? new Date(runs[0].date).toLocaleTimeString() : "N/A"}
          />
          <RecentRunsTable runs={runs} />
        </div>
      </main>
    </div>
  );
}
