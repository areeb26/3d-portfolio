import Scene from './components/Scene';
import Modal from './components/ui/Modal';
import { renderModalContent } from './components/ui/ModalContent';
import { useNodeInteraction } from './hooks/useNodeInteraction';
import { useKeyboard } from './hooks/useKeyboard';
import portfolioData from './data/portfolio.json';
import './App.css';

function App() {
  const nodes = portfolioData.workflow.nodes;

  // Node interaction management
  const {
    selectedNode,
    isModalOpen,
    handleNodeClick,
    closeModal,
    goToNextNode,
    goToPreviousNode,
  } = useNodeInteraction(nodes);

  // Keyboard navigation
  useKeyboard({
    onNext: goToNextNode,
    onPrevious: goToPreviousNode,
    onEscape: closeModal,
    enabled: !isModalOpen, // Disable when modal is open (modal handles ESC itself)
  });

  return (
    <div className="w-full h-full">
      {/* Instructions Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
        <h2 className="text-lg font-bold mb-2 text-n8n-purple">3D Portfolio Workflow</h2>
        <p className="text-sm mb-2">Fully Interactive!</p>
        <ul className="text-xs space-y-1">
          <li>• Click nodes to view details</li>
          <li>• Arrow keys to navigate nodes</li>
          <li>• ESC to close modal</li>
          <li>• Drag to rotate camera</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Right-click drag to pan</li>
        </ul>
        <div className="mt-3 text-xs text-gray-400">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-3 h-3 bg-n8n-purple rounded"></span>
            <span>Trigger Node</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-3 h-3 bg-[#00C0FF] rounded"></span>
            <span>Function Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-[#A855F7] rounded"></span>
            <span>Output Node</span>
          </div>
        </div>
      </div>

      {/* Version Badge */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
        Phase 4: Interactions ✓
      </div>

      {/* Navigation Hint */}
      {!isModalOpen && (
        <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
          <span className="text-gray-400">Tip: Use ← → arrow keys to navigate</span>
        </div>
      )}

      {/* 3D Scene */}
      <Scene onNodeClick={handleNodeClick} />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} node={selectedNode}>
        {selectedNode && renderModalContent(selectedNode)}
      </Modal>
    </div>
  );
}

export default App;
