import {Volume2, VolumeX} from 'lucide-react';
import {useEffect, useRef, useState, type FC} from 'react';

const AUDIO_SRC = '/assets/aistudio/Bilgi_Testi_Odak_Fonu_95f7ac59.mp3';

export const AudioControl: FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMuted, setUserMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.28;
    audio.loop = true;

    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    const handleFirstGesture = () => {
      if (userMuted || !audio.paused) return;
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          setIsPlaying(true);
          removeGestureListeners();
        }).catch(() => {
          // Ignore if still prevented
        });
      }
    };

    const tryAutoStart = () => {
      if (userMuted) return;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            setIsPlaying(true);
            removeGestureListeners();
          })
          .catch(() => {
            // Browser blocked autoplay before user interaction; will start on first interaction
          });
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, {passive: true});
    window.addEventListener('keydown', handleFirstGesture, {passive: true});
    tryAutoStart();

    return removeGestureListeners;
  }, [userMuted]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
      setUserMuted(true);
    } else {
      setUserMuted(false);
      audio.loop = true;
      audio.volume = 0.28;
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="metadata" aria-hidden="true" />
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Odak müziğini kapat' : 'Odak müziğini çal'}
        title={isPlaying ? 'Odak Fonu Çalıyor (Kapat)' : 'Odak Fonu (Döngüde Çal)'}
        className={`min-h-[44px] min-w-[44px] sm:min-w-0 px-2.5 sm:px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-mono whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
          isPlaying
            ? 'bg-emerald-500/15 border-emerald-400/45 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
            : 'bg-[#0d261e]/80 border-emerald-400/20 text-emerald-100/70 hover:border-emerald-400/40 hover:text-emerald-100'
        }`}
      >
        {isPlaying ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4" />}
        <span className="hidden sm:inline">{isPlaying ? 'Müzik Açık' : 'Müzik'}</span>
      </button>
    </>
  );
};
