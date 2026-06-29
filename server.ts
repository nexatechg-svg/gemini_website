import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import compression from "compression";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable gzip/deflate compression for all text-based assets
  app.use(compression());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Serve static assets with ideal caching in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");

    // Cache compiled assets (JS, CSS, images) aggressively
    app.use("/assets", express.static(path.join(distPath, "assets"), {
      maxAge: "365d",
      immutable: true,
      fallthrough: false
    }));

    // Cache other static files (favicons, robots, sitemaps etc.) with 1 day max-age
    app.use(express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          // Never cache main HTML file so users always get the freshest version
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        } else if (/\.(png|jpg|jpeg|gif|ico|svg|webp|avif)$/i.test(filePath)) {
          // Cache image files in the public folder for 30 days
          res.setHeader("Cache-Control", "public, max-age=2592000");
        }
      }
    }));

    // Fallback for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Integrate Vite developer server in local development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server launch error:", err);
  process.exit(1);
});
