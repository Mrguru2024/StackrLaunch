import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Debug route to check if server is handling requests
  app.get('/api/debug', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Server is running', 
      path: req.path,
      url: req.url,
      originalUrl: req.originalUrl
    });
  });



  // API endpoint for testing server connectivity
  app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is running properly' });
  });
  
  // Handle the Vite client request with a patched version
  app.get('/@vite/client', (req: Request, res: Response) => {
    res.type('application/javascript');
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
        on: function() {}
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
      
      console.log('[Patched Vite Client] Successfully loaded');
    `);
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
