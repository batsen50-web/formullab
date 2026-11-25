import {RotateCcw, SlidersHorizontal, Star, Target} from 'lucide-react';
import type {FC} from 'react';
import {PHYSICS_EXAM_LEVEL_LABELS} from '../../data/physics';
import type {PhysicsQuizSummary, PhysicsTerm} from '../../types/physics';

interface PhysicsTestResultsViewProps {
  summary: PhysicsQuizSummary;
  favorites: ReadonlySet<string>;
  onReturnSetup: () => void;
  onRestartSameConfig: () => void;
  onTestMistakes: (mistakes: PhysicsTerm[]) => void;
  onSelectTerm: (term: PhysicsTerm) => void;
  onToggleFavorite: (id: string) => void;
}

export const PhysicsTestResultsView: FC<PhysicsTestResultsViewProps> = ({
  summary,
  favorites,
  onReturnSetup,
  onRestartSameConfig,
  onTestMistakes,
  onSelectTerm,
  onToggleFavorite,
}) => {
  return (
    <section aria-label="Fizik Test Sonuç Raporu" className="w-full space-y-5">
      <div className="phys-lcd rounded-2xl p-6 sm:p-8 text-center">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#B5AECA]">
          FİZİK SONUÇ RAPORU
        </div>
        <div className="mt-3 font-mono text-5xl sm:text-6xl font-bold text-[#c4b5fd] tabular-nums">
          %{summary.percentage}
        </div>
        <div className="mt-3 font-mono text-xs sm:text-sm tracking-wider text-[#B5AECA] tabular-nums">
          {summary.correctCount} / {summary.total} DOĞRU · EN İYİ SERİ: {summary.bestStreak}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReturnSetup}
          className="min-h-[48px] rounded-xl bg-[#140c29]/85 border border-violet-400/25 text-violet-100 hover:border-violet-400/50 hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Ayarlar</span>
        </button>

        <button
          type="button"
          onClick={onRestartSameConfig}
          className="min-h-[48px] rounded-xl phys-cta-violet font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yeni Test</span>
        </button>
      </div>

      {summary.mistakes.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <h2 className="font-mono text-xs tracking-wider uppercase text-violet-100/80 font-semibold">
              YANLIŞLAR ({summary.mistakes.length})
            </h2>
            <button
              type="button"
              onClick={() => onTestMistakes(summary.mistakes)}
              className="min-h-[44px] sm:min-h-[40px] px-3.5 rounded-lg bg-[#bf5d17]/25 border border-[#e38e40]/60 text-[#f7c188] hover:bg-[#bf5d17]/40 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Target className="w-4 h-4" />
              <span>Yanlışları Test Et</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {summary.mistakes.map((term) => {
              const isFav = favorites.has(term.id);

              return (
                <div
                  key={term.id}
                  className="phys-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => onSelectTerm(term)}
                    className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                  >
                    <div className="min-w-[96px] max-w-[120px] px-2 py-2 rounded-lg bg-[#110a24] border border-violet-400/25 text-center text-violet-300 font-mono font-semibold text-xs shrink-0 truncate">
                      {term.formula}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-white truncate">
                        {term.term}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-violet-200/65 min-w-0">
                        <span className="font-mono text-violet-300/90 shrink-0">
                          {PHYSICS_EXAM_LEVEL_LABELS[term.examLevel]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate min-w-0">{term.siUnit}</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(term.id)}
                    aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-violet-500/15 transition-colors cursor-pointer shrink-0"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        isFav ? 'fill-[#f2d082] text-[#f2d082]' : 'text-violet-200/45'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
