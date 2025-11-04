import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 3D panel that appears in world space when interacting with nodes
 */
function WorldSpacePanel({ position, node, content, onClose, visible }) {
  if (!visible || !node) return null;

  return (
    <Html
      position={position}
      center
      distanceFactor={6}
      style={{
        pointerEvents: 'auto',
        width: '600px',
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(20, 20, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${node.color}40`,
              border: `2px solid ${node.color}`,
              color: '#fff',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: `2px solid ${node.color}40`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '48px' }}>{node.icon}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
                    {node.name}
                  </h2>
                  <p style={{
                    margin: '4px 0 0 0',
                    fontSize: '14px',
                    opacity: 0.7,
                    textTransform: 'uppercase',
                    color: node.color,
                  }}>
                    {node.type} node
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '24px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
              {content}
            </div>

            {/* Footer hint */}
            <div style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontSize: '12px',
              opacity: 0.6,
              textAlign: 'center',
            }}>
              Press ESC or click × to close • Move around to explore other nodes
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}

export default WorldSpacePanel;
