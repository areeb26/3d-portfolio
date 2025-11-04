/**
 * Crosshair for first-person aiming
 */
function Crosshair() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        {/* Center dot */}
        <circle
          cx="20"
          cy="20"
          r="2"
          fill="#fff"
          opacity="0.8"
        />

        {/* Crosshair lines */}
        <line
          x1="20"
          y1="8"
          x2="20"
          y2="14"
          stroke="#fff"
          strokeWidth="2"
          opacity="0.6"
        />
        <line
          x1="20"
          y1="26"
          x2="20"
          y2="32"
          stroke="#fff"
          strokeWidth="2"
          opacity="0.6"
        />
        <line
          x1="8"
          y1="20"
          x2="14"
          y2="20"
          stroke="#fff"
          strokeWidth="2"
          opacity="0.6"
        />
        <line
          x1="26"
          y1="20"
          x2="32"
          y2="20"
          stroke="#fff"
          strokeWidth="2"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export default Crosshair;
