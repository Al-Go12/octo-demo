'use client';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "Octosignals stands as an invaluable asset, consistently delivering top-tier efficiency and remarkable project execution. A pleasure to work with.",
        author: "Dhanesh P K",
        title: "Director, Ibacus Tech",
    },
    {
        quote: "Delivered a very innovative and reliable solution for a Healthcare customer, streamlining operations and enhancing overall patient management.",
        author: "Sreeram Kishore Chavali",
        title: "Journey Analytics",
    },
    {
        quote: "Their technology strategy consulting radically transformed how we approach our digital infrastructure. Highly recommended for complex integrations.",
        author: "Sarah Jenkins",
        title: "CTO, RetailFlow",
    },
    {
        quote: "We've seen immediate improvements in our operational workflows since deploying the tailored products they developed.",
        author: "Michael Chang",
        title: "VP of Engineering, EduTech Solutions",
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-24 relative w-full overflow-hidden bg-[#030816]">
            <div className="container mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold font-['var(--font-space-grotesk)'] mb-4 text-white">
                    What Our <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Clients</span> Say
                </h2>
            </div>

            <div className="relative w-full overflow-hidden flex">
                {/* Left/Right fading gradients */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030816] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030816] to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-marquee gap-8 px-4 hover:[animation-play-state:paused]">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[400px] flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl relative transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10"
                        >
                            <div className="absolute top-6 right-6 text-white/10">
                                <Quote size={40} />
                            </div>
                            <p className="text-lg text-slate-300 mb-8 relative z-10 font-['var(--font-inter)'] leading-relaxed">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold font-['var(--font-space-grotesk)'] text-xl border border-cyan-400/30">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-['var(--font-space-grotesk)']">{t.author}</h4>
                                    <p className="text-sm text-cyan-400/80 font-['var(--font-inter)']">{t.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
