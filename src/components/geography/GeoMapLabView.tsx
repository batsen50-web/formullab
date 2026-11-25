import {ArrowRight, Clock, Compass, Globe2, MapPin, RotateCcw, Ruler, Target} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  TURKEY_MAP_HOTSPOTS,
  WORLD_MAP_HOTSPOTS,
  calculateLocalTimeDifference,
  calculateScaleAndSlope,
  shuffleArray,
  type TurkeyHotspotLayer,
  type TurkeyMapHotspot,
  type WorldMapHotspot,
} from '../../utils/geographyLogic';

type GeoLabMode = 'world' | 'turkey' | 'calculators';
type MapInteractMode = 'explore' | 'quiz';

export const GeoMapLabView: FC<{onExit: () => void}> = ({onExit}) => {
  const [labMode, setLabMode] = useState<GeoLabMode>('world');

  // --- WORLD MAP STATE ---
  const [worldInteractMode, setWorldInteractMode] = useState<MapInteractMode>('explore');
  const [selectedWorldSpot, setSelectedWorldSpot] = useState<WorldMapHotspot>(
    WORLD_MAP_HOTSPOTS[6], // İstanbul ve Çanakkale Boğazları default
  );
  const [worldQuizOrder, setWorldQuizOrder] = useState<WorldMapHotspot[]>(() =>
    shuffleArray(WORLD_MAP_HOTSPOTS),
  );
  const [worldQuizIndex, setWorldQuizIndex] = useState(0);
  const [worldQuizChoiceId, setWorldQuizChoiceId] = useState<string | null>(null);
  const [worldScore, setWorldScore] = useState({correct: 0, total: 0});

  // --- TURKEY MAP STATE ---
  const [turkeyInteractMode, setTurkeyInteractMode] = useState<MapInteractMode>('explore');
  const [turkeyLayer, setTurkeyLayer] = useState<'ALL' | TurkeyHotspotLayer>('ALL');
  const [selectedTurkeySpot, setSelectedTurkeySpot] = useState<TurkeyMapHotspot>(
    TURKEY_MAP_HOTSPOTS[9], // Çukurova default
  );
  const [turkeyQuizOrder, setTurkeyQuizOrder] = useState<TurkeyMapHotspot[]>(() =>
    shuffleArray(TURKEY_MAP_HOTSPOTS),
  );
  const [turkeyQuizIndex, setTurkeyQuizIndex] = useState(0);
  const [turkeyQuizChoiceId, setTurkeyQuizChoiceId] = useState<string | null>(null);
  const [turkeyScore, setTurkeyScore] = useState({correct: 0, total: 0});

  // --- LOCAL TIME CALCULATOR STATE ---
  const [lon1Deg, setLon1Deg] = useState(26);
  const [lon1Hem, setLon1Hem] = useState<'E' | 'W'>('E');
  const [hour1, setHour1] = useState(12);
  const [min1, setMin1] = useState(0);
  const [lon2Deg, setLon2Deg] = useState(45);
  const [lon2Hem, setLon2Hem] = useState<'E' | 'W'>('E');

  // --- SCALE & SLOPE CALCULATOR STATE ---
  const [scaleDenom, setScaleDenom] = useState(200_000);
  const [mapLengthCm, setMapLengthCm] = useState(5);
  const [elevationDiffM, setElevationDiffM] = useState(250);
  const [horizontalDistKm, setHorizontalDistKm] = useState(5);

  const visibleTurkeySpots = useMemo(() => {
    if (turkeyLayer === 'ALL') return TURKEY_MAP_HOTSPOTS;
    return TURKEY_MAP_HOTSPOTS.filter((s) => s.layer === turkeyLayer);
  }, [turkeyLayer]);

  const timeResult = useMemo(
    () => calculateLocalTimeDifference(lon1Deg, lon1Hem, hour1, min1, lon2Deg, lon2Hem),
    [lon1Deg, lon1Hem, hour1, min1, lon2Deg, lon2Hem],
  );

  const scaleResult = useMemo(
    () => calculateScaleAndSlope(scaleDenom, mapLengthCm, elevationDiffM, horizontalDistKm),
    [scaleDenom, mapLengthCm, elevationDiffM, horizontalDistKm],
  );

  // World Quiz handlers
  const activeWorldTarget = worldQuizOrder[worldQuizIndex % worldQuizOrder.length];
  const handleWorldPinClick = (spot: WorldMapHotspot) => {
    if (worldInteractMode === 'explore') {
      setSelectedWorldSpot(spot);
      return;
    }
    if (worldQuizChoiceId !== null) return;
    setWorldQuizChoiceId(spot.id);
    setSelectedWorldSpot(spot);
    const ok = spot.id === activeWorldTarget.id;
    setWorldScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextWorldQuiz = () => {
    setWorldQuizChoiceId(null);
    if (worldQuizIndex + 1 >= worldQuizOrder.length) {
      setWorldQuizOrder(shuffleArray(WORLD_MAP_HOTSPOTS));
      setWorldQuizIndex(0);
    } else {
      setWorldQuizIndex((prev) => prev + 1);
    }
  };

  const handleResetWorldQuiz = () => {
    setWorldQuizOrder(shuffleArray(WORLD_MAP_HOTSPOTS));
    setWorldQuizIndex(0);
    setWorldQuizChoiceId(null);
    setWorldScore({correct: 0, total: 0});
  };

  // Turkey Quiz handlers
  const activeTurkeyTarget = turkeyQuizOrder[turkeyQuizIndex % turkeyQuizOrder.length];
  const handleTurkeyPinClick = (spot: TurkeyMapHotspot) => {
    if (turkeyInteractMode === 'explore') {
      setSelectedTurkeySpot(spot);
      return;
    }
    if (turkeyQuizChoiceId !== null) return;
    setTurkeyQuizChoiceId(spot.id);
    setSelectedTurkeySpot(spot);
    const ok = spot.id === activeTurkeyTarget.id;
    setTurkeyScore((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextTurkeyQuiz = () => {
    setTurkeyQuizChoiceId(null);
    if (turkeyQuizIndex + 1 >= turkeyQuizOrder.length) {
      setTurkeyQuizOrder(shuffleArray(TURKEY_MAP_HOTSPOTS));
      setTurkeyQuizIndex(0);
    } else {
      setTurkeyQuizIndex((prev) => prev + 1);
    }
  };

  const handleResetTurkeyQuiz = () => {
    setTurkeyQuizOrder(shuffleArray(TURKEY_MAP_HOTSPOTS));
    setTurkeyQuizIndex(0);
    setTurkeyQuizChoiceId(null);
    setTurkeyScore({correct: 0, total: 0});
  };

  const segInactive =
    'bg-[#211408]/85 border border-amber-400/20 text-amber-100/75 hover:border-amber-400/45 hover:text-white';

  return (
    <section aria-label="İnteraktif Coğrafya Harita Laboratuvarı" className="w-full space-y-4">
      {/* Header + 3 Lab Mode Tabs */}
      <div className="geo-panel rounded-2xl p-3.5 sm:p-5 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Harita &amp; Konum Labı</h2>
              <p className="text-xs text-amber-100/70">
                Dünya su yolları, Türkiye yer şekilleri-madenler ve saat/ölçek hesapları
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="min-h-[40px] px-3 rounded-lg border border-amber-400/25 bg-[#211408] text-xs font-medium text-amber-100/80 hover:text-white hover:border-amber-400/50 cursor-pointer whitespace-nowrap"
          >
            Teste Dön
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setLabMode('world')}
            aria-pressed={labMode === 'world'}
            className={`min-h-[44px] px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              labMode === 'world' ? 'geo-active-amber font-semibold' : segInactive
            }`}
          >
            <Globe2 className="w-4 h-4 shrink-0 hidden sm:inline" />
            <span>Dünya Haritası</span>
          </button>

          <button
            type="button"
            onClick={() => setLabMode('turkey')}
            aria-pressed={labMode === 'turkey'}
            className={`min-h-[44px] px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              labMode === 'turkey' ? 'geo-active-amber font-semibold' : segInactive
            }`}
          >
            <Compass className="w-4 h-4 shrink-0 hidden sm:inline" />
            <span>Türkiye Haritası</span>
          </button>

          <button
            type="button"
            onClick={() => setLabMode('calculators')}
            aria-pressed={labMode === 'calculators'}
            className={`min-h-[44px] px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              labMode === 'calculators' ? 'geo-active-amber font-semibold' : segInactive
            }`}
          >
            <Clock className="w-4 h-4 shrink-0 hidden sm:inline" />
            <span>Saat &amp; Ölçek</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: DÜNYA BOĞAZ & KANALLAR HARİTASI */}
      {/* =================================================================== */}
      {labMode === 'world' && (
        <div className="geo-panel rounded-2xl p-3.5 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="grid grid-cols-2 rounded-xl bg-[#180f06] border border-amber-400/20 p-1 gap-1">
              <button
                type="button"
                onClick={() => setWorldInteractMode('explore')}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  worldInteractMode === 'explore'
                    ? 'geo-active-amber font-semibold'
                    : 'text-amber-100/75 hover:text-white'
                }`}
              >
                Keşfet (12 Geçit)
              </button>
              <button
                type="button"
                onClick={() => {
                  setWorldInteractMode('quiz');
                  handleResetWorldQuiz();
                }}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                  worldInteractMode === 'quiz'
                    ? 'geo-active-amber font-semibold'
                    : 'text-amber-100/75 hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Haritada Bul!</span>
              </button>
            </div>

            {worldInteractMode === 'quiz' ? (
              <div className="flex items-center gap-2 text-xs font-mono text-amber-200 tabular-nums">
                <span>
                  Skor: {worldScore.correct} / {worldScore.total}
                </span>
                <button
                  type="button"
                  onClick={handleResetWorldQuiz}
                  aria-label="Harita testini sıfırla"
                  className="min-w-[36px] min-h-[36px] rounded-lg border border-amber-400/25 bg-[#211408] flex items-center justify-center hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-[11px] font-mono text-amber-100/75">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  Boğaz
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                  Kanal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
                  Burun
                </span>
              </div>
            )}
          </div>

          {worldInteractMode === 'quiz' && (
            <div className="rounded-xl bg-[#241608] border border-amber-400/35 p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] tracking-wider uppercase text-amber-300/80">
                  HARİTADAN İŞARETLE ({worldQuizIndex + 1}/{worldQuizOrder.length})
                </div>
                <div className="text-sm sm:text-base font-bold text-[#FEF3C7]">
                  {activeWorldTarget.name}
                </div>
                <div className="text-xs text-amber-100/70">{activeWorldTarget.connects}</div>
              </div>

              {worldQuizChoiceId !== null && (
                <button
                  type="button"
                  onClick={handleNextWorldQuiz}
                  className="min-h-[40px] px-4 rounded-xl geo-cta-amber text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Sonraki Nokta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Interactive World SVG */}
          <div className="geo-lcd rounded-xl p-2 sm:p-3 overflow-hidden">
            <svg
              viewBox="0 0 600 300"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="Etkileşimli Dünya Su Yolları Haritası"
            >
              {/* Ocean background */}
              <rect x="0" y="0" width="600" height="300" rx="8" fill="#091924" />

              {/* Graticules: Equator & Tropics & Prime Meridian */}
              <line x1="0" y1="158" x2="600" y2="158" stroke="#38bdf8" strokeOpacity="0.22" strokeDasharray="4 4" />
              <line x1="0" y1="118" x2="600" y2="118" stroke="#fbbf24" strokeOpacity="0.14" strokeDasharray="3 5" />
              <line x1="0" y1="198" x2="600" y2="198" stroke="#fbbf24" strokeOpacity="0.14" strokeDasharray="3 5" />
              <line x1="292" y1="0" x2="292" y2="300" stroke="#94a3b8" strokeOpacity="0.12" strokeDasharray="3 5" />
              <text x="8" y="154" fill="#7dd3fc" fillOpacity="0.55" fontSize="8" fontFamily="monospace">
                EKVATOR 0°
              </text>

              {/* Continents silhouettes */}
              <g fill="#2b2116" stroke="#b45309" strokeOpacity="0.48" strokeWidth="1">
                {/* North & Central America */}
                <path d="M40 50 L84 36 L146 32 L192 48 L210 68 L184 94 L166 112 L144 122 L152 138 L161 150 L154 152 L134 134 L112 115 L92 104 L74 86 L46 66 Z" />
                {/* Greenland */}
                <path d="M188 18 L232 16 L238 42 L208 48 L186 34 Z" />
                {/* South America */}
                <path d="M161 150 L195 154 L228 174 L240 194 L218 225 L194 258 L178 256 L172 222 L158 182 Z" />
                {/* Europe */}
                <path d="M276 99 L276 80 L295 72 L308 64 L318 42 L346 36 L362 52 L356 80 L342 95 L322 98 L302 92 L286 101 Z" />
                {/* UK & Ireland */}
                <path d="M276 62 L286 60 L288 73 L276 74 Z" />
                {/* Africa */}
                <path d="M282 106 L318 104 L348 115 L368 144 L374 162 L352 198 L334 236 L318 228 L306 186 L284 158 L272 134 Z" />
                {/* Asia + Arabia + India + SE Asia */}
                <path d="M342 96 L364 88 L374 52 L428 32 L512 36 L576 52 L564 76 L536 90 L516 118 L490 138 L472 160 L458 146 L440 128 L424 150 L404 128 L390 124 L376 144 L354 140 L348 117 Z" />
                {/* Japan & SE Asia Islands */}
                <path d="M524 88 L536 82 L534 102 L522 102 Z" />
                <path d="M466 164 L484 176 L496 174 L480 158 Z" />
                <path d="M494 152 L512 152 L510 168 L492 166 Z" />
                {/* Australia */}
                <path d="M492 196 L538 190 L562 214 L554 242 L516 244 L490 222 Z" />
              </g>

              {/* Hotspots */}
              {WORLD_MAP_HOTSPOTS.map((spot) => {
                const isSelected =
                  worldInteractMode === 'explore'
                    ? selectedWorldSpot.id === spot.id
                    : worldQuizChoiceId === spot.id;
                const isQuizTarget =
                  worldInteractMode === 'quiz' &&
                  worldQuizChoiceId !== null &&
                  spot.id === activeWorldTarget.id;
                const isQuizWrong =
                  worldInteractMode === 'quiz' &&
                  worldQuizChoiceId === spot.id &&
                  spot.id !== activeWorldTarget.id;

                let fill =
                  spot.type === 'KANAL'
                    ? '#22d3ee'
                    : spot.type === 'BURUN'
                      ? '#fb923c'
                      : '#fbbf24';
                let ringColor = fill;

                if (worldInteractMode === 'quiz') {
                  fill = '#fde68a';
                  ringColor = '#fbbf24';
                  if (isQuizTarget) {
                    fill = '#34d399';
                    ringColor = '#6ee7b7';
                  } else if (isQuizWrong) {
                    fill = '#ef4444';
                    ringColor = '#fca5a5';
                  }
                }

                return (
                  <g
                    key={spot.id}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      worldInteractMode === 'explore'
                        ? `${spot.name} — incele`
                        : `Konum seç (${spot.x}, ${spot.y})`
                    }
                    onClick={() => handleWorldPinClick(spot)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleWorldPinClick(spot);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    {/* Generous invisible hit area */}
                    <circle cx={spot.x} cy={spot.y} r="14" fill="transparent" />
                    {(isSelected || isQuizTarget) && (
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r="11"
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="2"
                        strokeOpacity="0.9"
                      />
                    )}
                    <circle
                      cx={spot.x}
                      cy={spot.y}
                      r={isSelected || isQuizTarget ? 6 : 4.5}
                      fill={fill}
                      stroke="#140d06"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail Card / Quiz Feedback */}
          {worldInteractMode === 'explore' ? (
            <div className="rounded-xl bg-[#211408]/90 border border-amber-400/25 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <h3 className="text-base font-bold text-[#FEF3C7]">{selectedWorldSpot.name}</h3>
                </div>
                <span className="font-mono text-xs text-amber-300 font-semibold">
                  {selectedWorldSpot.type === 'KANAL'
                    ? 'İnsan Yapımı Kanal'
                    : selectedWorldSpot.type === 'BURUN'
                      ? 'Kıta Ucu / Burun'
                      : 'Doğal Boğaz'}
                </span>
              </div>
              <div className="font-mono text-xs text-cyan-300">{selectedWorldSpot.connects}</div>
              <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
                {selectedWorldSpot.importance}
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed pt-1 border-t border-amber-400/15">
                <span className="font-mono font-semibold text-orange-300 mr-1.5">ÖSYM NOTU:</span>
                {selectedWorldSpot.examTip}
              </p>
            </div>
          ) : (
            worldQuizChoiceId !== null && (
              <div
                className={`rounded-xl border p-3.5 text-xs sm:text-sm space-y-1 ${
                  worldQuizChoiceId === activeWorldTarget.id
                    ? 'bg-[#0e3225]/85 border-emerald-400/50 text-emerald-100'
                    : 'bg-[#3b1817]/85 border-red-400/50 text-red-100'
                }`}
              >
                <div className="font-semibold">
                  {worldQuizChoiceId === activeWorldTarget.id
                    ? `Doğru! ${activeWorldTarget.name}`
                    : `Seçtiğin nokta: ${selectedWorldSpot.name}. Doğrusu yeşil halka ile gösterilen ${activeWorldTarget.name}.`}
                </div>
                <p className="text-xs opacity-90">{activeWorldTarget.examTip}</p>
              </div>
            )
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: TÜRKİYE YER ŞEKİLLERİ & MADEN/PROJE HARİTASI */}
      {/* =================================================================== */}
      {labMode === 'turkey' && (
        <div className="geo-panel rounded-2xl p-3.5 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="grid grid-cols-2 rounded-xl bg-[#180f06] border border-amber-400/20 p-1 gap-1">
              <button
                type="button"
                onClick={() => setTurkeyInteractMode('explore')}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  turkeyInteractMode === 'explore'
                    ? 'geo-active-amber font-semibold'
                    : 'text-amber-100/75 hover:text-white'
                }`}
              >
                Keşfet (14 Merkez)
              </button>
              <button
                type="button"
                onClick={() => {
                  setTurkeyInteractMode('quiz');
                  setTurkeyLayer('ALL');
                  handleResetTurkeyQuiz();
                }}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                  turkeyInteractMode === 'quiz'
                    ? 'geo-active-amber font-semibold'
                    : 'text-amber-100/75 hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Haritada Bul!</span>
              </button>
            </div>

            {turkeyInteractMode === 'explore' ? (
              <div className="flex items-center gap-1.5">
                {(['ALL', 'LANDFORM', 'RESOURCE'] as const).map((layerKey) => (
                  <button
                    key={layerKey}
                    type="button"
                    onClick={() => setTurkeyLayer(layerKey)}
                    className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-medium whitespace-nowrap cursor-pointer transition-all ${
                      turkeyLayer === layerKey
                        ? 'geo-active-amber font-semibold'
                        : 'bg-[#211408] border border-amber-400/20 text-amber-100/75 hover:text-white'
                    }`}
                  >
                    {layerKey === 'ALL'
                      ? 'Tümü'
                      : layerKey === 'LANDFORM'
                        ? 'Yer Şekilleri'
                        : 'Maden & Proje'}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-amber-200 tabular-nums">
                <span>
                  Skor: {turkeyScore.correct} / {turkeyScore.total}
                </span>
                <button
                  type="button"
                  onClick={handleResetTurkeyQuiz}
                  aria-label="Türkiye harita testini sıfırla"
                  className="min-w-[36px] min-h-[36px] rounded-lg border border-amber-400/25 bg-[#211408] flex items-center justify-center hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {turkeyInteractMode === 'quiz' && (
            <div className="rounded-xl bg-[#241608] border border-amber-400/35 p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] tracking-wider uppercase text-amber-300/80">
                  TÜRKİYE HARİTASINDAN BUL ({turkeyQuizIndex + 1}/{turkeyQuizOrder.length})
                </div>
                <div className="text-sm sm:text-base font-bold text-[#FEF3C7]">
                  {activeTurkeyTarget.name}
                </div>
                <div className="text-xs text-amber-100/70">{activeTurkeyTarget.region}</div>
              </div>

              {turkeyQuizChoiceId !== null && (
                <button
                  type="button"
                  onClick={handleNextTurkeyQuiz}
                  className="min-h-[40px] px-4 rounded-xl geo-cta-amber text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Sonraki Merkez</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Interactive Turkey SVG */}
          <div className="geo-lcd rounded-xl p-2 sm:p-3 overflow-hidden">
            <svg
              viewBox="0 0 600 280"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="Etkileşimli Türkiye Coğrafya Haritası"
            >
              {/* Surrounding seas */}
              <rect x="0" y="0" width="600" height="280" rx="8" fill="#091924" />
              <text x="300" y="24" textAnchor="middle" fill="#7dd3fc" fillOpacity="0.45" fontSize="9" fontFamily="monospace" letterSpacing="4">
                KARADENİZ
              </text>
              <text x="36" y="150" textAnchor="middle" fill="#7dd3fc" fillOpacity="0.45" fontSize="9" fontFamily="monospace" transform="rotate(-90 36 150)">
                EGE DENİZİ
              </text>
              <text x="235" y="258" textAnchor="middle" fill="#7dd3fc" fillOpacity="0.45" fontSize="9" fontFamily="monospace" letterSpacing="4">
                AKDENİZ
              </text>

              {/* Thrace + Anatolia silhouette */}
              <g fill="#312214" stroke="#d97706" strokeOpacity="0.58" strokeWidth="1.4">
                {/* Thrace */}
                <path d="M58 50 L68 28 L106 28 L130 46 L118 54 L94 60 L72 68 L62 62 Z" />
                {/* Anatolia */}
                <path d="M84 72 L122 58 L138 56 L174 44 L218 40 L254 34 L284 28 L314 42 L352 48 L412 52 L476 44 L518 36 L536 60 L548 90 L554 118 L544 154 L548 184 L514 192 L462 198 L418 206 L372 206 L354 222 L344 238 L334 222 L338 206 L316 206 L284 214 L256 226 L224 218 L206 206 L186 218 L156 222 L126 210 L96 204 L88 182 L94 156 L82 134 L88 112 L76 92 Z" />
              </g>

              {/* Major lakes (Tuz & Van) */}
              <ellipse cx="266" cy="144" rx="11" ry="15" fill="#0ea5e9" fillOpacity="0.45" stroke="#7dd3fc" strokeOpacity="0.5" strokeWidth="0.8" />
              <path d="M482 158 C490 146 510 144 516 154 C518 164 498 172 486 168 Z" fill="#0ea5e9" fillOpacity="0.5" stroke="#7dd3fc" strokeOpacity="0.5" strokeWidth="0.8" />

              {/* Coordinate labels */}
              <text x="12" y="270" fill="#fcd34d" fillOpacity="0.55" fontSize="8" fontFamily="monospace">
                36°–42° KUZEY · 26°–45° DOĞU
              </text>

              {/* Hotspots */}
              {(turkeyInteractMode === 'quiz' ? TURKEY_MAP_HOTSPOTS : visibleTurkeySpots).map((spot) => {
                const isSelected =
                  turkeyInteractMode === 'explore'
                    ? selectedTurkeySpot.id === spot.id
                    : turkeyQuizChoiceId === spot.id;
                const isQuizTarget =
                  turkeyInteractMode === 'quiz' &&
                  turkeyQuizChoiceId !== null &&
                  spot.id === activeTurkeyTarget.id;
                const isQuizWrong =
                  turkeyInteractMode === 'quiz' &&
                  turkeyQuizChoiceId === spot.id &&
                  spot.id !== activeTurkeyTarget.id;

                let fill = spot.layer === 'LANDFORM' ? '#fbbf24' : '#38bdf8';
                let ringColor = fill;

                if (turkeyInteractMode === 'quiz') {
                  fill = '#fde68a';
                  ringColor = '#fbbf24';
                  if (isQuizTarget) {
                    fill = '#34d399';
                    ringColor = '#6ee7b7';
                  } else if (isQuizWrong) {
                    fill = '#ef4444';
                    ringColor = '#fca5a5';
                  }
                }

                return (
                  <g
                    key={spot.id}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      turkeyInteractMode === 'explore'
                        ? `${spot.name} — incele`
                        : `Türkiye haritasında konum seç`
                    }
                    onClick={() => handleTurkeyPinClick(spot)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTurkeyPinClick(spot);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    <circle cx={spot.x} cy={spot.y} r="15" fill="transparent" />
                    {(isSelected || isQuizTarget) && (
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r="11"
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="2"
                        strokeOpacity="0.9"
                      />
                    )}
                    <circle
                      cx={spot.x}
                      cy={spot.y}
                      r={isSelected || isQuizTarget ? 6.5 : 5}
                      fill={fill}
                      stroke="#140d06"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Turkey Detail or Quiz Feedback */}
          {turkeyInteractMode === 'explore' ? (
            <div className="rounded-xl bg-[#211408]/90 border border-amber-400/25 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <h3 className="text-base font-bold text-[#FEF3C7]">{selectedTurkeySpot.name}</h3>
                </div>
                <span className="font-mono text-xs text-amber-300 font-semibold">
                  {selectedTurkeySpot.layer === 'LANDFORM' ? 'Yer Şekli' : 'Maden / Proje'} ·{' '}
                  {selectedTurkeySpot.region}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
                {selectedTurkeySpot.summary}
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed pt-1 border-t border-amber-400/15">
                <span className="font-mono font-semibold text-orange-300 mr-1.5">ÖSYM NOTU:</span>
                {selectedTurkeySpot.examTip}
              </p>
            </div>
          ) : (
            turkeyQuizChoiceId !== null && (
              <div
                className={`rounded-xl border p-3.5 text-xs sm:text-sm space-y-1 ${
                  turkeyQuizChoiceId === activeTurkeyTarget.id
                    ? 'bg-[#0e3225]/85 border-emerald-400/50 text-emerald-100'
                    : 'bg-[#3b1817]/85 border-red-400/50 text-red-100'
                }`}
              >
                <div className="font-semibold">
                  {turkeyQuizChoiceId === activeTurkeyTarget.id
                    ? `Doğru! ${activeTurkeyTarget.name}`
                    : `Seçtiğin merkez: ${selectedTurkeySpot.name}. Doğrusu yeşil halka ile gösterilen ${activeTurkeyTarget.name}.`}
                </div>
                <p className="text-xs opacity-90">{activeTurkeyTarget.examTip}</p>
              </div>
            )
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: YEREL SAAT & ÖLÇEK / EĞİM HESAPLAYICI LABI */}
      {/* =================================================================== */}
      {labMode === 'calculators' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 1. Yerel Saat & Boylam Laboratuvarı */}
          <div className="geo-panel rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Yerel Saat &amp; Boylam Hesabı
                </h3>
              </div>
              <span className="font-mono text-[11px] text-amber-300">1° = 4 dk</span>
            </div>

            {/* Quick YKS Presets */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setLon1Deg(26);
                  setLon1Hem('E');
                  setHour1(12);
                  setMin1(0);
                  setLon2Deg(45);
                  setLon2Hem('E');
                }}
                className="min-h-[34px] px-2.5 rounded-lg bg-[#211408] border border-amber-400/25 text-[11px] text-amber-100 hover:border-amber-400/55 cursor-pointer"
              >
                26°D → 45°D (Türkiye)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLon1Deg(0);
                  setLon1Hem('E');
                  setHour1(10);
                  setMin1(0);
                  setLon2Deg(45);
                  setLon2Hem('E');
                }}
                className="min-h-[34px] px-2.5 rounded-lg bg-[#211408] border border-amber-400/25 text-[11px] text-amber-100 hover:border-amber-400/55 cursor-pointer"
              >
                0° Londra → 45°D
              </button>
              <button
                type="button"
                onClick={() => {
                  setLon1Deg(30);
                  setLon1Hem('E');
                  setHour1(14);
                  setMin1(30);
                  setLon2Deg(15);
                  setLon2Hem('W');
                }}
                className="min-h-[34px] px-2.5 rounded-lg bg-[#211408] border border-amber-400/25 text-[11px] text-amber-100 hover:border-amber-400/55 cursor-pointer"
              >
                30°D → 15°B
              </button>
            </div>

            {/* Merkez 1 */}
            <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <label htmlFor="geo-lon1" className="font-mono text-amber-200/85">
                  MERKEZ 1 BOYLAMI
                </label>
                <span className="font-mono font-bold text-amber-300 tabular-nums">
                  {lon1Deg}° {lon1Hem === 'E' ? 'Doğu' : 'Batı'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="geo-lon1"
                  type="range"
                  min={0}
                  max={180}
                  value={lon1Deg}
                  onChange={(e) => setLon1Deg(Number(e.target.value))}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-1 shrink-0">
                  {(['W', 'E'] as const).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setLon1Hem(h)}
                      className={`min-h-[34px] px-2.5 rounded text-xs font-mono cursor-pointer ${
                        lon1Hem === h ? 'geo-active-amber font-bold' : 'bg-[#140c05] text-amber-200/70'
                      }`}
                    >
                      {h === 'E' ? 'D' : 'B'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="text-[11px] font-mono text-amber-200/75 flex items-center justify-between gap-2 bg-[#160e06] rounded-lg px-2.5 py-1.5 border border-amber-400/15">
                  <span>Saat</span>
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={hour1}
                    onChange={(e) => setHour1(Math.min(23, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-12 bg-transparent text-right text-amber-300 font-bold tabular-nums focus:outline-none"
                  />
                </label>
                <label className="text-[11px] font-mono text-amber-200/75 flex items-center justify-between gap-2 bg-[#160e06] rounded-lg px-2.5 py-1.5 border border-amber-400/15">
                  <span>Dakika</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={min1}
                    onChange={(e) => setMin1(Math.min(59, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-12 bg-transparent text-right text-amber-300 font-bold tabular-nums focus:outline-none"
                  />
                </label>
              </div>
            </div>

            {/* Merkez 2 */}
            <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <label htmlFor="geo-lon2" className="font-mono text-amber-200/85">
                  MERKEZ 2 BOYLAMI (HEDEF)
                </label>
                <span className="font-mono font-bold text-amber-300 tabular-nums">
                  {lon2Deg}° {lon2Hem === 'E' ? 'Doğu' : 'Batı'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="geo-lon2"
                  type="range"
                  min={0}
                  max={180}
                  value={lon2Deg}
                  onChange={(e) => setLon2Deg(Number(e.target.value))}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-1 shrink-0">
                  {(['W', 'E'] as const).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setLon2Hem(h)}
                      className={`min-h-[34px] px-2.5 rounded text-xs font-mono cursor-pointer ${
                        lon2Hem === h ? 'geo-active-amber font-bold' : 'bg-[#140c05] text-amber-200/70'
                      }`}
                    >
                      {h === 'E' ? 'D' : 'B'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Output */}
            <div className="geo-lcd rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-200/70">
                  MERKEZ 2 YEREL SAATİ
                </span>
                <span className="font-mono text-xs text-amber-300">{timeResult.dayShiftNote}</span>
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#fbbf24] tabular-nums">
                {timeResult.targetTimeFormatted}
              </div>
              <div className="text-xs text-amber-100/80 font-mono tabular-nums">
                Fark: {timeResult.meridianDiff}° × 4 dk = {timeResult.totalMinutesDiff} dk (
                {timeResult.hoursDiff} sa {timeResult.minutesRemainder} dk) · {timeResult.directionLabel}
              </div>
            </div>
          </div>

          {/* 2. Ölçek & Eğim Hesaplayıcı */}
          <div className="geo-panel rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Harita Ölçek &amp; Eğim Hesabı
                </h3>
              </div>
              <span className="font-mono text-[11px] text-amber-300">GU = HU × ÖP</span>
            </div>

            {/* Ölçek Paydası */}
            <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-amber-200/85">KESİR ÖLÇEK PAYDASI</span>
                <span className="font-mono font-bold text-amber-300 tabular-nums">
                  1 / {scaleDenom.toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[50_000, 200_000, 500_000, 1_000_000].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setScaleDenom(d)}
                    className={`min-h-[36px] px-1 rounded-lg font-mono text-[11px] cursor-pointer tabular-nums ${
                      scaleDenom === d
                        ? 'geo-active-amber font-bold'
                        : 'bg-[#140c05] border border-amber-400/20 text-amber-100/75'
                    }`}
                  >
                    1/{d >= 1_000_000 ? '1M' : `${d / 1000}K`}
                  </button>
                ))}
              </div>

              <div className="pt-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="geo-mapcm" className="font-mono text-amber-200/80">
                    Harita Uzunluğu (cm)
                  </label>
                  <span className="font-mono font-bold text-amber-300 tabular-nums">
                    {mapLengthCm} cm
                  </span>
                </div>
                <input
                  id="geo-mapcm"
                  type="range"
                  min={1}
                  max={30}
                  step={0.5}
                  value={mapLengthCm}
                  onChange={(e) => setMapLengthCm(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Eğim Girdileri */}
            <div className="rounded-xl bg-[#211408]/75 border border-amber-400/20 p-3.5 space-y-2.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="geo-elev" className="font-mono text-amber-200/80">
                    Yükselti Farkı Δh (m)
                  </label>
                  <span className="font-mono font-bold text-amber-300 tabular-nums">
                    {elevationDiffM} m
                  </span>
                </div>
                <input
                  id="geo-elev"
                  type="range"
                  min={50}
                  max={2500}
                  step={50}
                  value={elevationDiffM}
                  onChange={(e) => setElevationDiffM(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="geo-horiz" className="font-mono text-amber-200/80">
                    Yatay Uzaklık L (km)
                  </label>
                  <span className="font-mono font-bold text-amber-300 tabular-nums">
                    {horizontalDistKm} km ({horizontalDistKm * 1000} m)
                  </span>
                </div>
                <input
                  id="geo-horiz"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={horizontalDistKm}
                  onChange={(e) => setHorizontalDistKm(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Scale & Slope Readout */}
            <div className="geo-lcd rounded-xl p-4 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-amber-200/70">
                    GERÇEK UZUNLUK
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#fbbf24] tabular-nums">
                    {scaleResult.realDistanceKm} km
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-amber-200/70">
                    EĞİM ORANI
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-orange-300 tabular-nums">
                    %{scaleResult.slopePercent}
                  </div>
                  <div className="font-mono text-[11px] text-amber-200/75 tabular-nums">
                    (‰{scaleResult.slopePermille})
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-amber-400/15 text-xs text-amber-100/80 font-mono">
                Sınıf: {scaleResult.scaleClass}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
