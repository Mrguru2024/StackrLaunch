import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { WebSocketServer } from "ws";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Debug route to check if server is handling requests
  app.get("/api/debug", (req, res) => {
    res.json({
      status: "ok",
      message: "Server is running",
      path: req.path,
      url: req.url,
      originalUrl: req.originalUrl,
    });
  });

  // API endpoint for testing server connectivity
  app.get("/api/status", (req: Request, res: Response) => {
    res.json({ status: "ok", message: "Server is running properly" });
  });

  // Handle the Vite client request with a patched version
  app.get("/@vite/client", (req: Request, res: Response) => {
    res.type("application/javascript");
    res.send(`
      // Patched Vite client with no import.meta
      // This file is served by the server directly instead of using the built-in Vite client
      
      // Create global window.__vite_hmr object
      window.__vite_hmr = {
        accept: function() {},
        dispose: function() {},
        prune: function() {},
        decline: function() {},
        invalidate: function() {},
        on: function() {},
        send: function() {}
      };
      
      // Export HMR functions
      export function createHotContext() {
        return window.__vite_hmr;
      }
      
      // Export WebSocket client
      export const webSocketClient = {
        send: function() {},
        onMessage: function() {}
      };
      
      // Export style functions
      export function updateStyle() {}
      export function removeStyle() {}
      export function fetchUpdate() { return Promise.resolve(); }
      
      // Export Error Overlay
      export const ErrorOverlay = {
        hasErrorOverlay: function() { return false; },
        clearErrorOverlay: function() {},
        processError: function() {}
      };

      // Export injectQuery function
      export function injectQuery(url, queryToInject) {
        return url;
      }
      
      console.log('[Patched Vite Client] Successfully loaded');
    `);
  });

  const httpServer = createServer(app);

  // Add a dedicated WebSocket server on a path that won't conflict with Vite
  const wss = new WebSocketServer({
    server: httpServer,
    path: "/ws",
  });

  // Handle WebSocket connections
  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    // Handle messages from clients
    ws.on("message", (message) => {
      console.log("Received message:", message);

      // Echo back the message
      if (ws.readyState === 1) {
        // WebSocket.OPEN
        ws.send(
          JSON.stringify({
            type: "response",
            message: `Server received: ${message}`,
          })
        );
      }
    });

    // Handle connection close
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });

    // Send welcome message
    ws.send(
      JSON.stringify({
        type: "connected",
        message: "Connected to Stackr WebSocket server",
      })
    );
  });

  return httpServer;
}
