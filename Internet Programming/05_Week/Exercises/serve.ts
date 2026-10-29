// A tiny static file server for the browser exercises (4, 5 and 6).
// Run with: npm run serve   (or: node serve.ts)
// Then open http://localhost:8080/exercise.04/ in the browser.
//
// Why not just double-click index.html? A page opened from file:// cannot load
// <script type="module"> files — the browser blocks them for security reasons.
// Over http:// everything works.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const port = Number(process.env.PORT ?? 8080);
const root = resolve(".");

const contentTypes: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);
    // normalize() removes any "../" so a request cannot escape the project folder
    let path = join(root, normalize(decodeURIComponent(url.pathname)));
    if (!path.startsWith(root)) {
        res.writeHead(403).end("Forbidden");
        return;
    }

    try {
        if ((await stat(path)).isDirectory()) {
            path = join(path, "index.html");
        }
        const body = await readFile(path);
        const type = contentTypes[extname(path)] ?? "application/octet-stream";
        // no-store: always serve the latest build, never a cached old one
        res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" }).end(body);
        console.log(`200 ${url.pathname}`);
    } catch {
        res.writeHead(404, { "Content-Type": "text/plain" }).end(`Not found: ${url.pathname}`);
        console.log(`404 ${url.pathname}`);
    }
});

server.listen(port, () => {
    console.log(`Serving ${root} at http://localhost:${port}/`);
    console.log("Exercises: /exercise.04/  /exercise.05/  /exercise.06/   (Ctrl+C to stop)");
});
