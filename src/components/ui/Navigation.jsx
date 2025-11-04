import { motion } from 'framer-motion';

function Navigation({ nodes, selectedNodeId, onNodeSelect, isOpen, onToggle }) {
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-30 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/80 transition-colors border border-purple-500/30"
        aria-label="Toggle navigation"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </button>

      {/* Navigation panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md border-l border-purple-500/30 z-20 overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Workflow Navigation
            </h3>
            <p className="text-sm text-gray-400">
              Jump to any node in the portfolio
            </p>
          </div>

          {/* Node list */}
          <div className="space-y-3">
            {nodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNodeSelect(node.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Node number */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isSelected
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Node info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{node.icon}</span>
                        <span className="font-semibold text-white">
                          {node.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: node.color }}
                        />
                        <span className="text-xs text-gray-400 uppercase">
                          {node.type}
                        </span>
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-purple-400"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mini-map */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="text-sm font-semibold text-white mb-3">
              Workflow Map
            </h4>
            <div className="relative h-32">
              {/* Simplified 2D representation */}
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full"
              >
                {/* Connections */}
                {nodes.map((node, i) => {
                  if (!node.connections || node.connections.length === 0)
                    return null;
                  return node.connections.map((targetId, j) => {
                    const targetIndex = nodes.findIndex(
                      (n) => n.id === targetId
                    );
                    if (targetIndex === -1) return null;

                    const x1 = (i / (nodes.length - 1)) * 180 + 10;
                    const x2 =
                      (targetIndex / (nodes.length - 1)) * 180 + 10;
                    const y1 = 50;
                    const y2 = 50;

                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={node.color}
                        strokeWidth="2"
                        opacity="0.3"
                      />
                    );
                  });
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                  const x = (i / (nodes.length - 1)) * 180 + 10;
                  const y = 50;
                  const isSelected = node.id === selectedNodeId;

                  return (
                    <g key={node.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 8 : 6}
                        fill={node.color}
                        opacity={isSelected ? 1 : 0.6}
                      />
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r={12}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="2"
                          opacity="0.5"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-10"
        />
      )}
    </>
  );
}

export default Navigation;
