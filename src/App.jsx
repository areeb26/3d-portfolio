import Scene from './components/Scene';
import './App.css';

function App() {
  return (
    <div className="w-full h-full">
      {/* Instructions Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
        <h2 className="text-lg font-bold mb-2 text-n8n-purple">3D Portfolio Workflow</h2>
        <p className="text-sm mb-2">Data Flow System Active!</p>
        <ul className="text-xs space-y-1">
          <li>• Drag to rotate camera</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Right-click drag to pan</li>
          <li>• Hover over nodes for effects</li>
          <li>• Watch data particles flow between nodes</li>
          <li>• Click nodes to interact (Phase 4)</li>
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
        Phase 3: Connections ✓
      </div>

      {/* 3D Scene */}
      <Scene />
    </div>
  );
}

export default App;
