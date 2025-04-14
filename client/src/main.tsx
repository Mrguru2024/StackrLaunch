// Import vite stub first to prevent any HMR imports
import "./vite-stub";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
