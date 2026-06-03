'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingMicrophone() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={[3, 0.5, -2]} ref={meshRef}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0, 1, 0]} rotation={[0, (i * Math.PI) / 4, 0]}>
            <torusGeometry args={[0.18, 0.005, 8, 32]} />
            <meshStandardMaterial color="#ff2d2d" emissive="#ff2d2d" emissiveIntensity={0.3} />
          </mesh>
        ))}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingHeadphones() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group position={[-3, -0.5, -1]} ref={meshRef} scale={0.8}>
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.04, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.5, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.5, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#ff2d2d" emissive="#ff2d2d" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.5, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.5, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#ff2d2d" emissive="#ff2d2d" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function VinylDisk() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={[0, -1.5, -3]} ref={meshRef}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.02, 64]} />
          <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 32]} />
          <meshStandardMaterial color="#ff2d2d" emissive="#ff2d2d" emissiveIntensity={0.3} />
        </mesh>
        {[...Array(12)].map((_, i) => (
          <mesh key={i} position={[0, 0.012, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35 + i * 0.07, 0.002, 8, 64]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function WaveformRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 0.3, 0.01, 8, 64]} />
          <meshStandardMaterial
            color="#ff2d2d"
            emissive="#ff2d2d"
            emissiveIntensity={0.2 + i * 0.1}
            transparent
            opacity={0.3 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      col[i * 3] = 1;
      col[i * 3 + 1] = 0.18;
      col[i * 3 + 2] = 0.18;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 1, -2]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <MeshDistortMaterial
        color="#ff2d2d"
        emissive="#ff2d2d"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={2}
      />
    </mesh>
  );
}

interface StudioSceneProps {
  mousePosition?: { x: number; y: number };
}

export default function StudioScene({ mousePosition }: StudioSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particleCount = isMobile ? 50 : 150;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff2d2d" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={0.5}
          color="#ff2d2d"
        />

        <FloatingMicrophone />
        <FloatingHeadphones />
        <VinylDisk />
        <WaveformRings />
        <AnimatedSphere />
        <Particles count={particleCount} />
        <Stars radius={10} depth={50} count={isMobile ? 500 : 1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
