import {X} from 'lucide-react';
import {useEffect, type FC} from 'react';
import {AdSenseSlot} from './AdSenseSlot';

interface DailyAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyAdModal: FC<DailyAdModalProps> = ({isOpen, onClose}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-ad-title"
    >
      <div
        className="w-full sm:max-w-md lab-panel rounded-t-2xl sm:rounded-xl border border-emerald-400/30 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-emerald-200/25 mx-auto sm:hidden" aria-hidden="true" />

        <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-400/15">
          <div>
            <h2 id="daily-ad-title" className="text-base font-semibold text-white">
              Günlük Sponsorlu Alan
            </h2>
            <p className="text-xs text-emerald-100/60 mt-0.5">
              Çalışmanı bölmemek için günde en fazla 1 kez gösterilir
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Reklam penceresini kapat"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-emerald-100/70 hover:text-white hover:bg-emerald-500/15 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <AdSenseSlot label="Test Sonu Günlük Sponsorlu Alan" variant="card" slotEnvKey="daily" />

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[48px] rounded-xl lab-cta-emerald font-semibold text-sm sm:text-base flex items-center justify-center cursor-pointer"
        >
          Sonuçlara Devam Et
        </button>
      </div>
    </div>
  );
};
