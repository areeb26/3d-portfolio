/**
 * Shows interaction prompt when looking at a node
 */
function InteractionPrompt({ nodeName, nodeColor }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: `${nodeColor}dd`,
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          border: `2px solid ${nodeColor}`,
          animation: 'pulsePrompt 2s infinite',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '4px', fontSize: '14px', opacity: 0.9 }}>
          {nodeName}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          Press <kbd style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>E</kbd> to interact
        </div>
      </div>

      <style>{`
        @keyframes pulsePrompt {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default InteractionPrompt;
