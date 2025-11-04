import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createConnectionCurve, createCurveGeometry } from '../../utils/connectionCurves';

function ConnectionLine({ start, end, color = '#7B3FF2', opacity = 0.6, animated = true }) {
  const lineRef = useRef();
  const glowRef = useRef();

  // Create curve geometry
  const { curve, geometry, glowGeometry } = useMemo(() => {
    const curve = createConnectionCurve(start, end, 0.3);
    const geometry = createCurveGeometry(curve, 50);
    const glowGeometry = createCurveGeometry(curve, 50);
    return { curve, geometry, glowGeometry };
  }, [start, end]);

  // Animate the line
  useFrame(({ clock }) => {
    if (animated && lineRef.current) {
      const time = clock.getElapsedTime();
      // Subtle pulsing effect
      lineRef.current.material.opacity = opacity + Math.sin(time * 2) * 0.1;
    }

    if (glowRef.current) {
      const time = clock.getElapsedTime();
      glowRef.current.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Glow layer */}
      <line ref={glowRef} geometry={glowGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          linewidth={5}
          blending={THREE.AdditiveBlending}
        />
      </line>

      {/* Main line */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          linewidth={2}
        />
      </line>
    </group>
  );
}

export default ConnectionLine;
