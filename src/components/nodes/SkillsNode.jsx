import NodeBase from './NodeBase';

function SkillsNode({ position, onClick }) {
  return (
    <NodeBase
      position={position}
      color="#FF6D5A"
      icon="⚡"
      name="Skills & Tech"
      type="set"
      onClick={onClick}
    />
  );
}

export default SkillsNode;
