'use client';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.07,           // Silky smooth — not too slow, not laggy
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.9, // Slightly reduce wheel sensitivity to feel less jarring
            touchMultiplier: 1.5, // Snappier on touch devices
            infinite: false,
        });

        lenisRef.current = lenis;

        // Use requestAnimationFrame loop — more reliable than Framer Motion's useFrame
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
