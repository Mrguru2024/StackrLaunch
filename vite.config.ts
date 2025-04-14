import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Replit uses HTTPS, so HMR must use wss and port 443
const hmrPort = 443;

// Optional fallback fix: inject wsPort=443 into client URL
function fixHmrWebSocketUrl() {
  return {
    name: 'fix-hmr-websocket-url',
    transformIndexHtml(html) {
      return html.replace(
        '/@vite/client',
        '/@vite/client?wsPort=443'
      );
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
      protocol: "wss",        // Replit requires secure websockets
      host: "localhost",      // Prevents Vite from defaulting to undefined
      port: hmrPort,          // Server-side HMR port
      clientPort: hmrPort,    // Browser-side HMR port
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
