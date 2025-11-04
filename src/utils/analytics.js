/**
 * Analytics Manager for tracking user interactions
 *
 * Supports Google Analytics, Plausible, and custom analytics platforms
 *
 * Usage:
 * import { analytics } from './utils/analytics';
 * analytics.trackEvent('node_click', { nodeId: 'about' });
 */

class Analytics {
  constructor() {
    this.enabled = true;
    this.platform = 'console'; // 'ga4', 'plausible', 'console'
    this.debugMode = true;
  }

  /**
   * Initialize analytics platform
   */
  init(platform = 'console', options = {}) {
    this.platform = platform;
    this.debugMode = options.debug || false;

    if (this.debugMode) {
      console.log(`Analytics initialized: ${platform}`);
    }

    // Initialize platform-specific code
    switch (platform) {
      case 'ga4':
        this.initGA4(options.measurementId);
        break;
      case 'plausible':
        this.initPlausible(options.domain);
        break;
      default:
        break;
    }
  }

  /**
   * Initialize Google Analytics 4
   */
  initGA4(measurementId) {
    if (!measurementId) {
      console.warn('GA4 measurement ID not provided');
      return;
    }

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    if (this.debugMode) {
      console.log('GA4 initialized');
    }
  }

  /**
   * Initialize Plausible Analytics
   */
  initPlausible(domain) {
    if (!domain) {
      console.warn('Plausible domain not provided');
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = domain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);

    if (this.debugMode) {
      console.log('Plausible initialized');
    }
  }

  /**
   * Track page view
   */
  trackPageView(path) {
    if (!this.enabled) return;

    if (this.debugMode) {
      console.log('📊 Page View:', path);
    }

    switch (this.platform) {
      case 'ga4':
        if (window.gtag) {
          window.gtag('event', 'page_view', { page_path: path });
        }
        break;
      case 'plausible':
        if (window.plausible) {
          window.plausible('pageview');
        }
        break;
      default:
        break;
    }
  }

  /**
   * Track custom event
   */
  trackEvent(eventName, properties = {}) {
    if (!this.enabled) return;

    if (this.debugMode) {
      console.log('📊 Event:', eventName, properties);
    }

    switch (this.platform) {
      case 'ga4':
        if (window.gtag) {
          window.gtag('event', eventName, properties);
        }
        break;
      case 'plausible':
        if (window.plausible) {
          window.plausible(eventName, { props: properties });
        }
        break;
      default:
        break;
    }
  }

  /**
   * Track node interaction
   */
  trackNodeClick(nodeId, nodeName) {
    this.trackEvent('node_click', {
      node_id: nodeId,
      node_name: nodeName,
    });
  }

  /**
   * Track modal open
   */
  trackModalOpen(nodeId) {
    this.trackEvent('modal_open', {
      node_id: nodeId,
    });
  }

  /**
   * Track navigation
   */
  trackNavigation(from, to) {
    this.trackEvent('navigation', {
      from_node: from,
      to_node: to,
    });
  }

  /**
   * Track tour start
   */
  trackTourStart() {
    this.trackEvent('tour_start');
  }

  /**
   * Track tour complete
   */
  trackTourComplete(duration) {
    this.trackEvent('tour_complete', {
      duration_seconds: duration,
    });
  }

  /**
   * Track sound toggle
   */
  trackSoundToggle(enabled) {
    this.trackEvent('sound_toggle', {
      enabled: enabled,
    });
  }

  /**
   * Track session duration
   */
  trackSessionDuration() {
    const duration = Math.floor((Date.now() - this.sessionStart) / 1000);
    this.trackEvent('session_duration', {
      duration_seconds: duration,
    });
  }

  /**
   * Enable analytics
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable analytics
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Toggle analytics
   */
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Hook for React components
export function useAnalytics() {
  React.useEffect(() => {
    // Initialize analytics on mount
    analytics.init('console', { debug: true });

    // Track session start
    analytics.sessionStart = Date.now();

    // Track session end on unmount
    return () => {
      analytics.trackSessionDuration();
    };
  }, []);

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackNodeClick: analytics.trackNodeClick.bind(analytics),
    trackModalOpen: analytics.trackModalOpen.bind(analytics),
    trackNavigation: analytics.trackNavigation.bind(analytics),
  };
}
