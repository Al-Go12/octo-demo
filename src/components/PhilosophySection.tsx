'use client';
import { motion, useScroll, useTransform, useMotionValue, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const cards = [
    {
        title: 'Technology Strategy',
        description: 'We help you define a clear roadmap to align your technology initiatives with your business goals.',
        image: 'https://images.pexels.com/photos/6804547/pexels-photo-6804547.jpeg'
    },
    {
        title: 'Seamless Integration',
        description: 'Our experts ensure smooth and efficient integration of new systems into your existing infrastructure.',
        image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg'
    },
    {
        title: 'Product Development',
        description: 'We build scalable, high-performance software bespoke to your unique industry requirements.',
        image: 'https://images.pexels.com/photos/29459444/pexels-photo-29459444.jpeg'
    }
];

// ──────────────────────────────────────────────────────────────
// Word-by-word construction heading
// ──────────────────────────────────────────────────────────────
function ConstructedHeading({ inView }: { inView: boolean }) {
    const wordVariant = {
        hidden: { y: '110%', opacity: 0 },
        visible: {
            y: '0%', opacity: 1,
            transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
        }
    };
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
    };
    return (
        <div className="text-center mb-20">

            <div className="overflow-hidden">
                <motion.h2
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="text-4xl md:text-5xl font-bold tracking-tighter font-['var(--font-inter)'] text-white flex flex-wrap justify-center gap-x-3"
                >
                    {['Guiding', 'You', 'via'].map((w, i) => (
                        <span key={i} className="overflow-hidden inline-block">
                            <motion.span variants={wordVariant} className="inline-block will-change-transform">{w}</motion.span>
                        </span>
                    ))}
                    <span className="overflow-hidden inline-block">
                        <motion.span variants={wordVariant} className="inline-block text-[#A8140C] drop-shadow-[0_0_15px_rgba(168,20,12,0.8)] will-change-transform">
                            Strategic&nbsp;Tech
                        </motion.span>
                    </span>
                </motion.h2>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Philosophy Card with clip-path reveal + "Signal-Ignite" glow
// ──────────────────────────────────────────────────────────────
function PhilosophyCard({ card, index, lineProgress }: {
    card: typeof cards[0];
    index: number;
    lineProgress: ReturnType<typeof useMotionValue<number>>;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const [ignited, setIgnited] = useState(false);

    // "Signal Connection": ignite when the red line draws past this card's threshold
    const threshold = 0.25 + index * 0.22;
    useEffect(() => {
        const unsub = lineProgress.on('change', (v) => {
            if (v >= threshold && !ignited) setIgnited(true);
        });
        return unsub;
    }, [lineProgress, threshold, ignited]);

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', damping: 20, stiffness: 80, delay: index * 0.12 }}
            className={`group relative w-full h-[420px] rounded-2xl overflow-hidden border transition-all duration-700 will-change-transform
        ${ignited
                    ? 'border-[#A8140C] shadow-[0_0_35px_rgba(168,20,12,0.55)] scale-[1.03]'
                    : 'border-white/10 shadow-none scale-100'
                }`}
        >
            {/* ── Clip-path reveal mask ── */}
            <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                transition={{ duration: 1.1, delay: index * 0.15, ease: [0.77, 0, 0.175, 1] }}
                className="absolute inset-0 z-0 will-change-[clip-path]"
            >
                <motion.img
                    src={card.image}
                    alt={card.title}
                    style={{ scale: imgScale }}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#A8140C]/30 to-transparent mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

            {/* Text */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <h3 className="text-2xl font-bold tracking-tighter mb-3 text-white font-['var(--font-inter)'] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {card.title}
                </h3>
                <p className="text-slate-300 font-['var(--font-inter)'] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {card.description}
                </p>
            </div>
        </motion.div>
    );
}

// ──────────────────────────────────────────────────────────────
// Main Section
// ──────────────────────────────────────────────────────────────
export function PhilosophySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, amount: 0.4 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    // pathLength tied to scroll for Signal Connection
    const pathProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

    return (
        <section ref={sectionRef} className="py-24 relative w-full bg-[#050505]">

            {/* ── SVG Signal Line drawn by scroll ── */}
            <div className="absolute w-full h-full inset-0 z-0 pointer-events-none flex justify-center opacity-40">
                <svg preserveAspectRatio="none" viewBox="0 0 1000 1200" className="w-full h-full max-w-6xl">
                    <motion.path
                        d="M 150 0 C 150 300, 850 500, 850 800 C 850 1000, 200 1100, 200 1200"
                        fill="none"
                        stroke="#A8140C"
                        strokeWidth="4"
                        style={{ pathLength: pathProgress }}
                        className="drop-shadow-[0_0_18px_#A8140C]"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div ref={headingRef}>
                    <ConstructedHeading inView={headingInView} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <PhilosophyCard
                            key={index}
                            card={card}
                            index={index}
                            lineProgress={pathProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
