import {BookMarked, Check, Feather, RefreshCw, Sparkles, SpellCheck2, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  analyzeTurkishWordSound,
  buildWorkAuthorQuizItem,
  ORTHOGRAPHY_TRAPS,
  shuffleArray,
  VERSE_DEVICE_ITEMS,
  WORK_AUTHOR_CATEGORY_LABELS,
  WORK_AUTHOR_ITEMS,
  type WorkAuthorCategory,
} from '../../utils/literatureLogic';

type LitLabMode = 'WORKS' | 'POETRY' | 'LANGUAGE';

const PRESET_SOUND_WORDS = [
  'kömürlük',
  'geliyor',
  'gözlüyor',
  'bana',
  'minicik',
  'kaybolmak',
  'hukuku',
  'kavun',
  'elma',
];

export const LitLabView: FC = () => {
  const [labMode, setLabMode] = useState<LitLabMode>('WORKS');

  // --- Tab 1: Eser-Yazar-Dönem Atölyesi ---
  const [workCat, setWorkCat] = useState<'ALL' | WorkAuthorCategory>('ALL');
  const [selectedWorkId, setSelectedWorkId] = useState(WORK_AUTHOR_ITEMS[0].id);
  const [workQuizItem, setWorkQuizItem] = useState(() => buildWorkAuthorQuizItem(WORK_AUTHOR_ITEMS));
  const [selectedAuthorChoice, setSelectedAuthorChoice] = useState<string | null>(null);
  const [workScore, setWorkScore] = useState({correct: 0, total: 0});

  const filteredWorks = useMemo(
    () =>
      workCat === 'ALL'
        ? WORK_AUTHOR_ITEMS
        : WORK_AUTHOR_ITEMS.filter((item) => item.category === workCat),
    [workCat],
  );

  const selectedWork = useMemo(
    () => filteredWorks.find((item) => item.id === selectedWorkId) ?? filteredWorks[0],
    [filteredWorks, selectedWorkId],
  );

  const handleSelectAuthor = (author: string) => {
    if (!workQuizItem || selectedAuthorChoice !== null) return;
    setSelectedAuthorChoice(author);
    const isOk = author === workQuizItem.target.author;
    setWorkScore((prev) => ({
      correct: prev.correct + (isOk ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextWorkChallenge = () => {
    setSelectedAuthorChoice(null);
    setWorkQuizItem(buildWorkAuthorQuizItem(WORK_AUTHOR_ITEMS));
  };

  // --- Tab 2: Edebî Sanat & Şiir Çözümleyici ---
  const [selectedVerseId, setSelectedVerseId] = useState(VERSE_DEVICE_ITEMS[0].id);
  const [verseQuizMode, setVerseQuizMode] = useState(false);
  const [verseQuizIndex, setVerseQuizIndex] = useState(0);
  const [selectedDeviceChoice, setSelectedDeviceChoice] = useState<string | null>(null);
  const [verseScore, setVerseScore] = useState({correct: 0, total: 0});

  const selectedVerse = useMemo(
    () => VERSE_DEVICE_ITEMS.find((v) => v.id === selectedVerseId) ?? VERSE_DEVICE_ITEMS[0],
    [selectedVerseId],
  );

  const activeVerseQuiz = VERSE_DEVICE_ITEMS[verseQuizIndex % VERSE_DEVICE_ITEMS.length];
  const verseDeviceOptions = useMemo(() => {
    const others = Array.from(
      new Set(
        VERSE_DEVICE_ITEMS.filter((v) => v.device !== activeVerseQuiz.device).map((v) => v.device),
      ),
    );
    return shuffleArray([activeVerseQuiz.device, ...others.slice(0, 3)]);
  }, [activeVerseQuiz]);

  const handleSelectVerseDevice = (device: string) => {
    if (selectedDeviceChoice !== null) return;
    setSelectedDeviceChoice(device);
    const ok = device === activeVerseQuiz.device;
    setVerseScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextVerseQuiz = () => {
    setSelectedDeviceChoice(null);
    setVerseQuizIndex((prev) => (prev + 1) % VERSE_DEVICE_ITEMS.length);
  };

  // --- Tab 3: Ses & Yazım Dedektifi ---
  const [wordInput, setWordInput] = useState('kömürlük');
  const soundAnalysis = useMemo(() => analyzeTurkishWordSound(wordInput), [wordInput]);

  const [trapIndex, setTrapIndex] = useState(0);
  const [trapChoice, setTrapChoice] = useState<'CORRECT' | 'WRONG' | null>(null);
  const [trapScore, setTrapScore] = useState({correct: 0, total: 0});
  const activeTrap = ORTHOGRAPHY_TRAPS[trapIndex % ORTHOGRAPHY_TRAPS.length];
  const showCorrectLeft = trapIndex % 2 === 0;

  const handleAnswerTrap = (pickedCorrect: boolean) => {
    if (trapChoice !== null) return;
    setTrapChoice(pickedCorrect ? 'CORRECT' : 'WRONG');
    setTrapScore((prev) => ({
      correct: prev.correct + (pickedCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextTrap = () => {
    setTrapChoice(null);
    setTrapIndex((prev) => (prev + 1) % ORTHOGRAPHY_TRAPS.length);
  };

  return (
    <section aria-label="Edebiyat ve Türkçe Atölyesi" className="w-full space-y-4">
      {/* Lab Mode Tabs */}
      <div className="grid grid-cols-3 rounded-xl bg-[#18070f]/85 border border-rose-400/20 p-1 gap-1">
        <button
          type="button"
          onClick={() => setLabMode('WORKS')}
          aria-pressed={labMode === 'WORKS'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'WORKS'
              ? 'lit-active-rose font-semibold'
              : 'text-rose-100/75 hover:text-white'
          }`}
        >
          <BookMarked className="w-4 h-4 shrink-0" />
          <span className="truncate">Eser–Yazar</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('POETRY')}
          aria-pressed={labMode === 'POETRY'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'POETRY'
              ? 'lit-active-rose font-semibold'
              : 'text-rose-100/75 hover:text-white'
          }`}
        >
          <Feather className="w-4 h-4 shrink-0" />
          <span className="truncate">Sanat &amp; Şiir</span>
        </button>
        <button
          type="button"
          onClick={() => setLabMode('LANGUAGE')}
          aria-pressed={labMode === 'LANGUAGE'}
          className={`min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            labMode === 'LANGUAGE'
              ? 'lit-active-rose font-semibold'
              : 'text-rose-100/75 hover:text-white'
          }`}
        >
          <SpellCheck2 className="w-4 h-4 shrink-0" />
          <span className="truncate">Ses &amp; Yazım</span>
        </button>
      </div>

      {/* TAB 1: ESER - YAZAR - DÖNEM ATÖLYESİ */}
      {labMode === 'WORKS' && (
        <div className="space-y-4">
          {/* Interactive Challenge Card */}
          {workQuizItem && (
            <div className="lit-panel rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    Eser – Yazar Eşleştirme Alıştırması
                  </h2>
                  <p className="text-xs text-rose-200/75">
                    AYT Edebiyatta en sık çıkan ilkler ve başyapıtları pekiştir
                  </p>
                </div>
                <div className="font-mono text-xs text-rose-200 tabular-nums">
                  Skor: {workScore.correct}/{workScore.total}
                </div>
              </div>

              <div className="lit-lcd rounded-xl p-4 sm:p-5 text-center space-y-1.5">
                <div className="font-mono text-xs text-rose-300/85">
                  {workQuizItem.target.period}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#FFE4E6]">
                  {workQuizItem.target.work}
                </div>
                <p className="text-xs sm:text-sm text-rose-100/80 max-w-xl mx-auto">
                  {workQuizItem.target.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {workQuizItem.choices.map((author) => {
                  const answered = selectedAuthorChoice !== null;
                  const isRight = author === workQuizItem.target.author;
                  const isPicked = author === selectedAuthorChoice;

                  let btnClass =
                    'bg-[#280d19]/85 border-rose-400/25 text-rose-50 hover:border-rose-400/55 hover:bg-[#381223]';
                  if (answered) {
                    if (isRight) {
                      btnClass = 'bg-[#4c1125]/90 border-[#fb7185] text-white';
                    } else if (isPicked) {
                      btnClass = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                    } else {
                      btnClass = 'bg-[#19080f]/55 border-rose-400/10 text-rose-100/45';
                    }
                  }

                  return (
                    <button
                      key={author}
                      type="button"
                      disabled={answered}
                      onClick={() => handleSelectAuthor(author)}
                      className={`min-h-[48px] px-4 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 text-left transition-all ${
                        answered ? 'cursor-default' : 'cursor-pointer'
                      } ${btnClass}`}
                    >
                      <span>{author}</span>
                      {answered && isRight && <Check className="w-4 h-4 text-[#fda4af] shrink-0" />}
                      {answered && isPicked && !isRight && (
                        <X className="w-4 h-4 text-[#f87171] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedAuthorChoice !== null && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM NOTU:</span>
                    {workQuizItem.target.examTip}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextWorkChallenge}
                    className="min-h-[44px] px-4 rounded-xl lit-cta-rose text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Yeni Eser</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filterable Work Explorer */}
          <div className="lit-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-white">
                MEBİ Başyapıtlar &amp; İlkler Dizini ({filteredWorks.length} Eser)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'ILKLER', 'SIIR_MESNEVI', 'ROMAN_HIKAYE', 'TIYATRO_NESIR'] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setWorkCat(cat)}
                      aria-pressed={workCat === cat}
                      className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                        workCat === cat
                          ? 'lit-active-rose font-semibold'
                          : 'bg-[#260c17]/80 border border-rose-400/20 text-rose-100/80 hover:text-white'
                      }`}
                    >
                      {WORK_AUTHOR_CATEGORY_LABELS[cat]}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-3 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
                {filteredWorks.map((item) => {
                  const active = selectedWork?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedWorkId(item.id)}
                      className={`min-h-[54px] px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#471124]/90 border-[#fb7185] text-white'
                          : 'bg-[#230b15]/80 border-rose-400/20 text-rose-100/85 hover:border-rose-400/45'
                      }`}
                    >
                      <div className="text-sm font-semibold truncate">{item.work}</div>
                      <div className="text-xs text-rose-200/70 truncate mt-0.5">{item.author}</div>
                    </button>
                  );
                })}
              </div>

              {selectedWork && (
                <div className="lit-lcd rounded-xl p-4 space-y-2.5">
                  <div className="text-xs font-mono text-rose-300">
                    {selectedWork.period} · {WORK_AUTHOR_CATEGORY_LABELS[selectedWork.category]}
                  </div>
                  <div className="text-lg font-bold text-white">{selectedWork.work}</div>
                  <div className="text-sm font-semibold text-rose-200">{selectedWork.author}</div>
                  <p className="text-xs sm:text-sm text-rose-50/90 leading-relaxed">
                    {selectedWork.summary}
                  </p>
                  <div className="pt-2 border-t border-rose-400/20 text-xs text-amber-200/90 leading-relaxed">
                    <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM İPUCU:</span>
                    {selectedWork.examTip}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EDEBÎ SANAT & ŞİİR ÇÖZÜMLEYİCİ */}
      {labMode === 'POETRY' && (
        <div className="lit-panel rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Örnek Beyit &amp; Dize Çözümleyici
              </h2>
              <p className="text-xs text-rose-200/75">
                Divan, Halk ve Modern şiirden seçme dizelerde söz sanatı, ölçü ve nazım biçimi analizi
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setVerseQuizMode((prev) => !prev);
                setSelectedDeviceChoice(null);
              }}
              className="min-h-[42px] px-3.5 rounded-xl bg-[#2a0e1a] border border-rose-400/40 text-xs sm:text-sm font-medium text-rose-100 hover:text-white flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-300" />
              <span>{verseQuizMode ? 'İnceleme Moduna Geç' : 'Sanat Bulma Testi'}</span>
            </button>
          </div>

          {verseQuizMode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-rose-200 tabular-nums">
                <span>
                  DİZE {verseQuizIndex + 1}/{VERSE_DEVICE_ITEMS.length}
                </span>
                <span>
                  Skor: {verseScore.correct}/{verseScore.total}
                </span>
              </div>

              <div className="lit-lcd rounded-xl p-5 text-center space-y-2">
                {activeVerseQuiz.verseLines.map((line, i) => (
                  <p key={i} className="text-base sm:text-lg font-serif italic text-[#FFE4E6]">
                    “{line}”
                  </p>
                ))}
                <div className="text-xs font-mono text-rose-300/80 pt-1">
                  {activeVerseQuiz.poet} · {activeVerseQuiz.formOrMeter}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {verseDeviceOptions.map((dev) => {
                  const answered = selectedDeviceChoice !== null;
                  const isRight = dev === activeVerseQuiz.device;
                  const isPicked = dev === selectedDeviceChoice;
                  let cls =
                    'bg-[#280d19]/85 border-rose-400/25 text-rose-50 hover:border-rose-400/55';
                  if (answered) {
                    if (isRight) cls = 'bg-[#4c1125]/90 border-[#fb7185] text-white';
                    else if (isPicked) cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                    else cls = 'bg-[#19080f]/55 border-rose-400/10 text-rose-100/45';
                  }
                  return (
                    <button
                      key={dev}
                      type="button"
                      disabled={answered}
                      onClick={() => handleSelectVerseDevice(dev)}
                      className={`min-h-[48px] px-4 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 text-left transition-all ${
                        answered ? 'cursor-default' : 'cursor-pointer'
                      } ${cls}`}
                    >
                      <span>{dev}</span>
                      {answered && isRight && <Check className="w-4 h-4 text-[#fda4af] shrink-0" />}
                      {answered && isPicked && !isRight && (
                        <X className="w-4 h-4 text-[#f87171] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedDeviceChoice !== null && (
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-rose-50/90 leading-relaxed rounded-xl bg-[#260c17] border border-rose-400/20 p-3.5">
                    {activeVerseQuiz.explanation}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextVerseQuiz}
                    className="w-full min-h-[44px] rounded-xl lit-cta-rose text-sm font-semibold cursor-pointer"
                  >
                    Sonraki Beyit / Dörtlük
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-3 items-start">
              <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[360px] pb-1">
                {VERSE_DEVICE_ITEMS.map((item) => {
                  const active = selectedVerse.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedVerseId(item.id)}
                      className={`min-h-[46px] px-3 py-2 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                        active
                          ? 'lit-active-rose font-semibold'
                          : 'bg-[#260c17]/80 border-rose-400/20 text-rose-100/80 hover:text-white'
                      }`}
                    >
                      <div className="text-xs sm:text-sm truncate">{item.device}</div>
                      <div className="text-[11px] opacity-80 truncate">{item.poet}</div>
                    </button>
                  );
                })}
              </div>

              <div className="lit-lcd rounded-xl p-4 sm:p-5 space-y-4">
                <div className="space-y-1.5 text-center py-2">
                  {selectedVerse.verseLines.map((line, i) => (
                    <p key={i} className="text-base sm:text-xl font-serif italic text-[#FFE4E6]">
                      “{line}”
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg bg-[#230b15] border border-rose-400/20 p-2.5">
                    <div className="font-mono text-rose-300/70">ŞAİR / DÖNEM</div>
                    <div className="font-semibold text-white mt-0.5">{selectedVerse.poet}</div>
                  </div>
                  <div className="rounded-lg bg-[#230b15] border border-rose-400/20 p-2.5">
                    <div className="font-mono text-rose-300/70">ÖLÇÜ &amp; BİÇİM</div>
                    <div className="font-semibold text-white mt-0.5">{selectedVerse.formOrMeter}</div>
                  </div>
                  <div className="rounded-lg bg-[#230b15] border border-rose-400/20 p-2.5">
                    <div className="font-mono text-rose-300/70">ÖNE ÇIKAN SANAT</div>
                    <div className="font-semibold text-rose-200 mt-0.5">{selectedVerse.device}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-rose-50/90 leading-relaxed">
                  {selectedVerse.explanation}
                </p>

                <div className="pt-2 border-t border-rose-400/20 text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">ÖSYM İPUCU:</span>
                  {selectedVerse.examTip}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TYT SES & YAZIM DEDEKTİFİ */}
      {labMode === 'LANGUAGE' && (
        <div className="space-y-4">
          {/* 3A: Yazım & Noktalama Avcısı */}
          <div className="lit-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  TYT Yazım &amp; Noktalama Doğru/Yanlış Avcısı
                </h2>
                <p className="text-xs text-rose-200/75">
                  TDK yazım kılavuzunda en çok karıştırılan tuzak ikililer arasından doğru yazımı seç
                </p>
              </div>
              <div className="font-mono text-xs text-rose-200 tabular-nums">
                {trapIndex + 1}/{ORTHOGRAPHY_TRAPS.length} · Doğru: {trapScore.correct}/{trapScore.total}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[showCorrectLeft, !showCorrectLeft].map((isCorrectCard, idx) => {
                const label = isCorrectCard ? activeTrap.correctForm : activeTrap.wrongForm;
                const answered = trapChoice !== null;
                let cls =
                  'bg-[#280d19]/85 border-rose-400/25 text-white hover:border-rose-400/55 hover:bg-[#381223]';
                if (answered) {
                  if (isCorrectCard) {
                    cls = 'bg-[#4c1125]/90 border-[#fb7185] text-white';
                  } else if (trapChoice === 'WRONG') {
                    cls = 'bg-[#451214]/90 border-[#ef4444] text-red-100';
                  } else {
                    cls = 'bg-[#19080f]/55 border-rose-400/10 text-rose-100/45';
                  }
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={answered}
                    onClick={() => handleAnswerTrap(isCorrectCard)}
                    className={`min-h-[64px] px-4 py-3 rounded-xl border text-base sm:text-lg font-semibold flex items-center justify-between gap-2 transition-all ${
                      answered ? 'cursor-default' : 'cursor-pointer'
                    } ${cls}`}
                  >
                    <span>{label}</span>
                    {answered && isCorrectCard && <Check className="w-5 h-5 text-[#fda4af] shrink-0" />}
                    {answered && !isCorrectCard && trapChoice === 'WRONG' && (
                      <X className="w-5 h-5 text-[#f87171] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {trapChoice !== null && (
              <div className="rounded-xl bg-[#260c17] border border-rose-400/25 p-4 space-y-2">
                <p className="text-xs sm:text-sm text-rose-50/95 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">TDK KURALI:</span>
                  {activeTrap.rule}
                </p>
                <p className="text-xs text-rose-200/80 italic">Örnek: “{activeTrap.example}”</p>
                <button
                  type="button"
                  onClick={handleNextTrap}
                  className="mt-1 min-h-[42px] px-4 rounded-xl lit-cta-rose text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  Sonraki Tuzak
                </button>
              </div>
            )}
          </div>

          {/* 3B: Ses Olayı & Ünlü Uyumu Çözümleyici */}
          <div className="lit-panel rounded-2xl p-4 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                Türkçe Ses &amp; Ünlü Uyumu Çözümleyici
              </h3>
              <p className="text-xs text-rose-200/75">
                Herhangi bir Türkçe kelime yaz veya kritik örneklerden birini seçerek hece ve ünlü uyumunu test et
              </p>
            </div>

            <input
              type="text"
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              placeholder="İncelenecek kelime (ör. kömürlük, geliyor, kavun...)"
              aria-label="Ses incelemesi için kelime"
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#18070f] border border-rose-400/30 text-sm sm:text-base text-white placeholder:text-rose-200/40 focus:outline-none focus:border-rose-300/70"
            />

            <div className="flex flex-wrap gap-1.5">
              {PRESET_SOUND_WORDS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWordInput(w)}
                  className={`min-h-[36px] px-3 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                    soundAnalysis.cleaned === w
                      ? 'lit-active-rose font-semibold'
                      : 'bg-[#260c17]/80 border border-rose-400/20 text-rose-100/80 hover:text-white'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            <div className="lit-lcd rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-rose-200 tabular-nums">
                <span>HECE SAYISI: {soundAnalysis.syllableCount}</span>
                <span>
                  ÜNLÜLER:{' '}
                  {soundAnalysis.vowels.length > 0 ? soundAnalysis.vowels.join(' · ') : '—'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="rounded-lg bg-[#230b15] border border-rose-400/20 p-3 space-y-1">
                  <div className="text-xs font-mono font-semibold text-rose-300">
                    BÜYÜK ÜNLÜ UYUMU:{' '}
                    {soundAnalysis.passesBigHarmony ? 'UYAR' : 'UYMAZ'}
                  </div>
                  <p className="text-xs text-rose-50/90 leading-relaxed">
                    {soundAnalysis.bigHarmonyReason}
                  </p>
                </div>

                <div className="rounded-lg bg-[#230b15] border border-rose-400/20 p-3 space-y-1">
                  <div className="text-xs font-mono font-semibold text-rose-300">
                    KÜÇÜK ÜNLÜ UYUMU:{' '}
                    {soundAnalysis.passesSmallHarmony ? 'UYAR' : 'UYMAZ'}
                  </div>
                  <p className="text-xs text-rose-50/90 leading-relaxed">
                    {soundAnalysis.smallHarmonyReason}
                  </p>
                </div>
              </div>

              {soundAnalysis.specialNote && (
                <div className="rounded-lg bg-[#341120] border border-amber-400/35 p-3 text-xs text-amber-100 leading-relaxed">
                  <span className="font-mono font-semibold text-amber-300 mr-1.5">SES OLAYI NOTU:</span>
                  {soundAnalysis.specialNote}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
