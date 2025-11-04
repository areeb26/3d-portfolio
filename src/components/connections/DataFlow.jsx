import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createConnectionCurve, getPointOnCurve } from '../../utils/connectionCurves';
import ConnectionLine from './ConnectionLine';

function FlowParticle({ curve, color, delay = 0, speed = 1 }) {
  const particleRef = useRef();
  const trailRef = useRef();

  useFrame(({ clock }) => {
    if (!particleRef.current || !curve) return;

    const time = clock.getElapsedTime() * speed;
    const t = ((time + delay) % 3) / 3; // Loop every 3 seconds

    // Get position on curve
    const position = getPointOnCurve(curve, t);
    particleRef.current.position.copy(position);

    // Scale particle based on position (larger in middle)
    const scale = 0.8 + Math.sin(t * Math.PI) * 0.4;
    particleRef.current.scale.setScalar(scale);

    // Update trail
    if (trailRef.current) {
      const trailT = Math.max(0, t - 0.05);
      const trailPos = getPointOnCurve(curve, trailT);
      trailRef.current.position.copy(trailPos);
      trailRef.current.scale.setScalar(scale * 0.6);
    }
  });

  return (
    <group>
      {/* Trail particle */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glow */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function DataFlow({ start, end, color = '#7B3FF2', particleCount = 3, speed = 0.5 }) {
  // Create curve
  const curve = useMemo(() => {
    return createConnectionCurve(start, end, 0.3);
  }, [start, end]);

  // Generate particle delays
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: (i / particleCount) * 3, // Evenly space particles
    }));
  }, [particleCount]);

  return (
    <group>
      {/* Connection line */}
      <ConnectionLine start={start} end={end} color={color} opacity={0.4} />

      {/* Flowing particles */}
      {particles.map((particle) => (
        <FlowParticle
          key={particle.id}
          curve={curve}
          color={color}
          delay={particle.delay}
          speed={speed}
        />
      ))}
    </group>
  );
}

export default DataFlow;
