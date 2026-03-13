import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const analyticsScriptUrl = import.meta.env.VITE_ANALYTICS_SCRIPT_URL;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

if (analyticsScriptUrl && analyticsWebsiteId && !document.querySelector('script[data-website-id]')) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = analyticsScriptUrl;
  script.setAttribute("data-website-id", analyticsWebsiteId);
  script.setAttribute("data-do-not-track", "true");
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);
