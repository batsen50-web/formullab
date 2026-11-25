import {Star, X} from 'lucide-react';
import {useEffect, type FC} from 'react';
import {GEOGRAPHY_CATEGORY_LABELS, GEOGRAPHY_EXAM_LEVEL_LABELS} from '../../data/geography';
import type {CompoundStats} from '../../types/chemistry';
import type {GeographyTerm} from '../../types/geography';

interface GeoDetailModalProps {
  term: GeographyTerm | null;
  isFavorite: boolean;
  stats: CompoundStats | undefined;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const GeoDetailModal: FC<GeoDetailModalProps> = ({
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
      aria-labelledby="geo-modal-title"
    >
      <div
        className="w-full sm:max-w-lg geo-panel rounded-t-2xl sm:rounded-xl border border-amber-400/30 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-amber-200/25 mx-auto mb-3 sm:hidden" aria-hidden="true" />
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-amber-400/15">
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200/85">
            <span className="font-mono font-semibold text-amber-300">
              {GEOGRAPHY_EXAM_LEVEL_LABELS[term.examLevel]}
            </span>
            <span aria-hidden="true">·</span>
            <span>{GEOGRAPHY_CATEGORY_LABELS[term.category]}</span>
            {term.isHighYield && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-orange-300">ÖSYM Kritik</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleFavorite(term.id)}
              aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-amber-500/15 transition-colors cursor-pointer"
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-amber-200/50'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Detay penceresini kapat"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-amber-500/15 text-amber-100/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="geo-lcd rounded-xl p-5 my-4 text-center">
          <div className="font-mono text-base sm:text-lg font-semibold text-amber-300 tracking-wide">
            {term.shortCode}
          </div>
          <h2 id="geo-modal-title" className="mt-2 text-lg sm:text-xl font-semibold text-[#FEF3C7]">
            {term.term}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-amber-200/75">{term.regionOrScope}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3 mb-4">
          <div className="rounded-xl bg-[#211408]/80 border border-amber-400/20 p-3.5">
            <div className="font-mono text-[10px] tracking-wider uppercase text-amber-200/60 mb-1">
              MEKANİZMA / COĞRAFİ ÖZELLİK
            </div>
            <div className="text-xs sm:text-sm font-medium text-amber-50 leading-relaxed">
              {term.mechanism}
            </div>
          </div>

          <div className="rounded-xl bg-[#211408]/80 border border-amber-400/20 p-3.5 flex sm:flex-col justify-between sm:justify-start">
            <div className="font-mono text-[10px] tracking-wider uppercase text-amber-200/60 mb-1">
              TEST SKORU
            </div>
            <div className="font-mono text-sm sm:text-base font-semibold tabular-nums flex items-center gap-2">
              <span className="text-[#fbbf24]">{correctCount}D</span>
              <span className="text-amber-200/40">/</span>
              <span className="text-[#ef6f6c]">{wrongCount}Y</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#211408]/80 border border-amber-400/20 p-4">
          <div className="font-mono text-[11px] tracking-wider uppercase text-orange-300 font-semibold mb-1.5">
            ÖSYM SINAV NOTU
          </div>
          <p className="text-sm text-amber-50/90 leading-relaxed">{term.examTip}</p>
        </div>
      </div>
    </div>
  );
};
