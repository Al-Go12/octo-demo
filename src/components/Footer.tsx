'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const locations = [
    { name: 'Kochi, India', lat: 9.9312, lng: 76.2673, address: 'Ponnurunni, Vyttila, Kochi' },
    { name: 'Oman', lat: 21.4735, lng: 55.9754, address: 'Muscat, Oman' },
    { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, address: 'Dubai, UAE' },
    { name: 'USA', lat: 37.0902, lng: -95.7129, address: 'New York, USA' }
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
                <meshBasicMaterial color="#A8140C" />
            </mesh>

            <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#A8140C" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>

            {hovered && (
                <Html distanceFactor={10} zIndexRange={[100, 0]}>
                    <div className="bg-[#050505]/80 backdrop-blur-xl border border-white/20 p-4 rounded-xl text-white whitespace-nowrap -translate-x-1/2 -translate-y-full mb-3 shadow-[0_0_20px_rgba(168,20,12,0.4)] pointer-events-none">
                        <h4 className="font-bold text-[#A8140C] font-['var(--font-space-grotesk)']">{location.name}</h4>
                        <p className="text-sm text-slate-300 font-['var(--font-inter)']">{location.address}</p>
                    </div>
                </Html>
            )}
        </group>
    );
}

function ThreeGlobe() {
    const groupRef = useRef<THREE.Group>(null);
    const radius = 2.5;

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.2, -1.5, 0]}>
            <mesh>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshBasicMaterial color="#334155" wireframe transparent opacity={0.2} />
            </mesh>

            <mesh>
                <sphereGeometry args={[radius * 0.98, 32, 32]} />
                <meshBasicMaterial color="#050505" />
            </mesh>

            {locations.map((loc, i) => {
                const position = latLongToVector3(loc.lat, loc.lng, radius);
                return <Marker key={i} position={position} location={loc} />;
            })}
        </group>
    );
}

export function Footer() {
    return (
        <footer className="relative w-full bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8 relative z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2 font-['var(--font-space-grotesk)']">Ready to Transform?</h2>
                            <p className="text-slate-400 font-['var(--font-inter)']">Get in touch with us to start your next big technological leap.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-slate-300 hover:text-[#A8140C] transition-colors">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <a href="mailto:hello@octosignals.com" className="text-lg font-['var(--font-inter)']">hello@octosignals.com</a>
                            </div>

                            <div className="flex items-start gap-4 text-slate-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                                    <Phone size={20} />
                                </div>
                                <div className="space-y-2 font-['var(--font-inter)']">
                                    <p><span className="text-slate-500 w-16 inline-block">India:</span> +91 79944 77790</p>
                                    <p><span className="text-slate-500 w-16 inline-block">Oman:</span> +968 92154 642</p>
                                    <p><span className="text-slate-500 w-16 inline-block">Dubai:</span> +971 5038 06840</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-slate-300 hover:text-[#A8140C] transition-colors">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                                    <MapPin size={20} />
                                </div>
                                <p className="text-lg font-['var(--font-inter)'] max-w-sm leading-relaxed">
                                    Ponnurunni, Vyttila, Kochi
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center h-[400px]">
                        <div className="absolute w-64 h-64 bg-[#A8140C]/20 blur-3xl rounded-full pointer-events-none"></div>
                        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <ThreeGlobe />
                            <OrbitControls enableZoom={false} enablePan={false} />
                        </Canvas>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm font-['var(--font-inter)']">
                    <p>© {new Date().getFullYear()} Octosignals. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#A8140C] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#A8140C] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
