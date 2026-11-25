import {ArrowRight, Check, Flame, X} from 'lucide-react';
import type {FC} from 'react';
import {HISTORY_CATEGORY_LABELS, HISTORY_EXAM_LEVEL_LABELS} from '../../data/history';
import type {HistoryAnswerRecord, HistoryQuestion} from '../../types/history';

interface HistTestActiveViewProps {
  questions: HistoryQuestion[];
  currentIndex: number;
  answers: HistoryAnswerRecord[];
  currentStreak: number;
  selectedId: string | null;
  onSelectChoice: (choiceId: string, isCorrect: boolean) => void;
  onNext: () => void;
  onExit: () => void;
}

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

export const HistTestActiveView: FC<HistTestActiveViewProps> = ({
  questions,
  currentIndex,
  answers,
  currentStreak,
  selectedId,
  onSelectChoice,
  onNext,
  onExit,
}) => {
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  const isAnswered = selectedId !== null;
  const isLast = currentIndex === questions.length - 1;
  const currentAnswer = answers[currentIndex];
  const isCorrect = currentAnswer ? currentAnswer.isCorrect : false;

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(questions.length).padStart(2, '0');

  const metaExamLevel =
    currentQuestion.kind === 'EXAM_STYLE'
      ? currentQuestion.examQuestion.examLevel
      : currentQuestion.term.examLevel;
  const metaCategory =
    currentQuestion.kind === 'EXAM_STYLE'
      ? currentQuestion.examQuestion.category
      : currentQuestion.term.category;
  const metaHighYield =
    currentQuestion.kind === 'EXAM_STYLE'
      ? currentQuestion.examQuestion.isHighYield
      : currentQuestion.term.isHighYield;
  const examTipText =
    currentQuestion.kind === 'EXAM_STYLE'
      ? currentQuestion.examQuestion.examTip
      : currentQuestion.term.examTip;

  const correctOptionText =
    currentQuestion.kind === 'EXAM_STYLE'
      ? currentQuestion.shuffledChoices.find((c) => c.isCorrect)?.label ?? ''
      : `${currentQuestion.term.term} (${currentQuestion.term.shortCode})`;

  return (
    <section aria-label="Aktif Tarih Testi" className="w-full space-y-4">
      <div className="hist-panel rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label="Testten çık"
          className="min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] rounded-lg border border-orange-400/20 bg-[#281208] text-orange-100/80 hover:text-white hover:border-orange-400/45 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="flex-1 min-w-0 grid gap-[2px] sm:gap-1"
          style={{gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))`}}
          aria-label={`Soru ${currentIndex + 1} / ${questions.length}`}
        >
          {questions.map((q, idx) => {
            const ans = answers[idx];
            const keyId = q.kind === 'EXAM_STYLE' ? q.examQuestion.id : q.term.id;
            let segmentClass = 'bg-orange-950/80 border-orange-400/15';
            if (ans) {
              segmentClass = ans.isCorrect
                ? 'bg-[#ea580c] border-[#fdba74] shadow-[0_0_8px_rgba(249,115,22,0.45)]'
                : 'bg-[#7f1d1d] border-[#f87171]';
            } else if (idx === currentIndex) {
              segmentClass = 'bg-[#fb923c] border-[#ffedd5] shadow-[0_0_8px_rgba(251,146,60,0.5)]';
            }
            return (
              <div
                key={`${keyId}-${idx}`}
                className={`h-2.5 rounded-[2px] border transition-colors ${segmentClass}`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {currentStreak >= 2 && (
            <span className="hidden sm:flex font-mono text-[11px] font-semibold px-2 py-1 rounded bg-[#9a3412]/40 border border-orange-400/60 text-orange-200 items-center gap-1 tabular-nums">
              <Flame className="w-3.5 h-3.5" />
              SERİ ×{currentStreak}
            </span>
          )}
          <span className="font-mono text-xs sm:text-sm font-semibold text-orange-200 tabular-nums">
            {formattedIndex}/{formattedTotal}
          </span>
        </div>
      </div>

      <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-orange-200/85">
            <span className="font-mono font-semibold text-orange-300">
              {HISTORY_EXAM_LEVEL_LABELS[metaExamLevel]}
            </span>
            <span aria-hidden="true">·</span>
            <span>{HISTORY_CATEGORY_LABELS[metaCategory]}</span>
            {currentQuestion.kind === 'EXAM_STYLE' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-amber-200">YKS Senaryo</span>
              </>
            )}
            {metaHighYield && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-amber-300 font-semibold">ÖSYM Kritik</span>
              </>
            )}
          </div>

          {currentStreak >= 2 && (
            <span className="sm:hidden font-mono text-[11px] font-semibold text-orange-300 flex items-center gap-1 tabular-nums">
              <Flame className="w-3 h-3" />
              ×{currentStreak}
            </span>
          )}
        </div>

        <div>
          {currentQuestion.kind === 'EXAM_STYLE' ? (
            <div className="hist-lcd rounded-xl px-4 py-5 sm:py-6 text-left">
              <p className="text-sm sm:text-base font-medium text-[#ffedd5] leading-relaxed">
                {currentQuestion.examQuestion.stem}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm sm:text-base text-orange-100/80 mb-3">
                {currentQuestion.type === 'TERM_TO_DESC'
                  ? 'Verilen tarihî kavram veya olayın temel niteliği hangisidir?'
                  : 'Özelliği açıklanan tarihî olay veya kavram hangisidir?'}
              </p>

              <div className="hist-lcd rounded-xl px-4 py-5 sm:py-6 text-center overflow-hidden">
                {currentQuestion.type === 'TERM_TO_DESC' ? (
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs text-orange-300/85 tracking-wide">
                      {currentQuestion.term.shortCode} · {currentQuestion.term.eraOrDate}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#ffedd5] leading-snug">
                      {currentQuestion.term.term}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs text-orange-300/80">
                      {currentQuestion.term.eraOrDate}
                    </div>
                    <p className="text-sm sm:text-lg font-medium text-[#ffedd5] leading-relaxed">
                      {currentQuestion.term.mechanism}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.kind === 'EXAM_STYLE'
            ? currentQuestion.shuffledChoices.map((choice, idx) => {
                const isThisCorrect = choice.isCorrect;
                const isThisSelected = choice.id === selectedId;

                let cardStyle =
                  'bg-[#2d1409]/85 border-orange-400/25 text-orange-50 hover:border-orange-400/55 hover:bg-[#3d1c0c]';
                let letterStyle = 'bg-[#1a0b04] border-orange-400/25 text-orange-200/80';

                if (isAnswered) {
                  if (isThisCorrect) {
                    cardStyle =
                      'bg-[#4c1e0b]/90 border-[#fb923c] text-white shadow-[0_0_16px_rgba(249,115,22,0.28)]';
                    letterStyle = 'bg-[#f97316] border-[#ffedd5] text-white';
                  } else if (isThisSelected) {
                    cardStyle = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                    letterStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
                  } else {
                    cardStyle = 'bg-[#1a0b04]/55 border-orange-400/10 text-orange-100/45';
                    letterStyle = 'bg-[#120702] border-orange-400/10 text-orange-100/35';
                  }
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => onSelectChoice(choice.id, choice.isCorrect)}
                    className={`min-h-[60px] w-full rounded-xl border p-3.5 flex items-center justify-between gap-3 text-left transition-all ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                    } ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-md border font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 ${letterStyle}`}
                      >
                        {CHOICE_LETTERS[idx]}
                      </span>
                      <p className="text-xs sm:text-sm font-medium leading-snug">{choice.label}</p>
                    </div>

                    {isAnswered && isThisCorrect && (
                      <Check className="w-5 h-5 text-[#fdba74] shrink-0" />
                    )}
                    {isAnswered && isThisSelected && !isThisCorrect && (
                      <X className="w-5 h-5 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })
            : currentQuestion.choices.map((choice, idx) => {
                const isThisCorrect = choice.id === currentQuestion.term.id;
                const isThisSelected = choice.id === selectedId;

                let cardStyle =
                  'bg-[#2d1409]/85 border-orange-400/25 text-orange-50 hover:border-orange-400/55 hover:bg-[#3d1c0c]';
                let letterStyle = 'bg-[#1a0b04] border-orange-400/25 text-orange-200/80';

                if (isAnswered) {
                  if (isThisCorrect) {
                    cardStyle =
                      'bg-[#4c1e0b]/90 border-[#fb923c] text-white shadow-[0_0_16px_rgba(249,115,22,0.28)]';
                    letterStyle = 'bg-[#f97316] border-[#ffedd5] text-white';
                  } else if (isThisSelected) {
                    cardStyle = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                    letterStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
                  } else {
                    cardStyle = 'bg-[#1a0b04]/55 border-orange-400/10 text-orange-100/45';
                    letterStyle = 'bg-[#120702] border-orange-400/10 text-orange-100/35';
                  }
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => onSelectChoice(choice.id, isThisCorrect)}
                    className={`min-h-[60px] w-full rounded-xl border p-3.5 flex items-center justify-between gap-3 text-left transition-all ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                    } ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-md border font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 ${letterStyle}`}
                      >
                        {CHOICE_LETTERS[idx]}
                      </span>
                      <div className="min-w-0">
                        {currentQuestion.type === 'TERM_TO_DESC' ? (
                          <p className="text-xs sm:text-sm font-medium leading-snug">
                            {choice.mechanism}
                          </p>
                        ) : (
                          <div>
                            <div className="text-sm sm:text-base font-semibold leading-snug">
                              {choice.term}
                            </div>
                            <div className="font-mono text-[11px] text-orange-200/70 mt-0.5">
                              {choice.shortCode}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {isAnswered && isThisCorrect && (
                      <Check className="w-5 h-5 text-[#fdba74] shrink-0" />
                    )}
                    {isAnswered && isThisSelected && !isThisCorrect && (
                      <X className="w-5 h-5 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })}
        </div>

        {isAnswered && (
          <div className="space-y-4 pt-1">
            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                isCorrect
                  ? 'bg-[#421a09]/80 border-[#fb923c]/50'
                  : 'bg-[#3d1414]/80 border-[#ef4444]/50'
              }`}
            >
              <div
                className={`font-semibold text-sm flex items-center gap-2 ${
                  isCorrect ? 'text-[#fdba74]' : 'text-[#fca5a5]'
                }`}
              >
                {isCorrect ? <span>Doğru!</span> : <span>Doğrusu: {correctOptionText}</span>}
              </div>
              <p className="text-xs sm:text-sm text-orange-50/90 leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-semibold mr-1.5">
                  ÖSYM NOTU:
                </span>
                {examTipText}
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="w-full min-h-[48px] rounded-xl hist-cta-orange font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
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
