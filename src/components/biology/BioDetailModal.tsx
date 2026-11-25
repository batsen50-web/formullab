import {Star, X} from 'lucide-react';
import {useEffect, type FC} from 'react';
import {BIOLOGY_CATEGORY_LABELS, BIOLOGY_EXAM_LEVEL_LABELS} from '../../data/biology';
import type {BiologyTerm} from '../../types/biology';
import type {CompoundStats} from '../../types/chemistry';

interface BioDetailModalProps {
  term: BiologyTerm | null;
  isFavorite: boolean;
  stats: CompoundStats | undefined;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const BioDetailModal: FC<BioDetailModalProps> = ({
  term,
  isFavorite,
  stats,
  onToggleFavorite,
  onClose,
}) => {
  useEffect(() => {
    if (!term) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [term, onClose]);

  if (!term) return null;

  const correctCount = stats?.correct ?? 0;
  const wrongCount = stats?.wrong ?? 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bio-modal-title"
    >
      <div
        className="w-full sm:max-w-lg bio-panel rounded-t-2xl sm:rounded-xl border border-sky-400/30 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-sky-200/25 mx-auto mb-3 sm:hidden" aria-hidden="true" />
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-sky-400/15">
          <div className="flex flex-wrap items-center gap-2 text-xs text-sky-200/85">
            <span className="font-mono font-semibold text-sky-300">
              {BIOLOGY_EXAM_LEVEL_LABELS[term.examLevel]}
            </span>
            <span aria-hidden="true">·</span>
            <span>{BIOLOGY_CATEGORY_LABELS[term.category]}</span>
            {term.isHighYield && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-[#f5b06b]">ÖSYM Kritik</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleFavorite(term.id)}
              aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer"
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-[#f2d082] text-[#f2d082]' : 'text-sky-200/50'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Detay penceresini kapat"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-sky-500/15 text-sky-100/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bio-lcd rounded-xl p-5 my-4 text-center">
          <div className="font-mono text-base sm:text-lg font-semibold text-sky-300 tracking-wide">
            {term.shortCode}
          </div>
          <h2 id="bio-modal-title" className="mt-2 text-lg sm:text-xl font-semibold text-[#F2D082]">
            {term.term}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#A7B2AC]">{term.locationOrSystem}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3 mb-4">
          <div className="rounded-xl bg-[#09202e]/80 border border-sky-400/20 p-3.5">
            <div className="font-mono text-[10px] tracking-wider uppercase text-sky-200/60 mb-1">
              MEKANİZMA / GÖREV
            </div>
            <div className="text-xs sm:text-sm font-medium text-sky-50 leading-relaxed">
              {term.mechanism}
            </div>
          </div>

          <div className="rounded-xl bg-[#09202e]/80 border border-sky-400/20 p-3.5 flex sm:flex-col justify-between sm:justify-start">
            <div className="font-mono text-[10px] tracking-wider uppercase text-sky-200/60 mb-1">
              TEST SKORU
            </div>
            <div className="font-mono text-sm sm:text-base font-semibold tabular-nums flex items-center gap-2">
              <span className="text-[#67e8f9]">{correctCount}D</span>
              <span className="text-sky-200/40">/</span>
              <span className="text-[#ef6f6c]">{wrongCount}Y</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#09202e]/80 border border-sky-400/20 p-4">
          <div className="font-mono text-[11px] tracking-wider uppercase text-[#f5b06b] font-semibold mb-1.5">
            ÖSYM SINAV NOTU
          </div>
          <p className="text-sm text-sky-50/90 leading-relaxed">{term.examTip}</p>
        </div>
      </div>
    </div>
  );
};
