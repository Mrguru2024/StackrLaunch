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

  // Serve a static fallback page for the main route as a workaround for Vite import.meta errors
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    // Set to true to serve fallback, false to attempt normal Vite processing
    const serveFallback = true; // Set this to true until React version is fixed
    
    if (serveFallback) {
      console.log("Serving fallback HTML page due to Vite/React issues");
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5">
          
          <!-- Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-VHVMZHY9MS"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VHVMZHY9MS');
          </script>
          
          <title>Stackr | AI Financial Automation for Tradespeople, Side Hustlers & 9-5 Rebuilders</title>
          <meta name="description" content="Save $650/year & 5+ hours monthly with Stackr's AI financial automation built specifically for tradespeople, side hustlers, freelancers, and 9-5 rebuilders. Automate income, eliminate hidden fees, and grow your wealth.">
          
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          
          <style>
            :root {
              --primary: #7c3aed;
              --primary-dark: #6d28d9;
              --secondary: #10b981;
              --secondary-dark: #059669;
              --dark: #1f2937;
              --light: #f9fafb;
              --gray: #6b7280;
              --border: #e5e7eb;
            }
            
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: var(--dark);
              background-color: var(--light);
            }
            
            .container {
              width: 90%;
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 20px;
            }
            
            header {
              background-color: white;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              padding: 20px 0;
              position: sticky;
              top: 0;
              z-index: 10;
            }
            
            nav {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            
            .logo {
              font-size: 1.5rem;
              font-weight: 700;
              color: var(--primary);
            }
            
            .nav-links {
              display: flex;
              gap: 30px;
            }
            
            .nav-links a {
              text-decoration: none;
              color: var(--dark);
              font-weight: 500;
              transition: color 0.3s;
            }
            
            .nav-links a:hover {
              color: var(--primary);
            }
            
            .cta-button {
              display: inline-block;
              background-color: var(--primary);
              color: white;
              text-decoration: none;
              padding: 10px 24px;
              border-radius: 8px;
              font-weight: 600;
              transition: background-color 0.3s, transform 0.2s;
            }
            
            .cta-button:hover {
              background-color: var(--primary-dark);
              transform: translateY(-2px);
            }
            
            .hero {
              padding: 80px 0;
              text-align: center;
              background: linear-gradient(to right, #f9fafb, #f3f4f6);
            }
            
            .hero h1 {
              font-size: 3rem;
              margin-bottom: 20px;
              line-height: 1.2;
              color: var(--dark);
            }
            
            .hero p {
              font-size: 1.25rem;
              max-width: 800px;
              margin: 0 auto 40px;
              color: var(--gray);
            }
            
            .benefits {
              padding: 80px 0;
              background-color: white;
            }
            
            .section-title {
              text-align: center;
              margin-bottom: 60px;
            }
            
            .section-title h2 {
              font-size: 2.5rem;
              margin-bottom: 16px;
              color: var(--dark);
            }
            
            .section-title p {
              font-size: 1.125rem;
              color: var(--gray);
              max-width: 700px;
              margin: 0 auto;
            }
            
            .benefits-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 40px;
            }
            
            .benefit-card {
              background-color: white;
              border-radius: 12px;
              padding: 30px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.05);
              transition: transform 0.3s, box-shadow 0.3s;
              border: 1px solid var(--border);
            }
            
            .benefit-card:hover {
              transform: translateY(-10px);
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            
            .icon-wrapper {
              width: 64px;
              height: 64px;
              border-radius: 16px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 24px;
              font-size: 28px;
            }
            
            .benefits-grid .benefit-card:nth-child(1) .icon-wrapper {
              background-color: #ede9fe;
              color: var(--primary);
            }
            
            .benefits-grid .benefit-card:nth-child(2) .icon-wrapper {
              background-color: #d1fae5;
              color: var(--secondary);
            }
            
            .benefits-grid .benefit-card:nth-child(3) .icon-wrapper {
              background-color: #fef3c7;
              color: #d97706;
            }
            
            .benefit-card h3 {
              font-size: 1.5rem;
              margin-bottom: 16px;
              color: var(--dark);
            }
            
            .benefit-card p {
              color: var(--gray);
            }
            
            .how-it-works {
              padding: 80px 0;
              background-color: #f9fafb;
            }
            
            .steps {
              margin-top: 60px;
              display: flex;
              flex-direction: column;
              gap: 40px;
            }
            
            .step {
              display: flex;
              gap: 30px;
              align-items: flex-start;
            }
            
            .step-number {
              background-color: var(--primary);
              color: white;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.25rem;
              font-weight: 700;
              flex-shrink: 0;
            }
            
            .step-content h3 {
              font-size: 1.5rem;
              margin-bottom: 12px;
            }
            
            .step-content p {
              color: var(--gray);
            }
            
            .cta-section {
              padding: 100px 0;
              text-align: center;
              background: linear-gradient(135deg, var(--primary), #9366ef);
              color: white;
            }
            
            .cta-section h2 {
              font-size: 2.5rem;
              margin-bottom: 24px;
            }
            
            .cta-section p {
              font-size: 1.25rem;
              max-width: 700px;
              margin: 0 auto 40px;
              opacity: 0.9;
            }
            
            .cta-section .cta-button {
              background-color: white;
              color: var(--primary);
              font-size: 1.125rem;
              padding: 14px 32px;
            }
            
            .cta-section .cta-button:hover {
              background-color: #f9fafb;
            }
            
            footer {
              background-color: var(--dark);
              color: #d1d5db;
              padding: 60px 0 30px;
            }
            
            .footer-content {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 40px;
              margin-bottom: 40px;
            }
            
            .footer-column h3 {
              color: white;
              margin-bottom: 20px;
              font-size: 1.25rem;
            }
            
            .footer-column ul {
              list-style: none;
            }
            
            .footer-column ul li {
              margin-bottom: 10px;
            }
            
            .footer-column ul li a {
              color: #d1d5db;
              text-decoration: none;
              transition: color 0.3s;
            }
            
            .footer-column ul li a:hover {
              color: white;
            }
            
            .social-links {
              display: flex;
              gap: 16px;
            }
            
            .social-links a {
              color: #d1d5db;
              font-size: 20px;
              transition: color 0.3s;
            }
            
            .social-links a:hover {
              color: white;
            }
            
            .footer-bottom {
              text-align: center;
              padding-top: 30px;
              border-top: 1px solid #374151;
              font-size: 0.875rem;
              color: #9ca3af;
            }
            
            /* Responsive styles */
            @media (max-width: 768px) {
              .nav-links {
                display: none;
              }
              
              .hero h1 {
                font-size: 2.5rem;
              }
              
              .section-title h2 {
                font-size: 2rem;
              }
              
              .cta-section h2 {
                font-size: 2rem;
              }
            }
          </style>
        </head>
        <body>
          <header>
            <div class="container">
              <nav>
                <div class="logo">STACKR</div>
                <div class="nav-links">
                  <a href="#benefits">Benefits</a>
                  <a href="#how-it-works">How It Works</a>
                  <a href="#cta">Join Waitlist</a>
                </div>
                <a href="https://tally.so/r/3NO0eG" class="cta-button">Join Waitlist</a>
              </nav>
            </div>
          </header>
          
          <section class="hero">
            <div class="container">
              <h1>Smart Financial Automation for Tradespeople & Side Hustlers</h1>
              <p>Save $650/year and 5+ hours monthly with AI-powered money management built specifically for variable incomes.</p>
              <a href="https://tally.so/r/3NO0eG" class="cta-button">Join Our Waitlist</a>
            </div>
          </section>
          
          <section class="benefits" id="benefits">
            <div class="container">
              <div class="section-title">
                <h2>Financial automation that actually works for you</h2>
                <p>Unlike traditional banking, Stackr is designed specifically for the financial patterns of tradespeople, side hustlers, and 9-5 rebuilders.</p>
              </div>
              
              <div class="benefits-grid">
                <div class="benefit-card">
                  <div class="icon-wrapper">💰</div>
                  <h3>No more hidden fees</h3>
                  <p>Our AI detects and eliminates sneaky charges that drain your accounts. Stop wasting money on bank fees, unnecessary subscriptions, and other financial leaks.</p>
                </div>
                
                <div class="benefit-card">
                  <div class="icon-wrapper">🔄</div>
                  <h3>Income automation</h3>
                  <p>Automatically distribute your income to the right accounts, even with variable pay schedules. Perfect for tradespeople and side hustlers with irregular income.</p>
                </div>
                
                <div class="benefit-card">
                  <div class="icon-wrapper">📊</div>
                  <h3>End subscription waste</h3>
                  <p>Identify and cancel unused subscriptions that silently drain your finances. The average person saves $250 yearly by eliminating subscription waste.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section class="how-it-works" id="how-it-works">
            <div class="container">
              <div class="section-title">
                <h2>How Stackr Works</h2>
                <p>Simple, secure automation that puts your financial growth on autopilot</p>
              </div>
              
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>Connect your accounts securely</h3>
                    <p>Link your bank accounts, credit cards, and income sources through our bank-level secure platform. Your data is encrypted and never sold.</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h3>Our AI analyzes your financial patterns</h3>
                    <p>Stackr's algorithms learn your unique income patterns, spending habits, and financial goals to create a personalized strategy.</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h3>Get personalized optimization recommendations</h3>
                    <p>Receive tailored insights and recommendations to reduce fees, eliminate waste, and optimize your financial flow.</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h3>Save money automatically</h3>
                    <p>Stackr automatically implements optimizations, moves money between accounts, and ensures you're building wealth even with variable income.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section class="cta-section" id="cta">
            <div class="container">
              <h2>Ready to take control of your finances?</h2>
              <p>Join 131+ early adopters already on our waitlist to be first in line when we launch.</p>
              <a href="https://tally.so/r/3NO0eG" class="cta-button">Join the Waitlist</a>
            </div>
          </section>
          
          <footer>
            <div class="container">
              <div class="footer-content">
                <div class="footer-column">
                  <h3>Stackr</h3>
                  <p>AI-powered financial automation for tradespeople, side hustlers, and 9-5 rebuilders.</p>
                  <div class="social-links">
                    <a href="https://facebook.com/stackrfinancial">FB</a>
                    <a href="https://instagram.com/stackrfinancial">IG</a>
                    <a href="https://threads.net/stackrfinancial">TH</a>
                    <a href="https://linkedin.com/company/stackr-financial">LI</a>
                  </div>
                </div>
                
                <div class="footer-column">
                  <h3>Company</h3>
                  <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#careers">Careers</a></li>
                    <li><a href="#press">Press</a></li>
                  </ul>
                </div>
                
                <div class="footer-column">
                  <h3>Legal</h3>
                  <ul>
                    <li><a href="/terms-of-service">Terms of Service</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="#security">Security</a></li>
                  </ul>
                </div>
                
                <div class="footer-column">
                  <h3>Resources</h3>
                  <ul>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#help">Help Center</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>
              </div>
              
              <div class="footer-bottom">
                <p>&copy; 2025 Stackr Financial, Inc. All rights reserved.</p>
              </div>
            </div>
          </footer>
          
          <!-- Tally.so Form Widget -->
          <script async src="https://tally.so/widgets/embed.js"></script>
        </body>
        </html>
      `);
    } else {
      // Continue to the normal Vite processing
      next();
    }
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
