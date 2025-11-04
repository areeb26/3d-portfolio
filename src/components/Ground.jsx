import { useRef } from 'react';
import { Grid } from '@react-three/drei';

function Ground() {
  const groundRef = useRef();

  return (
    <group>
      {/* Grid Helper */}
      <Grid
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6B7280"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#7B3FF2"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
        position={[0, -0.01, 0]}
      />

      {/* Ground Plane */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

export default Ground;
