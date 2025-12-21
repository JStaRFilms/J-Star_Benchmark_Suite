import Link from "next/link";
import { LayoutDashboard, List, Swords, Settings, User } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="w-64 bg-surface border-r border-border flex flex-col z-20 transition-colors h-screen">
            <div className="h-16 flex items-center px-6 border-b border-border">
                <span className="text-xl font-bold tracking-tight text-text-main">
                    J-Star <span className="text-primaryGlow">Bench</span>
                </span>
            </div>

            <nav className="flex-1 py-6 space-y-1">
                <Link
                    href="/"
                    className="flex items-center px-6 py-3 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-text-main border-l-4 border-transparent"
                >
                    <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
                </Link>
                <Link
                    href="/runs/latest"
                    className="flex items-center px-6 py-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors border-l-4 border-transparent"
                >
                    <List className="w-4 h-4 mr-3" /> Runs
                </Link>
                <Link
                    href="/battle"
                    className="flex items-center px-6 py-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors border-l-4 border-transparent"
                >
                    <Swords className="w-4 h-4 mr-3" /> Live Battle
                </Link>
                <Link
                    href="/config"
                    className="flex items-center px-6 py-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors border-l-4 border-transparent"
                >
                    <Settings className="w-4 h-4 mr-3" /> Configuration
                </Link>
            </nav>

            <div className="p-4 border-t border-border">
                <div className="glass-panel p-3 rounded-lg flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-xs text-white">
                        JD
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-medium text-text-main truncate">
                            John Doe
                        </p>
                        <p className="text-[10px] text-text-muted truncate">Pro Member</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
