import { useEffect, useState, RefObject } from 'react';
import { getDisplacementFilter } from '../utils/liquidGlass';

export function useLiquidGlass(ref: RefObject<HTMLElement>, options: {
    depth?: number;
    strength?: number;
    chromaticAberration?: number;
    blur?: number;
    saturate?: number;
    brightness?: number;
} = {}) {
    const [backdropFilter, setBackdropFilter] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Safari and all iOS browsers (WebKit) claim to support the CSS syntax for url() backdrop filters, 
        // but fail to render them visually. We must use User-Agent sniffing to accurately trigger the fallback.
        let supportsUrl = true;
        if (typeof navigator !== 'undefined') {
            const ua = navigator.userAgent;
            const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
            const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
            const isIOSChrome = /CriOS/i.test(ua);
            const isIOSFirefox = /FxiOS/i.test(ua);
            
            if (isIOS || isSafari || isIOSChrome || isIOSFirefox) {
                supportsUrl = false;
            }
        }
        setIsSupported(supportsUrl);

        if (!ref.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;

            const rect = entry.target.getBoundingClientRect();
            const actualWidth = Math.round(rect.width);
            const actualHeight = Math.round(rect.height);
            const radius = 0; // Assuming rectangular header
            
            const depth = options.depth ?? 10;
            const strength = options.strength ?? 100;
            const chromaticAberration = options.chromaticAberration ?? 0;
            const blur = options.blur ?? 0;
            const saturate = options.saturate ?? 1.5;
            const brightness = options.brightness ?? 1.1;

            if (supportsUrl) {
                const filterUrl = getDisplacementFilter({
                  height: actualHeight, 
                  width: actualWidth, 
                  radius, 
                  depth, 
                  strength, 
                  chromaticAberration
                });
                
                setBackdropFilter(`blur(${blur / 2}px) url('${filterUrl}') blur(${blur}px) brightness(${brightness}) saturate(${saturate})`);
            } else {
                setBackdropFilter(`blur(20px) brightness(${brightness}) saturate(${saturate})`);
            }
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, options.depth, options.strength, options.chromaticAberration, options.blur, options.saturate, options.brightness]);

    return { filter: backdropFilter, isSupported };
}
