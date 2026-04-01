'use client';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { NeuralNetwork } from './NeuralNetwork';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useEffect, useRef } from 'react';
// @ts-ignore
import anime from 'animejs';

const words = ["We", "Make", "Your", "Signals", "Better"];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const childVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: { type: 'spring' as any, damping: 12, stiffness: 100 }
    }
};

export function HeroSection({ isLoaded }: { isLoaded?: boolean }) {
    const dotRef = useRef(null);

    useEffect(() => {
        if (isLoaded && dotRef.current) {
            anime({
                targets: dotRef.current,
                translateY: [0, 36],
                opacity: [1, 0],
                easing: 'easeInOutSine',
                duration: 1500,
                loop: true
            });
        }
    }, [isLoaded]);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent">

            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 60 }}
                    gl={{ antialias: false, alpha: false }}
                >
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.8} />
                    <NeuralNetwork isLoaded={isLoaded} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
                    </EffectComposer>
                </Canvas>
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center mt-20 bg-transparent pointer-events-none">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    className="pointer-events-auto"
                >
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 font-['var(--font-space-grotesk)'] tracking-tight max-w-5xl mx-auto leading-tight text-white drop-shadow-xl flex flex-wrap justify-center overflow-hidden py-4">
                        {words.map((word, i) => (
                            <motion.span key={i} variants={childVariants} className="inline-block mr-4 mb-2 will-change-[transform,opacity,filter]">
                                {word === "Signals" ? (
                                    <span className="inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#ffffff,45%,#A8140C,55%,#ffffff)] bg-[length:200%_100%] animate-[shimmer_3s_infinite] drop-shadow-[0_0_20px_rgba(168,20,12,0.6)]">
                                        {word}
                                    </span>
                                ) : word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 font-['var(--font-inter)'] drop-shadow-lg will-change-[transform,opacity]"
                    >
                        Empowering Businesses with Innovative Tech Solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.9, type: 'spring' }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 will-change-[transform,opacity]"
                    >
                        <button className="px-10 py-4 rounded-full bg-[#A8140C] hover:bg-red-700 text-white font-bold transition-all shadow-[0_0_30px_#A8140C] hover:shadow-[0_0_50px_#A8140C] border border-[#A8140C]">
                            Explore Solutions
                        </button>
                        <button className="px-10 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#A8140C] hover:shadow-[0_0_20px_rgba(168,20,12,0.4)] text-white font-bold transition-all hover:bg-white/10">
                            Contact Us
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-[opacity]"
            >
                <span className="text-[10px] text-slate-400 tracking-[0.3em] uppercase font-['var(--font-space-grotesk)']">Scroll</span>
                <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
                    <div ref={dotRef} className="w-[3px] h-3 bg-[#A8140C] shadow-[0_0_10px_#A8140C] absolute left-1/2 -translate-x-1/2 rounded-full will-change-transform" />
                </div>
            </motion.div>

            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-[5] pointer-events-none"></div>
        </section>
    );
}
