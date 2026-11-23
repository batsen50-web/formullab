let sharedAudioContext: AudioContext | null = null;

type AudioContextConstructor = typeof AudioContext;

function getAudioContextConstructor(): AudioContextConstructor | null {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as {
    AudioContext?: AudioContextConstructor;
    webkitAudioContext?: AudioContextConstructor;
  };
  return win.AudioContext ?? win.webkitAudioContext ?? null;
}

export function getOrCreateAudioContext(
  ctorOverride?: AudioContextConstructor | null,
): AudioContext | null {
  const Ctor = ctorOverride === undefined ? getAudioContextConstructor() : ctorOverride;
  if (!Ctor) return null;

  if (!sharedAudioContext) {
    sharedAudioContext = new Ctor();
  }
  return sharedAudioContext;
}

export function resetSharedAudioContextForTest(): void {
  sharedAudioContext = null;
}

export function playClickSound(ctxOverride?: AudioContext | null): boolean {
  try {
    const ctx = ctxOverride === undefined ? getOrCreateAudioContext() : ctxOverride;
    if (!ctx) return false;

    if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(720, now);
    oscillator.frequency.exponentialRampToValueAtTime(240, now + 0.024);

    gainNode.gain.setValueAtTime(0.065, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.028);
    return true;
  } catch {
    return false;
  }
}
