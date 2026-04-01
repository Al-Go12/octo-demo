'use client';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';

const locations = [
    { name: 'Kochi, Kerala', lat: 9.9312, lng: 76.2673, address: 'Ponnurunni, Vyttila, 682019' },
    { name: 'Muscat, Oman', lat: 21.4735, lng: 55.9754, address: 'Global Reach Office' },
    { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, address: 'Vertex Business Park' }
];

function latLongToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

function Marker({ position, location }: { position: THREE.Vector3; location: typeof locations[0] }) {
    const [hovered, setHovered] = useState(false);
    return (
        <group position={position}>
            <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
            >
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshBasicMaterial color="#FF1E1E" />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshBasicMaterial color="#FF1E1E" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
            </mesh>
            {hovered && (
                <Html distanceFactor={10} zIndexRange={[100, 0]}>
                    <div className="bg-[#050505]/95 backdrop-blur-xl border border-[#A8140C]/60 px-4 py-3 rounded-xl text-white whitespace-nowrap -translate-x-1/2 -translate-y-full -mt-3 shadow-[0_0_30px_rgba(168,20,12,0.5)] pointer-events-none">
                        <h4 className="font-bold text-[#A8140C] font-['var(--font-inter)'] text-sm">{location.name}</h4>
                        <p className="text-[11px] text-slate-400 font-['var(--font-jetbrains)'] mt-0.5">{location.address}</p>
                    </div>
                </Html>
            )}
        </group>
    );
}

function RedLuminousRings({ radius }: { radius: number }) {
    const rings = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            radius: radius * (1.05 + Math.random() * 0.4),
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
            opacity: 0.1 + Math.random() * 0.2,
        }));
    }, [radius]);

    return (
        <group>
            {rings.map((ring, i) => (
                <mesh key={i} rotation={ring.rotation as any}>
                    <torusGeometry args={[ring.radius, 0.003, 3, 60]} />
                    <meshBasicMaterial color="#A8140C" transparent opacity={ring.opacity} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

function CountryOutlines({ radius }: { radius: number }) {
    const geometry = useMemo(() => {
        // Simple country outline visualization for demo purposes.
        // For accurate outlines, load and process GeoJSON data.
        const points = [
            // Example points for a simple shape representing a region
            new THREE.Vector3(radius, 0, 0),
            new THREE.Vector3(radius * 0.9, radius * 0.4, 0),
            new THREE.Vector3(radius * 0.7, radius * 0.7, 0),
            new THREE.Vector3(radius * 0.4, radius * 0.9, 0),
            new THREE.Vector3(0, radius, 0),
            new THREE.Vector3(-radius * 0.4, radius * 0.9, 0),
            new THREE.Vector3(-radius * 0.7, radius * 0.7, 0),
            new THREE.Vector3(-radius * 0.9, radius * 0.4, 0),
            new THREE.Vector3(-radius, 0, 0),
            new THREE.Vector3(-radius * 0.9, -radius * 0.4, 0),
            new THREE.Vector3(-radius * 0.7, -radius * 0.7, 0),
            new THREE.Vector3(-radius * 0.4, -radius * 0.9, 0),
            new THREE.Vector3(0, -radius, 0),
            new THREE.Vector3(radius * 0.4, -radius * 0.9, 0),
            new THREE.Vector3(radius * 0.7, -radius * 0.7, 0),
            new THREE.Vector3(radius * 0.9, -radius * 0.4, 0),
            new THREE.Vector3(radius, 0, 0), // Close the loop
        ];
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [radius]);

    const lineInstances = useMemo(() => {
        return Array.from({ length: 50 }).map(() => ({
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
            scale: 1 + Math.random() * 0.05,
        }));
    }, []);

    return (
        <group>
            {lineInstances.map((instance, i) => (
                <primitive
                    key={i}
                    object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.3 }))}
                    rotation={instance.rotation as any}
                    scale={instance.scale}
                />
            ))}
        </group>
    );
}

function ColorfulEarth() {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 2.5;
    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
    });
    return (
        <group ref={groupRef} rotation={[0.35, -1.5, 0]}>
            <mesh>
                <sphereGeometry args={[radius, 56, 56]} />
                <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.18} />
            </mesh>
            {/* Equator ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.007, 4, 90]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
            </mesh>
            {/* Prime meridian ring */}
            <mesh>
                <torusGeometry args={[radius, 0.007, 4, 90]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
            </mesh>
            {/* Dark inner core */}
            <mesh>
                <sphereGeometry args={[radius * 0.97, 32, 32]} />
                <meshStandardMaterial color="#020617" roughness={0.9} metalness={0.3} />
            </mesh>
            <RedLuminousRings radius={radius} />
            <CountryOutlines radius={radius} />
            {locations.map((loc, i) => (
                <Marker key={i} position={latLongToVector3(loc.lat, loc.lng, radius)} location={loc} />
            ))}
        </group>
    );
}

export function Footer() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <footer className="relative w-full bg-[#050505] border-t border-[#A8140C]/20 overflow-hidden">

            {/* Subtle ambient background glow */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#A8140C]/8 blur-[160px] rounded-full pointer-events-none -translate-y-1/2" />

            {/* ── MAIN CONTENT: two-column grid ── */}
            <div className="container mx-auto px-6 py-20 lg:py-28" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* ── LEFT: Contact Card ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ type: 'spring', damping: 22, stiffness: 90 }}
                        className="will-change-transform"
                    >
                        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_0_60px_rgba(168,20,12,0.08)] max-w-lg">

                            {/* Heading */}
                            <div className="mb-8">
                                <span className="text-[#A8140C] font-['var(--font-jetbrains)'] text-xs tracking-[0.25em] uppercase mb-3 block drop-shadow-[0_0_8px_#A8140C]">
                                    Transmission Open
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white font-['var(--font-inter)'] leading-tight mb-4">
                                    Make The<br />
                                    <span className="text-[#A8140C] drop-shadow-[0_0_15px_rgba(168,20,12,0.7)]">Connection.</span>
                                </h2>
                                <p className="text-slate-400 font-['var(--font-inter)'] leading-relaxed text-sm md:text-base">
                                    Connect with our architects to engineer your next digital transformation benchmark.
                                </p>
                            </div>

                            {/* Contact details */}
                            <div className="space-y-6 mb-8">
                                <a href="mailto:hello@octosignals.com" className="flex items-center gap-4 group">
                                    <div className="w-11 h-11 rounded-full bg-[#A8140C]/10 border border-[#A8140C]/30 flex items-center justify-center shrink-0 text-[#A8140C] group-hover:bg-[#A8140C] group-hover:text-white transition-all duration-300">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-white font-['var(--font-inter)'] font-semibold group-hover:text-[#FFC107] transition-colors">
                                        hello@octosignals.com
                                    </span>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-[#A8140C]/10 border border-[#A8140C]/30 flex items-center justify-center shrink-0 text-[#A8140C] mt-0.5">
                                        <Phone size={18} />
                                    </div>
                                    <div className="space-y-1.5 font-['var(--font-jetbrains)'] text-xs text-slate-300 pt-1">
                                        <p><span className="text-[#A8140C] font-bold w-8 inline-block">IND</span> &nbsp;+91 79944 77790</p>
                                        <p><span className="text-[#A8140C] font-bold w-8 inline-block">OMN</span> +968 92154 642</p>
                                        <p><span className="text-[#A8140C] font-bold w-8 inline-block">UAE</span> +971 5038 06840</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-[#A8140C]/10 border border-[#A8140C]/30 flex items-center justify-center shrink-0 text-[#A8140C] mt-0.5">
                                        <MapPin size={18} />
                                    </div>
                                    <p className="text-slate-300 font-['var(--font-inter)'] text-sm leading-relaxed pt-2">
                                        Ponnurunni, Vyttila, Kochi<br />Kerala 682019, India
                                    </p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="mailto:hello@octosignals.com"
                                    className="flex-1 text-center px-6 py-3.5 rounded-full bg-[#A8140C] hover:bg-red-700 text-white font-bold font-['var(--font-inter)'] transition-all shadow-[0_0_20px_rgba(168,20,12,0.4)] hover:shadow-[0_0_35px_rgba(168,20,12,0.7)] text-sm"
                                >
                                    Send a Signal
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/octosignals-ltd/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center px-6 py-3.5 rounded-full border border-white/15 text-white hover:border-[#A8140C] hover:bg-[#A8140C]/10 font-bold font-['var(--font-inter)'] transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Globe ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ type: 'spring', damping: 22, stiffness: 90, delay: 0.1 }}
                        className="relative h-[380px] md:h-[480px] lg:h-[560px] w-full will-change-transform"
                    >
                        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                            <ambientLight intensity={2} />
                            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#0ea5e9" />
                            <pointLight position={[-5, -5, -5]} intensity={0.8} color="#A8140C" />
                            <ColorfulEarth />
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
                            <EffectComposer>
                                <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.9} intensity={2.5} mipmapBlur />
                            </EffectComposer>
                        </Canvas>
                    </motion.div>

                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-600 font-['var(--font-jetbrains)'] text-[10px] uppercase tracking-widest gap-4">
                    <p>© {new Date().getFullYear()} Octosignals Ltd. · Signals Perfected.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#FFC107] transition-colors">Privacy</a>
                        <a href="#" className="hover:text-[#FFC107] transition-colors">Terms</a>
                        <a href="https://www.instagram.com/octosignals/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFC107] transition-colors flex items-center gap-1">
                            <ExternalLink size={11} /> Instagram
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    );
}