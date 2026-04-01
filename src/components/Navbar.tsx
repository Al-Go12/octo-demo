'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                paddingTop: isScrolled ? '1rem' : '1.5rem',
            }}
        >
            <div className={`flex items-center justify-between transition-all duration-500 w-full ${isScrolled ? 'max-w-4xl px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'max-w-7xl px-8 py-4 bg-transparent'}`}>
                <img
                    src="https://octosignals.com/wp-content/uploads/2024/01/Octosignals-logo-21.png"
                    alt="Octosignals Logo"
                    className={`transition-all duration-500 shrink-0 ${isScrolled ? 'h-8' : 'h-12'}`}
                />

                <nav className="hidden md:flex gap-8 items-center">
                    <a href="#" className="font-['var(--font-space-grotesk)'] text-sm font-semibold text-slate-300 hover:text-white transition-colors">Home</a>
                    <a href="#" className="font-['var(--font-space-grotesk)'] text-sm font-semibold text-slate-300 hover:text-white transition-colors">About Us</a>
                    <a href="#" className="font-['var(--font-space-grotesk)'] text-sm font-semibold text-slate-300 hover:text-white transition-colors">Products</a>
                    <button className="px-6 py-2 rounded-full border border-[#A8140C] text-[#A8140C] font-['var(--font-space-grotesk)'] text-sm font-semibold hover:bg-[#A8140C] hover:text-white transition-all shadow-[0_0_10px_rgba(168,20,12,0)] hover:shadow-[0_0_20px_rgba(168,20,12,0.6)]">
                        Contact
                    </button>
                </nav>
            </div>
        </motion.header>
    );
}
