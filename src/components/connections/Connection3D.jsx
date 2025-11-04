import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D tube connection between nodes
 */
function Connection3D({ start, end, color = '#7B3FF2' }) {
  const tubeRef = useRef();

  // Create tube geometry
  const { curve, tubeGeometry } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);

    // Create bezier curve with height arc
    const midPoint = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5);
    const distance = startVec.distanceTo(endVec);
    const height = Math.min(distance * 0.3, 3);

    const control1 = new THREE.Vector3(
      startVec.x,
      startVec.y + height,
      startVec.z
    );

    const control2 = new THREE.Vector3(
      endVec.x,
      endVec.y + height,
      endVec.z
    );

    const curve = new THREE.CubicBezierCurve3(
      startVec,
      control1,
      control2,
      endVec
    );

    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.08, 8, false);

    return { curve, tubeGeometry };
  }, [start, end]);

  // Animate glow
  useFrame(({ clock }) => {
    if (tubeRef.current) {
      const time = clock.getElapsedTime();
      tubeRef.current.material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <mesh ref={tubeRef} geometry={tubeGeometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default Connection3D;
