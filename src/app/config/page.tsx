import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function ConfigPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <Header title="Settings & Configuration" />

                <div className="flex-1 overflow-y-auto p-8 z-10 space-y-8 max-w-3xl">
                    {/* Model Settings */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-medium text-text-main border-l-4 border-primary pl-3">
                            Ollama Connection
                        </h2>
                        <GlassPanel className="p-6 rounded-xl space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-text-muted mb-1 uppercase">
                                    Local Endpoint
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        defaultValue="http://localhost:11434"
                                        className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-text-main font-mono text-sm focus:outline-none focus:border-primary transition-all"
                                    />
                                    <button className="bg-surfaceHighlight hover:bg-border text-text-main px-4 py-2.5 rounded-lg border border-border text-sm font-medium transition-all cursor-pointer">
                                        Test
                                    </button>
                                </div>
                            </div>
                        </GlassPanel>
                    </section>

                    {/* Prompts */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-medium text-text-main border-l-4 border-accent pl-3">
                            Test Prompts
                        </h2>
                        <GlassPanel className="p-6 rounded-xl space-y-6">
                            {/* Prompt Item */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-text-main">
                                        FFmpeg Mosaic Test
                                    </label>
                                    <span className="text-xs text-text-muted italic">
                                        Weights: Logic 60%, Vibe 40%
                                    </span>
                                </div>
                                <textarea
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text-main font-mono text-xs focus:outline-none focus:border-accent transition-all h-24 resize-none"
                                    defaultValue="Create a 2x2 video grid using ffmpeg filter_complex..."
                                />
                            </div>

                            <div className="border-t border-border"></div>

                            {/* Prompt Item */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-text-main">
                                        Canvas Shapes Test
                                    </label>
                                    <span className="text-xs text-text-muted italic">
                                        Weights: Logic 40%, Vibe 60%
                                    </span>
                                </div>
                                <textarea
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text-main font-mono text-xs focus:outline-none focus:border-accent transition-all h-24 resize-none"
                                    defaultValue="Write an HTML5 canvas script that draws a rotating 3D cube..."
                                />
                            </div>
                        </GlassPanel>
                    </section>
                </div>
            </main>
        </div>
    );
}
