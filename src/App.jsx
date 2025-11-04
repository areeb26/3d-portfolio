import { useState } from 'react';
import Scene from './components/Scene';
import Modal from './components/ui/Modal';
import LoadingScreen from './components/ui/LoadingScreen';
import Navigation from './components/ui/Navigation';
import Instructions from './components/ui/Instructions';
import { renderModalContent } from './components/ui/ModalContent';
import { useNodeInteraction } from './hooks/useNodeInteraction';
import { useKeyboard } from './hooks/useKeyboard';
import portfolioData from './data/portfolio.json';
import './App.css';

function App() {
  const nodes = portfolioData.workflow.nodes;

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Node interaction management
  const {
    selectedNode,
    isModalOpen,
    handleNodeClick,
    closeModal,
    goToNextNode,
    goToPreviousNode,
    selectNode,
  } = useNodeInteraction(nodes);

  // Keyboard navigation
  useKeyboard({
    onNext: goToNextNode,
    onPrevious: goToPreviousNode,
    onEscape: () => {
      if (isNavOpen) setIsNavOpen(false);
      else closeModal();
    },
    enabled: !isModalOpen && !showInstructions,
  });

  // Handle load complete
  const handleLoadComplete = () => {
    setIsLoading(false);
    setShowInstructions(true);
  };

  // Handle navigation node select
  const handleNavNodeSelect = (nodeId) => {
    selectNode(nodeId);
    setIsNavOpen(false);
  };

  return (
    <div className="w-full h-full">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* Instructions Modal */}
      <Instructions
        isVisible={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      {/* Navigation Panel */}
      <Navigation
        nodes={nodes}
        selectedNodeId={selectedNode?.id}
        onNodeSelect={handleNavNodeSelect}
        isOpen={isNavOpen}
        onToggle={() => setIsNavOpen(!isNavOpen)}
      />

      {/* Quick Help Button */}
      <button
        onClick={() => setShowInstructions(true)}
        className="fixed bottom-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors border border-purple-500/30"
        aria-label="Show help"
        title="Show instructions"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Version Badge */}
      <div className="fixed bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
        Phase 5: Content & UI ✓
      </div>

      {/* Navigation Hint */}
      {!isModalOpen && !isNavOpen && !isLoading && !showInstructions && (
        <div className="fixed top-20 left-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs animate-pulse">
          <span className="text-gray-400">💡 Click any node to explore</span>
        </div>
      )}

      {/* 3D Scene */}
      <Scene onNodeClick={handleNodeClick} />

      {/* Content Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} node={selectedNode}>
        {selectedNode && renderModalContent(selectedNode)}
      </Modal>
    </div>
  );
}

export default App;
