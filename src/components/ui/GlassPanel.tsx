import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-2xl border border-border bg-surface shadow-card dark:bg-surface/70 dark:backdrop-blur-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
