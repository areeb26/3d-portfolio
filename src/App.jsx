import { useState, useEffect } from 'react';
import Scene from './components/Scene';
import Modal from './components/ui/Modal';
import LoadingScreen from './components/ui/LoadingScreen';
import Navigation from './components/ui/Navigation';
import Instructions from './components/ui/Instructions';
import { renderModalContent } from './components/ui/ModalContent';
import { useNodeInteraction } from './hooks/useNodeInteraction';
import { useKeyboard } from './hooks/useKeyboard';
import { useAutoTour } from './hooks/useAutoTour';
import { audioManager } from './utils/audioManager';
import { analytics } from './utils/analytics';
import { performanceMonitor } from './utils/performanceMonitor';
import portfolioData from './data/portfolio.json';
import './App.css';

function App() {
  const nodes = portfolioData.workflow.nodes;

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showControls, setShowControls] = useState(false);

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

  // Auto-tour mode
  const {
    isActive: isTourActive,
    isPaused: isTourPaused,
    progress: tourProgress,
    startTour,
    stopTour,
    togglePause,
  } = useAutoTour(nodes, (nodeId) => {
    selectNode(nodeId);
    audioManager.play('navigate');
    analytics.trackNavigation('auto-tour', nodeId);
  });

  // Initialize systems
  useEffect(() => {
    analytics.init('console', { debug: true });
    performanceMonitor.start();
    audioManager.play('whoosh');

    return () => {
      performanceMonitor.stop();
    };
  }, []);

  // Keyboard navigation
  useKeyboard({
    onNext: () => {
      goToNextNode();
      audioManager.play('navigate');
    },
    onPrevious: () => {
      goToPreviousNode();
      audioManager.play('navigate');
    },
    onEscape: () => {
      if (isNavOpen) setIsNavOpen(false);
      else closeModal();
      audioManager.play('close');
    },
    enabled: !isModalOpen && !showInstructions && !isTourActive,
  });

  // Handle load complete
  const handleLoadComplete = () => {
    setIsLoading(false);
    setShowInstructions(true);
    audioManager.play('success');
    analytics.trackEvent('app_loaded');
  };

  // Handle navigation node select
  const handleNavNodeSelect = (nodeId) => {
    selectNode(nodeId);
    setIsNavOpen(false);
    audioManager.play('click');
    analytics.trackNodeClick(nodeId, nodes.find(n => n.id === nodeId)?.name);
  };

  // Handle node click with sound
  const handleNodeClickWithSound = (nodeId) => {
    handleNodeClick(nodeId);
    audioManager.play('open');
    analytics.trackModalOpen(nodeId);
  };

  // Toggle sound
  const toggleSound = () => {
    const newState = audioManager.toggle();
    setSoundEnabled(newState);
    analytics.trackSoundToggle(newState);
    if (newState) audioManager.play('success');
  };

  // Handle tour start
  const handleTourStart = () => {
    startTour();
    audioManager.play('whoosh');
    analytics.trackTourStart();
  };

  return (
    <div className="w-full h-full">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* Instructions Modal */}
      <Instructions
        isVisible={showInstructions}
        onClose={() => {
          setShowInstructions(false);
          audioManager.play('close');
        }}
      />

      {/* Navigation Panel */}
      <Navigation
        nodes={nodes}
        selectedNodeId={selectedNode?.id}
        onNodeSelect={handleNavNodeSelect}
        isOpen={isNavOpen}
        onToggle={() => {
          setIsNavOpen(!isNavOpen);
          audioManager.play(isNavOpen ? 'close' : 'open');
        }}
      />

      {/* Quick Help Button */}
      <button
        onClick={() => {
          setShowInstructions(true);
          audioManager.play('click');
        }}
        className="fixed bottom-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors border border-purple-500/30 hover:scale-110"
        aria-label="Show help"
        title="Show instructions"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Controls Toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-16 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors border border-purple-500/30 hover:scale-110"
        aria-label="Toggle controls"
        title="Toggle controls"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {/* Control Panel */}
      {showControls && (
        <div className="fixed bottom-28 left-4 z-10 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg border border-purple-500/30 space-y-3 w-48">
          <h3 className="text-sm font-bold mb-2">Controls</h3>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            <span className="text-xs">Sound</span>
            <span className="text-lg">{soundEnabled ? '🔊' : '🔇'}</span>
          </button>

          {/* Auto Tour */}
          <button
            onClick={isTourActive ? stopTour : handleTourStart}
            className="w-full flex items-center justify-between px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
          >
            <span className="text-xs">{isTourActive ? 'Stop Tour' : 'Auto Tour'}</span>
            <span className="text-lg">{isTourActive ? '⏸' : '▶'}</span>
          </button>

          {isTourActive && (
            <div className="px-3 py-2 bg-gray-800 rounded">
              <div className="text-xs text-gray-400 mb-1">Progress</div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${tourProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Easter Egg Hint */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-700">
            Try pressing "K" for Konami mode 🎮
          </div>
        </div>
      )}

      {/* Version Badge */}
      <div className="fixed bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
        Phase 6: Polish ✓
      </div>

      {/* Tour Active Indicator */}
      {isTourActive && (
        <div className="fixed top-4 right-4 z-10 bg-purple-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 animate-pulse">
          <span>🎬</span>
          <span>Auto Tour Active</span>
        </div>
      )}

      {/* Navigation Hint */}
      {!isModalOpen && !isNavOpen && !isLoading && !showInstructions && !isTourActive && (
        <div className="fixed top-20 left-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs animate-pulse">
          <span className="text-gray-400">💡 Click any node to explore</span>
        </div>
      )}

      {/* 3D Scene */}
      <Scene onNodeClick={handleNodeClickWithSound} />

      {/* Content Modal */}
      <Modal isOpen={isModalOpen} onClose={() => {
        closeModal();
        audioManager.play('close');
      }} node={selectedNode}>
        {selectedNode && renderModalContent(selectedNode)}
      </Modal>
    </div>
  );
}

export default App;
