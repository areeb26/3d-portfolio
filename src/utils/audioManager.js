/**
 * Audio Manager for handling sound effects
 *
 * Usage:
 * import { audioManager } from './utils/audioManager';
 * audioManager.play('click');
 */

class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.3;

    // Initialize with Web Audio API tone generation
    this.audioContext = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  /**
   * Generate a tone using Web Audio API
   */
  playTone(frequency, duration = 0.1, type = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  /**
   * Play predefined sound effects
   */
  play(soundName) {
    if (!this.enabled) return;

    switch (soundName) {
      case 'hover':
        this.playTone(800, 0.05, 'sine');
        break;
      case 'click':
        this.playTone(1200, 0.1, 'sine');
        break;
      case 'open':
        this.playTone(600, 0.15, 'sine');
        setTimeout(() => this.playTone(900, 0.15, 'sine'), 50);
        break;
      case 'close':
        this.playTone(900, 0.15, 'sine');
        setTimeout(() => this.playTone(600, 0.15, 'sine'), 50);
        break;
      case 'navigate':
        this.playTone(1000, 0.08, 'triangle');
        break;
      case 'success':
        this.playTone(800, 0.1, 'sine');
        setTimeout(() => this.playTone(1000, 0.1, 'sine'), 100);
        setTimeout(() => this.playTone(1200, 0.15, 'sine'), 200);
        break;
      case 'whoosh':
        // Sweep from high to low
        if (this.audioContext) {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);

          oscillator.frequency.setValueAtTime(1500, this.audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            300,
            this.audioContext.currentTime + 0.3
          );

          gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            this.audioContext.currentTime + 0.3
          );

          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.3);
        }
        break;
      default:
        console.warn(`Sound "${soundName}" not found`);
    }
  }

  /**
   * Enable sound effects
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable sound effects
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Toggle sound effects
   */
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  /**
   * Set volume (0-1)
   */
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
  }

  /**
   * Get current enabled state
   */
  isEnabled() {
    return this.enabled;
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
