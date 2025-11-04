import NodeBase from './NodeBase';

function TriggerNode({ position, onClick }) {
  return (
    <NodeBase
      position={position}
      color="#7B3FF2"
      icon="▶"
      name="Welcome"
      type="trigger"
      onClick={onClick}
      scale={1.2}
    />
  );
}

export default TriggerNode;
