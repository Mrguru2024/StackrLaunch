// Simple Express server to serve the standalone page
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Serve API endpoint for status check
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running properly' });
});

// Redirect root to the standalone page
app.get('/', (req, res) => {
  res.redirect('/standalone.html');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/ to view the site`);
});