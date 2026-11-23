import {ArrowRight, Check, Flame, X} from 'lucide-react';
import type {FC} from 'react';
import {CATEGORY_LABELS, EXAM_LEVEL_LABELS} from '../data/compounds';
import type {QuizAnswerRecord, QuizQuestion} from '../types/chemistry';
import {formatCompoundNameForPrompt} from '../utils/chemistryLogic';
import {FormulaText} from './FormulaText';

interface TestActiveViewProps {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswerRecord[];
  currentStreak: number;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  onNext: () => void;
  onExit: () => void;
}

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

export const TestActiveView: FC<TestActiveViewProps> = ({
  questions,
  currentIndex,
  answers,
  currentStreak,
  selectedChoiceId,
  onSelectChoice,
  onNext,
  onExit,
}) => {
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  const {compound, type, choices} = currentQuestion;
  const isAnswered = selectedChoiceId !== null;
  const isCorrect = selectedChoiceId === compound.id;
  const isLast = currentIndex === questions.length - 1;

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(questions.length).padStart(2, '0');

  return (
    <section aria-label="Aktif Test" className="w-full space-y-4">
      {/* Top Progress Bar */}
      <div className="lab-panel rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label="Testten çık"
          className="min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] rounded-lg border border-emerald-400/20 bg-[#0d271e] text-emerald-100/75 hover:text-white hover:border-emerald-400/45 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Segmented LED Progress Bar */}
        <div
          className="flex-1 min-w-0 grid gap-[2px] sm:gap-1"
          style={{gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))`}}
          aria-label={`Soru ${currentIndex + 1} / ${questions.length}`}
        >
          {questions.map((q, idx) => {
            const ans = answers[idx];
            let segmentClass = 'bg-emerald-950/80 border-emerald-400/15';
            if (ans) {
              segmentClass = ans.isCorrect
                ? 'bg-[#22c58b] border-[#6ee7b7] shadow-[0_0_8px_rgba(52,211,153,0.45)]'
                : 'bg-[#c83e3b] border-[#f87171]';
            } else if (idx === currentIndex) {
              segmentClass = 'bg-[#74ebb4] border-[#a7f3d0] shadow-[0_0_8px_rgba(116,235,180,0.5)]';
            }
            return (
              <div
                key={`${q.compound.id}-${idx}`}
                className={`h-2.5 rounded-[2px] border transition-colors ${segmentClass}`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {currentStreak >= 2 && (
            <span className="hidden sm:flex font-mono text-[11px] font-semibold px-2 py-1 rounded bg-[#bf5d17]/25 border border-[#e38e40]/60 text-[#f5b06b] items-center gap-1 tabular-nums">
              <Flame className="w-3.5 h-3.5" />
              SERİ ×{currentStreak}
            </span>
          )}
          <span className="font-mono text-xs sm:text-sm font-semibold text-emerald-200 tabular-nums">
            {formattedIndex}/{formattedTotal}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="lab-panel rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded bg-[#0c2920] border border-emerald-400/30 text-emerald-200">
              {EXAM_LEVEL_LABELS[compound.examLevel]}
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-400/20 text-emerald-100/80">
              {CATEGORY_LABELS[compound.category]}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {currentStreak >= 2 && (
              <span className="sm:hidden font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-[#bf5d17]/25 border border-[#e38e40]/60 text-[#f5b06b] flex items-center gap-1 tabular-nums">
                <Flame className="w-3 h-3" />
                ×{currentStreak}
              </span>
            )}
            {compound.isHighYield && (
              <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-[#bf5d17]/20 border border-[#e38e40]/50 text-[#f5b06b]">
                ÖSYM KRİTİK
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm sm:text-base text-emerald-100/80 mb-3">
            {type === 'FORMULA_TO_NAME'
              ? 'Aşağıdaki formül hangi bileşiğe aittir?'
              : 'Adı verilen bileşiğin formülü hangisidir?'}
          </p>

          <div className="lab-lcd rounded-xl px-3 sm:px-4 py-5 sm:py-6 text-center overflow-hidden">
            {type === 'FORMULA_TO_NAME' ? (
              <div className="text-[28px] sm:text-[36px] leading-tight font-bold text-[#F2D082] break-words">
                <FormulaText formula={compound.formula} />
              </div>
            ) : (
              <div className="text-lg sm:text-2xl font-semibold text-[#F2D082] leading-snug">
                {formatCompoundNameForPrompt(compound)}
              </div>
            )}
          </div>
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {choices.map((choice, idx) => {
            const isThisCorrect = choice.id === compound.id;
            const isThisSelected = choice.id === selectedChoiceId;

            let cardStyle =
              'bg-[#0f2b21]/85 border-emerald-400/25 text-emerald-50 hover:border-emerald-400/55 hover:bg-[#14392c]';
            let letterStyle =
              'bg-[#081d15] border-emerald-400/25 text-emerald-200/80';

            if (isAnswered) {
              if (isThisCorrect) {
                cardStyle =
                  'bg-[#134733]/90 border-[#34d399] text-white shadow-[0_0_16px_rgba(52,211,153,0.28)]';
                letterStyle = 'bg-[#22c58b] border-[#6ee7b7] text-[#042216]';
              } else if (isThisSelected) {
                cardStyle =
                  'bg-[#471a1a]/90 border-[#ef4444] text-red-100';
                letterStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
              } else {
                cardStyle =
                  'bg-[#0b2018]/50 border-emerald-400/10 text-emerald-100/45';
                letterStyle = 'bg-[#081711] border-emerald-400/10 text-emerald-100/35';
              }
            }

            return (
              <button
                key={choice.id}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectChoice(choice.id)}
                className={`min-h-[56px] w-full rounded-xl border p-3.5 flex items-center justify-between gap-3 text-left transition-all ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                } ${cardStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-md border font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${letterStyle}`}
                  >
                    {CHOICE_LETTERS[idx]}
                  </span>
                  <div className="min-w-0">
                    {type === 'FORMULA_TO_NAME' ? (
                      <div className="text-sm sm:text-base font-medium leading-snug">
                        {formatCompoundNameForPrompt(choice)}
                      </div>
                    ) : (
                      <div className="text-base sm:text-lg font-semibold">
                        <FormulaText formula={choice.formula} />
                      </div>
                    )}
                  </div>
                </div>

                {isAnswered && isThisCorrect && (
                  <Check className="w-5 h-5 text-[#6AD6A0] shrink-0" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <X className="w-5 h-5 text-[#f87171] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Feedback + Exam Tip */}
        {isAnswered && (
          <div className="space-y-4 pt-1">
            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                isCorrect
                  ? 'bg-[#0f3829]/80 border-[#34d399]/50'
                  : 'bg-[#3b1817]/80 border-[#ef4444]/50'
              }`}
            >
              <div
                className={`font-semibold text-sm flex items-center gap-2 ${
                  isCorrect ? 'text-[#6AD6A0]' : 'text-[#fca5a5]'
                }`}
              >
                {isCorrect ? (
                  <span>Doğru!</span>
                ) : (
                  <span>
                    Doğrusu:{' '}
                    {type === 'FORMULA_TO_NAME' ? (
                      formatCompoundNameForPrompt(compound)
                    ) : (
                      <FormulaText formula={compound.formula} className="text-[#F2D082]" />
                    )}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#f5b06b] font-semibold mr-1.5">
                  ÖSYM NOTU:
                </span>
                {compound.examTip}
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="w-full min-h-[48px] rounded-xl lab-cta-emerald font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>{isLast ? 'Sonuçları Gör' : 'Sonraki Soru'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
