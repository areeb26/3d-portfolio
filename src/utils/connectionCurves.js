import * as THREE from 'three';

/**
 * Create a cubic Bezier curve between two points
 * @param {Array} start - [x, y, z] start position
 * @param {Array} end - [x, y, z] end position
 * @param {Number} curvature - How curved the line should be (0-1)
 * @returns {THREE.CubicBezierCurve3}
 */
export function createConnectionCurve(start, end, curvature = 0.5) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);

  // Calculate control points for the curve
  const distance = startVec.distanceTo(endVec);
  const midPoint = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5);

  // Offset the control points to create a smooth curve
  const offset = distance * curvature;

  // Control point 1: offset from start in the direction of end
  const control1 = new THREE.Vector3(
    startVec.x + (endVec.x - startVec.x) * 0.25,
    startVec.y + offset,
    startVec.z + (endVec.z - startVec.z) * 0.25
  );

  // Control point 2: offset from end in the direction of start
  const control2 = new THREE.Vector3(
    startVec.x + (endVec.x - startVec.x) * 0.75,
    endVec.y + offset,
    startVec.z + (endVec.z - startVec.z) * 0.75
  );

  return new THREE.CubicBezierCurve3(startVec, control1, control2, endVec);
}

/**
 * Get points along a curve for rendering
 * @param {THREE.CubicBezierCurve3} curve
 * @param {Number} segments - Number of segments
 * @returns {Array} Array of Vector3 points
 */
export function getCurvePoints(curve, segments = 50) {
  return curve.getPoints(segments);
}

/**
 * Get a point at a specific position along the curve (0-1)
 * @param {THREE.CubicBezierCurve3} curve
 * @param {Number} t - Position along curve (0-1)
 * @returns {THREE.Vector3}
 */
export function getPointOnCurve(curve, t) {
  return curve.getPoint(t);
}

/**
 * Get the tangent (direction) at a point on the curve
 * @param {THREE.CubicBezierCurve3} curve
 * @param {Number} t - Position along curve (0-1)
 * @returns {THREE.Vector3}
 */
export function getTangentOnCurve(curve, t) {
  return curve.getTangent(t);
}

/**
 * Create geometry from a curve
 * @param {THREE.CubicBezierCurve3} curve
 * @param {Number} segments
 * @returns {THREE.BufferGeometry}
 */
export function createCurveGeometry(curve, segments = 50) {
  const points = getCurvePoints(curve, segments);
  return new THREE.BufferGeometry().setFromPoints(points);
}
