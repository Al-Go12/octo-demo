'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import anime from 'animejs';

export function SplashLoader({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const logoRef = useRef(null);
    const glowRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        // Pulse glow animation
        anime({
            targets: glowRef.current,
            opacity: [0.2, 0.8],
            scale: [1, 1.2],
            duration: 1000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        // Loading bar
        anime({
            targets: barRef.current,
            width: ['0%', '100%'],
            duration: 2000,
            easing: 'easeInOutExpo',
            complete: () => {
                // Ignition
                anime({
                    targets: logoRef.current,
                    scale: [1, 1.5],
                    opacity: [1, 0],
                    duration: 600,
                    easing: 'easeInExpo',
                    complete: () => {
                        setIsVisible(false);
                        setTimeout(onComplete, 800);
                    }
                });
            }
        });
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden will-change-[opacity,transform,filter]"
                >
                    <div className="relative flex items-center justify-center">
                        <div ref={glowRef} className="absolute w-40 h-40 bg-[#A8140C] rounded-full blur-3xl opacity-20 will-change-[opacity,transform]" />
                        <img
                            ref={logoRef}
                            src="https://octosignals.com/wp-content/uploads/2024/01/Octosignals-logo-21.png"
                            alt="Octosignals"
                            className="relative z-10 h-16 md:h-20 will-change-[opacity,transform]"
                        />
                    </div>

                    <div className="absolute bottom-0 left-0 h-[2px] bg-[#A8140C] will-change-[width]" ref={barRef} style={{ width: '0%' }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
