import {BookOpenCheck, Check, Globe, RefreshCw, Scale, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  buildRelConceptQuiz,
  REL_BELIEF_SYSTEMS,
  REL_CONCEPT_ITEMS,
  REL_TRADITIONS,
} from '../../utils/religionLogic';

type RelLabMode = 'CONCEPTS' | 'TRADITIONS' | 'BELIEFS';

export const RelLabView: FC = () => {
  const [labMode, setLabMode] = useState<RelLabMode>('CONCEPTS');

  // --- Tab 1: Kavram & Hüküm Atölyesi ---
  const [conceptQuiz, setConceptQuiz] = useState(() => buildRelConceptQuiz(REL_CONCEPT_ITEMS));
  const [selectedConceptChoice, setSelectedConceptChoice] = useState<string | null>(null);
  const [conceptScore, setConceptScore] = useState({correct: 0, total: 0});
  const [conceptGroup, setConceptGroup] = useState<'ALL' | 'EFAL' | 'ESMA' | 'AHLAK'>('ALL');

  const filteredConcepts = useMemo(
    () =>
      conceptGroup === 'ALL'
        ? REL_CONCEPT_ITEMS
        : REL_CONCEPT_ITEMS.filter((item) => item.group === conceptGroup),
    [conceptGroup],
  );

  const handlePickConcept = (answer: string) => {
    if (selectedConceptChoice !== null) return;
    setSelectedConceptChoice(answer);
    const ok = answer === conceptQuiz.target.answer;
    setConceptScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextConcept = () => {
    setSelectedConceptChoice(null);
    setConceptQuiz(buildRelConceptQuiz(REL_CONCEPT_ITEMS));
  };

  // --- Tab 2: Mezhep & Tasavvuf Matrisi ---
  const [traditionType, setTraditionType] = useState<'ALL' | 'İtikadi' | 'Fıkhi' | 'Tasavvufi'>('ALL');
  const filteredTraditions = useMemo(
    () =>
      traditionType === 'ALL'
        ? REL_TRADITIONS
        : REL_TRADITIONS.filter((t) => t.type === traditionType),
    [traditionType],
  );

  // --- Tab 3: Dinler & İnanç Akımları ---
  const [beliefCat, setBeliefCat] = useState<'ALL' | 'Semavi Din' | 'Doğu Dini' | 'İnanç Akımı'>('ALL');
  const filteredBeliefs = useMemo(
    () =>
      beliefCat === 'ALL'
        ? REL_BELIEF_SYSTEMS
        : REL_BELIEF_SYSTEMS.filter((b) => b.category === beliefCat),
    [beliefCat],
  );

  return (
    <section aria-label="Din Kültürü Atölyesi" className="w-full space-y-4">
      {/* Lab Mode Tabs */}
      <div className="grid grid-cols-3 rounded-xl bg-[#041515]/85 border border-teal-400/20 p-1 gap-1">
        <button
          type="button"
          onClick={() => setLabMode('CONCEPTS')}
          aria-pressed={labMode === 'CONCEPTS'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'CONCEPTS'
              ? 'rel-active-teal font-semibold'
              : 'text-teal-100/75 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 shrink-0" />
          <span className="truncate">Kavram &amp; Hüküm</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('TRADITIONS')}
          aria-pressed={labMode === 'TRADITIONS'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'TRADITIONS'
              ? 'rel-active-teal font-semibold'
              : 'text-teal-100/75 hover:text-white'
          }`}
        >
          <BookOpenCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">Mezhepler</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('BELIEFS')}
          aria-pressed={labMode === 'BELIEFS'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'BELIEFS'
              ? 'rel-active-teal font-semibold'
              : 'text-teal-100/75 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4 shrink-0" />
          <span className="truncate">Dinler &amp; Akım</span>
        </button>
      </div>

      {/* TAB 1: KAVRAM & HÜKÜM ATÖLYESİ */}
      {labMode === 'CONCEPTS' && (
        <div className="space-y-4">
          <div className="rel-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Hüküm, Esmayıhüsna ve Ahlak Kavramı Tanıma
                </h2>
                <p className="text-xs text-teal-200/75">
                  Verilen örnek ve ipucundan doğru Efâl-i Mükellefin veya Kur’an kavramını seç
                </p>
              </div>
              <div className="font-mono text-xs text-teal-200 tabular-nums">
                Skor: {conceptScore.correct}/{conceptScore.total}
              </div>
            </div>

            <div className="rel-lcd rounded-xl p-4 sm:p-5 text-center space-y-1.5">
              <div className="font-mono text-xs text-teal-300/85">
                {conceptQuiz.target.title}
              </div>
              <p className="text-sm sm:text-base font-medium text-[#ccfbf1] max-w-xl mx-auto leading-relaxed">
                {conceptQuiz.target.clue}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {conceptQuiz.choices.map((choice) => {
                const answered = selectedConceptChoice !== null;
                const isRight = choice === conceptQuiz.target.answer;
                const isPicked = choice === selectedConceptChoice;

                let cls =
                  'bg-[#082424]/85 border-teal-400/25 text-teal-50 hover:border-teal-400/55 hover:bg-[#0c3131]';
                if (answered) {
                  if (isRight) cls = 'bg-[#0b3b39]/90 border-[#2dd4bf] text-white';
                  else if (isPicked) cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                  else cls = 'bg-[#041616]/55 border-teal-400/10 text-teal-100/45';
                }

                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={answered}
                    onClick={() => handlePickConcept(choice)}
                    className={`min-h-[48px] px-4 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 text-left transition-all ${
                      answered ? 'cursor-default' : 'cursor-pointer'
                    } ${cls}`}
                  >
                    <span>{choice}</span>
                    {answered && isRight && <Check className="w-4 h-4 text-[#5eead4] shrink-0" />}
                    {answered && isPicked && !isRight && (
                      <X className="w-4 h-4 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedConceptChoice !== null && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM NOTU:</span>
                  {conceptQuiz.target.note}
                </p>
                <button
                  type="button"
                  onClick={handleNextConcept}
                  className="min-h-[44px] px-4 rounded-xl rel-cta-teal text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sonraki Kavram</span>
                </button>
              </div>
            )}
          </div>

          <div className="rel-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-white">
                Mükellef Hükümleri, Esmayıhüsna ve Ahlak Kartları
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  {id: 'ALL', label: 'Tümü'},
                  {id: 'EFAL', label: 'Efâl-i Mükellefin'},
                  {id: 'ESMA', label: 'Esmayıhüsna'},
                  {id: 'AHLAK', label: 'Kur’an Ahlakı'},
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setConceptGroup(tab.id as typeof conceptGroup)}
                    aria-pressed={conceptGroup === tab.id}
                    className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                      conceptGroup === tab.id
                        ? 'rel-active-teal font-semibold'
                        : 'bg-[#072020]/80 border border-teal-400/20 text-teal-100/80 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredConcepts.map((item) => (
                <div key={item.id} className="rel-lcd rounded-xl p-4 space-y-1.5">
                  <div className="font-mono text-xs font-semibold text-teal-300">{item.answer}</div>
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <p className="text-xs text-teal-100/80 leading-relaxed">{item.clue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEZHEP & TASAVVUF MATRİSİ */}
      {labMode === 'TRADITIONS' && (
        <div className="rel-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                İtikadi, Fıkhi Mezhepler &amp; Tasavvuf Geleneği
              </h2>
              <p className="text-xs text-teal-200/75">
                Kurucular, temel kaynak eserler ve ayırt edici ilkeleri karşılaştır
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['ALL', 'İtikadi', 'Fıkhi', 'Tasavvufi'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTraditionType(type)}
                  aria-pressed={traditionType === type}
                  className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                    traditionType === type
                      ? 'rel-active-teal font-semibold'
                      : 'bg-[#072020]/80 border border-teal-400/20 text-teal-100/80 hover:text-white'
                  }`}
                >
                  {type === 'ALL' ? 'Tümü' : type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTraditions.map((tr) => (
              <div key={tr.id} className="rel-lcd rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base font-bold text-[#ccfbf1]">{tr.name}</span>
                  <span className="font-mono text-xs text-teal-300">{tr.type}</span>
                </div>
                <div className="font-mono text-xs text-teal-200/75">{tr.founderOrCenter}</div>
                <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed">{tr.hallmark}</p>
                <div className="pt-2 border-t border-teal-400/15 text-xs text-amber-200/90">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM İPUCU:</span>
                  {tr.examTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DİNLER & İNANÇ AKIMLARI */}
      {labMode === 'BELIEFS' && (
        <div className="rel-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Yaşayan Dünya Dinleri &amp; Çağdaş İnanç Akımları
              </h2>
              <p className="text-xs text-teal-200/75">
                Kutsal metinler, temel semboller ve Teizm–Deizm–Agnostisizm farkları
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['ALL', 'Semavi Din', 'Doğu Dini', 'İnanç Akımı'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBeliefCat(cat)}
                  aria-pressed={beliefCat === cat}
                  className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                    beliefCat === cat
                      ? 'rel-active-teal font-semibold'
                      : 'bg-[#072020]/80 border border-teal-400/20 text-teal-100/80 hover:text-white'
                  }`}
                >
                  {cat === 'ALL' ? 'Tümü' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredBeliefs.map((entry) => (
              <div key={entry.id} className="rel-lcd rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base font-bold text-[#ccfbf1]">{entry.name}</span>
                  <span className="font-mono text-xs text-teal-300">{entry.category}</span>
                </div>
                <div className="text-xs font-semibold text-teal-200">
                  Kaynak / İlke: {entry.scriptureOrCore}
                </div>
                <div className="font-mono text-xs text-amber-200/85">{entry.symbolOrKey}</div>
                <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed">{entry.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
