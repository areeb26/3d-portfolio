import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for auto-tour mode with camera flythrough
 * @param {Array} nodes - Array of portfolio nodes
 * @param {Function} onNodeChange - Callback when tour moves to a new node
 * @returns {Object} - Tour state and controls
 */
export function useAutoTour(nodes, onNodeChange) {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Tour duration per node in milliseconds
  const TOUR_DURATION = 5000;

  // Start the tour
  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentIndex(0);
    setIsPaused(false);
    if (onNodeChange && nodes.length > 0) {
      onNodeChange(nodes[0].id);
    }
  }, [nodes, onNodeChange]);

  // Stop the tour
  const stopTour = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentIndex(0);
  }, []);

  // Pause/resume the tour
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Go to next node
  const nextNode = useCallback(() => {
    setCurrentIndex(prev => {
      const next = (prev + 1) % nodes.length;
      if (onNodeChange) {
        onNodeChange(nodes[next].id);
      }
      return next;
    });
  }, [nodes, onNodeChange]);

  // Go to previous node
  const previousNode = useCallback(() => {
    setCurrentIndex(prev => {
      const previous = prev === 0 ? nodes.length - 1 : prev - 1;
      if (onNodeChange) {
        onNodeChange(nodes[previous].id);
      }
      return previous;
    });
  }, [nodes, onNodeChange]);

  // Auto-advance through nodes
  useEffect(() => {
    if (!isActive || isPaused || nodes.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % nodes.length;
        if (onNodeChange) {
          onNodeChange(nodes[next].id);
        }
        // Stop tour after completing one full cycle
        if (next === 0) {
          setIsActive(false);
        }
        return next;
      });
    }, TOUR_DURATION);

    return () => clearInterval(timer);
  }, [isActive, isPaused, nodes, onNodeChange]);

  return {
    isActive,
    isPaused,
    currentIndex,
    currentNode: nodes[currentIndex],
    progress: ((currentIndex + 1) / nodes.length) * 100,
    startTour,
    stopTour,
    togglePause,
    nextNode,
    previousNode,
  };
}
