import { useState, useCallback } from 'react';

/**
 * Hook for managing node interactions and navigation
 * @param {Array} nodes - Array of all nodes
 * @returns {Object} - Interaction state and methods
 */
export function useNodeInteraction(nodes) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the currently selected node
  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  // Handle node click
  const handleNodeClick = useCallback((nodeId) => {
    setSelectedNodeId(nodeId);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Navigate to next node
  const goToNextNode = useCallback(() => {
    if (!selectedNodeId) {
      // If no node selected, select the first one
      if (nodes.length > 0) {
        setSelectedNodeId(nodes[0].id);
        setIsModalOpen(true);
      }
      return;
    }

    const currentIndex = nodes.findIndex(node => node.id === selectedNodeId);
    const nextIndex = (currentIndex + 1) % nodes.length;
    setSelectedNodeId(nodes[nextIndex].id);
    setIsModalOpen(true);
  }, [selectedNodeId, nodes]);

  // Navigate to previous node
  const goToPreviousNode = useCallback(() => {
    if (!selectedNodeId) {
      // If no node selected, select the last one
      if (nodes.length > 0) {
        setSelectedNodeId(nodes[nodes.length - 1].id);
        setIsModalOpen(true);
      }
      return;
    }

    const currentIndex = nodes.findIndex(node => node.id === selectedNodeId);
    const previousIndex = currentIndex === 0 ? nodes.length - 1 : currentIndex - 1;
    setSelectedNodeId(nodes[previousIndex].id);
    setIsModalOpen(true);
  }, [selectedNodeId, nodes]);

  // Select a specific node by ID
  const selectNode = useCallback((nodeId) => {
    setSelectedNodeId(nodeId);
    setIsModalOpen(true);
  }, []);

  return {
    selectedNodeId,
    selectedNode,
    isModalOpen,
    handleNodeClick,
    closeModal,
    goToNextNode,
    goToPreviousNode,
    selectNode,
  };
}
