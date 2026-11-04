// Web Audio API Synthesizer for tactile analog photography sounds

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Camera Shutter + Mirror Flap Sound
 */
export function playShutterSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Initial metallic shutter release click
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(800, now);
  osc1.frequency.exponentialRampToValueAtTime(120, now + 0.04);
  gain1.gain.setValueAtTime(0.5, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.06);

  // 2. White noise mechanical shutter curtain swipe
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1600, now + 0.03);
  filter.Q.setValueAtTime(3, now + 0.03);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.01, now);
  noiseGain.gain.setValueAtTime(0.4, now + 0.03);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  whiteNoise.start(now + 0.02);
  whiteNoise.stop(now + 0.14);

  // 3. Secondary mirror return snap
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(320, now + 0.1);
  osc2.frequency.exponentialRampToValueAtTime(80, now + 0.16);
  gain2.gain.setValueAtTime(0.3, now + 0.1);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.1);
  osc2.stop(now + 0.19);
}

/**
 * Film Winding / Ratchet sound
 */
export function playFilmWinding() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const clicks = 6;
  const interval = 0.045;

  for (let i = 0; i < clicks; i++) {
    const clickTime = now + (i * interval);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1400 + (i * 80), clickTime);
    osc.frequency.exponentialRampToValueAtTime(200, clickTime + 0.015);

    gain.gain.setValueAtTime(0.18, clickTime);
    gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(clickTime);
    osc.stop(clickTime + 0.025);
  }
}

/**
 * Analog Toggle Switch Click
 */
export function playSwitchSound(isTurnOn = true) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(isTurnOn ? 650 : 420, now);
  osc.frequency.exponentialRampToValueAtTime(isTurnOn ? 950 : 250, now + 0.03);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * Photo Book / Page Rustle sound
 */
export function playPageFlip() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(2200, now + 0.08);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.16);
}

/**
 * Vintage DTMF telephone dial tones
 */
const DTMF_FREQS = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

export function playDialTone(digit) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = DTMF_FREQS[digit] || [440, 480];
  const now = ctx.currentTime;
  const duration = 0.18;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
  gain.connect(ctx.destination);

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + duration);
  });
}

/**
 * Meow / Pet sound for the studio mascot
 */
export function playMascotSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.linearRampToValueAtTime(780, now + 0.18);
  osc.frequency.exponentialRampToValueAtTime(450, now + 0.4);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.45);
}
