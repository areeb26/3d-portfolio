import { useState, useEffect } from 'react';
import ImmersiveScene from './components/ImmersiveScene';
import LoadingScreen from './components/ui/LoadingScreen';
import Instructions from './components/ui/Instructions';
import { audioManager } from './utils/audioManager';
import { analytics } from './utils/analytics';
import './App.css';

function App() {
  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize systems
  useEffect(() => {
    analytics.init('console', { debug: true });
    audioManager.play('whoosh');
  }, []);

  // Handle load complete
  const handleLoadComplete = () => {
    setIsLoading(false);
    setShowInstructions(true);
    audioManager.play('success');
    analytics.trackEvent('app_loaded');
  };

  // Handle node interaction
  const handleNodeInteract = (node) => {
    setSelectedNode(node);
    audioManager.play('open');
    analytics.trackModalOpen(node.id);
  };

  // Close panel
  const closePanel = () => {
    setSelectedNode(null);
    audioManager.play('close');
  };

  // Toggle sound
  const toggleSound = () => {
    const newState = audioManager.toggle();
    setSoundEnabled(newState);
    if (newState) audioManager.play('success');
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

      {/* Help Button */}
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

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className="fixed bottom-16 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors border border-purple-500/30 hover:scale-110"
        aria-label="Toggle sound"
        title="Toggle sound"
      >
        <span className="text-lg">{soundEnabled ? '🔊' : '🔇'}</span>
      </button>

      {/* Version Badge */}
      <div className="fixed bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
        Immersive n8n Portfolio
      </div>

      {/* First-time hint */}
      {!isLoading && !showInstructions && (
        <div className="fixed top-4 left-4 z-10 bg-purple-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm max-w-md animate-pulse">
          <div className="font-bold mb-1">🎮 First-Person Mode Active</div>
          <div className="text-xs opacity-90">
            • Click to start • WASD to move • Mouse to look • E to interact
          </div>
        </div>
      )}

      {/* Immersive 3D Scene */}
      <ImmersiveScene
        onNodeInteract={handleNodeInteract}
        selectedNode={selectedNode}
        onClosePanel={closePanel}
      />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default App;
