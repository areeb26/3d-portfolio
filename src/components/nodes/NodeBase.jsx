import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function NodeBase({
  position = [0, 0, 0],
  color = '#7B3FF2',
  icon = '◆',
  name = 'Node',
  type = 'default',
  onClick,
  scale = 1
}) {
  const nodeRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Floating animation
  useFrame(({ clock }) => {
    if (nodeRef.current) {
      const time = clock.getElapsedTime();
      // Subtle floating motion
      nodeRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.1;

      // Gentle rotation on hover
      if (hovered) {
        nodeRef.current.rotation.y = Math.sin(time * 2) * 0.1;
      } else {
        nodeRef.current.rotation.y = THREE.MathUtils.lerp(nodeRef.current.rotation.y, 0, 0.1);
      }
    }

    // Glow pulsing
    if (glowRef.current) {
      const time = clock.getElapsedTime();
      const pulseIntensity = hovered ? 0.6 : 0.3;
      glowRef.current.material.opacity = pulseIntensity + Math.sin(time * 2) * 0.2;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    if (onClick) onClick();
  };

  return (
    <group ref={nodeRef} position={position}>
      {/* Glow effect */}
      <RoundedBox
        ref={glowRef}
        args={[2.2 * scale, 1.2 * scale, 0.3]}
        radius={0.2}
        smoothness={4}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* Main node body */}
      <RoundedBox
        args={[2 * scale, 1 * scale, 0.2]}
        radius={0.15}
        smoothness={4}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={clicked ? 0.95 : 1}
      >
        <meshStandardMaterial
          color={hovered ? color : '#1a1a1a'}
          metalness={0.6}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </RoundedBox>

      {/* Icon */}
      <Text
        position={[-0.6 * scale, 0, 0.15]}
        fontSize={0.4 * scale}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>

      {/* Node name */}
      <Text
        position={[0.3 * scale, 0, 0.15]}
        fontSize={0.2 * scale}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.2 * scale}
      >
        {name}
      </Text>

      {/* Hover indicator - small dot on right side */}
      {hovered && (
        <mesh position={[1.1 * scale, 0, 0.15]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
          />
        </mesh>
      )}

      {/* Particle effect on hover */}
      {hovered && (
        <>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 1.2 * scale;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <mesh key={i} position={[x, y, 0.2]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.6} />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
}

export default NodeBase;
