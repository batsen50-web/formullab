import {Star, X} from 'lucide-react';
import {useEffect, type FC} from 'react';
import {CATEGORY_LABELS, EXAM_LEVEL_LABELS} from '../data/compounds';
import type {Compound, CompoundStats} from '../types/chemistry';
import {FormulaText} from './FormulaText';

interface CompoundDetailModalProps {
  compound: Compound | null;
  isFavorite: boolean;
  stats: CompoundStats | undefined;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const CompoundDetailModal: FC<CompoundDetailModalProps> = ({
  compound,
  isFavorite,
  stats,
  onToggleFavorite,
  onClose,
}) => {
  useEffect(() => {
    if (!compound) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [compound, onClose]);

  if (!compound) return null;

  const correctCount = stats?.correct ?? 0;
  const wrongCount = stats?.wrong ?? 0;
  const showSystematic =
    compound.commonName.trim().toLowerCase() !==
    compound.systematicName.trim().toLowerCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="compound-modal-title"
    >
      <div
        className="w-full sm:max-w-lg lab-panel rounded-t-2xl sm:rounded-xl border border-emerald-400/30 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-emerald-200/25 mx-auto mb-3 sm:hidden" aria-hidden="true" />
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-emerald-400/15">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-[#0c2920] border border-emerald-400/30 text-emerald-200">
              {EXAM_LEVEL_LABELS[compound.examLevel]}
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-400/20 text-emerald-100/80">
              {CATEGORY_LABELS[compound.category]}
            </span>
            {compound.isHighYield && (
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-[#bf5d17]/25 border border-[#e38e40]/60 text-[#f5b06b]">
                ÖSYM KRİTİK
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleFavorite(compound.id)}
              aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-emerald-500/15 transition-colors cursor-pointer"
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-[#f2d082] text-[#f2d082]' : 'text-emerald-200/50'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Detay penceresini kapat"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-emerald-500/15 text-emerald-100/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="lab-lcd rounded-xl p-5 my-4 text-center">
          <div className="text-[34px] sm:text-[38px] font-bold text-[#F2D082] leading-tight tracking-tight">
            <FormulaText formula={compound.formula} />
          </div>
          <h2 id="compound-modal-title" className="mt-2.5 text-lg sm:text-xl font-semibold text-white">
            {compound.commonName}
          </h2>
          {showSystematic && (
            <p className="mt-1 text-sm text-[#A7B2AC]">{compound.systematicName}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-[#0c261d]/80 border border-emerald-400/20 p-3.5">
            <div className="font-mono text-[10px] tracking-wider uppercase text-emerald-200/60 mb-1">
              BAĞ / SINIF
            </div>
            <div className="text-xs sm:text-sm font-medium text-emerald-50 leading-snug">
              {compound.bondType}
            </div>
          </div>

          <div className="rounded-xl bg-[#0c261d]/80 border border-emerald-400/20 p-3.5">
            <div className="font-mono text-[10px] tracking-wider uppercase text-emerald-200/60 mb-1">
              TEST SKORU
            </div>
            <div className="font-mono text-sm sm:text-base font-semibold tabular-nums flex items-center gap-2">
              <span className="text-[#6AD6A0]">{correctCount}D</span>
              <span className="text-emerald-200/40">/</span>
              <span className="text-[#ef6f6c]">{wrongCount}Y</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#0c261d]/80 border border-emerald-400/20 p-4">
          <div className="font-mono text-[11px] tracking-wider uppercase text-[#f5b06b] font-semibold mb-1.5">
            ÖSYM SINAV NOTU
          </div>
          <p className="text-sm text-emerald-50/90 leading-relaxed">{compound.examTip}</p>
        </div>
      </div>
    </div>
  );
};
