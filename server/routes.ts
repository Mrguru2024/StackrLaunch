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

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
