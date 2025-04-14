import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Fix for using __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Replit uses HTTPS, so HMR must use wss and port 443
const hmrPort = 443;

// Optional fallback fix: inject wsPort=443 into client URL
function fixHmrWebSocketUrl() {
  return {
    name: 'fix-hmr-websocket-url',
    transformIndexHtml(html: string) {
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
      protocol: "wss",        // Replit requires secure WebSockets
      host: "localhost",      // Prevents Vite from defaulting to undefined
      port: hmrPort,          // Server-side HMR port
      clientPort: hmrPort,    // Browser-side HMR port
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
