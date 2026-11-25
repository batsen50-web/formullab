import {ArrowRight, Check, Flame, X} from 'lucide-react';
import type {FC} from 'react';
import {RELIGION_CATEGORY_LABELS, RELIGION_EXAM_LEVEL_LABELS} from '../../data/religion';
import type {ReligionAnswerRecord, ReligionQuestion} from '../../types/religion';

interface RelTestActiveViewProps {
  questions: ReligionQuestion[];
  currentIndex: number;
  answers: ReligionAnswerRecord[];
  currentStreak: number;
  selectedId: string | null;
  onSelectChoice: (choiceId: string, isCorrect: boolean) => void;
  onNext: () => void;
  onExit: () => void;
}

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

export const RelTestActiveView: FC<RelTestActiveViewProps> = ({
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
    <section aria-label="Aktif Din Kültürü Testi" className="w-full space-y-4">
      <div className="rel-panel rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label="Testten çık"
          className="min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] rounded-lg border border-teal-400/20 bg-[#072020] text-teal-100/80 hover:text-white hover:border-teal-400/45 flex items-center justify-center transition-colors cursor-pointer shrink-0"
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
            let segmentClass = 'bg-teal-950/80 border-teal-400/15';
            if (ans) {
              segmentClass = ans.isCorrect
                ? 'bg-[#0d9488] border-[#5eead4] shadow-[0_0_8px_rgba(20,184,166,0.45)]'
                : 'bg-[#7f1d1d] border-[#f87171]';
            } else if (idx === currentIndex) {
              segmentClass = 'bg-[#2dd4bf] border-[#ccfbf1] shadow-[0_0_8px_rgba(45,212,191,0.5)]';
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
            <span className="hidden sm:flex font-mono text-[11px] font-semibold px-2 py-1 rounded bg-[#115e59]/45 border border-teal-400/60 text-teal-200 items-center gap-1 tabular-nums">
              <Flame className="w-3.5 h-3.5" />
              SERİ ×{currentStreak}
            </span>
          )}
          <span className="font-mono text-xs sm:text-sm font-semibold text-teal-200 tabular-nums">
            {formattedIndex}/{formattedTotal}
          </span>
        </div>
      </div>

      <div className="rel-panel rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-teal-200/85">
            <span className="font-mono font-semibold text-teal-300">
              {RELIGION_EXAM_LEVEL_LABELS[metaExamLevel]}
            </span>
            <span aria-hidden="true">·</span>
            <span>{RELIGION_CATEGORY_LABELS[metaCategory]}</span>
            {currentQuestion.kind === 'EXAM_STYLE' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-cyan-200">YKS Senaryo</span>
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
            <span className="sm:hidden font-mono text-[11px] font-semibold text-teal-300 flex items-center gap-1 tabular-nums">
              <Flame className="w-3 h-3" />
              ×{currentStreak}
            </span>
          )}
        </div>

        <div>
          {currentQuestion.kind === 'EXAM_STYLE' ? (
            <div className="rel-lcd rounded-xl px-4 py-5 sm:py-6 text-left">
              <p className="text-sm sm:text-base font-medium text-[#ccfbf1] leading-relaxed">
                {currentQuestion.examQuestion.stem}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm sm:text-base text-teal-100/80 mb-3">
                {currentQuestion.type === 'TERM_TO_DESC'
                  ? 'Verilen dinî kavram veya ilkenin açıklaması hangisidir?'
                  : 'Tanımlanan Din Kültürü ve Ahlak Bilgisi kavramı hangisidir?'}
              </p>

              <div className="rel-lcd rounded-xl px-4 py-5 sm:py-6 text-center overflow-hidden">
                {currentQuestion.type === 'TERM_TO_DESC' ? (
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs text-teal-300/85 tracking-wide">
                      {currentQuestion.term.shortCode} · {currentQuestion.term.scopeOrSource}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#ccfbf1] leading-snug">
                      {currentQuestion.term.term}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs text-teal-300/80">
                      {currentQuestion.term.scopeOrSource}
                    </div>
                    <p className="text-sm sm:text-lg font-medium text-[#ccfbf1] leading-relaxed">
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
                  'bg-[#082424]/85 border-teal-400/25 text-teal-50 hover:border-teal-400/55 hover:bg-[#0c3131]';
                let letterStyle = 'bg-[#041515] border-teal-400/25 text-teal-200/80';

                if (isAnswered) {
                  if (isThisCorrect) {
                    cardStyle =
                      'bg-[#0b3b39]/90 border-[#2dd4bf] text-white shadow-[0_0_16px_rgba(20,184,166,0.28)]';
                    letterStyle = 'bg-[#14b8a6] border-[#ccfbf1] text-[#031f1d]';
                  } else if (isThisSelected) {
                    cardStyle = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                    letterStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
                  } else {
                    cardStyle = 'bg-[#041616]/55 border-teal-400/10 text-teal-100/45';
                    letterStyle = 'bg-[#030f0f] border-teal-400/10 text-teal-100/35';
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
                      <Check className="w-5 h-5 text-[#5eead4] shrink-0" />
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
                  'bg-[#082424]/85 border-teal-400/25 text-teal-50 hover:border-teal-400/55 hover:bg-[#0c3131]';
                let letterStyle = 'bg-[#041515] border-teal-400/25 text-teal-200/80';

                if (isAnswered) {
                  if (isThisCorrect) {
                    cardStyle =
                      'bg-[#0b3b39]/90 border-[#2dd4bf] text-white shadow-[0_0_16px_rgba(20,184,166,0.28)]';
                    letterStyle = 'bg-[#14b8a6] border-[#ccfbf1] text-[#031f1d]';
                  } else if (isThisSelected) {
                    cardStyle = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                    letterStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
                  } else {
                    cardStyle = 'bg-[#041616]/55 border-teal-400/10 text-teal-100/45';
                    letterStyle = 'bg-[#030f0f] border-teal-400/10 text-teal-100/35';
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
                            <div className="font-mono text-[11px] text-teal-200/70 mt-0.5">
                              {choice.shortCode}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {isAnswered && isThisCorrect && (
                      <Check className="w-5 h-5 text-[#5eead4] shrink-0" />
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
                  ? 'bg-[#093230]/80 border-[#2dd4bf]/50'
                  : 'bg-[#3d1414]/80 border-[#ef4444]/50'
              }`}
            >
              <div
                className={`font-semibold text-sm flex items-center gap-2 ${
                  isCorrect ? 'text-[#5eead4]' : 'text-[#fca5a5]'
                }`}
              >
                {isCorrect ? <span>Doğru!</span> : <span>Doğrusu: {correctOptionText}</span>}
              </div>
              <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-semibold mr-1.5">
                  ÖSYM NOTU:
                </span>
                {examTipText}
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="w-full min-h-[48px] rounded-xl rel-cta-teal font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
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
