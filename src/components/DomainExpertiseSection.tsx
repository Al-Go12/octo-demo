'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

const domains = [
    {
        title: 'Media Industry',
        description: 'Amplifying impact through scalable broadcasting platforms.',
        image: 'https://images.unsplash.com/photo-1598555294589-9133ba780d6b?auto=format&fit=crop&q=80&w=800',
    },
    {
        title: 'Education',
        description: 'Bespoke software solutions transforming campus management.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    },
    {
        title: 'Retail',
        description: 'Streamlining operations with neon-infused advanced ecosystems.',
        image: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80&w=800',
    },
];

function TiltParallaxCard({ domain }: { domain: typeof domains[0] }) {
    const ref = useRef<HTMLDivElement>(null);

    // Tilt logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Parallax Logic
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

    return (
        <div ref={containerRef} className="[perspective:1000px] w-full h-[400px]">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-2xl border border-white/10 cursor-pointer overflow-hidden group bg-black"
            >
                <motion.img
                    src={domain.image}
                    alt={domain.title}
                    style={{ scale }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out z-0"
                />

                {/* Subtle Crimson Red overlay/gradient */}
                <div className="absolute inset-0 bg-[#A8140C]/30 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />

                <div style={{ transform: 'translateZ(50px)' }} className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <h3 className="text-3xl font-bold text-white mb-2 font-['var(--font-space-grotesk)'] drop-shadow-md group-hover:text-[#FFC107] transition-colors">{domain.title}</h3>
                    <p className="text-slate-300 font-['var(--font-inter)']">{domain.description}</p>
                </div>
            </motion.div>
        </div>
    );
}

export function DomainExpertiseSection() {
    return (
        <section className="py-24 relative w-full bg-[#050505]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-['var(--font-space-grotesk)'] mb-4 text-white">
                        Industries We <span className="text-[#A8140C] drop-shadow-[0_0_10px_rgba(168,20,12,0.8)]">Transform</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {domains.map((domain, index) => (
                        <TiltParallaxCard key={index} domain={domain} />
                    ))}
                </div>
            </div>
        </section>
    );
}
