import {RotateCcw, SlidersHorizontal, Star, Target} from 'lucide-react';
import type {FC} from 'react';
import {GEOGRAPHY_EXAM_LEVEL_LABELS} from '../../data/geography';
import type {GeographyQuizSummary, GeographyTerm} from '../../types/geography';

interface GeoTestResultsViewProps {
  summary: GeographyQuizSummary;
  favorites: ReadonlySet<string>;
  onReturnSetup: () => void;
  onRestartSameConfig: () => void;
  onTestMistakes: (mistakes: GeographyTerm[]) => void;
  onSelectTerm: (term: GeographyTerm) => void;
  onToggleFavorite: (id: string) => void;
}

export const GeoTestResultsView: FC<GeoTestResultsViewProps> = ({
  summary,
  favorites,
  onReturnSetup,
  onRestartSameConfig,
  onTestMistakes,
  onSelectTerm,
  onToggleFavorite,
}) => {
  return (
    <section aria-label="Coğrafya Test Sonuç Raporu" className="w-full space-y-5">
      <div className="geo-lcd rounded-2xl p-6 sm:p-8 text-center">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-amber-200/75">
          COĞRAFYA SONUÇ RAPORU
        </div>
        <div className="mt-3 font-mono text-5xl sm:text-6xl font-bold text-[#fbbf24] tabular-nums">
          %{summary.percentage}
        </div>
        <div className="mt-3 font-mono text-xs sm:text-sm tracking-wider text-amber-200/75 tabular-nums">
          {summary.correctCount} / {summary.total} DOĞRU · EN İYİ SERİ: {summary.bestStreak}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReturnSetup}
          className="min-h-[48px] rounded-xl bg-[#211408]/85 border border-amber-400/25 text-amber-100 hover:border-amber-400/50 hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Ayarlar</span>
        </button>

        <button
          type="button"
          onClick={onRestartSameConfig}
          className="min-h-[48px] rounded-xl geo-cta-amber font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yeni Test</span>
        </button>
      </div>

      {summary.mistakes.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <h2 className="font-mono text-xs tracking-wider uppercase text-amber-100/80 font-semibold">
              YANLIŞLAR ({summary.mistakes.length})
            </h2>
            <button
              type="button"
              onClick={() => onTestMistakes(summary.mistakes)}
              className="min-h-[44px] sm:min-h-[40px] px-3.5 rounded-lg bg-[#b45309]/25 border border-amber-400/55 text-amber-200 hover:bg-[#b45309]/40 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
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
                  className="geo-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => onSelectTerm(term)}
                    className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    <div className="min-w-[88px] sm:min-w-[104px] px-2 py-2 rounded-lg bg-[#1c1106] border border-amber-400/25 text-center text-amber-300 font-mono font-semibold text-xs sm:text-sm shrink-0 truncate">
                      {term.shortCode}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-white truncate">
                        {term.term}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-amber-200/65 min-w-0">
                        <span className="font-mono text-amber-300/90 shrink-0">
                          {GEOGRAPHY_EXAM_LEVEL_LABELS[term.examLevel]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate min-w-0">{term.regionOrScope}</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(term.id)}
                    aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-amber-500/15 transition-colors cursor-pointer shrink-0"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        isFav ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-amber-200/45'
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
