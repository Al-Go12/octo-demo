'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
    { quote: "Octosignals completely transformed our backend infrastructure. Their strategic implementation was flawless.", author: "Sarah Jenkins", role: "CTO, Matrix Dynamics" },
    { quote: "The Spin N Win platform drove our customer engagement up by 300%. Absolutely brilliant gamification design.", author: "Marcus Thorne", role: "Head of Marketing, Vertex Retail" },
    { quote: "EventEase revolutionized how we manage large-scale corporate summits. The CRM integration is a lifesaver.", author: "Elena Rodriguez", role: "Events Director, Global Nexus" },
    { quote: "Their custom educational portal streamlined our entire campus workflow. Highly recommend their bespoke software.", author: "Dr. Alistair Vance", role: "Dean, Innova University" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring' as const, damping: 25, stiffness: 100 }
    },
};

function TestimonialCard({ t, index }: { t: typeof testimonials[0], index: number }) {
    // Create a staggered effect for even items on desktop
    const isEven = index % 2 !== 0;

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative w-full p-8 md:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#A8140C]/60 flex flex-col gap-6 h-full overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-10 ${isEven ? 'md:mt-16' : ''}`}
        >
            {/* Ambient inner glow on hover */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#A8140C] rounded-full mix-blend-screen filter blur-[90px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

            {/* Quote Icon */}
            <div className="text-[#A8140C]/50 group-hover:text-[#A8140C] group-hover:scale-110 origin-top-left transition-all duration-300 w-min">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>

            {/* Quote Text */}
            <p className="text-base md:text-lg text-slate-300 font-['var(--font-inter)'] leading-relaxed flex-1 z-10">
                "{t.quote}"
            </p>

            {/* Author Info */}
            <div className="border-t border-white/10 pt-5 flex items-center gap-4 z-10">
                {/* Optional Avatar Circle */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A8140C] to-[#5a0a06] flex items-center justify-center text-white font-bold font-['var(--font-inter)'] text-sm">
                    {t.author.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-white font-['var(--font-inter)'] text-sm tracking-tight group-hover:text-[#A8140C] transition-colors duration-300">
                        {t.author}
                    </p>
                    <p className="text-[11px] tracking-widest text-[#FFC107] font-['var(--font-jetbrains)'] mt-0.5 uppercase opacity-90">
                        {t.role}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function TestimonialsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section className="py-24 md:py-32 relative w-full bg-[#050505] overflow-hidden" ref={sectionRef}>

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A8140C]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-[#A8140C] font-['var(--font-jetbrains)'] text-xs tracking-[0.25em] uppercase mb-4 block">
                            Client Signals
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-['var(--font-inter)'] text-white">
                            What Our <span className="text-[#A8140C] drop-shadow-[0_0_15px_rgba(168,20,12,0.6)]">Partners Say</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
                >
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} t={t} index={i} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}