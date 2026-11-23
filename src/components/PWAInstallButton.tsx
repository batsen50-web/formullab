import {Download, Share, X} from 'lucide-react';
import {useEffect, useState, type FC} from 'react';
import {usePWAInstall} from '../hooks/usePWAInstall';

export const PWAInstallButton: FC = () => {
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

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label="Uygulamayı Cihaza Kur"
        title="Ana Ekrana Ekle / Çevrimdışı Kullan"
        className="min-h-[44px] px-2.5 sm:px-3 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/25 hover:text-white text-xs font-mono flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4 text-emerald-300" />
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
          className="min-h-[44px] px-2.5 sm:px-3 rounded-lg bg-[#0d261e]/85 border border-emerald-400/25 text-emerald-100/85 hover:border-emerald-400/45 hover:text-white text-xs font-mono flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-300" />
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
              className="w-full sm:max-w-sm lab-panel rounded-t-2xl sm:rounded-xl border border-emerald-400/30 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 rounded-full bg-emerald-200/25 mx-auto sm:hidden" aria-hidden="true" />
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-400/15">
                <h2 id="ios-install-title" className="text-base font-semibold text-white">
                  iPhone / iPad Kurulumu
                </h2>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Kapat"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-emerald-100/70 hover:text-white hover:bg-emerald-500/15 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="space-y-2.5 text-sm text-emerald-50/85 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-300 font-semibold">1.</span>
                  <span>
                    Safari araç çubuğundaki <Share className="inline w-4 h-4 text-emerald-300 mx-0.5" />{' '}
                    <strong>Paylaş</strong> simgesine dokunun.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-300 font-semibold">2.</span>
                  <span>
                    Aşağı kaydırıp <strong>Ana Ekrana Ekle</strong> seçeneğine dokunun; formullab internetsiz de çalışır.
                  </span>
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full min-h-[44px] rounded-xl lab-cta-emerald text-sm font-semibold cursor-pointer"
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
