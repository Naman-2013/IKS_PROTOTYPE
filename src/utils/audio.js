// Web Audio API ambient wind synthesizer
class WindAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.gainNode = null;
    this.isPlaying = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Create pink/white noise buffer for natural atmospheric wind
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // scale down
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Resonant Lowpass filter to simulate wind resonance & gusts
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // Master Gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.noiseNode.start(0);
    this.isPlaying = true;
  }

  update(windSpeed, isSimulating, isMuted) {
    if (isMuted || !isSimulating || windSpeed <= 0) {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.2);
      }
      return;
    }

    if (!this.ctx) {
      return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Dynamic frequency cutoff: 180Hz (idle breeze) to 1200Hz (storm gale)
    const targetFreq = 180 + (windSpeed / 100) * 1100;
    // Volume scales with wind speed
    const targetGain = Math.min(0.22, (windSpeed / 100) * 0.18 + 0.02);

    this.filterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.15);
    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.15);
  }
}

export const windAudio = new WindAudioSynthesizer();
