import {ArrowLeft, ArrowRight, Check, FlaskConical, Sparkles, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {ANIONS, CATIONS} from '../data/ions';
import type {Compound} from '../types/chemistry';
import {crossIons, generateIonChallenge} from '../utils/ionLogic';
import {FormulaText} from './FormulaText';

interface IonLabViewProps {
  compounds: readonly Compound[];
  onSelectCompound: (compound: Compound) => void;
  onExit: () => void;
}

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

export const IonLabView: FC<IonLabViewProps> = ({
  compounds,
  onSelectCompound,
  onExit,
}) => {
  const [labMode, setLabMode] = useState<'explore' | 'challenge'>('explore');
  const [selectedCationId, setSelectedCationId] = useState('al');
  const [selectedAnionId, setSelectedAnionId] = useState('so4');

  const [challenge, setChallenge] = useState(() => generateIonChallenge(CATIONS, ANIONS));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState({correct: 0, total: 0});

  const selectedCation = useMemo(
    () => CATIONS.find((c) => c.id === selectedCationId) ?? CATIONS[0],
    [selectedCationId],
  );
  const selectedAnion = useMemo(
    () => ANIONS.find((a) => a.id === selectedAnionId) ?? ANIONS[0],
    [selectedAnionId],
  );

  const crossed = useMemo(
    () => crossIons(selectedCation, selectedAnion),
    [selectedCation, selectedAnion],
  );

  const matchedCompound = useMemo(
    () =>
      compounds.find(
        (c) => c.plainFormula.toLowerCase() === crossed.plainFormula.toLowerCase(),
      ) ?? null,
    [compounds, crossed.plainFormula],
  );

  const handleSelectChallengeChoice = (formulaChoice: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(formulaChoice);
    const isCorrect = formulaChoice === challenge.correctFormula;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextChallenge = () => {
    setChallenge(generateIonChallenge(CATIONS, ANIONS));
    setSelectedAnswer(null);
  };

  return (
    <section aria-label="İyon Çaprazlama Laboratuvarı" className="w-full space-y-4">
      {/* Top Bar */}
      <div className="lab-panel rounded-xl px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onExit}
          className="min-h-[44px] sm:min-h-[40px] px-2.5 sm:px-3 rounded-lg border border-emerald-400/20 bg-[#0d271e] text-emerald-100/80 hover:text-white hover:border-emerald-400/45 flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Test Kurulumu</span>
        </button>

        <div className="grid grid-cols-2 rounded-lg bg-[#091f17]/85 border border-emerald-400/20 p-1 gap-1">
          <button
            type="button"
            onClick={() => setLabMode('explore')}
            aria-pressed={labMode === 'explore'}
            className={`min-h-[36px] px-3 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              labMode === 'explore'
                ? 'lab-active-mint font-semibold'
                : 'text-emerald-100/75 hover:text-white'
            }`}
          >
            Çaprazla
          </button>
          <button
            type="button"
            onClick={() => setLabMode('challenge')}
            aria-pressed={labMode === 'challenge'}
            className={`min-h-[36px] px-3 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              labMode === 'challenge'
                ? 'lab-active-mint font-semibold'
                : 'text-emerald-100/75 hover:text-white'
            }`}
          >
            Pratik Yap
          </button>
        </div>
      </div>

      {labMode === 'explore' ? (
        <div className="lab-panel rounded-2xl p-4 sm:p-6 space-y-5">
          {/* Result LCD Display */}
          <div className="lab-lcd rounded-xl p-4 sm:p-5 text-center space-y-2.5">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono text-emerald-200/80">
              <span className="px-2.5 py-1 rounded bg-[#0c2920] border border-emerald-400/25">
                {selectedCation.symbol}
              </span>
              <span>+</span>
              <span className="px-2.5 py-1 rounded bg-[#0c2920] border border-emerald-400/25">
                {selectedAnion.symbol}
              </span>
              <span>→</span>
            </div>

            <div className="text-[32px] sm:text-[40px] font-bold text-[#F2D082] leading-tight break-words">
              <FormulaText formula={crossed.formula} />
            </div>

            <div className="text-base sm:text-lg font-semibold text-white">
              {crossed.systematicName}
            </div>

            <p className="text-xs text-[#A7B2AC] leading-relaxed max-w-md mx-auto">
              Yüklerin mutlak değerleri ({Math.abs(selectedCation.charge)} ve{' '}
              {Math.abs(selectedAnion.charge)}) çaprazlanır
              {crossed.gcdValue > 1
                ? ` ve EBOB (${crossed.gcdValue}) ile sadeleştirilir.`
                : '.'}
              {((selectedCation.isPolyatomic && crossed.cationCount > 1) ||
                (selectedAnion.isPolyatomic && crossed.anionCount > 1)) &&
                ' Çok atomlu kök 1’den fazla olduğunda paranteze alınır.'}
            </p>

            {matchedCompound && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onSelectCompound(matchedCompound)}
                  className="min-h-[40px] px-3.5 rounded-lg bg-[#143d2e] border border-emerald-400/35 text-emerald-200 hover:text-white text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Sözlükte İncele ({matchedCompound.commonName})</span>
                </button>
              </div>
            )}
          </div>

          {/* Cations & Anions Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2 className="font-mono text-[11px] tracking-wider uppercase text-emerald-100/80 font-medium">
                KATYON SEÇ (+)
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {CATIONS.map((cation) => {
                  const active = cation.id === selectedCationId;
                  return (
                    <button
                      key={cation.id}
                      type="button"
                      onClick={() => setSelectedCationId(cation.id)}
                      aria-pressed={active}
                      title={cation.name}
                      className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-mono transition-all cursor-pointer flex flex-col items-center justify-center ${
                        active
                          ? 'lab-active-mint font-semibold'
                          : 'bg-[#0f2c22]/85 border border-emerald-400/20 text-emerald-100/80 hover:border-emerald-400/45 hover:text-white'
                      }`}
                    >
                      <span>{cation.symbol}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-mono text-[11px] tracking-wider uppercase text-emerald-100/80 font-medium">
                ANYON / KÖK SEÇ (-)
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {ANIONS.map((anion) => {
                  const active = anion.id === selectedAnionId;
                  return (
                    <button
                      key={anion.id}
                      type="button"
                      onClick={() => setSelectedAnionId(anion.id)}
                      aria-pressed={active}
                      title={anion.name}
                      className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-mono transition-all cursor-pointer flex flex-col items-center justify-center ${
                        active
                          ? 'lab-active-mint font-semibold'
                          : 'bg-[#0f2c22]/85 border border-emerald-400/20 text-emerald-100/80 hover:border-emerald-400/45 hover:text-white'
                      }`}
                    >
                      <span>{anion.symbol}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lab-panel rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-emerald-200/80 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>İYON ÇAPRAZLAMA PRATİĞİ</span>
            </span>
            <span className="font-mono text-xs text-[#6AD6A0] tabular-nums">
              {score.correct} / {score.total} DOĞRU
            </span>
          </div>

          <div className="lab-lcd rounded-xl px-4 py-5 text-center space-y-2">
            <p className="text-xs sm:text-sm text-emerald-100/75">
              Aşağıdaki iyonların oluşturduğu iyonik bileşiğin doğru formülü hangisidir?
            </p>
            <div className="text-2xl sm:text-3xl font-bold text-[#F2D082] font-mono">
              {challenge.cation.symbol} + {challenge.anion.symbol}
            </div>
            <div className="text-sm text-[#A7B2AC]">{challenge.systematicName}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {challenge.choices.map((formulaOption, idx) => {
              const isAnswered = selectedAnswer !== null;
              const isCorrectChoice = formulaOption === challenge.correctFormula;
              const isSelected = formulaOption === selectedAnswer;

              let style =
                'bg-[#0f2b21]/85 border-emerald-400/25 text-emerald-50 hover:border-emerald-400/55 hover:bg-[#14392c]';
              let badgeStyle = 'bg-[#081d15] border-emerald-400/25 text-emerald-200/80';

              if (isAnswered) {
                if (isCorrectChoice) {
                  style =
                    'bg-[#134733]/90 border-[#34d399] text-white shadow-[0_0_16px_rgba(52,211,153,0.28)]';
                  badgeStyle = 'bg-[#22c58b] border-[#6ee7b7] text-[#042216]';
                } else if (isSelected) {
                  style = 'bg-[#471a1a]/90 border-[#ef4444] text-red-100';
                  badgeStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
                } else {
                  style = 'bg-[#0b2018]/50 border-emerald-400/10 text-emerald-100/45';
                  badgeStyle = 'bg-[#081711] border-emerald-400/10 text-emerald-100/35';
                }
              }

              return (
                <button
                  key={formulaOption}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectChallengeChoice(formulaOption)}
                  className={`min-h-[54px] w-full rounded-xl border p-3.5 flex items-center justify-between gap-3 text-left transition-all ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  } ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-md border font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${badgeStyle}`}
                    >
                      {CHOICE_LETTERS[idx]}
                    </span>
                    <span className="text-base sm:text-lg font-semibold">
                      <FormulaText formula={formulaOption} />
                    </span>
                  </div>
                  {isAnswered && isCorrectChoice && <Check className="w-5 h-5 text-[#6AD6A0]" />}
                  {isAnswered && isSelected && !isCorrectChoice && (
                    <X className="w-5 h-5 text-[#f87171]" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <button
              type="button"
              onClick={handleNextChallenge}
              className="w-full min-h-[48px] rounded-xl lab-cta-emerald font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Yeni İyon Çifti</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
