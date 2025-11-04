/**
 * Utility functions for calculating node positions in 3D space
 */

/**
 * Get node position from portfolio data
 * @param {Object} node - Node data from portfolio.json
 * @returns {Array} - [x, y, z] position array
 */
export function getNodePosition(node) {
  return node.position || [0, 0, 0];
}

/**
 * Calculate positions for all nodes in a workflow layout
 * @param {Array} nodes - Array of node objects
 * @returns {Object} - Object mapping node IDs to positions
 */
export function calculateNodePositions(nodes) {
  const positions = {};

  nodes.forEach((node) => {
    positions[node.id] = getNodePosition(node);
  });

  return positions;
}

/**
 * Get connection paths between nodes
 * @param {Object} node - Node with connections array
 * @param {Object} nodePositions - Map of node IDs to positions
 * @returns {Array} - Array of connection objects with start and end positions
 */
export function getNodeConnections(node, nodePositions) {
  if (!node.connections || node.connections.length === 0) {
    return [];
  }

  const connections = [];
  const startPos = nodePositions[node.id];

  node.connections.forEach((targetId) => {
    const endPos = nodePositions[targetId];
    if (startPos && endPos) {
      connections.push({
        from: node.id,
        to: targetId,
        start: startPos,
        end: endPos,
        color: node.color || '#7B3FF2'
      });
    }
  });

  return connections;
}

/**
 * Calculate all connections in the workflow
 * @param {Array} nodes - Array of all nodes
 * @param {Object} nodePositions - Map of node IDs to positions
 * @returns {Array} - Array of all connection objects
 */
export function calculateAllConnections(nodes, nodePositions) {
  const allConnections = [];

  nodes.forEach((node) => {
    const connections = getNodeConnections(node, nodePositions);
    allConnections.push(...connections);
  });

  return allConnections;
}

/**
 * Calculate camera target position based on active node
 * @param {Object} node - The node to focus on
 * @param {Number} distance - Distance from node
 * @returns {Array} - [x, y, z] camera position
 */
export function getCameraTarget(node, distance = 5) {
  const pos = getNodePosition(node);
  return [pos[0], pos[1] + 2, pos[2] + distance];
}
