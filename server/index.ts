import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from './routes.js';
import { setupVite, serveStatic, log } from './vite.js';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { vitePlugin } from './vite-plugin.js';
import path from 'path';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security middleware
// Apply Helmet for security headers with enhanced HTTPS enforcement
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'tally.so',
          '*.tally.so',
          'www.googletagmanager.com',
          '*.google-analytics.com',
          '*.analytics.google.com',
          '*.googletagmanager.com',
          'replit.com',
          '*.replit.com',
        ],
        connectSrc: [
          "'self'",
          'tally.so',
          '*.tally.so',
          '*.google-analytics.com',
          '*.analytics.google.com',
          '*.googletagmanager.com',
          'ws:',
          'wss:',
          'replit.com',
          '*.replit.com',
        ],
        imgSrc: [
          "'self'",
          'data:',
          'blob:',
          'www.googletagmanager.com',
          '*.google-analytics.com',
          'replit.com',
          '*.replit.com',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        fontSrc: ["'self'", 'data:', 'fonts.gstatic.com'],
        mediaSrc: ["'self'", 'data:'],
        frameSrc: ["'self'", 'tally.so', 'replit.com', '*.replit.com'],
        upgradeInsecureRequests: [],
      },
    },
    // Set strict HSTS settings
    hsts: {
      maxAge: 63072000, // 2 years in seconds
      includeSubDomains: true,
      preload: true,
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    // Disable x-powered-by to hide Express.js information
    hidePoweredBy: true,
    // Prevent clickjacking
    frameguard: { action: 'sameorigin' },
    // Prevent MIME type sniffing
    noSniff: true,
    // Enable XSS Protection
    xssFilter: true,
    // Set strict referrer policy
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
  })
);

// CORS protection with enhanced security
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://stackzen.tech', /^https:\/\/.*\.stackzen\.tech$/] // Explicit HTTPS enforcement in regex
        : '*',
    methods: ['GET', 'POST'],
    credentials: true,
    // Additional security for CORS
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400, // Cache preflight requests for 24 hours
  })
);

// Anti-scraping and rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Check if it's a secure connection
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      // Redirect to https
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    next();
  });
}

// Add security and SEO headers
app.use((req, res, next) => {
  // Set feature detection to help with client-side errors
  res.setHeader('Accept-CH', 'Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform');

  // Set permissions policy (modern replacement for feature policy)
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );

  // Note: Other security headers are already set by Helmet

  // SEO-specific headers for indexing
  res.setHeader(
    'X-Robots-Tag',
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );

  // Cache control for static assets optimization with immutable flag for better caching
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year with immutable flag
  } else if (req.url.match(/\.(html|xml|json)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  } else {
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
  }

  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + '…';
      }

      log(logLine);
    }
  });

  next();
});

// WebSocket connection for HMR
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Apply Vite plugin
app.use(vitePlugin() as unknown as express.RequestHandler);

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Handle all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get('env') === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 3000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 3000;
  server.listen(
    {
      port,
      host: '0.0.0.0',
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
