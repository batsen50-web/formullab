import assert from 'node:assert/strict';
import test from 'node:test';
import {playClickSound, resetSharedAudioContextForTest} from './soundEffects.ts';

test('playClickSound safely returns false when AudioContext is unavailable', () => {
  resetSharedAudioContextForTest();
  assert.equal(playClickSound(null), false);
});

test('playClickSound triggers Web Audio oscillator and gain nodes on mock AudioContext', () => {
  let startedAt: number | undefined;
  let stoppedAt: number | undefined;
  let resumed = false;

  const mockOscillator = {
    type: 'sine',
    frequency: {
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {},
    },
    connect: () => {},
    start: (t: number) => {
      startedAt = t;
    },
    stop: (t: number) => {
      stoppedAt = t;
    },
  };

  const mockGain = {
    gain: {
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {},
    },
    connect: () => {},
  };

  const mockCtx = {
    state: 'suspended',
    currentTime: 1.5,
    destination: {},
    resume: async () => {
      resumed = true;
    },
    createOscillator: () => mockOscillator,
    createGain: () => mockGain,
  } as unknown as AudioContext;

  const played = playClickSound(mockCtx);
  assert.equal(played, true);
  assert.equal(resumed, true);
  assert.equal(startedAt, 1.5);
  assert.ok(typeof stoppedAt === 'number' && stoppedAt > 1.5);
});
