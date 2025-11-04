import NodeBase from './NodeBase';

function ProjectsNode({ position, onClick }) {
  return (
    <NodeBase
      position={position}
      color="#00E5A0"
      icon="🚀"
      name="Projects"
      type="split"
      onClick={onClick}
    />
  );
}

export default ProjectsNode;
