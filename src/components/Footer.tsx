'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const locations = [
    { name: 'Kochi, Kerala', lat: 9.9312, lng: 76.2673, address: 'Ponnurunni, Vyttila, 682019' },
    { name: 'Muscat, Oman', lat: 21.4735, lng: 55.9754, address: 'Global Reach Office' },
    { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, address: 'Vertex Business Park' }
];

function latLongToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
}

function Marker({ position, location }: { position: THREE.Vector3, location: typeof locations[0] }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
            >
                <sphereGeometry args={[0.08, 16, 16]} />
                {/* Intensely bright Crimson Red marker to catch bloom */}
                <meshBasicMaterial color="#FF1E1E" />
            </mesh>

            {/* Outer ambient glow */}
            <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#FF1E1E" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </mesh>

            {hovered && (
                <Html distanceFactor={12} zIndexRange={[100, 0]}>
                    <div className="bg-[#050505]/90 backdrop-blur-xl border border-[#A8140C]/50 p-4 rounded-xl text-white whitespace-nowrap -translate-x-1/2 -translate-y-full mb-4 shadow-[0_0_25px_rgba(168,20,12,0.6)] pointer-events-none">
                        <h4 className="font-bold text-[#A8140C] font-['var(--font-inter)']">{location.name}</h4>
                        <p className="text-xs text-slate-300 font-['var(--font-jetbrains)'] mt-1">{location.address}</p>
                    </div>
                </Html>
            )}
        </group>
    );
}

function ColorfulEarth() {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 2.5;

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.4, -1.5, 0]}>
            {/* High-visibility Blue/Cyan Grid */}
            <mesh>
                <sphereGeometry args={[radius, 48, 48]} />
                <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.15} />
            </mesh>

            {/* Solid inner core for occlusion */}
            <mesh>
                <sphereGeometry args={[radius * 0.98, 32, 32]} />
                <meshStandardMaterial color="#020617" roughness={0.8} metalness={0.5} />
            </mesh>

            {/* Dynamic Hotspots */}
            {locations.map((loc, i) => {
                const position = latLongToVector3(loc.lat, loc.lng, radius);
                return <Marker key={i} position={position} location={loc} />;
            })}
        </group>
    );
}

export function Footer() {
    return (
        <footer className="relative w-full bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-[#A8140C]/20">

            {/* Immersive Background Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A8140C]/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-12 relative z-10 w-full max-w-xl">
                        <div>
                            <span className="text-[#A8140C] font-['var(--font-jetbrains)'] text-sm tracking-widest uppercase mb-4 block drop-shadow-[0_0_10px_#A8140C]">Transmission Open</span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 font-['var(--font-inter)']">Make The Connection.</h2>
                            <p className="text-lg text-slate-400 font-['var(--font-inter)'] leading-relaxed">
                                Connect with our architects to engineer your next digital transformation benchmark.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <a href="mailto:hello@octosignals.com" className="flex items-center gap-6 group w-max">
                                <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#A8140C]/30 text-slate-300 group-hover:text-[#FFC107] group-hover:border-[#FFC107] flex items-center justify-center shrink-0 transition-all duration-300 shadow-[0_0_15px_rgba(168,20,12,0.1)] group-hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]">
                                    <Mail size={24} />
                                </div>
                                <span className="text-xl font-bold text-white group-hover:text-[#FFC107] transition-colors font-['var(--font-inter)'] tracking-tight">hello@octosignals.com</span>
                            </a>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#A8140C]/30 text-slate-300 flex items-center justify-center shrink-0 transition-all duration-300">
                                    <Phone size={24} />
                                </div>
                                <div className="space-y-3 font-['var(--font-jetbrains)'] text-sm mt-2">
                                    <p className="hover:text-[#FFC107] transition-colors text-slate-300 cursor-pointer"><span className="text-[#A8140C] w-16 inline-block font-bold">IND</span> +91 79944 77790</p>
                                    <p className="hover:text-[#FFC107] transition-colors text-slate-300 cursor-pointer"><span className="text-[#A8140C] w-16 inline-block font-bold">OMN</span> +968 92154 642</p>
                                    <p className="hover:text-[#FFC107] transition-colors text-slate-300 cursor-pointer"><span className="text-[#A8140C] w-16 inline-block font-bold">UAE</span> +971 5038 06840</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#A8140C]/30 text-slate-300 flex items-center justify-center shrink-0 transition-all duration-300 mt-1">
                                    <MapPin size={24} />
                                </div>
                                <p className="text-lg text-slate-300 font-['var(--font-inter)'] max-w-sm leading-relaxed mt-3">
                                    Ponnurunni, Vyttila, Kochi, Kerala 682019
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center h-[500px] w-full">
                        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} color="#0ea5e9" />
                            <ColorfulEarth />
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                            <EffectComposer>
                                <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
                            </EffectComposer>
                        </Canvas>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-[#A8140C]/20 flex flex-col md:flex-row items-center justify-between text-slate-500 font-['var(--font-jetbrains)'] text-xs uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Octosignals. Signals Perfected.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <a href="#" className="hover:text-[#FFC107] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#FFC107] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
