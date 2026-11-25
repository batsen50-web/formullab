import {RotateCcw, SlidersHorizontal, Star, Target} from 'lucide-react';
import type {FC} from 'react';
import {EXAM_LEVEL_LABELS} from '../data/compounds';
import type {Compound, QuizSummary} from '../types/chemistry';
import {FormulaText} from './FormulaText';

interface TestResultsViewProps {
  summary: QuizSummary;
  favorites: ReadonlySet<string>;
  onReturnSetup: () => void;
  onRestartSameConfig: () => void;
  onTestMistakes: (mistakes: Compound[]) => void;
  onSelectCompound: (compound: Compound) => void;
  onToggleFavorite: (id: string) => void;
}

export const TestResultsView: FC<TestResultsViewProps> = ({
  summary,
  favorites,
  onReturnSetup,
  onRestartSameConfig,
  onTestMistakes,
  onSelectCompound,
  onToggleFavorite,
}) => {
  return (
    <section aria-label="Test Sonuç Raporu" className="w-full space-y-5">
      {/* Dark LCD Report Card */}
      <div className="lab-lcd rounded-2xl p-6 sm:p-8 text-center">
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#A7B2AC]">
          SONUÇ RAPORU
        </div>
        <div className="mt-3 font-mono text-5xl sm:text-6xl font-bold text-[#6AD6A0] tabular-nums">
          %{summary.percentage}
        </div>
        <div className="mt-3 font-mono text-xs sm:text-sm tracking-wider text-[#A7B2AC] tabular-nums">
          {summary.correctCount} / {summary.total} DOĞRU • EN İYİ SERİ: {summary.bestStreak}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReturnSetup}
          className="min-h-[48px] rounded-xl bg-[#0e2a20]/85 border border-emerald-400/25 text-emerald-100 hover:border-emerald-400/50 hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Ayarlar</span>
        </button>

        <button
          type="button"
          onClick={onRestartSameConfig}
          className="min-h-[48px] rounded-xl lab-cta-emerald font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yeni Test</span>
        </button>
      </div>

      {/* Mistakes Section */}
      {summary.mistakes.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <h2 className="font-mono text-xs tracking-wider uppercase text-emerald-100/80 font-semibold">
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
            {summary.mistakes.map((compound) => {
              const isFav = favorites.has(compound.id);
              const showSystematic =
                compound.commonName.trim().toLowerCase() !==
                compound.systematicName.trim().toLowerCase();

              return (
                <div
                  key={compound.id}
                  className="lab-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => onSelectCompound(compound)}
                    className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  >
                    <div className="min-w-[88px] sm:min-w-[104px] px-2 py-2 rounded-lg bg-[#0d2d22] border border-emerald-400/25 text-center text-emerald-300 font-semibold text-sm shrink-0">
                      <FormulaText formula={compound.formula} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-white truncate">
                        {compound.commonName}
                      </div>
                      <div className="mt-1 flex items-center gap-2 min-w-0">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0c261d] border border-emerald-400/25 text-emerald-200/80 shrink-0">
                          {EXAM_LEVEL_LABELS[compound.examLevel]}
                        </span>
                        {showSystematic && (
                          <span className="text-xs text-[#8fb3a4] truncate min-w-0">
                            {compound.systematicName}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(compound.id)}
                    aria-label={isFav ? `${compound.commonName} favorilerden çıkar` : `${compound.commonName} favorilere ekle`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-emerald-500/15 transition-colors cursor-pointer shrink-0"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        isFav ? 'fill-[#f2d082] text-[#f2d082]' : 'text-emerald-200/45'
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
