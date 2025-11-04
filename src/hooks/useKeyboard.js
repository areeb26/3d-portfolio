import { useEffect } from 'react';

/**
 * Hook for keyboard navigation and controls
 * @param {Object} options - Configuration options
 * @param {Function} options.onNext - Called when user presses right/down arrow
 * @param {Function} options.onPrevious - Called when user presses left/up arrow
 * @param {Function} options.onEscape - Called when user presses ESC
 * @param {Function} options.onEnter - Called when user presses Enter
 * @param {Boolean} options.enabled - Whether keyboard controls are enabled
 */
export function useKeyboard({
  onNext,
  onPrevious,
  onEscape,
  onEnter,
  enabled = true
} = {}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // Prevent default for arrow keys and ESC
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          if (onNext) onNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          if (onPrevious) onPrevious();
          break;
        case 'Escape':
          if (onEscape) onEscape();
          break;
        case 'Enter':
          if (onEnter) onEnter();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrevious, onEscape, onEnter, enabled]);
}

/**
 * Hook for WASD camera controls
 * @param {Object} options - Configuration options
 * @param {Function} options.onMove - Called with direction ('forward', 'back', 'left', 'right')
 * @param {Boolean} options.enabled - Whether WASD controls are enabled
 */
export function useWASD({ onMove, enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      if (!onMove) return;

      switch (event.key.toLowerCase()) {
        case 'w':
          onMove('forward');
          break;
        case 's':
          onMove('back');
          break;
        case 'a':
          onMove('left');
          break;
        case 'd':
          onMove('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove, enabled]);
}
