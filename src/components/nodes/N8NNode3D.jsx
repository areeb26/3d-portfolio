import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Real n8n-style node in 3D space
 * Looks exactly like n8n nodes but rendered in 3D
 */
function N8NNode3D({ position, node, onInteract, isInView }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Gentle floating animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.05;

      if (hovered || isInView) {
        meshRef.current.rotation.y = Math.sin(time * 2) * 0.05;
      }
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Glow effect when in view */}
      {isInView && (
        <pointLight
          color={node.color}
          intensity={0.5}
          distance={5}
          decay={2}
        />
      )}

      {/* Main node body - n8n style rounded rectangle */}
      <RoundedBox
        args={[3, 1.5, 0.3]}
        radius={0.15}
        smoothness={4}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onInteract && onInteract(node)}
      >
        <meshStandardMaterial
          color={isInView || hovered ? node.color : '#2a2a2a'}
          metalness={0.4}
          roughness={0.6}
          emissive={node.color}
          emissiveIntensity={isInView || hovered ? 0.4 : 0.1}
        />
      </RoundedBox>

      {/* Node icon */}
      <Text
        position={[-1, 0, 0.2]}
        fontSize={0.6}
        color={isInView || hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        {node.icon}
      </Text>

      {/* Node name */}
      <Text
        position={[0.3, 0, 0.2]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        maxWidth={2}
      >
        {node.name}
      </Text>

      {/* Node type badge */}
      <mesh position={[1.3, -0.5, 0.2]}>
        <planeGeometry args={[0.8, 0.25]} />
        <meshBasicMaterial color={node.color} opacity={0.3} transparent />
      </mesh>
      <Text
        position={[1.3, -0.5, 0.25]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {node.type.toUpperCase()}
      </Text>

      {/* Interaction indicator when in view */}
      {isInView && (
        <Html
          position={[0, 1.2, 0]}
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{
            background: node.color,
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'bounce 2s infinite',
          }}>
            Press E to interact
          </div>
        </Html>
      )}

      {/* Connection points */}
      <mesh position={[1.6, 0, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export default N8NNode3D;
