import NodeBase from './NodeBase';

function AboutNode({ position, onClick }) {
  return (
    <NodeBase
      position={position}
      color="#00C0FF"
      icon="👤"
      name="About Me"
      type="function"
      onClick={onClick}
    />
  );
}

export default AboutNode;
