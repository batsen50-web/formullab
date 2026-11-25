import {Volume2, VolumeX} from 'lucide-react';
import {useEffect, useRef, useState, type FC} from 'react';
import type {ScreenMode} from '../types/biology';

const AUDIO_SRC = '/assets/aistudio/Bilgi_Testi_Odak_Fonu_95f7ac59.mp3';

export const AudioControl: FC<{theme?: ScreenMode}> = ({theme = 'chemistry'}) => {
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

  const activeStyle =
    theme === 'home'
      ? 'bg-zinc-800/80 border-zinc-400/45 text-zinc-100 shadow-[0_0_12px_rgba(161,161,170,0.18)]'
      : theme === 'biology'
        ? 'bg-sky-500/15 border-sky-400/45 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.22)]'
        : theme === 'physics'
          ? 'bg-violet-500/15 border-violet-400/45 text-violet-200 shadow-[0_0_12px_rgba(167,139,250,0.24)]'
          : theme === 'geography'
            ? 'bg-amber-500/15 border-amber-400/45 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.24)]'
            : theme === 'literature'
              ? 'bg-rose-500/15 border-rose-400/45 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.24)]'
              : theme === 'history'
                ? 'bg-orange-500/15 border-orange-400/45 text-orange-200 shadow-[0_0_12px_rgba(249,115,22,0.24)]'
                : theme === 'religion'
                  ? 'bg-teal-500/15 border-teal-400/45 text-teal-200 shadow-[0_0_12px_rgba(20,184,166,0.24)]'
                  : theme === 'philosophy'
                    ? 'bg-indigo-500/15 border-indigo-400/45 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.24)]'
                    : 'bg-emerald-500/15 border-emerald-400/45 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]';

  const inactiveStyle =
    theme === 'home'
      ? 'bg-zinc-900/85 border-zinc-700/70 text-zinc-300 hover:border-zinc-500 hover:text-white'
      : theme === 'biology'
        ? 'bg-[#09202e]/85 border-sky-400/20 text-sky-100/75 hover:border-sky-400/45 hover:text-sky-100'
        : theme === 'physics'
          ? 'bg-[#140c29]/85 border-violet-400/20 text-violet-100/75 hover:border-violet-400/45 hover:text-violet-100'
          : theme === 'geography'
            ? 'bg-[#211408]/85 border-amber-400/20 text-amber-100/75 hover:border-amber-400/45 hover:text-amber-100'
            : theme === 'literature'
              ? 'bg-[#260c17]/85 border-rose-400/20 text-rose-100/75 hover:border-rose-400/45 hover:text-rose-100'
              : theme === 'history'
                ? 'bg-[#281208]/85 border-orange-400/20 text-orange-100/75 hover:border-orange-400/45 hover:text-orange-100'
                : theme === 'religion'
                  ? 'bg-[#072020]/85 border-teal-400/20 text-teal-100/75 hover:border-teal-400/45 hover:text-teal-100'
                  : theme === 'philosophy'
                    ? 'bg-[#101633]/85 border-indigo-400/20 text-indigo-100/75 hover:border-indigo-400/45 hover:text-indigo-100'
                    : 'bg-[#0d261e]/80 border-emerald-400/20 text-emerald-100/70 hover:border-emerald-400/40 hover:text-emerald-100';

  const activeIconColor =
    theme === 'home'
      ? 'text-zinc-200'
      : theme === 'biology'
        ? 'text-sky-300'
        : theme === 'physics'
          ? 'text-violet-300'
          : theme === 'geography'
            ? 'text-amber-300'
            : theme === 'literature'
              ? 'text-rose-300'
              : theme === 'history'
                ? 'text-orange-300'
                : theme === 'religion'
                  ? 'text-teal-300'
                  : theme === 'philosophy'
                    ? 'text-indigo-300'
                    : 'text-emerald-300';

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="metadata" aria-hidden="true" />
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Odak müziğini kapat' : 'Odak müziğini çal'}
        title={isPlaying ? 'Odak Fonu Çalıyor (Kapat)' : 'Odak Fonu (Döngüde Çal)'}
        className={`min-h-[44px] min-w-[44px] sm:min-w-0 px-2.5 sm:px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-mono whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
          isPlaying ? activeStyle : inactiveStyle
        }`}
      >
        {isPlaying ? <Volume2 className={`w-4 h-4 ${activeIconColor}`} /> : <VolumeX className="w-4 h-4" />}
        <span className="hidden sm:inline">{isPlaying ? 'Müzik Açık' : 'Müzik'}</span>
      </button>
    </>
  );
};
