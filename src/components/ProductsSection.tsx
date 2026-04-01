'use client';
import { ShieldCheck, MessageSquare, Ticket, Gift } from 'lucide-react';

export function ProductsSection() {
    return (
        <section className="py-24 relative w-full bg-[#050505]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-['var(--font-space-grotesk)'] mb-4 text-white">
                        Our Arsenal of <span className="text-[#A8140C] drop-shadow-[0_0_10px_rgba(168,20,12,0.8)]">Products</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
                    {/* Card 1: AUDIOPRINTS */}
                    <div className="racing-border-card group relative col-span-1 md:col-span-2 md:row-span-2 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#A8140C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-[#A8140C]/20 flex items-center justify-center mb-6 text-[#A8140C] group-hover:scale-110 transition-transform">
                                <div className="w-6 h-6 rounded-full bg-[#A8140C] animate-pulse shadow-[0_0_15px_#A8140C]" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 font-['var(--font-space-grotesk)']">AUDIOPRINTS</h3>
                            <p className="text-slate-400 font-['var(--font-inter)'] max-w-sm">
                                A Radio Monitoring system based on Automatic Content Recognition (ACR).
                            </p>
                        </div>

                        {/* Crimson Red Waveform */}
                        <div className="relative z-10 w-full h-40 mt-6 flex items-end justify-between gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-full bg-gradient-to-t from-[#A8140C] to-[#FFC107]/50 rounded-t-sm origin-bottom"
                                    style={{
                                        animation: 'waveform 1s ease-in-out infinite',
                                        animationDelay: `${i * -0.1}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Card 2: Octo Campus CRM */}
                    <div className="racing-border-card group relative col-span-1 md:col-span-2 rounded-3xl overflow-hidden transition-all duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                            alt="Dashboard"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl" />

                        <div className="relative z-10 p-8 h-full flex items-end">
                            <div className="flex items-start gap-6 w-full">
                                <div className="w-14 h-14 rounded-full bg-[#A8140C]/20 flex items-center justify-center text-[#A8140C] shrink-0 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-['var(--font-space-grotesk)']">Octo Campus CRM</h3>
                                    <p className="text-slate-300 font-['var(--font-inter)']">Tailored for overseas education.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Trend Tracker */}
                    <div className="racing-border-card group relative col-span-1 md:col-span-1 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-center transition-all duration-300">
                        <div className="text-[#FFC107] mb-4 group-hover:scale-110 transition-transform w-min"><MessageSquare size={32} /></div>
                        <h3 className="text-xl font-bold text-white mb-2 font-['var(--font-space-grotesk)']">Trend Tracker</h3>
                        <p className="text-sm text-slate-400 font-['var(--font-inter)']">Assess incoming messages on WhatsApp, SMS, Telegram.</p>
                    </div>

                    {/* Card 4: EventEase */}
                    <div className="racing-border-card group relative col-span-1 md:col-span-1 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-center transition-all duration-300">
                        <div className="text-slate-300 group-hover:text-white mb-4 group-hover:scale-110 transition-all w-min"><Ticket size={32} /></div>
                        <h3 className="text-xl font-bold text-white mb-2 font-['var(--font-space-grotesk)']">EventEase</h3>
                        <p className="text-sm text-slate-400 font-['var(--font-inter)']">Seamlessly manage invites and attendance.</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 mt-6">
                    {/* Card 5: Spin N Win Rewards */}
                    <div className="racing-border-card group relative w-full rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex items-center justify-between transition-all duration-300">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full bg-[#FFC107]/20 flex items-center justify-center text-[#FFC107] group-hover:scale-110 transition-transform">
                                <Gift size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 font-['var(--font-space-grotesk)']">Spin N Win Rewards</h3>
                                <p className="text-slate-400 font-['var(--font-inter)']">Gamified engagement and customer loyalty incentives.</p>
                            </div>
                        </div>
                        <button className="px-6 py-3 rounded-full border border-[#A8140C] text-white group-hover:bg-[#A8140C] group-hover:text-white transition-colors font-semibold shadow-[0_0_10px_rgba(168,20,12,0)] group-hover:shadow-[0_0_15px_rgba(168,20,12,0.8)] hidden md:block">
                            Learn More
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
