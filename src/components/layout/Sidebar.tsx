"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Swords, Settings, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Runs", href: "/runs/latest", icon: List },
    { label: "Live Battle", href: "/battle", icon: Swords },
    { label: "Configuration", href: "/config", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-surface border-r border-border flex flex-col z-20 transition-all h-screen shadow-xl shadow-black/20">
            <div className="h-16 flex items-center px-6 border-b border-border bg-background/30 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
                        <span className="text-white font-black text-lg">J</span>
                    </div>
                    <span className="text-lg font-black tracking-tighter text-text-main group-hover:text-primary transition-colors">
                        STAR <span className="text-primary font-light">BENCH</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 py-10 px-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.replace("/latest", "")));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all relative overflow-hidden group",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-inner shadow-primary/5"
                                    : "text-text-muted hover:text-text-main hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-full" />
                            )}
                            <item.icon className={cn("w-4 h-4 mr-3 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-text-dim")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border bg-background/20">
                <div className="p-4 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent flex items-center space-x-4 group cursor-default">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-black text-xs text-white shadow-lg group-hover:scale-105 transition-transform">
                            JD
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface border-2 border-background flex items-center justify-center">
                            <ShieldCheck className="w-2 h-2 text-success" />
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-black text-text-main truncate tracking-tight">
                            John Doe
                        </p>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest truncate">
                            Admin Access
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

