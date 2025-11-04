import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Environment as DreiEnvironment } from '@react-three/drei';
import FirstPersonControls from './FirstPersonControls';
import N8NNode3D from './nodes/N8NNode3D';
import Connection3D from './connections/Connection3D';
import WorldSpacePanel from './ui/WorldSpacePanel';
import { renderModalContent } from './ui/ModalContent';
import Ground from './Ground';
import Environment from './Environment';
import Crosshair from './ui/Crosshair';
import InteractionPrompt from './ui/InteractionPrompt';
import portfolioData from '../data/portfolio.json';
import * as THREE from 'three';

function ImmersiveScene({ onNodeInteract, selectedNode, onClosePanel }) {
  const nodes = portfolioData.workflow.nodes;
  const [lookedAtNode, setLookedAtNode] = useState(null);
  const cameraRef = useRef();

  // Position nodes in a circular layout for better spatial distribution
  const positionedNodes = useMemo(() => {
    return nodes.map((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2;
      const radius = 15;
      return {
        ...node,
        position: [
          Math.cos(angle) * radius,
          2,
          Math.sin(angle) * radius
        ]
      };
    });
  }, [nodes]);

  // Generate connections
  const connections = useMemo(() => {
    const allConnections = [];
    positionedNodes.forEach(node => {
      if (node.connections && node.connections.length > 0) {
        node.connections.forEach(targetId => {
          const targetNode = positionedNodes.find(n => n.id === targetId);
          if (targetNode) {
            allConnections.push({
              id: `${node.id}-${targetId}`,
              start: node.position,
              end: targetNode.position,
              color: node.color,
            });
          }
        });
      }
    });
    return allConnections;
  }, [positionedNodes]);

  // Raycast to detect which node player is looking at
  const handleCameraUpdate = (camera) => {
    if (!camera) return;

    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    raycaster.set(camera.position, direction);

    // Check intersection with nodes
    let closestNode = null;
    let closestDistance = Infinity;

    positionedNodes.forEach(node => {
      const nodePos = new THREE.Vector3(...node.position);
      const distance = camera.position.distanceTo(nodePos);

      // Only check nodes within reasonable distance
      if (distance < 10) {
        // Check if looking at node
        const dirToNode = new THREE.Vector3().subVectors(nodePos, camera.position).normalize();
        const angle = direction.angleTo(dirToNode);

        // If within ~30 degree cone and closer than current closest
        if (angle < 0.5 && distance < closestDistance) {
          closestNode = node;
          closestDistance = distance;
        }
      }
    });

    setLookedAtNode(closestNode);
  };

  // Handle E key interaction
  const handleInteract = () => {
    if (lookedAtNode && onNodeInteract) {
      onNodeInteract(lookedAtNode);
    }
  };

  // Handle ESC key to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape' && selectedNode) {
        onClosePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, onClosePanel]);

  // Find positioned version of selected node
  const positionedSelectedNode = selectedNode ?
    positionedNodes.find(n => n.id === selectedNode.id) : null;

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 10], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
      >
        {/* Sky */}
        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.6}
          azimuth={0.25}
          turbidity={8}
          rayleigh={2}
        />

        {/* Lighting */}
        <Environment />
        <DreiEnvironment preset="sunset" />

        {/* Ground */}
        <Ground />

        {/* First Person Controls */}
        <FirstPersonControls
          onCameraUpdate={handleCameraUpdate}
          onInteract={handleInteract}
        />

        {/* Render all nodes */}
        {positionedNodes.map((node) => (
          <N8NNode3D
            key={node.id}
            position={node.position}
            node={node}
            isInView={lookedAtNode?.id === node.id}
          />
        ))}

        {/* Render connections */}
        {connections.map((connection) => (
          <Connection3D
            key={connection.id}
            start={connection.start}
            end={connection.end}
            color={connection.color}
          />
        ))}

        {/* World Space Panel */}
        {positionedSelectedNode && (
          <WorldSpacePanel
            position={[
              positionedSelectedNode.position[0],
              positionedSelectedNode.position[1] + 2,
              positionedSelectedNode.position[2]
            ]}
            node={positionedSelectedNode}
            content={renderModalContent(positionedSelectedNode)}
            onClose={onClosePanel}
            visible={!!positionedSelectedNode}
          />
        )}

        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#1a1a2e', 20, 80]} />
      </Canvas>

      {/* UI Overlays */}
      <Crosshair />
      {lookedAtNode && !selectedNode && (
        <InteractionPrompt
          nodeName={lookedAtNode.name}
          nodeColor={lookedAtNode.color}
        />
      )}
    </>
  );
}

export default ImmersiveScene;
