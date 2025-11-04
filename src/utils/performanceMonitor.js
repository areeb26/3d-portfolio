/**
 * Performance Monitor for tracking FPS and performance metrics
 */

class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.maxHistoryLength = 60;
    this.isMonitoring = false;
    this.metrics = {
      avgFPS: 60,
      minFPS: 60,
      maxFPS: 60,
      memory: 0,
    };
  }

  /**
   * Start monitoring performance
   */
  start() {
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.updateLoop();
  }

  /**
   * Stop monitoring performance
   */
  stop() {
    this.isMonitoring = false;
  }

  /**
   * Update loop for monitoring
   */
  updateLoop() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const delta = currentTime - this.lastTime;

    this.frameCount++;

    // Update FPS every second
    if (delta >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / delta);
      this.fpsHistory.push(this.fps);

      if (this.fpsHistory.length > this.maxHistoryLength) {
        this.fpsHistory.shift();
      }

      // Update metrics
      this.updateMetrics();

      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(() => this.updateLoop());
  }

  /**
   * Update performance metrics
   */
  updateMetrics() {
    if (this.fpsHistory.length === 0) return;

    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    this.metrics.avgFPS = Math.round(sum / this.fpsHistory.length);
    this.metrics.minFPS = Math.min(...this.fpsHistory);
    this.metrics.maxFPS = Math.max(...this.fpsHistory);

    // Memory usage (if available)
    if (performance.memory) {
      this.metrics.memory = Math.round(
        performance.memory.usedJSHeapSize / 1048576
      ); // Convert to MB
    }
  }

  /**
   * Get current FPS
   */
  getFPS() {
    return this.fps;
  }

  /**
   * Get all metrics
   */
  getMetrics() {
    return { ...this.metrics, currentFPS: this.fps };
  }

  /**
   * Get performance rating (good, medium, low)
   */
  getPerformanceRating() {
    if (this.metrics.avgFPS >= 50) return 'good';
    if (this.metrics.avgFPS >= 30) return 'medium';
    return 'low';
  }

  /**
   * Log performance stats to console
   */
  logStats() {
    console.log('=== Performance Stats ===');
    console.log(`Current FPS: ${this.fps}`);
    console.log(`Average FPS: ${this.metrics.avgFPS}`);
    console.log(`Min FPS: ${this.metrics.minFPS}`);
    console.log(`Max FPS: ${this.metrics.maxFPS}`);
    if (this.metrics.memory > 0) {
      console.log(`Memory Usage: ${this.metrics.memory} MB`);
    }
    console.log(`Rating: ${this.getPerformanceRating()}`);
    console.log('========================');
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Hook for React components
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState(performanceMonitor.getMetrics());

  React.useEffect(() => {
    performanceMonitor.start();

    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
    }, 1000);

    return () => {
      clearInterval(interval);
      performanceMonitor.stop();
    };
  }, []);

  return metrics;
}
