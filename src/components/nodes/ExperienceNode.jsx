import NodeBase from './NodeBase';

function ExperienceNode({ position, onClick }) {
  return (
    <NodeBase
      position={position}
      color="#FFB800"
      icon="💼"
      name="Experience"
      type="loop"
      onClick={onClick}
    />
  );
}

export default ExperienceNode;
