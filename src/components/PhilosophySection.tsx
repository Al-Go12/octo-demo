'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const cards = [
    {
        title: 'Technology Strategy',
        description: 'We help you define a clear roadmap to align your technology initiatives with your business goals.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Seamless Integration',
        description: 'Our experts ensure smooth and efficient integration of new systems into your existing infrastructure.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Product Development',
        description: 'We build scalable, high-performance software bespoke to your unique industry requirements.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
    }
];

function ParallaxCard({ card, index }: { card: typeof cards[0], index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl border border-white/10"
        >
            <motion.img
                src={card.image}
                alt={card.title}
                style={{ scale }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
            />
            {/* Crimson Red gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#A8140C]/40 to-transparent mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-3 text-white font-['var(--font-space-grotesk)'] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {card.title}
                </h3>
                <p className="text-slate-300 font-['var(--font-inter)'] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {card.description}
                </p>
            </div>
        </motion.div>
    );
}

export function PhilosophySection() {
    return (
        <section className="py-24 relative w-full bg-[#050505]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-['var(--font-space-grotesk)'] mb-4 text-white"
                    >
                        Guiding You via <span className="text-[#A8140C] drop-shadow-[0_0_15px_rgba(168,20,12,0.8)]">Strategic Tech</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <ParallaxCard key={index} card={card} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
