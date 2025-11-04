import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Environment from './Environment';
import Ground from './Ground';

function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={[0, 5, 15]}
          fov={60}
        />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
          target={[5, 0, 5]}
        />

        {/* Environment (Lighting + Fog) */}
        <Environment />

        {/* Ground Plane */}
        <Ground />

        {/* Placeholder for nodes - will be added in Phase 2 */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7B3FF2" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default Scene;
