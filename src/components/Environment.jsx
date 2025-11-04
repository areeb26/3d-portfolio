import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Environment() {
  const spotLightRef = useRef();

  // Subtle spotlight animation
  useFrame(({ clock }) => {
    if (spotLightRef.current) {
      const time = clock.getElapsedTime();
      spotLightRef.current.intensity = 0.5 + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <>
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 10, 60]} />

      {/* Ambient Light - Base illumination */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* Hemisphere Light - Sky and ground colors */}
      <hemisphereLight
        intensity={0.4}
        color="#7B3FF2"
        groundColor="#0a0a0a"
      />

      {/* Main Directional Light - Simulates sun */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Accent Spot Light */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
        color="#00C0FF"
      />

      {/* Fill Light - Reduces harsh shadows */}
      <pointLight
        position={[-10, 5, -10]}
        intensity={0.3}
        color="#FF6D5A"
      />

      {/* Rim Light - Adds edge definition */}
      <pointLight
        position={[10, 3, -5]}
        intensity={0.2}
        color="#7B3FF2"
      />
    </>
  );
}

export default Environment;
