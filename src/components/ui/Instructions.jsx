import { motion, AnimatePresence } from 'framer-motion';

function Instructions({ isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Instructions modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 pointer-events-auto border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-6xl mb-4"
                >
                  🚀
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome to the 3D Portfolio!
                </h2>
                <p className="text-purple-300">
                  Navigate through an interactive n8n workflow to explore my work
                </p>
              </div>

              {/* Controls grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Mouse controls */}
                <div className="bg-black/30 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span>🖱️</span>
                    Mouse Controls
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span><strong>Left click + drag:</strong> Rotate camera</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span><strong>Right click + drag:</strong> Pan view</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span><strong>Scroll wheel:</strong> Zoom in/out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span><strong>Click nodes:</strong> Open details</span>
                    </li>
                  </ul>
                </div>

                {/* Keyboard controls */}
                <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span>⌨️</span>
                    Keyboard Controls
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span><strong>← →</strong> Navigate between nodes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span><strong>ESC:</strong> Close modal/menu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span><strong>Enter:</strong> Select highlighted node</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Features */}
              <div className="bg-black/30 p-4 rounded-lg border border-pink-500/20 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span>✨</span>
                  Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Interactive 3D workflow nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Animated data flow particles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Keyboard navigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Detailed content modals</span>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg"
                >
                  Start Exploring 🎯
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Instructions;
