import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { flushAnalyticsQueue } from "./lib/analytics";

const analyticsScriptUrl = import.meta.env.VITE_ANALYTICS_SCRIPT_URL;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

if (analyticsScriptUrl && analyticsWebsiteId) {
  const existingScript = document.querySelector<HTMLScriptElement>(`script[data-website-id="${analyticsWebsiteId}"]`);

  if (existingScript) {
    flushAnalyticsQueue();
  } else {
    const script = document.createElement("script");
    script.defer = true;
    script.src = analyticsScriptUrl;
    script.setAttribute("data-website-id", analyticsWebsiteId);
    script.setAttribute("data-auto-track", "false");
    script.setAttribute("data-do-not-track", "true");
    script.addEventListener("load", flushAnalyticsQueue, { once: true });
    document.head.appendChild(script);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
