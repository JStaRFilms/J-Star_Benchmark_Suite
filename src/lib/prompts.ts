export const BENCHMARK_PROMPTS = [
    {
        id: "ffmpeg_mosaic_narrative",
        category: "Technical Creative",
        prompt: `You are an expert FFmpeg engineer.
Task: Create a complex FFmpeg filter_complex command that takes a single input video (input.mp4) and creates a 2x2 mosaic.
Specific Requirements:
1. Top-Left: The original video.
2. Top-Right: The video with a 'hue' filter rotating the color by 90 degrees.
3. Bottom-Left: The video with a 'edgedetect' filter applied.
4. Bottom-Right: The video horizontally flipped (hflip).
5. All 4 quadrants must be labeled with text using the drawtext filter (e.g., "Original", "Hue", "Edges", "Flip").
6. Output to a single file named 'mosaic_output.mp4'.

Return ONLY the raw FFmpeg command. Do not use code blocks. Do not explain.`,
    },
    {
        id: "canvas_visual_shapes",
        category: "Creative Coding",
        prompt: `You are a Creative Technologist.
Task: Write a raw HTML5 Canvas JavaScript snippet (no HTML boilerplate, just the JS implementation inside a 'draw(ctx, width, height)' function) to generate a "Cyberpunk Cityscape" background.
Specific Requirements:
1. Use a dark background (#0a0a0c).
2. Draw randomized vertical rectangles (skyscrapers) with neon gradients (purple, cyan).
3. Add "rain" effects using thin translucent lines.
4. Ensure the code is performant and looks premium.

Return ONLY the JavaScript function.`,
    },
];
