import Scene from './components/Scene';
import './App.css';

function App() {
  return (
    <div className="w-full h-full">
      {/* Instructions Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
        <h2 className="text-lg font-bold mb-2 text-n8n-purple">3D Portfolio - Phase 1</h2>
        <p className="text-sm mb-2">Foundation Setup Complete!</p>
        <ul className="text-xs space-y-1">
          <li>• Drag to rotate camera</li>
          <li>• Scroll to zoom</li>
          <li>• Right-click drag to pan</li>
        </ul>
        <div className="mt-3 text-xs text-gray-400">
          <span className="inline-block w-3 h-3 bg-n8n-purple rounded mr-2"></span>
          Grid lines show workflow layout
        </div>
      </div>

      {/* Version Badge */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
        Phase 1: Foundation ✓
      </div>

      {/* 3D Scene */}
      <Scene />
    </div>
  );
}

export default App;
