'use client';
import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function NeuralNetwork({ isLoaded }: { isLoaded?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const pointLightRef = useRef<THREE.PointLight>(null);

    const { viewport } = useThree();

    const count = 300;
    const maxDistance = 3.5;
    const maxLines = 25000;

    const crimsonColor = useMemo(() => new THREE.Color('#FF3322'), []);
    // Brighter steel-blue base so the network is clearly visible at rest
    const baseColor = useMemo(() => new THREE.Color('#4a7fa5'), []);

    const [positions, velocities, initialColors, linePositions, lineColors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = [];
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 6 + Math.random() * 4;

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);

            vel.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02,
            });

            col[i * 3] = baseColor.r;
            col[i * 3 + 1] = baseColor.g;
            col[i * 3 + 2] = baseColor.b;
        }

        return [pos, vel, col, new Float32Array(maxLines * 6), new Float32Array(maxLines * 6)];
    }, [count, baseColor]);

    const linesGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        return geo;
    }, [linePositions, lineColors]);

    // Animation state
    const scaleSpring = useRef(0);
    const rotationEnergy = useRef(0.2); // Start fast
    const lightEnergy = useRef(10.0); // Start bright

    useFrame((state, delta) => {
        if (groupRef.current) {
            if (isLoaded) {
                // Elastic scale approach utilizing Lerp + Spring mechanics roughly mapped
                scaleSpring.current = THREE.MathUtils.lerp(scaleSpring.current, 1, 0.05);
                rotationEnergy.current = THREE.MathUtils.lerp(rotationEnergy.current, 0.002, 0.03); // slow down to idle
                lightEnergy.current = THREE.MathUtils.lerp(lightEnergy.current, 2.0, 0.05); // settle to professional level
            } else {
                groupRef.current.scale.setScalar(0);
                return; // Don't compute anything until loaded
            }

            // Add a slight bounce to scale to mimic elastic
            const scaleVal = scaleSpring.current + Math.sin(state.clock.elapsedTime * 10) * (1 - scaleSpring.current) * 0.2;
            groupRef.current.scale.setScalar(scaleVal);
            groupRef.current.rotation.y += rotationEnergy.current;
            groupRef.current.rotation.x += rotationEnergy.current * 0.5;
        }

        if (pointLightRef.current) {
            pointLightRef.current.intensity = lightEnergy.current;
        }

        const mouseX = (state.pointer.x * viewport.width) / 2;
        const mouseY = (state.pointer.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            const rSq = positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2;
            if (rSq > 12 ** 2) {
                velocities[i].x *= -1;
                velocities[i].y *= -1;
                velocities[i].z *= -1;
            }
        }

        if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }

        let lineIndex = 0;
        const colors = pointsRef.current?.geometry.attributes.color.array as Float32Array;

        if (colors) {
            for (let i = 0; i < count; i++) {
                const x1 = positions[i * 3];
                const y1 = positions[i * 3 + 1];
                const z1 = positions[i * 3 + 2];

                const dxMouse = x1 - mouseX;
                const dyMouse = y1 - mouseY;
                // Use only X/Y mouse for proximity — Z projection kept at a fixed mid-depth
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                // Tighter, more dramatic glow radius = 5 world units
                const glowRadius = 5;
                const isGlowing = distMouse < glowRadius;

                if (isGlowing) {
                    const intensity = (1 - distMouse / glowRadius) ** 1.5; // exponential ramp
                    const lr = 0.25; // lerp speed – snappy response
                    colors[i * 3] += (crimsonColor.r * 2.0 * intensity - colors[i * 3]) * lr;
                    colors[i * 3 + 1] += (crimsonColor.g * 2.0 * intensity - colors[i * 3 + 1]) * lr;
                    colors[i * 3 + 2] += (crimsonColor.b * 2.0 * intensity - colors[i * 3 + 2]) * lr;
                } else {
                    // Gentle drift back to bright base color
                    colors[i * 3] += (baseColor.r - colors[i * 3]) * 0.06;
                    colors[i * 3 + 1] += (baseColor.g - colors[i * 3 + 1]) * 0.06;
                    colors[i * 3 + 2] += (baseColor.b - colors[i * 3 + 2]) * 0.06;
                }

                for (let j = i + 1; j < count; j++) {
                    const x2 = positions[j * 3];
                    const y2 = positions[j * 3 + 1];
                    const z2 = positions[j * 3 + 2];

                    const dist = Math.sqrt(
                        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
                    );

                    if (dist < maxDistance && lineIndex < maxLines) {
                        linePositions[lineIndex * 6] = x1;
                        linePositions[lineIndex * 6 + 1] = y1;
                        linePositions[lineIndex * 6 + 2] = z1;

                        linePositions[lineIndex * 6 + 3] = x2;
                        linePositions[lineIndex * 6 + 4] = y2;
                        linePositions[lineIndex * 6 + 5] = z2;

                        const alpha = (1.0 - dist / maxDistance) ** 0.8; // softer falloff = more lines visible
                        const boost = 1.8; // overall brightness multiplier on lines

                        lineColors[lineIndex * 6] = colors[i * 3] * alpha * boost;
                        lineColors[lineIndex * 6 + 1] = colors[i * 3 + 1] * alpha * boost;
                        lineColors[lineIndex * 6 + 2] = colors[i * 3 + 2] * alpha * boost;

                        lineColors[lineIndex * 6 + 3] = colors[j * 3] * alpha * boost;
                        lineColors[lineIndex * 6 + 4] = colors[j * 3 + 1] * alpha * boost;
                        lineColors[lineIndex * 6 + 5] = colors[j * 3 + 2] * alpha * boost;

                        lineIndex++;
                    }
                }
            }

            pointsRef.current!.geometry.attributes.color.needsUpdate = true;
        }

        if (linesRef.current) {
            linesGeometry.attributes.position.needsUpdate = true;
            linesGeometry.attributes.color.needsUpdate = true;
            linesGeometry.setDrawRange(0, lineIndex * 2);
        }
    });

    return (
        <group>
            <pointLight ref={pointLightRef} position={[5, 5, 5]} color="#A8140C" intensity={0} />
            <group ref={groupRef} scale={0}>
                <points ref={pointsRef}>
                    <bufferGeometry>
                        <primitive attach="attributes-position" object={new THREE.BufferAttribute(positions, 3)} />
                        <primitive attach="attributes-color" object={new THREE.BufferAttribute(initialColors, 3)} />
                    </bufferGeometry>
                    <pointsMaterial size={0.22} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
                </points>
                <lineSegments ref={linesRef} geometry={linesGeometry}>
                    <lineBasicMaterial vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
                </lineSegments>
            </group>
        </group>
    );
}
