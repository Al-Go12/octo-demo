'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import React, { useRef } from 'react';

const domains = [
    {
        title: 'Media Industry',
        description: 'Amplifying impact through scalable broadcasting platforms.',
        image: 'https://images.pexels.com/photos/19924600/pexels-photo-19924600.jpeg',
    },
    {
        title: 'Education',
        description: 'Bespoke software solutions transforming campus management.',
        image: 'https://images.pexels.com/photos/5212685/pexels-photo-5212685.jpeg',
    },
    {
        title: 'Retail',
        description: 'Streamlining operations with neon-infused advanced ecosystems.',
        image: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80&w=800',
    },
];

// word-by-word construction heading
function ConstructedHeading({ inView }: { inView: boolean }) {
    const wordVariant = {
        hidden: { y: '110%', opacity: 0 },
        visible: { y: '0%', opacity: 1, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } }
    };
    const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
    return (
        <div className="text-center mb-16">
            <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                className="text-[#A8140C] font-['var(--font-jetbrains)'] text-sm tracking-widest uppercase mb-4 block drop-shadow-[0_0_10px_#A8140C]"
            >
                02 // Expertise
            </motion.span>
            <div className="overflow-hidden">
                <motion.h2
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="text-4xl md:text-5xl font-bold tracking-tighter font-['var(--font-inter)'] text-white flex flex-wrap justify-center gap-x-3"
                >
                    {['Industries', 'We'].map((w, i) => (
                        <span key={i} className="overflow-hidden inline-block">
                            <motion.span variants={wordVariant} className="inline-block will-change-transform">{w}</motion.span>
                        </span>
                    ))}
                    <span className="overflow-hidden inline-block">
                        <motion.span variants={wordVariant} className="inline-block text-[#A8140C] drop-shadow-[0_0_10px_rgba(168,20,12,0.8)] will-change-transform">
                            Transform
                        </motion.span>
                    </span>
                </motion.h2>
            </div>
        </div>
    );
}

function TiltCard({ domain, index }: { domain: typeof domains[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((e.clientX - left) / width - 0.5);
        y.set((e.clientY - top) / height - 0.5);
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

    return (
        <div ref={containerRef} className="[perspective:1000px] w-full h-[400px]">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-full h-full rounded-2xl border border-white/10 cursor-pointer overflow-hidden group bg-[#020202] will-change-transform"
            >
                {/* ── Clip-path reveal mask (left-to-right) ── */}
                <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                    transition={{ duration: 1.2, delay: index * 0.12, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute inset-0 z-0 will-change-[clip-path]"
                >
                    <motion.div
                        initial={{ scale: 1.25 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 1.2, delay: index * 0.12, ease: [0.77, 0, 0.175, 1] }}
                        className="w-full h-full"
                    >
                        <motion.img
                            src={domain.image}
                            alt={domain.title}
                            style={{ scale: imgScale }}
                            className="absolute inset-0 w-full h-full object-cover will-change-transform"
                        />
                    </motion.div>
                </motion.div>

                <div className="absolute inset-0 bg-[#A8140C]/30 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-10" />

                <div style={{ transform: 'translateZ(50px)' }} className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 + index * 0.12 }}
                        className="text-3xl font-bold tracking-tighter text-white mb-2 font-['var(--font-inter)'] group-hover:text-[#FFC107] transition-colors will-change-transform"
                    >
                        {domain.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.12 }}
                        className="text-slate-300 font-['var(--font-inter)']"
                    >
                        {domain.description}
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}

export function DomainExpertiseSection() {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

    return (
        <section className="py-24 relative w-full bg-[#050505]">
            <div className="container mx-auto px-6">
                <div ref={headingRef}>
                    <ConstructedHeading inView={headingInView} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {domains.map((domain, index) => (
                        <TiltCard key={index} index={index} domain={domain} />
                    ))}
                </div>
            </div>
        </section>
    );
}
