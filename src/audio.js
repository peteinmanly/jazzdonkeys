// Web Audio API Synthesizer for Band Previews

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.currentPlaying = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stopCurrent() {
    if (this.currentPlaying) {
      try {
        this.currentPlaying();
      } catch (e) {}
      this.currentPlaying = null;
    }
  }

  playBand(bandId) {
    this.init();
    this.stopCurrent();

    switch (bandId) {
      case 'jazz-donkeys':
        return this.playJazzDonkeys();
      case 'rock-pigeons':
        return this.playRockPigeons();
      case 'cormorants':
        return this.playCormorants();
      case 'disco-dolphins':
        return this.playDiscoDolphins();
      default:
        break;
    }
  }

  // 1. Jazz Donkeys: Funky brassy jazz progression
  playJazzDonkeys() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    let stopped = false;

    // Swing notes (jazz sax / organ chord sequence)
    // Dm7 -> G7 -> Cmaj7
    const notes = [
      { f: 293.66, t: 0.0, d: 0.35 }, // D4
      { f: 349.23, t: 0.18, d: 0.35 }, // F4
      { f: 440.00, t: 0.36, d: 0.4 }, // A4
      { f: 523.25, t: 0.6, d: 0.6 },  // C5
      { f: 392.00, t: 0.85, d: 0.4 }, // G4
      { f: 493.88, t: 1.1, d: 0.4 },  // B4
      { f: 587.33, t: 1.35, d: 0.5 }, // D5
      { f: 523.25, t: 1.7, d: 0.8 }   // C5 sustain
    ];

    const nodes = [];

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      // Warm brass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + note.t);
      filter.frequency.exponentialRampToValueAtTime(600, now + note.t + note.d);

      gain.gain.setValueAtTime(0, now + note.t);
      gain.gain.linearRampToValueAtTime(0.2, now + note.t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
      nodes.push(osc);
    });

    // Add a funky walking bass pulse
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'triangle';
    bass.frequency.setValueAtTime(146.83, now); // D3
    bass.frequency.setValueAtTime(164.81, now + 0.5); // E3
    bass.frequency.setValueAtTime(196.00, now + 1.0); // G3
    bass.frequency.setValueAtTime(130.81, now + 1.5); // C3

    bassGain.gain.setValueAtTime(0.3, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 2.5);
    nodes.push(bass);

    this.currentPlaying = () => {
      nodes.forEach(n => {
        try { n.stop(); } catch(e){}
      });
    };

    return 2600;
  }

  // 2. Rock Pigeons: Overdriven energetic rock power chord riff
  playRockPigeons() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const nodes = [];

    // Distortion curve
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    const k = 50;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }

    const distortion = ctx.createWaveShaper();
    distortion.curve = curve;
    distortion.oversample = '4x';

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, now);

    distortion.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Power chord riff: E5 -> G5 -> A5 -> E5
    const riff = [
      { roots: [164.81, 247.23], t: 0.0, d: 0.25 }, // E3 + B3
      { roots: [164.81, 247.23], t: 0.3, d: 0.2 },
      { roots: [196.00, 293.66], t: 0.55, d: 0.3 }, // G3 + D4
      { roots: [220.00, 329.63], t: 0.9, d: 0.45 }, // A3 + E4
      { roots: [164.81, 247.23], t: 1.45, d: 0.8 }  // E3 + B3 heavy sustain
    ];

    riff.forEach(chord => {
      chord.roots.forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + chord.t);

        gain.gain.setValueAtTime(0.18, now + chord.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + chord.t + chord.d);

        osc.connect(gain);
        gain.connect(distortion);

        osc.start(now + chord.t);
        osc.stop(now + chord.t + chord.d);
        nodes.push(osc);
      });
    });

    this.currentPlaying = () => {
      nodes.forEach(n => {
        try { n.stop(); } catch(e){}
      });
    };

    return 2400;
  }

  // 3. The Cormorants: Groovy island reggae-dub chords
  playCormorants() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const nodes = [];

    // Reggae skank on the "and": 1 & 2 & 3 & 4 &
    const chords = [
      { notes: [261.63, 329.63, 392.00], t: 0.25, d: 0.15 }, // C maj
      { notes: [261.63, 329.63, 392.00], t: 0.75, d: 0.15 },
      { notes: [220.00, 261.63, 329.63], t: 1.25, d: 0.15 }, // A min
      { notes: [246.94, 293.66, 369.99], t: 1.75, d: 0.25 }  // B min
    ];

    chords.forEach(c => {
      c.notes.forEach(freq => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + c.t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now + c.t);

        gain.gain.setValueAtTime(0.12, now + c.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + c.t + c.d);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + c.t);
        osc.stop(now + c.t + c.d);
        nodes.push(osc);
      });
    });

    // Island dub sub-bass
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(65.41, now); // C2
    bass.frequency.setValueAtTime(65.41, now + 0.5);
    bass.frequency.setValueAtTime(55.00, now + 1.0); // A1
    bass.frequency.setValueAtTime(61.74, now + 1.5); // B1

    bassGain.gain.setValueAtTime(0.35, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 2.2);

    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 2.3);
    nodes.push(bass);

    this.currentPlaying = () => {
      nodes.forEach(n => {
        try { n.stop(); } catch(e){}
      });
    };

    return 2500;
  }

  // 4. The Disco Dolphins: 80s neon synthwave arpeggio
  playDiscoDolphins() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const nodes = [];

    // Fast 16th note synth arpeggio
    const arpNotes = [
      440.00, 554.37, 659.25, 880.00, // A - C# - E - A
      587.33, 739.99, 880.00, 1174.66, // D - F# - A - D
      440.00, 554.37, 659.25, 880.00,
      392.00, 493.88, 587.33, 783.99   // G - B - D - G
    ];

    const noteLen = 0.12;

    arpNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const startTime = now + (idx * noteLen);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      // Resonant disco filter sweep
      filter.type = 'lowpass';
      filter.Q.value = 8;
      filter.frequency.setValueAtTime(2500, startTime);
      filter.frequency.exponentialRampToValueAtTime(800, startTime + noteLen);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteLen);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + noteLen);
      nodes.push(osc);
    });

    // 4-on-the-floor disco kick
    for (let beat = 0; beat < 4; beat++) {
      const kickTime = now + (beat * 0.48);
      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();

      kick.type = 'sine';
      kick.frequency.setValueAtTime(140, kickTime);
      kick.frequency.exponentialRampToValueAtTime(45, kickTime + 0.15);

      kickGain.gain.setValueAtTime(0.4, kickTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, kickTime + 0.18);

      kick.connect(kickGain);
      kickGain.connect(ctx.destination);

      kick.start(kickTime);
      kick.stop(kickTime + 0.2);
      nodes.push(kick);
    }

    this.currentPlaying = () => {
      nodes.forEach(n => {
        try { n.stop(); } catch(e){}
      });
    };

    return 2400;
  }
}

export const soundEngine = new SoundEngine();
