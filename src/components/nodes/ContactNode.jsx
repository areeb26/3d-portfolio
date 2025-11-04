import NodeBase from './NodeBase';

function ContactNode({ position, onClick }) {
  return (
    <NodeBase
      position={position}
      color="#A855F7"
      icon="✉"
      name="Contact"
      type="output"
      onClick={onClick}
    />
  );
}

export default ContactNode;
