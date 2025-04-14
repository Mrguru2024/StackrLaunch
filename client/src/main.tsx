// Import vite stub first to prevent any HMR imports
import "./vite-stub";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Render the app - no need for WebSocket error handling as it's in index.html
createRoot(document.getElementById("root")!).render(<App />);
