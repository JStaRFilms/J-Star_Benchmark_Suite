import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { RecentRunsTable } from "@/features/dashboard/components/RecentRunsTable";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decoration - Only in Dark Mode */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0 hidden dark:block"></div>

        <Header title="Dashboard Overview" />

        <div className="flex-1 overflow-y-auto p-8 z-10 space-y-8">
          <DashboardStats />
          <RecentRunsTable />
        </div>
      </main>
    </div>
  );
}
