'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  speed?: number;
  color?: string;
}

function ParticleField({ count = 5000, size = 2, speed = 0.5, color = '#00ff7f' }: ParticleSystemProps) {
  const ref = useRef<THREE.Points>(null);

  // Generate random points
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      temp[i] = (Math.random() - 0.5) * 2000; // x
      temp[i + 1] = (Math.random() - 0.5) * 2000; // y
      temp[i + 2] = (Math.random() - 0.5) * 2000; // z
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;

    // Rotate particles
    ref.current.rotation.x -= 0.0001 * speed;
    ref.current.rotation.y -= 0.0002 * speed;

    // Animate camera for parallax effect
    const camera = state.camera;
    camera.position.z = Math.sin(state.clock.elapsedTime * 0.001) * 100 + 200;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export function ParticleBackground({ count = 5000, size = 2, speed = 0.5 }: ParticleSystemProps) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 200], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ParticleField count={count} size={size} speed={speed} color="#00ff7f" />
      </Canvas>
    </div>
  );
}
