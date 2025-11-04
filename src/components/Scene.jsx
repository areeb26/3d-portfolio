import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Environment from './Environment';
import Ground from './Ground';
import TriggerNode from './nodes/TriggerNode';
import AboutNode from './nodes/AboutNode';
import SkillsNode from './nodes/SkillsNode';
import ExperienceNode from './nodes/ExperienceNode';
import ProjectsNode from './nodes/ProjectsNode';
import ContactNode from './nodes/ContactNode';
import DataFlow from './connections/DataFlow';
import portfolioData from '../data/portfolio.json';

function Scene({ onNodeClick }) {
  const nodes = portfolioData.workflow.nodes;

  // Map node IDs to components
  const nodeComponents = {
    trigger: TriggerNode,
    about: AboutNode,
    skills: SkillsNode,
    experience: ExperienceNode,
    projects: ProjectsNode,
    contact: ContactNode
  };

  // Generate all connections from the nodes data
  const connections = useMemo(() => {
    const allConnections = [];

    nodes.forEach(node => {
      if (node.connections && node.connections.length > 0) {
        node.connections.forEach(targetId => {
          const targetNode = nodes.find(n => n.id === targetId);
          if (targetNode) {
            allConnections.push({
              id: `${node.id}-${targetId}`,
              from: node.id,
              to: targetId,
              start: node.position,
              end: targetNode.position,
              color: node.color,
            });
          }
        });
      }
    });

    return allConnections;
  }, [nodes]);

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
          position={[0, 8, 18]}
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
          target={[8, 0, 4]}
        />

        {/* Environment (Lighting + Fog) */}
        <Environment />

        {/* Ground Plane */}
        <Ground />

        {/* Render all connections with data flow */}
        {connections.map((connection) => (
          <DataFlow
            key={connection.id}
            start={connection.start}
            end={connection.end}
            color={connection.color}
            particleCount={3}
            speed={0.5}
          />
        ))}

        {/* Render all workflow nodes */}
        {nodes.map((node) => {
          const NodeComponent = nodeComponents[node.id];
          if (!NodeComponent) return null;

          return (
            <NodeComponent
              key={node.id}
              position={node.position}
              onClick={() => onNodeClick && onNodeClick(node.id)}
            />
          );
        })}
      </Canvas>
    </div>
  );
}

export default Scene;
