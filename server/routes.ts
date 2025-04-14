import type { Express, Request, Response } from "express";
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

  // Fallback route to serve static HTML for Stackr landing page
  // This helps bypass Vite-related errors
  app.get('/fallback', (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), 'client', 'public', 'fallback.html'));
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
