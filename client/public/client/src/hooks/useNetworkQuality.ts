import { useState, useEffect } from "react";

interface NetworkInformation extends EventTarget {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  onchange?: EventListener;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }
}

export interface NetworkQuality {
  networkTier: "high" | "medium" | "low";
  isSlowConnection: boolean;
  saveDataEnabled: boolean;
  effectiveType: string;
}

export function useNetworkQuality(): NetworkQuality {
  const getQuality = (): NetworkQuality => {
    if (typeof window === "undefined") {
      return { networkTier: "high", isSlowConnection: false, saveDataEnabled: false, effectiveType: "4g" };
    }

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (!conn) {
      return { networkTier: "high", isSlowConnection: false, saveDataEnabled: false, effectiveType: "4g" };
    }

    const saveData = Boolean(conn.saveData);
    const effType = conn.effectiveType || "4g";
    const downlink = conn.downlink || 10;

    const isSlow = saveData || effType === "slow-2g" || effType === "2g" || effType === "3g" || downlink < 2.0;

    let tier: "high" | "medium" | "low" = "high";
    if (saveData || effType === "slow-2g" || effType === "2g" || downlink < 1.0) {
      tier = "low";
    } else if (effType === "3g" || downlink < 3.0) {
      tier = "medium";
    }

    return {
      networkTier: tier,
      isSlowConnection: isSlow,
      saveDataEnabled: saveData,
      effectiveType: effType,
    };
  };

  const [quality, setQuality] = useState<NetworkQuality>(getQuality);

  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn || !conn.addEventListener) return;

    const handleChange = () => {
      setQuality(getQuality());
    };

    conn.addEventListener("change", handleChange);
    return () => {
      conn.removeEventListener("change", handleChange);
    };
  }, []);

  return quality;
}
