"use client";

import { Sun, Moon, Play } from "lucide-react";
import { useEffect, useState } from "react";

export function Header({ title }: { title: string }) {
    // Simple theme toggle logic (would be better with context, but sticking to simple for now)
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <header className="h-16 border-b border-border flex items-center justify-between px-8 z-10 bg-background/50 backdrop-blur-sm sticky top-0">
            <h1 className="text-lg font-semibold text-text-main">{title}</h1>
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-surfaceHighlight text-text-muted transition-colors"
                >
                    <Sun className="w-5 h-5 hidden dark:block" />
                    <Moon className="w-5 h-5 block dark:hidden" />
                </button>
                <button className="flex items-center px-4 py-2 bg-primary hover:bg-primaryGlow text-white text-sm font-medium rounded-lg shadow-neon transition-all cursor-pointer">
                    <Play className="w-4 h-4 mr-2" />
                    New Benchmark
                </button>
            </div>
        </header>
    );
}
