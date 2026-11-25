import {Brain, Check, Layers, RefreshCw, Scale, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  buildThinkerQuizItem,
  PHIL_DISCIPLINES,
  PHIL_REASONING_ITEMS,
  PHIL_THINKERS,
  REASONING_TYPE_LABELS,
  THINKER_ERA_LABELS,
  type ReasoningType,
  type ThinkerEra,
} from '../../utils/philosophyLogic';

type PhilLabMode = 'THINKERS' | 'REASONING' | 'DISCIPLINES';

const REASONING_CHOICES: ReasoningType[] = [
  'TUMDENGELIM',
  'TUMEVARIM',
  'ANALOJI',
  'ONERME_DEGIL',
  'CELISKI_SAFSATA',
];

export const PhilLabView: FC = () => {
  const [labMode, setLabMode] = useState<PhilLabMode>('THINKERS');

  // --- Tab 1: Filozof & Akım Atölyesi ---
  const [thinkerQuiz, setThinkerQuiz] = useState(() => buildThinkerQuizItem(PHIL_THINKERS));
  const [selectedThinkerChoice, setSelectedThinkerChoice] = useState<string | null>(null);
  const [thinkerScore, setThinkerScore] = useState({correct: 0, total: 0});
  const [eraFilter, setEraFilter] = useState<'ALL' | ThinkerEra>('ALL');

  const filteredThinkers = useMemo(
    () =>
      eraFilter === 'ALL'
        ? PHIL_THINKERS
        : PHIL_THINKERS.filter((t) => t.era === eraFilter),
    [eraFilter],
  );

  const handlePickThinker = (name: string) => {
    if (selectedThinkerChoice !== null) return;
    setSelectedThinkerChoice(name);
    const ok = name === thinkerQuiz.target.thinker;
    setThinkerScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextThinker = () => {
    setSelectedThinkerChoice(null);
    setThinkerQuiz(buildThinkerQuizItem(PHIL_THINKERS));
  };

  // --- Tab 2: Akıl Yürütme & Önerme Dedektifi ---
  const [reasoningIndex, setReasoningIndex] = useState(0);
  const [selectedReasoning, setSelectedReasoning] = useState<ReasoningType | null>(null);
  const [reasoningScore, setReasoningScore] = useState({correct: 0, total: 0});
  const activeReasoning = PHIL_REASONING_ITEMS[reasoningIndex % PHIL_REASONING_ITEMS.length];

  const handlePickReasoning = (cat: ReasoningType) => {
    if (selectedReasoning !== null) return;
    setSelectedReasoning(cat);
    const ok = cat === activeReasoning.category;
    setReasoningScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextReasoning = () => {
    setSelectedReasoning(null);
    setReasoningIndex((prev) => (prev + 1) % PHIL_REASONING_ITEMS.length);
  };

  // --- Tab 3: Felsefe Disiplinleri Matrisi ---
  const [selectedDiscId, setSelectedDiscId] = useState(PHIL_DISCIPLINES[0].id);
  const selectedDisc = useMemo(
    () => PHIL_DISCIPLINES.find((d) => d.id === selectedDiscId) ?? PHIL_DISCIPLINES[0],
    [selectedDiscId],
  );

  return (
    <section aria-label="Felsefe Atölyesi" className="w-full space-y-4">
      {/* Lab Mode Tabs */}
      <div className="grid grid-cols-3 rounded-xl bg-[#080c1c]/85 border border-indigo-400/20 p-1 gap-1">
        <button
          type="button"
          onClick={() => setLabMode('THINKERS')}
          aria-pressed={labMode === 'THINKERS'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'THINKERS'
              ? 'phil-active-indigo font-semibold'
              : 'text-indigo-100/75 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4 shrink-0" />
          <span className="truncate">Filozoflar</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('REASONING')}
          aria-pressed={labMode === 'REASONING'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'REASONING'
              ? 'phil-active-indigo font-semibold'
              : 'text-indigo-100/75 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 shrink-0" />
          <span className="truncate">Akıl Yürütme</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('DISCIPLINES')}
          aria-pressed={labMode === 'DISCIPLINES'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'DISCIPLINES'
              ? 'phil-active-indigo font-semibold'
              : 'text-indigo-100/75 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span className="truncate">Disiplinler</span>
        </button>
      </div>

      {/* TAB 1: FİLOZOF & AKIM ATÖLYESİ */}
      {labMode === 'THINKERS' && (
        <div className="space-y-4">
          <div className="phil-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Tez &amp; Özdeyiş → Filozof Eşleştirme
                </h2>
                <p className="text-xs text-indigo-200/75">
                  Felsefe tarihindeki temel görüşün veya sözün hangi düşünürün yaklaşımı olduğunu bul
                </p>
              </div>
              <div className="font-mono text-xs text-indigo-200 tabular-nums">
                Skor: {thinkerScore.correct}/{thinkerScore.total}
              </div>
            </div>

            <div className="phil-lcd rounded-xl p-4 sm:p-5 text-center space-y-2">
              <div className="font-mono text-xs text-indigo-300/85">
                {thinkerQuiz.target.schoolOrConcept}
              </div>
              <p className="text-base sm:text-lg font-medium text-[#e0e7ff] max-w-xl mx-auto leading-relaxed">
                “{thinkerQuiz.target.famousQuoteOrThesis}”
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {thinkerQuiz.choices.map((name) => {
                const answered = selectedThinkerChoice !== null;
                const isRight = name === thinkerQuiz.target.thinker;
                const isPicked = name === selectedThinkerChoice;

                let cls =
                  'bg-[#131a3d]/85 border-indigo-400/25 text-indigo-50 hover:border-indigo-400/55 hover:bg-[#1a2352]';
                if (answered) {
                  if (isRight) cls = 'bg-[#25286b]/90 border-[#818cf8] text-white';
                  else if (isPicked) cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                  else cls = 'bg-[#090e22]/55 border-indigo-400/10 text-indigo-100/45';
                }

                return (
                  <button
                    key={name}
                    type="button"
                    disabled={answered}
                    onClick={() => handlePickThinker(name)}
                    className={`min-h-[48px] px-4 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 text-left transition-all ${
                      answered ? 'cursor-default' : 'cursor-pointer'
                    } ${cls}`}
                  >
                    <span>{name}</span>
                    {answered && isRight && <Check className="w-4 h-4 text-[#a5b4fc] shrink-0" />}
                    {answered && isPicked && !isRight && (
                      <X className="w-4 h-4 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedThinkerChoice !== null && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM NOTU:</span>
                  {thinkerQuiz.target.examTip}
                </p>
                <button
                  type="button"
                  onClick={handleNextThinker}
                  className="min-h-[44px] px-4 rounded-xl phil-cta-indigo text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Yeni Filozof</span>
                </button>
              </div>
            )}
          </div>

          <div className="phil-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-white">
                Çağlara Göre Filozoflar Dizini ({filteredThinkers.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'ANTIK', 'ORTA', 'YENI_AYDINLANMA', 'CAGDAS_TURK'] as const).map(
                  (era) => (
                    <button
                      key={era}
                      type="button"
                      onClick={() => setEraFilter(era)}
                      aria-pressed={eraFilter === era}
                      className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                        eraFilter === era
                          ? 'phil-active-indigo font-semibold'
                          : 'bg-[#101633]/80 border border-indigo-400/20 text-indigo-100/80 hover:text-white'
                      }`}
                    >
                      {THINKER_ERA_LABELS[era]}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredThinkers.map((item) => (
                <div key={item.id} className="phil-lcd rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-base font-bold text-[#e0e7ff]">
                      {item.thinker}
                    </span>
                    <span className="font-mono text-[11px] text-indigo-300">
                      {THINKER_ERA_LABELS[item.era]}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-indigo-200/80">{item.schoolOrConcept}</div>
                  <p className="text-xs text-indigo-50/85 leading-relaxed">
                    {item.famousQuoteOrThesis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AKIL YÜRÜTME & ÖNERME DEDEKTİFİ */}
      {labMode === 'REASONING' && (
        <div className="phil-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Akıl Yürütme, Önerme &amp; Safsata Çözümleyici
              </h2>
              <p className="text-xs text-indigo-200/75">
                Verilen argüman veya cümlenin mantıksal türünü belirle
              </p>
            </div>
            <div className="font-mono text-xs text-indigo-200 tabular-nums">
              {reasoningIndex + 1}/{PHIL_REASONING_ITEMS.length} · Skor: {reasoningScore.correct}/
              {reasoningScore.total}
            </div>
          </div>

          <div className="phil-lcd rounded-xl p-5 text-center">
            <p className="text-base sm:text-lg font-medium text-[#e0e7ff] leading-relaxed">
              “{activeReasoning.statement}”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {REASONING_CHOICES.map((cat) => {
              const answered = selectedReasoning !== null;
              const isRight = cat === activeReasoning.category;
              const isPicked = cat === selectedReasoning;

              let cls =
                'bg-[#131a3d]/85 border-indigo-400/25 text-indigo-50 hover:border-indigo-400/55 hover:bg-[#1a2352]';
              if (answered) {
                if (isRight) cls = 'bg-[#25286b]/90 border-[#818cf8] text-white';
                else if (isPicked) cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                else cls = 'bg-[#090e22]/55 border-indigo-400/10 text-indigo-100/45';
              }

              return (
                <button
                  key={cat}
                  type="button"
                  disabled={answered}
                  onClick={() => handlePickReasoning(cat)}
                  className={`min-h-[48px] px-4 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 text-left transition-all ${
                    answered ? 'cursor-default' : 'cursor-pointer'
                  } ${cls}`}
                >
                  <span>{REASONING_TYPE_LABELS[cat]}</span>
                  {answered && isRight && <Check className="w-4 h-4 text-[#a5b4fc] shrink-0" />}
                  {answered && isPicked && !isRight && (
                    <X className="w-4 h-4 text-[#f87171] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedReasoning !== null && (
            <div className="rounded-xl bg-[#101633] border border-indigo-400/25 p-4 space-y-2.5">
              <p className="text-xs sm:text-sm text-indigo-50/90 leading-relaxed">
                <span className="font-mono font-semibold text-amber-300 mr-1.5">ÇÖZÜMLEME:</span>
                {activeReasoning.explanation}
              </p>
              <button
                type="button"
                onClick={handleNextReasoning}
                className="min-h-[42px] px-4 rounded-xl phil-cta-indigo text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Sonraki Örnek
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FELSEFE DİSİPLİNLERİ MATRİSİ */}
      {labMode === 'DISCIPLINES' && (
        <div className="phil-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white">
              Felsefenin 7 Temel Disiplini &amp; Soruları
            </h2>
            <p className="text-xs text-indigo-200/75">
              Her alanın temel problemini, anahtar kavramlarını ve akımlarını karşılaştır
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-3 items-start">
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[380px] pb-1">
              {PHIL_DISCIPLINES.map((disc) => {
                const active = selectedDisc.id === disc.id;
                return (
                  <button
                    key={disc.id}
                    type="button"
                    onClick={() => setSelectedDiscId(disc.id)}
                    className={`min-h-[46px] px-3 py-2 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'phil-active-indigo font-semibold'
                        : 'bg-[#101633]/80 border-indigo-400/20 text-indigo-100/80 hover:text-white'
                    }`}
                  >
                    <div className="text-xs sm:text-sm truncate">{disc.discipline}</div>
                  </button>
                );
              })}
            </div>

            <div className="phil-lcd rounded-xl p-5 space-y-3.5">
              <h3 className="text-xl font-bold text-[#e0e7ff]">{selectedDisc.discipline}</h3>

              <div className="rounded-lg bg-[#101633] border border-indigo-400/20 p-3">
                <div className="font-mono text-[11px] text-indigo-300 mb-1">TEMEL SORU</div>
                <p className="text-sm font-medium text-white">{selectedDisc.coreQuestion}</p>
              </div>

              <div className="rounded-lg bg-[#101633] border border-indigo-400/20 p-3">
                <div className="font-mono text-[11px] text-indigo-300 mb-1">ANAHTAR KAVRAMLAR</div>
                <p className="text-xs sm:text-sm text-indigo-100/90">{selectedDisc.keyConcepts}</p>
              </div>

              <div className="rounded-lg bg-[#101633] border border-indigo-400/20 p-3">
                <div className="font-mono text-[11px] text-amber-300 mb-1">BAŞLICA AKIMLAR</div>
                <p className="text-xs sm:text-sm text-amber-100/90">{selectedDisc.mainSchools}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
