import http from "node:http";
import path from "node:path";
import { stat, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(process.env.PORT || 5174);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
try {
  await stat(path.join(root, "index.html"));
} catch {
  console.error("Hazir sayt tapilmadi. Evvel npm run build emrini icra edin.");
  process.exit(1);
}
const server = http.createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const file = path.resolve(root, "." + pathname);
    const relative = path.relative(root, file);
    if (
      relative.startsWith("..") ||
      path.isAbsolute(relative) ||
      pathname.includes("\0")
    ) {
      res.writeHead(400);
      res.end();
      return;
    }
    let target = file;
    let status = 200;
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      await stat(target);
    } catch {
      target = path.join(root, "404.html");
      status = 404;
    }
    const data = await readFile(target);
    res.writeHead(status, {
      "Content-Type": mime[path.extname(target)] || "application/octet-stream",
      "Content-Length": data.length,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(400);
    res.end("Sorğu düzgün deyil");
  }
});
server.on("error", (error) => {
  console.error(
    error.code === "EADDRINUSE"
      ? `Port ${port} artiq istifade olunur. Acıq sayt penceresini yoxlayin.`
      : error.message,
  );
  process.exit(1);
});
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Legends General: http://127.0.0.1:${port}\nDayandirmaq ucun Ctrl+C. Bu pencere aciq qalmalidir.`,
  ),
);
