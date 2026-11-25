import {RotateCcw, SlidersHorizontal, Star, Target} from 'lucide-react';
import type {FC} from 'react';
import {BIOLOGY_EXAM_LEVEL_LABELS} from '../../data/biology';
import type {BiologyQuizSummary, BiologyTerm} from '../../types/biology';

interface BioTestResultsViewProps {
  summary: BiologyQuizSummary;
  favorites: ReadonlySet<string>;
  onReturnSetup: () => void;
  onRestartSameConfig: () => void;
  onTestMistakes: (mistakes: BiologyTerm[]) => void;
  onSelectTerm: (term: BiologyTerm) => void;
  onToggleFavorite: (id: string) => void;
}

export const BioTestResultsView: FC<BioTestResultsViewProps> = ({
  summary,
  favorites,
  onReturnSetup,
  onRestartSameConfig,
  onTestMistakes,
  onSelectTerm,
  onToggleFavorite,
}) => {
  return (
    <section aria-label="Biyoloji Test Sonuç Raporu" className="w-full space-y-5">
      <div className="bio-lcd rounded-2xl p-6 sm:p-8 text-center">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#A7B2AC]">
          BİYOLOJİ SONUÇ RAPORU
        </div>
        <div className="mt-3 font-mono text-5xl sm:text-6xl font-bold text-[#67e8f9] tabular-nums">
          %{summary.percentage}
        </div>
        <div className="mt-3 font-mono text-xs sm:text-sm tracking-wider text-[#A7B2AC] tabular-nums">
          {summary.correctCount} / {summary.total} DOĞRU · EN İYİ SERİ: {summary.bestStreak}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReturnSetup}
          className="min-h-[48px] rounded-xl bg-[#0a2230]/85 border border-sky-400/25 text-sky-100 hover:border-sky-400/50 hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Ayarlar</span>
        </button>

        <button
          type="button"
          onClick={onRestartSameConfig}
          className="min-h-[48px] rounded-xl bio-cta-teal font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yeni Test</span>
        </button>
      </div>

      {summary.mistakes.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <h2 className="font-mono text-xs tracking-wider uppercase text-sky-100/80 font-semibold">
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
                  className="bio-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => onSelectTerm(term)}
                    className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                  >
                    <div className="min-w-[88px] sm:min-w-[104px] px-2 py-2 rounded-lg bg-[#081d2b] border border-sky-400/25 text-center text-sky-300 font-mono font-semibold text-xs sm:text-sm shrink-0 truncate">
                      {term.shortCode}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-white truncate">
                        {term.term}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-sky-200/65 min-w-0">
                        <span className="font-mono text-sky-300/90 shrink-0">
                          {BIOLOGY_EXAM_LEVEL_LABELS[term.examLevel]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate min-w-0">{term.locationOrSystem}</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(term.id)}
                    aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer shrink-0"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        isFav ? 'fill-[#f2d082] text-[#f2d082]' : 'text-sky-200/45'
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
