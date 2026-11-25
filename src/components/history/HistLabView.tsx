import {Building2, Check, Clock, RefreshCw, ScrollText, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  buildBattleQuizItem,
  buildChronologyChallenge,
  HIST_BATTLES_TREATIES,
  HIST_INSTITUTIONS,
  HIST_TIMELINE_EVENTS,
  TIMELINE_ERA_LABELS,
  type TimelineEra,
} from '../../utils/historyLogic';

type HistLabMode = 'CHRONOLOGY' | 'BATTLES' | 'INSTITUTIONS';

export const HistLabView: FC = () => {
  const [labMode, setLabMode] = useState<HistLabMode>('CHRONOLOGY');

  // --- Tab 1: Kronoloji Laboratuvarı ---
  const [eraFilter, setEraFilter] = useState<'ALL' | TimelineEra>('ALL');
  const [chronoChallenge, setChronoChallenge] = useState(() =>
    buildChronologyChallenge(HIST_TIMELINE_EVENTS),
  );
  const [selectedChronoId, setSelectedChronoId] = useState<string | null>(null);
  const [chronoScore, setChronoScore] = useState({correct: 0, total: 0});

  const filteredTimeline = useMemo(
    () =>
      eraFilter === 'ALL'
        ? HIST_TIMELINE_EVENTS
        : HIST_TIMELINE_EVENTS.filter((e) => e.era === eraFilter),
    [eraFilter],
  );

  const handlePickChrono = (eventId: string) => {
    if (selectedChronoId !== null) return;
    setSelectedChronoId(eventId);
    const isOk = eventId === chronoChallenge.earliestId;
    setChronoScore((prev) => ({
      correct: prev.correct + (isOk ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextChrono = () => {
    setSelectedChronoId(null);
    setChronoChallenge(buildChronologyChallenge(HIST_TIMELINE_EVENTS));
  };

  // --- Tab 2: Antlaşma & Savaş Atölyesi ---
  const [battleQuiz, setBattleQuiz] = useState(() => buildBattleQuizItem(HIST_BATTLES_TREATIES));
  const [selectedBattleChoice, setSelectedBattleChoice] = useState<string | null>(null);
  const [battleScore, setBattleScore] = useState({correct: 0, total: 0});
  const [selectedTreatyId, setSelectedTreatyId] = useState(HIST_BATTLES_TREATIES[0].id);

  const selectedTreaty = useMemo(
    () => HIST_BATTLES_TREATIES.find((t) => t.id === selectedTreatyId) ?? HIST_BATTLES_TREATIES[0],
    [selectedTreatyId],
  );

  const handlePickBattle = (name: string) => {
    if (selectedBattleChoice !== null) return;
    setSelectedBattleChoice(name);
    const ok = name === battleQuiz.target.name;
    setBattleScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextBattle = () => {
    setSelectedBattleChoice(null);
    setBattleQuiz(buildBattleQuizItem(HIST_BATTLES_TREATIES));
  };

  // --- Tab 3: Kurum & Teşkilat Rehberi ---
  const [selectedInstId, setSelectedInstId] = useState(HIST_INSTITUTIONS[0].id);
  const selectedInst = useMemo(
    () => HIST_INSTITUTIONS.find((i) => i.id === selectedInstId) ?? HIST_INSTITUTIONS[0],
    [selectedInstId],
  );

  return (
    <section aria-label="Tarih Laboratuvarı" className="w-full space-y-4">
      {/* Lab Mode Tabs */}
      <div className="grid grid-cols-3 rounded-xl bg-[#180a04]/85 border border-orange-400/20 p-1 gap-1">
        <button
          type="button"
          onClick={() => setLabMode('CHRONOLOGY')}
          aria-pressed={labMode === 'CHRONOLOGY'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'CHRONOLOGY'
              ? 'hist-active-orange font-semibold'
              : 'text-orange-100/75 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 shrink-0" />
          <span className="truncate">Kronoloji</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('BATTLES')}
          aria-pressed={labMode === 'BATTLES'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'BATTLES'
              ? 'hist-active-orange font-semibold'
              : 'text-orange-100/75 hover:text-white'
          }`}
        >
          <ScrollText className="w-4 h-4 shrink-0" />
          <span className="truncate">Antlaşma</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('INSTITUTIONS')}
          aria-pressed={labMode === 'INSTITUTIONS'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'INSTITUTIONS'
              ? 'hist-active-orange font-semibold'
              : 'text-orange-100/75 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4 shrink-0" />
          <span className="truncate">Kurumlar</span>
        </button>
      </div>

      {/* TAB 1: KRONOLOJİ LABORATUVARI */}
      {labMode === 'CHRONOLOGY' && (
        <div className="space-y-4">
          <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Önce Olanı Bul — Kronoloji Alıştırması
                </h2>
                <p className="text-xs text-orange-200/75">
                  Aşağıdaki dört tarihî olay arasından kronolojik olarak en erken gerçekleşeni seç
                </p>
              </div>
              <div className="font-mono text-xs text-orange-200 tabular-nums">
                Skor: {chronoScore.correct}/{chronoScore.total}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {chronoChallenge.events.map((ev) => {
                const answered = selectedChronoId !== null;
                const isRight = ev.id === chronoChallenge.earliestId;
                const isPicked = ev.id === selectedChronoId;

                let cls =
                  'bg-[#2b1308]/85 border-orange-400/25 text-orange-50 hover:border-orange-400/55 hover:bg-[#3a1a0b]';
                if (answered) {
                  if (isRight) cls = 'bg-[#4c1e0b]/90 border-[#fb923c] text-white';
                  else if (isPicked) cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                  else cls = 'bg-[#1a0b04]/55 border-orange-400/10 text-orange-100/45';
                }

                return (
                  <button
                    key={ev.id}
                    type="button"
                    disabled={answered}
                    onClick={() => handlePickChrono(ev.id)}
                    className={`min-h-[60px] px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                      answered ? 'cursor-default' : 'cursor-pointer'
                    } ${cls}`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{ev.title}</div>
                      {answered && (
                        <div className="font-mono text-xs text-amber-300 mt-0.5">{ev.yearLabel}</div>
                      )}
                    </div>
                    {answered && isRight && <Check className="w-4 h-4 text-[#fdba74] shrink-0" />}
                    {answered && isPicked && !isRight && (
                      <X className="w-4 h-4 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedChronoId !== null && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-xs sm:text-sm text-orange-50/90 leading-relaxed">
                  {
                    chronoChallenge.events.find((e) => e.id === chronoChallenge.earliestId)
                      ?.significance
                  }
                </p>
                <button
                  type="button"
                  onClick={handleNextChrono}
                  className="min-h-[44px] px-4 rounded-xl hist-cta-orange text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Yeni Set</span>
                </button>
              </div>
            )}
          </div>

          <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-white">
                MEBİ Tarih Zaman Şeridi ({filteredTimeline.length} Dönüm Noktası)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'ILK_TURK', 'SELCUKLU', 'OSMANLI', 'INKILAP'] as const).map((era) => (
                  <button
                    key={era}
                    type="button"
                    onClick={() => setEraFilter(era)}
                    aria-pressed={eraFilter === era}
                    className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                      eraFilter === era
                        ? 'hist-active-orange font-semibold'
                        : 'bg-[#281208]/80 border border-orange-400/20 text-orange-100/80 hover:text-white'
                    }`}
                  >
                    {TIMELINE_ERA_LABELS[era]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredTimeline.map((item) => (
                <div
                  key={item.id}
                  className="hist-lcd rounded-xl p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-orange-300 tabular-nums">
                      {item.yearLabel}
                    </span>
                    <span className="font-mono text-[11px] text-orange-200/65">
                      {TIMELINE_ERA_LABELS[item.era]}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <p className="text-xs text-orange-100/80 leading-relaxed">{item.significance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANTLAŞMA & SAVAŞ ATÖLYESİ */}
      {labMode === 'BATTLES' && (
        <div className="space-y-4">
          <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Madde &amp; Taraf → Antlaşma / Savaş Tanıma
                </h2>
                <p className="text-xs text-orange-200/75">
                  Verilen yıl, taraflar ve kilit maddeden hareketle doğru tarihî olayı eşleştir
                </p>
              </div>
              <div className="font-mono text-xs text-orange-200 tabular-nums">
                Skor: {battleScore.correct}/{battleScore.total}
              </div>
            </div>

            <div className="hist-lcd rounded-xl p-4 sm:p-5 text-center space-y-2">
              <div className="font-mono text-xs text-orange-300">
                {battleQuiz.target.year} · {battleQuiz.target.parties}
              </div>
              <p className="text-sm sm:text-base font-medium text-[#ffedd5] max-w-xl mx-auto leading-relaxed">
                {battleQuiz.target.keyClause}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {battleQuiz.choices.map((name) => {
                const answered = selectedBattleChoice !== null;
                const isRight = name === battleQuiz.target.name;
                const isPicked = name === selectedBattleChoice;

                let cls =
                  'bg-[#2b1308]/85 border-orange-400/25 text-orange-50 hover:border-orange-400/55 hover:bg-[#3a1a0b]';
                if (answered) {
                  if (isRight) cls = 'bg-[#4c1e0b]/90 border-[#fb923c] text-white';
                  else if (isPicked) cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                  else cls = 'bg-[#1a0b04]/55 border-orange-400/10 text-orange-100/45';
                }

                return (
                  <button
                    key={name}
                    type="button"
                    disabled={answered}
                    onClick={() => handlePickBattle(name)}
                    className={`min-h-[48px] px-4 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 text-left transition-all ${
                      answered ? 'cursor-default' : 'cursor-pointer'
                    } ${cls}`}
                  >
                    <span>{name}</span>
                    {answered && isRight && <Check className="w-4 h-4 text-[#fdba74] shrink-0" />}
                    {answered && isPicked && !isRight && (
                      <X className="w-4 h-4 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedBattleChoice !== null && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM NOTU:</span>
                  {battleQuiz.target.examTip}
                </p>
                <button
                  type="button"
                  onClick={handleNextBattle}
                  className="min-h-[44px] px-4 rounded-xl hist-cta-orange text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sonraki Olay</span>
                </button>
              </div>
            )}
          </div>

          <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Kritik Savaş &amp; Antlaşma Kartları ({HIST_BATTLES_TREATIES.length})
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-3 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                {HIST_BATTLES_TREATIES.map((entry) => {
                  const active = selectedTreaty.id === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setSelectedTreatyId(entry.id)}
                      className={`min-h-[54px] px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#4c1e0b]/90 border-[#fb923c] text-white'
                          : 'bg-[#261107]/80 border-orange-400/20 text-orange-100/85 hover:border-orange-400/45'
                      }`}
                    >
                      <div className="text-sm font-semibold truncate">{entry.name}</div>
                      <div className="font-mono text-xs text-orange-200/70 mt-0.5 tabular-nums">
                        {entry.year}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="hist-lcd rounded-xl p-4 space-y-2.5">
                <div className="font-mono text-xs text-orange-300">
                  {selectedTreaty.year} · {selectedTreaty.parties}
                </div>
                <div className="text-lg font-bold text-white">{selectedTreaty.name}</div>
                <p className="text-xs sm:text-sm text-orange-50/90 leading-relaxed">
                  {selectedTreaty.keyClause}
                </p>
                <div className="pt-2 border-t border-orange-400/20 text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM İPUCU:</span>
                  {selectedTreaty.examTip}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KURUM & TEŞKİLAT REHBERİ */}
      {labMode === 'INSTITUTIONS' && (
        <div className="hist-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white">
              Türk – İslam &amp; Osmanlı Devlet Teşkilatı
            </h2>
            <p className="text-xs text-orange-200/75">
              Kurultaydan Divan-ı Hümayun’a, Tımar’dan Tevhid-i Tedrisat’a kilit kurumları incele
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-3 items-start">
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[380px] pb-1">
              {HIST_INSTITUTIONS.map((inst) => {
                const active = selectedInst.id === inst.id;
                return (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => setSelectedInstId(inst.id)}
                    className={`min-h-[46px] px-3 py-2 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'hist-active-orange font-semibold'
                        : 'bg-[#281208]/80 border-orange-400/20 text-orange-100/80 hover:text-white'
                    }`}
                  >
                    <div className="text-xs sm:text-sm truncate">{inst.name}</div>
                    <div className="text-[11px] opacity-80 truncate">{inst.period}</div>
                  </button>
                );
              })}
            </div>

            <div className="hist-lcd rounded-xl p-5 space-y-3.5">
              <div className="font-mono text-xs text-orange-300">{selectedInst.period}</div>
              <h3 className="text-xl font-bold text-[#ffedd5]">{selectedInst.name}</h3>
              <p className="text-sm text-orange-50/90 leading-relaxed">{selectedInst.role}</p>
              <div className="pt-2.5 border-t border-orange-400/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM İPUCU:</span>
                {selectedInst.examTip}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
