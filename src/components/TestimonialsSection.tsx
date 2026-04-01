'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
    { quote: "Octosignals completely transformed our backend infrastructure. Their strategic implementation was flawless.", author: "Sarah Jenkins", role: "CTO, Matrix Dynamics" },
    { quote: "The Spin N Win platform drove our customer engagement up by 300%. Absolutely brilliant gamification design.", author: "Marcus Thorne", role: "Head of Marketing, Vertex Retail" },
    { quote: "EventEase revolutionized how we manage large-scale corporate summits. The CRM integration is a lifesaver.", author: "Elena Rodriguez", role: "Events Director, Global Nexus" },
    { quote: "Their custom educational portal streamlined our entire campus workflow. Highly recommend their bespoke software.", author: "Dr. Alistair Vance", role: "Dean, Innova University" },
];

export function TestimonialsSection() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const isInView = useInView(textRef, { once: true, amount: 0.5 });
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const xScroll = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={containerRef} className="py-32 relative w-full bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 mb-16" ref={textRef}>
                <div className="text-center">
                    <span className="text-[#A8140C] font-['var(--font-jetbrains)'] text-sm tracking-widest uppercase mb-4 block drop-shadow-[0_0_10px_#A8140C]">04 // Client Voices</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold tracking-tighter font-['var(--font-inter)'] text-white"
                    >
                        What Our <span className="text-[#A8140C] drop-shadow-[0_0_10px_rgba(168,20,12,0.8)]">Partners Say</span>
                    </motion.h2>
                </div>
            </div>

            <div className="relative w-full flex overflow-hidden">
                {/* Left/Right Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                <motion.div style={{ x: xScroll }} className="flex gap-8 px-4 py-8">
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="min-w-[350px] md:min-w-[450px] p-10 rounded-2xl bg-[#0a0a0a] border border-[#A8140C]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group hover:border-[#A8140C]/80 transition-colors duration-500">
                            <div className="text-[#A8140C] mb-6 shadow-[0_0_15px_rgba(168,20,12,0.5)] w-min">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                            </div>
                            <p className="text-lg text-slate-300 font-['var(--font-inter)'] mb-8 leading-relaxed">"{t.quote}"</p>
                            <div>
                                <p className="font-bold text-white font-['var(--font-inter)'] tracking-tight">{t.author}</p>
                                <p className="text-xs tracking-wider text-[#FFC107] font-['var(--font-jetbrains)'] mt-1 uppercase">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
