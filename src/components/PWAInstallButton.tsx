import {Download, Share, X} from 'lucide-react';
import {useEffect, useState, type FC} from 'react';
import {usePWAInstall} from '../hooks/usePWAInstall';
import type {ScreenMode} from '../types/biology';

export const PWAInstallButton: FC<{theme?: ScreenMode}> = ({theme = 'chemistry'}) => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (!showIOSGuide) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowIOSGuide(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showIOSGuide]);

  if (isInstalled) {
    return null;
  }

  const installBtnClass =
    theme === 'home'
      ? 'bg-zinc-800/80 border-zinc-500/45 text-zinc-100 hover:bg-zinc-700/80 hover:text-white'
      : theme === 'biology'
        ? 'bg-sky-500/15 border-sky-400/40 text-sky-200 hover:bg-sky-500/25 hover:text-white'
        : theme === 'physics'
          ? 'bg-violet-500/15 border-violet-400/40 text-violet-200 hover:bg-violet-500/25 hover:text-white'
          : theme === 'geography'
            ? 'bg-amber-500/15 border-amber-400/40 text-amber-200 hover:bg-amber-500/25 hover:text-white'
            : theme === 'literature'
              ? 'bg-rose-500/15 border-rose-400/40 text-rose-200 hover:bg-rose-500/25 hover:text-white'
              : theme === 'history'
                ? 'bg-orange-500/15 border-orange-400/40 text-orange-200 hover:bg-orange-500/25 hover:text-white'
                : theme === 'religion'
                  ? 'bg-teal-500/15 border-teal-400/40 text-teal-200 hover:bg-teal-500/25 hover:text-white'
                  : theme === 'philosophy'
                    ? 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200 hover:bg-indigo-500/25 hover:text-white'
                    : 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/25 hover:text-white';

  const iosBtnClass =
    theme === 'home'
      ? 'bg-zinc-900/85 border-zinc-700/70 text-zinc-200 hover:border-zinc-500 hover:text-white'
      : theme === 'biology'
        ? 'bg-[#09202e]/85 border-sky-400/25 text-sky-100/85 hover:border-sky-400/45 hover:text-white'
        : theme === 'physics'
          ? 'bg-[#140c29]/85 border-violet-400/25 text-violet-100/85 hover:border-violet-400/45 hover:text-white'
          : theme === 'geography'
            ? 'bg-[#211408]/85 border-amber-400/25 text-amber-100/85 hover:border-amber-400/45 hover:text-white'
            : theme === 'literature'
              ? 'bg-[#260c17]/85 border-rose-400/25 text-rose-100/85 hover:border-rose-400/45 hover:text-white'
              : theme === 'history'
                ? 'bg-[#281208]/85 border-orange-400/25 text-orange-100/85 hover:border-orange-400/45 hover:text-white'
                : theme === 'religion'
                  ? 'bg-[#072020]/85 border-teal-400/25 text-teal-100/85 hover:border-teal-400/45 hover:text-white'
                  : theme === 'philosophy'
                    ? 'bg-[#101633]/85 border-indigo-400/25 text-indigo-100/85 hover:border-indigo-400/45 hover:text-white'
                    : 'bg-[#0d261e]/85 border-emerald-400/25 text-emerald-100/85 hover:border-emerald-400/45 hover:text-white';

  const iconColor =
    theme === 'home'
      ? 'text-zinc-300'
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

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label="Uygulamayı Cihaza Kur"
        title="Ana Ekrana Ekle / Çevrimdışı Kullan"
        className={`min-h-[44px] px-2.5 sm:px-3 rounded-lg border text-xs font-mono flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${installBtnClass}`}
      >
        <Download className={`w-4 h-4 ${iconColor}`} />
        <span className="hidden sm:inline">Uygulamayı Kur</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label="Ana Ekrana Ekle"
          className={`min-h-[44px] px-2.5 sm:px-3 rounded-lg border text-xs font-mono flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${iosBtnClass}`}
        >
          <Download className={`w-4 h-4 ${iconColor}`} />
          <span className="hidden sm:inline">Ana Ekrana Ekle</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
            onClick={() => setShowIOSGuide(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div
              className={`w-full sm:max-w-sm rounded-t-2xl sm:rounded-xl p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl space-y-4 ${
                theme === 'home'
                  ? 'home-panel'
                  : theme === 'biology'
                    ? 'bio-panel'
                    : theme === 'physics'
                      ? 'phys-panel'
                      : theme === 'geography'
                        ? 'geo-panel'
                        : theme === 'literature'
                          ? 'lit-panel'
                          : theme === 'history'
                            ? 'hist-panel'
                            : theme === 'religion'
                              ? 'rel-panel'
                              : theme === 'philosophy'
                                ? 'phil-panel'
                                : 'lab-panel'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 rounded-full bg-white/25 mx-auto sm:hidden" aria-hidden="true" />
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <h2 id="ios-install-title" className="text-base font-semibold text-white">
                  iPhone / iPad Kurulumu
                </h2>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Kapat"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="space-y-2.5 text-sm text-white/85 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className={`font-mono font-semibold ${iconColor}`}>1.</span>
                  <span>
                    Safari araç çubuğundaki <Share className={`inline w-4 h-4 mx-0.5 ${iconColor}`} />{' '}
                    <strong>Paylaş</strong> simgesine dokunun.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`font-mono font-semibold ${iconColor}`}>2.</span>
                  <span>
                    Aşağı kaydırıp <strong>Ana Ekrana Ekle</strong> seçeneğine dokunun; formullab internetsiz de çalışır.
                  </span>
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className={`w-full min-h-[44px] rounded-xl text-sm font-semibold cursor-pointer ${
                  theme === 'biology'
                    ? 'bio-cta-teal'
                    : theme === 'physics'
                      ? 'phys-cta-violet'
                      : theme === 'geography'
                        ? 'geo-cta-amber'
                        : theme === 'literature'
                          ? 'lit-cta-rose'
                          : theme === 'history'
                            ? 'hist-cta-orange'
                            : theme === 'religion'
                              ? 'rel-cta-teal'
                              : theme === 'philosophy'
                                ? 'phil-cta-indigo'
                                : theme === 'home'
                                  ? 'bg-zinc-200 text-zinc-900 hover:bg-white'
                                  : 'lab-cta-emerald'
                }`}
              >
                Anladım
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
