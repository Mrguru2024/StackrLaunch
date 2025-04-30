import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from 'url';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replit-safe fallback: assume project root is the current directory
const rootDir = path.resolve(__dirname, ".");

// Replit uses HTTPS, so HMR must use wss and port 443
const hmrPort = 443;

// Optional plugin to force client WebSocket to use correct port
function fixHmrWebSocketUrl() {
  return {
    name: 'fix-hmr-websocket-url',
    transformIndexHtml(html) {
      return html.replace('/@vite/client', '/@vite/client?wsPort=443');
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    fixHmrWebSocketUrl(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  server: {
    port: 5000,
    strictPort: true,
    hmr: {
      protocol: "wss",        // Secure WebSocket for Replit
      host: "localhost",      // Prevents undefined host
      port: hmrPort,          // Backend HMR port
      clientPort: hmrPort,    // WebSocket port the browser connects to
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client", "src"),
      "@shared": path.resolve(rootDir, "shared"),
      "@assets": path.resolve(rootDir, "attached_assets"),
    },
  },
  root: path.resolve(rootDir, "client"),
  build: {
    outDir: path.resolve(rootDir, "dist/public"),
    emptyOutDir: true,
  },
});
