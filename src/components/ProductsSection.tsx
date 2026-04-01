'use client';
import { ShieldCheck, MessageSquare, Ticket, Gift } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ──────────────────────────────────────────────────────────────
// Animated Section Heading (word-by-word "Construction" effect)
// ──────────────────────────────────────────────────────────────
function ConstructedHeading({ label, line1, highlight }: { label: string, line1: string, highlight: string }) {
    const words1 = line1.split(' ');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
    };

    const wordVariant = {
        hidden: { y: '110%', opacity: 0 },
        visible: {
            y: '0%',
            opacity: 1,
            transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
        }
    };

    return (
        <div className="text-center mb-16" ref={ref}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-[#A8140C] font-['var(--font-jetbrains)'] text-sm tracking-widest uppercase mb-4 block drop-shadow-[0_0_10px_#A8140C]"
            >
                {label}
            </motion.span>
            <div className="overflow-hidden">
                <motion.h2
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="text-4xl md:text-5xl font-bold tracking-tighter font-['var(--font-inter)'] mb-4 text-white flex flex-wrap justify-center gap-x-3"
                >
                    {words1.map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block">
                            <motion.span variants={wordVariant} className="inline-block will-change-transform">
                                {word}
                            </motion.span>
                        </span>
                    ))}
                    <span className="overflow-hidden inline-block">
                        <motion.span
                            variants={wordVariant}
                            className="inline-block text-[#A8140C] drop-shadow-[0_0_10px_rgba(168,20,12,0.8)] will-change-transform"
                        >
                            {highlight}
                        </motion.span>
                    </span>
                </motion.h2>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Bento card — part of a staggerChildren parent ripple
// ──────────────────────────────────────────────────────────────
const cardVariant = {
    hidden: { opacity: 0, scale: 0.8, rotateX: 10, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
        transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
    }
};

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={cardVariant}
            className={`group relative rounded-3xl will-change-transform ${className}`}
            style={{ transformPerspective: 1000 }}
        >
            {/* Crimson border hover pulse */}
            <div className="absolute inset-[-1px] rounded-[inherit] border border-[#A8140C]/30 group-hover:border-[#A8140C] group-hover:shadow-[0_0_20px_#A8140C] transition-all duration-500 pointer-events-none z-[1]" />
            {children}
        </motion.div>
    );
}

const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

export function ProductsSection() {
    const gridRef = useRef(null);
    const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
    const bottomRef = useRef(null);
    const bottomInView = useInView(bottomRef, { once: true, amount: 0.3 });

    return (
        <section className="py-24 relative w-full bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6">
                <ConstructedHeading label="03 // Ecosystem" line1="Our Arsenal of" highlight="Products" />

                {/* ── Bento Grid with staggerChildren Ripple ── */}
                <motion.div
                    ref={gridRef}
                    variants={gridVariants}
                    initial="hidden"
                    animate={gridInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]"
                >
                    {/* AUDIOPRINTS — large hero card */}
                    <BentoCard className="col-span-1 md:col-span-2 md:row-span-2 bg-[#0a0a0a] backdrop-blur-md border border-white/5 p-8 flex flex-col justify-between overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 w-full h-full bg-[url('https://images.pexels.com/photos/19924600/pexels-photo-19924600.jpeg')] bg-cover bg-center opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 z-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-[1]" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-[#A8140C]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <div className="w-6 h-6 rounded-full bg-[#A8140C] animate-pulse shadow-[0_0_15px_#A8140C]" />
                            </div>
                            <h3 className="text-3xl font-bold tracking-tighter text-white mb-2 font-['var(--font-inter)']">AUDIOPRINTS</h3>
                            <p className="text-slate-200 font-['var(--font-inter)'] max-w-sm drop-shadow-lg">
                                A Radio Monitoring system based on Automatic Content Recognition (ACR).
                            </p>
                        </div>
                        <div className="relative z-10 w-full h-40 mt-6 flex items-end justify-between gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-full bg-gradient-to-t from-[#A8140C] to-[#FFC107]/50 rounded-t-sm origin-bottom"
                                    style={{ animation: 'waveform 1.5s ease-in-out infinite', animationDelay: `${i * -0.05}s` }}
                                />
                            ))}
                        </div>
                    </BentoCard>

                    {/* Octo Campus CRM */}
                    <BentoCard className="col-span-1 md:col-span-2 overflow-hidden transition-all duration-300 bg-[#0a0a0a]">
                        <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-all duration-700 z-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-[1]" />
                        <div className="relative z-10 p-8 h-full flex items-end">
                            <div className="flex items-start gap-6 w-full">
                                <div className="w-14 h-14 rounded-full bg-[#A8140C]/20 flex items-center justify-center text-[#A8140C] shrink-0 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold tracking-tighter text-white mb-2 font-['var(--font-inter)'] drop-shadow-md">Octo Campus CRM</h3>
                                    <p className="text-slate-200 font-['var(--font-inter)'] drop-shadow-sm">Tailored for overseas education.</p>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Trend Tracker */}
                    <BentoCard className="col-span-1 bg-[#0a0a0a] p-8 flex flex-col justify-center transition-all duration-300">
                        <div className="text-[#FFC107] mb-4 group-hover:scale-110 transition-transform w-min"><MessageSquare size={32} /></div>
                        <h3 className="text-xl font-bold tracking-tighter text-white mb-2 font-['var(--font-inter)']">Trend Tracker</h3>
                        <p className="text-sm text-slate-400 font-['var(--font-inter)']">Assess incoming messages on WhatsApp, SMS, Telegram.</p>
                    </BentoCard>

                    {/* EventEase */}
                    <BentoCard className="col-span-1 bg-[#0a0a0a] p-8 flex flex-col justify-center transition-all duration-300">
                        <div className="text-slate-300 group-hover:text-white mb-4 group-hover:scale-110 transition-all w-min"><Ticket size={32} /></div>
                        <h3 className="text-xl font-bold tracking-tighter text-white mb-2 font-['var(--font-inter)']">EventEase</h3>
                        <p className="text-sm text-slate-400 font-['var(--font-inter)']">Seamlessly manage invites and attendance.</p>
                    </BentoCard>
                </motion.div>

                {/* Spin N Win — bottom full-width card */}
                <div className="mt-6" ref={bottomRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={bottomInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.1 }}
                        className="group relative rounded-3xl bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-between transition-all duration-300 will-change-transform"
                    >
                        <div className="absolute inset-[-1px] rounded-[inherit] border border-[#A8140C]/30 group-hover:border-[#A8140C] group-hover:shadow-[0_0_20px_#A8140C] transition-all duration-500 pointer-events-none z-[1]" />
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-[#A8140C]/10 flex items-center justify-center text-[#FFC107] group-hover:scale-110 transition-transform">
                                <Gift size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold tracking-tighter text-white mb-1 font-['var(--font-inter)']">Spin N Win Rewards</h3>
                                <p className="text-slate-400 font-['var(--font-inter)']">Gamified engagement and customer loyalty incentives.</p>
                            </div>
                        </div>
                        <button className="px-8 py-4 rounded-full border border-[#A8140C] text-white hover:bg-[#A8140C] transition-all font-bold hover:shadow-[0_0_20px_rgba(168,20,12,0.8)] hidden md:block z-10 font-['var(--font-inter)'] tracking-wide">
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}