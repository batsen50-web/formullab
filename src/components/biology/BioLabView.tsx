import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Dna,
  Droplets,
  RotateCcw,
  X,
} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  analyzeDnaTriplet,
  ENZYME_PRESETS,
  evaluateEnzymeRate,
  evaluateOsmosis,
  generateBioLabChallenge,
  type CellWallType,
  type DnaBase,
  type EnzymePresetId,
  type TonicityType,
} from '../../utils/bioLabLogic';

interface BioLabViewProps {
  onExit: () => void;
}

type BioLabMode = 'dogma' | 'enzyme_osmosis' | 'challenge';

const DNA_BASES: DnaBase[] = ['A', 'T', 'G', 'C'];
const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

const CODON_PRESETS: {label: string; triplet: [DnaBase, DnaBase, DnaBase]}[] = [
  {label: 'AUG Başlangıç (TAC)', triplet: ['T', 'A', 'C']},
  {label: 'UAA Durdurma (ATT)', triplet: ['A', 'T', 'T']},
  {label: 'UAG Durdurma (ATC)', triplet: ['A', 'T', 'C']},
  {label: 'Normal Hb (CTC)', triplet: ['C', 'T', 'C']},
  {label: 'Orak Hücre (CAC)', triplet: ['C', 'A', 'C']},
  {label: 'Glisin (CCA)', triplet: ['C', 'C', 'A']},
];

export const BioLabView: FC<BioLabViewProps> = ({onExit}) => {
  const [labMode, setLabMode] = useState<BioLabMode>('dogma');

  // 1. Santral Dogma state
  const [dnaTriplet, setDnaTriplet] = useState<[DnaBase, DnaBase, DnaBase]>(['T', 'A', 'C']);

  // 2. Enzyme & Osmosis state
  const [simSubMode, setSimSubMode] = useState<'enzyme' | 'osmosis'>('enzyme');
  const [enzymeId, setEnzymeId] = useState<EnzymePresetId>('amylase');
  const [tempC, setTempC] = useState<number>(37);
  const [phValue, setPhValue] = useState<number>(7.0);
  const [substratePct, setSubstratePct] = useState<number>(80);

  const [cellType, setCellType] = useState<CellWallType>('plant');
  const [tonicity, setTonicity] = useState<TonicityType>('hypotonic');

  // 3. Challenge state
  const [challenge, setChallenge] = useState(() => generateBioLabChallenge());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState({correct: 0, total: 0});

  const codonAnalysis = useMemo(() => analyzeDnaTriplet(dnaTriplet), [dnaTriplet]);

  const enzymeEval = useMemo(
    () => evaluateEnzymeRate(enzymeId, tempC, phValue, substratePct),
    [enzymeId, tempC, phValue, substratePct],
  );

  const osmosisEval = useMemo(
    () => evaluateOsmosis(cellType, tonicity),
    [cellType, tonicity],
  );

  // Build SVG path for temperature curve (0..70 C)
  const tempCurvePoints = useMemo(() => {
    const pts: string[] = [];
    for (let t = 0; t <= 70; t += 2) {
      const ev = evaluateEnzymeRate(enzymeId, t, phValue, substratePct);
      const x = 24 + (t / 70) * 252;
      const y = 108 - (ev.ratePercent / 100) * 86;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [enzymeId, phValue, substratePct]);

  const currentMarkerX = 24 + (tempC / 70) * 252;
  const currentMarkerY = 108 - (enzymeEval.ratePercent / 100) * 86;

  const setBaseAt = (index: 0 | 1 | 2, base: DnaBase) => {
    setDnaTriplet((prev) => {
      const next: [DnaBase, DnaBase, DnaBase] = [...prev] as [DnaBase, DnaBase, DnaBase];
      next[index] = base;
      return next;
    });
  };

  const handleSelectEnzymePreset = (id: EnzymePresetId) => {
    setEnzymeId(id);
    setTempC(ENZYME_PRESETS[id].optimumTemp);
    setPhValue(ENZYME_PRESETS[id].optimumPh);
    setSubstratePct(80);
  };

  const handleSelectChallenge = (opt: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    const isCorrect = opt === challenge.correctAnswer;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextChallenge = () => {
    setChallenge((prev) => generateBioLabChallenge(prev.id));
    setSelectedAnswer(null);
  };

  return (
    <section aria-label="Biyoloji Laboratuvarı" className="w-full space-y-4">
      {/* Top Bar */}
      <div className="bio-panel rounded-xl px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onExit}
          className="min-h-[42px] px-2.5 sm:px-3 rounded-lg border border-sky-400/20 bg-[#09202e] text-sky-100/80 hover:text-white hover:border-sky-400/45 flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Test Kurulumu</span>
        </button>

        <div className="grid grid-cols-3 rounded-lg bg-[#061824]/85 border border-sky-400/20 p-1 gap-1">
          <button
            type="button"
            onClick={() => setLabMode('dogma')}
            aria-pressed={labMode === 'dogma'}
            className={`min-h-[36px] px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              labMode === 'dogma'
                ? 'bio-active-teal font-semibold'
                : 'text-sky-100/75 hover:text-white'
            }`}
          >
            Kodon Lab
          </button>
          <button
            type="button"
            onClick={() => setLabMode('enzyme_osmosis')}
            aria-pressed={labMode === 'enzyme_osmosis'}
            className={`min-h-[36px] px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              labMode === 'enzyme_osmosis'
                ? 'bio-active-teal font-semibold'
                : 'text-sky-100/75 hover:text-white'
            }`}
          >
            Enzim &amp; Ozmoz
          </button>
          <button
            type="button"
            onClick={() => setLabMode('challenge')}
            aria-pressed={labMode === 'challenge'}
            className={`min-h-[36px] px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              labMode === 'challenge'
                ? 'bio-active-teal font-semibold'
                : 'text-sky-100/75 hover:text-white'
            }`}
          >
            Pratik Yap
          </button>
        </div>
      </div>

      {/* MODE 1: SANTRAL DOGMA CODON LAB */}
      {labMode === 'dogma' && (
        <div className="bio-panel rounded-2xl p-4 sm:p-6 space-y-5">
          {/* Result LCD Stage */}
          <div className="bio-lcd rounded-xl p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="rounded-lg bg-[#092130]/90 border border-sky-400/25 p-2.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-sky-200/70">
                  DNA Kalıp (3′→5′)
                </div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-white tracking-widest">
                  {codonAnalysis.dnaTemplate.join('')}
                </div>
              </div>

              <div className="rounded-lg bg-[#092130]/90 border border-sky-400/25 p-2.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-sky-200/70">
                  DNA Anlamlı (5′→3′)
                </div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-sky-200 tracking-widest">
                  {codonAnalysis.dnaCoding.join('')}
                </div>
              </div>

              <div className="rounded-lg bg-[#0b2b3e]/90 border border-sky-400/45 p-2.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-sky-300">
                  mRNA Kodonu
                </div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#F2D082] tracking-widest">
                  {codonAnalysis.mrnaCodon}
                </div>
              </div>

              <div className="rounded-lg bg-[#092130]/90 border border-sky-400/25 p-2.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-sky-200/70">
                  tRNA Antikodon
                </div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-cyan-300 tracking-widest">
                  {codonAnalysis.trnaAnticodon ?? 'YOK'}
                </div>
              </div>
            </div>

            <div className="border-t border-sky-400/15 pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-center sm:text-left">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-sky-200/70">
                  ŞİFRELENEN AMİNO ASİT
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#7dd3fc] mt-0.5">
                  {codonAnalysis.aminoAcid}{' '}
                  <span className="font-mono text-sm text-[#F2D082]">
                    ({codonAnalysis.aminoAcidCode})
                  </span>
                </div>
              </div>

              <div className="font-mono text-xs text-sky-100/80 tabular-nums flex items-center justify-center sm:justify-end gap-2">
                <span>{codonAnalysis.dnaHydrogenBonds} Zayıf H-Bağı</span>
                <span aria-hidden="true">·</span>
                <span>
                  Pürin: {codonAnalysis.purineCountInDnaTemplate} / Pirimidin:{' '}
                  {codonAnalysis.pyrimidineCountInDnaTemplate}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-50/85 leading-relaxed bg-[#091f2d]/75 border border-sky-400/20 rounded-lg px-3 py-2.5">
              {codonAnalysis.note}
            </p>
          </div>

          {/* Interactive Base Selectors */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] tracking-wider uppercase text-sky-200/75 font-semibold">
              DNA KALIP ZİNCİRİ NÜKLEOTİTLERİNİ SEÇ
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([0, 1, 2] as const).map((pos) => (
                <div
                  key={pos}
                  className="rounded-xl bg-[#091f2d]/80 border border-sky-400/20 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-sky-200/75">
                    <span>{pos + 1}. Nükleotit</span>
                    <span className="text-[#F2D082] font-semibold">
                      DNA: {dnaTriplet[pos]} → mRNA: {codonAnalysis.mrnaCodon[pos]}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {DNA_BASES.map((base) => {
                      const active = dnaTriplet[pos] === base;
                      return (
                        <button
                          key={base}
                          type="button"
                          onClick={() => setBaseAt(pos, base)}
                          aria-pressed={active}
                          className={`min-h-[42px] rounded-lg font-mono text-sm font-bold cursor-pointer transition-all ${
                            active
                              ? 'bio-active-teal'
                              : 'bg-[#081c29] border border-sky-400/20 text-sky-100 hover:border-sky-400/45 hover:text-white'
                          }`}
                        >
                          {base}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick ÖSYM Presets */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] tracking-wider uppercase text-sky-200/75 font-semibold">
              HIZLI ÖSYM ÖRNEKLERİ
            </div>
            <div className="flex flex-wrap gap-2">
              {CODON_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setDnaTriplet(preset.triplet)}
                  className="min-h-[38px] px-3 rounded-lg bg-[#0a2333] border border-sky-400/25 text-xs font-medium text-sky-100 hover:border-sky-400/55 hover:text-white whitespace-nowrap cursor-pointer transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ENZYME KINETICS & OSMOSIS SIMULATOR */}
      {labMode === 'enzyme_osmosis' && (
        <div className="bio-panel rounded-2xl p-4 sm:p-6 space-y-5">
          {/* Sub-mode Switcher */}
          <div className="grid grid-cols-2 rounded-xl bg-[#061824]/85 border border-sky-400/20 p-1 gap-1">
            <button
              type="button"
              onClick={() => setSimSubMode('enzyme')}
              aria-pressed={simSubMode === 'enzyme'}
              className={`min-h-[40px] px-3 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                simSubMode === 'enzyme'
                  ? 'bg-[#10354c] border border-sky-400/40 text-white'
                  : 'text-sky-100/70 hover:text-white border border-transparent'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>Enzim Kinetiği</span>
            </button>
            <button
              type="button"
              onClick={() => setSimSubMode('osmosis')}
              aria-pressed={simSubMode === 'osmosis'}
              className={`min-h-[40px] px-3 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                simSubMode === 'osmosis'
                  ? 'bg-[#10354c] border border-sky-400/40 text-white'
                  : 'text-sky-100/70 hover:text-white border border-transparent'
              }`}
            >
              <Droplets className="w-4 h-4 shrink-0" />
              <span>Ozmoz &amp; Tonisite</span>
            </button>
          </div>

          {simSubMode === 'enzyme' ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 items-stretch">
              {/* Left Stage: Live SVG Curve & Readout */}
              <div className="bio-lcd rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-sky-200/70">
                      TEPKİME HIZI
                    </div>
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-[#7dd3fc] tabular-nums">
                      %{enzymeEval.ratePercent}
                    </div>
                  </div>

                  <div
                    className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-1.5 ${
                      enzymeEval.status === 'OPTIMAL'
                        ? 'bg-[#0b3147] border-sky-400/50 text-[#7dd3fc]'
                        : enzymeEval.status === 'DENATURED'
                          ? 'bg-[#3b1817] border-red-400/50 text-[#fca5a5]'
                          : 'bg-[#322408] border-amber-400/50 text-[#f7dca1]'
                    }`}
                  >
                    <span>
                      {enzymeEval.status === 'OPTIMAL'
                        ? '●'
                        : enzymeEval.status === 'DENATURED'
                          ? '✕'
                          : '▲'}
                    </span>
                    <span>{enzymeEval.statusLabel}</span>
                  </div>
                </div>

                {/* Live Temperature-Velocity SVG Graph */}
                <div className="w-full">
                  <svg
                    viewBox="0 0 300 130"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Sıcaklığa bağlı enzim tepkime hızı eğrisi"
                  >
                    {/* Grid lines */}
                    <line x1="24" y1="22" x2="276" y2="22" stroke="rgba(56,189,248,0.14)" strokeDasharray="3 3" />
                    <line x1="24" y1="65" x2="276" y2="65" stroke="rgba(56,189,248,0.14)" strokeDasharray="3 3" />
                    {/* Axes */}
                    <line x1="24" y1="16" x2="24" y2="108" stroke="rgba(186,230,253,0.45)" strokeWidth="1.5" />
                    <line x1="24" y1="108" x2="282" y2="108" stroke="rgba(186,230,253,0.45)" strokeWidth="1.5" />

                    {/* Curve */}
                    <polyline
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={tempCurvePoints}
                    />

                    {/* Denaturation threshold line (55 C) */}
                    <line
                      x1={24 + (55 / 70) * 252}
                      y1="16"
                      x2={24 + (55 / 70) * 252}
                      y2="108"
                      stroke="rgba(248,113,113,0.45)"
                      strokeDasharray="4 3"
                    />
                    <text
                      x={24 + (55 / 70) * 252 + 3}
                      y="26"
                      fill="#fca5a5"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      55°C Denatüre
                    </text>

                    {/* Active point marker */}
                    <circle
                      cx={currentMarkerX}
                      cy={currentMarkerY}
                      r="5"
                      fill={enzymeEval.status === 'DENATURED' ? '#ef4444' : '#F2D082'}
                      stroke="#04111a"
                      strokeWidth="1.5"
                    />

                    {/* Labels */}
                    <text x="6" y="25" fill="rgba(224,242,254,0.7)" fontSize="8" fontFamily="monospace">
                      100
                    </text>
                    <text x="10" y="68" fill="rgba(224,242,254,0.7)" fontSize="8" fontFamily="monospace">
                      50
                    </text>
                    <text x="24" y="122" fill="rgba(224,242,254,0.7)" fontSize="8" fontFamily="monospace">
                      0°C
                    </text>
                    <text x="148" y="122" fill="rgba(224,242,254,0.7)" fontSize="8" fontFamily="monospace">
                      37°C
                    </text>
                    <text x="260" y="122" fill="rgba(224,242,254,0.7)" fontSize="8" fontFamily="monospace">
                      70°C
                    </text>
                  </svg>
                </div>

                <p className="text-xs sm:text-sm text-sky-50/90 leading-relaxed bg-[#091f2d]/75 border border-sky-400/20 rounded-lg px-3 py-2.5">
                  {enzymeEval.explanation}
                </p>
              </div>

              {/* Right Control Deck */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="font-mono text-[11px] tracking-wider uppercase text-sky-200/75 font-semibold">
                    ENZİM SEÇİMİ
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {(Object.keys(ENZYME_PRESETS) as EnzymePresetId[]).map((id) => {
                      const preset = ENZYME_PRESETS[id];
                      const active = enzymeId === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handleSelectEnzymePreset(id)}
                          aria-pressed={active}
                          className={`min-h-[42px] px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                            active
                              ? 'bio-active-teal font-semibold'
                              : 'bg-[#0a2333] border border-sky-400/20 text-sky-50 hover:border-sky-400/45'
                          }`}
                        >
                          <div className="text-xs sm:text-sm">{preset.name}</div>
                          <div
                            className={`text-[11px] ${
                              active ? 'text-[#031926]/80' : 'text-sky-200/65'
                            }`}
                          >
                            {preset.location}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Labeled Sliders with Explicit Units */}
                <div className="space-y-3.5 rounded-xl bg-[#091f2d]/80 border border-sky-400/20 p-3.5">
                  <label className="block space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-sky-100/85">Sıcaklık</span>
                      <span className="text-[#F2D082] font-semibold tabular-nums">{tempC} °C</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={70}
                      step={1}
                      value={tempC}
                      onChange={(e) => setTempC(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-sky-100/85">Ortam pH Değeri</span>
                      <span className="text-[#F2D082] font-semibold tabular-nums">
                        pH {phValue.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={14}
                      step={0.5}
                      value={phValue}
                      onChange={(e) => setPhValue(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-sky-100/85">Substrat Yoğunluğu</span>
                      <span className="text-[#F2D082] font-semibold tabular-nums">
                        %{substratePct}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={substratePct}
                      onChange={(e) => setSubstratePct(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => handleSelectEnzymePreset(enzymeId)}
                    className="w-full min-h-[38px] rounded-lg bg-[#0b2739] border border-sky-400/25 text-xs font-medium text-sky-100 hover:text-white hover:border-sky-400/50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Optimum Değerlere Sıfırla</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* OSMOSIS & TONICITY SIMULATOR */
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-stretch">
              <div className="bio-lcd rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-sky-200/70">
                      HÜCRE DURUMU
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#7dd3fc]">
                      {osmosisEval.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#F2D082]">
                    {cellType === 'plant' ? 'Çeperli Bitki' : 'Çepersiz Hayvan'}
                  </span>
                </div>

                {/* Interactive SVG Cell Diagram */}
                <div className="flex items-center justify-center py-2">
                  <svg
                    viewBox="0 0 260 150"
                    className="w-full max-w-[300px] h-auto"
                    role="img"
                    aria-label="Hücre ozmoz simülasyon diyagramı"
                  >
                    {/* Solution background */}
                    <rect
                      x="6"
                      y="6"
                      width="248"
                      height="138"
                      rx="14"
                      fill="rgba(10, 35, 51, 0.65)"
                      stroke="rgba(56, 189, 248, 0.25)"
                    />

                    {cellType === 'plant' ? (
                      <>
                        {/* Rigid Cell Wall */}
                        <rect
                          x="62"
                          y="24"
                          width="136"
                          height="102"
                          rx="16"
                          fill="none"
                          stroke="#7dd3fc"
                          strokeWidth="4"
                        />
                        {/* Plasma Membrane (shrinks in hypertonic, presses wall in hypotonic) */}
                        <rect
                          x={tonicity === 'hypertonic' ? 78 : 66}
                          y={tonicity === 'hypertonic' ? 36 : 28}
                          width={tonicity === 'hypertonic' ? 104 : 128}
                          height={tonicity === 'hypertonic' ? 78 : 94}
                          rx="12"
                          fill="rgba(14, 165, 233, 0.2)"
                          stroke="#F2D082"
                          strokeWidth="2"
                        />
                        {/* Central Vacuole */}
                        <ellipse
                          cx="130"
                          cy="75"
                          rx={tonicity === 'hypertonic' ? 24 : tonicity === 'hypotonic' ? 46 : 36}
                          ry={tonicity === 'hypertonic' ? 18 : tonicity === 'hypotonic' ? 32 : 25}
                          fill="rgba(34, 211, 238, 0.35)"
                          stroke="#22d3ee"
                          strokeWidth="1.5"
                        />
                      </>
                    ) : (
                      <>
                        {/* Animal Cell Membrane */}
                        <ellipse
                          cx="130"
                          cy="75"
                          rx={tonicity === 'hypertonic' ? 36 : tonicity === 'hypotonic' ? 66 : 50}
                          ry={tonicity === 'hypertonic' ? 26 : tonicity === 'hypotonic' ? 48 : 38}
                          fill={
                            tonicity === 'hypotonic'
                              ? 'rgba(239, 68, 68, 0.22)'
                              : 'rgba(14, 165, 233, 0.22)'
                          }
                          stroke={tonicity === 'hypotonic' ? '#fca5a5' : '#F2D082'}
                          strokeWidth="2.5"
                          strokeDasharray={tonicity === 'hypotonic' ? '6 4' : undefined}
                        />
                        {/* Nucleus */}
                        <circle
                          cx="130"
                          cy="75"
                          r="13"
                          fill="rgba(56, 189, 248, 0.35)"
                          stroke="#7dd3fc"
                          strokeWidth="1.5"
                        />
                      </>
                    )}

                    {/* Water flow indicators */}
                    <text
                      x="130"
                      y="138"
                      textAnchor="middle"
                      fill="#bae6fd"
                      fontSize="9.5"
                      fontFamily="monospace"
                    >
                      {osmosisEval.waterDirection}
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-[#091f2d]/80 border border-sky-400/20 p-2.5">
                    <div className="font-mono text-[10px] text-sky-200/65 uppercase">
                      Turgor Basıncı
                    </div>
                    <div className="mt-0.5 font-medium text-white">{osmosisEval.turgorLevel}</div>
                  </div>
                  <div className="rounded-lg bg-[#091f2d]/80 border border-sky-400/20 p-2.5">
                    <div className="font-mono text-[10px] text-sky-200/65 uppercase">
                      Osmotik Basınç
                    </div>
                    <div className="mt-0.5 font-medium text-white">{osmosisEval.osmoticPressure}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3 rounded-xl bg-[#091f2d]/80 border border-sky-400/20 p-4">
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-sky-200/75 font-semibold">
                      HÜCRE TİPİ
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCellType('plant')}
                        aria-pressed={cellType === 'plant'}
                        className={`min-h-[42px] px-3 rounded-lg text-xs sm:text-sm font-medium cursor-pointer ${
                          cellType === 'plant'
                            ? 'bio-active-teal font-semibold'
                            : 'bg-[#0a2333] border border-sky-400/20 text-sky-100 hover:border-sky-400/45'
                        }`}
                      >
                        Bitki (Çeperli)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCellType('animal')}
                        aria-pressed={cellType === 'animal'}
                        className={`min-h-[42px] px-3 rounded-lg text-xs sm:text-sm font-medium cursor-pointer ${
                          cellType === 'animal'
                            ? 'bio-active-teal font-semibold'
                            : 'bg-[#0a2333] border border-sky-400/20 text-sky-100 hover:border-sky-400/45'
                        }`}
                      >
                        Hayvan (Çepersiz)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-sky-200/75 font-semibold">
                      DIŞ ORTAM ÇÖZELTİSİ
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          {id: 'hypotonic', label: 'Hipotonik'},
                          {id: 'isotonic', label: 'İzotonik'},
                          {id: 'hypertonic', label: 'Hipertonik'},
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTonicity(opt.id)}
                          aria-pressed={tonicity === opt.id}
                          className={`min-h-[42px] px-2 rounded-lg text-xs font-medium cursor-pointer ${
                            tonicity === opt.id
                              ? 'bio-active-teal font-semibold'
                              : 'bg-[#0a2333] border border-sky-400/20 text-sky-100 hover:border-sky-400/45'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#091f2d]/80 border border-sky-400/20 p-4 space-y-1.5">
                  <div className="font-mono text-[11px] tracking-wider uppercase text-[#f5b06b] font-semibold">
                    ÖZET VE ÖSYM NOTU
                  </div>
                  <p className="text-xs sm:text-sm text-sky-50/90 leading-relaxed">
                    {osmosisEval.summary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: BIO LAB PRACTICE CHALLENGES */}
      {labMode === 'challenge' && (
        <div className="bio-panel rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-200 font-medium">
              <Dna className="w-4 h-4 text-sky-300" />
              <span>Biyo Lab Pratik Sorusu</span>
            </div>
            <span className="font-mono text-xs text-sky-200/80 tabular-nums">
              SKOR: {score.correct}/{score.total}
            </span>
          </div>

          <div className="bio-lcd rounded-xl p-5 space-y-2.5">
            <p className="text-sm sm:text-base font-medium text-[#F2D082] leading-relaxed">
              {challenge.prompt}
            </p>
            <div className="text-xs text-sky-200/75">
              <span className="font-mono text-sky-300">İpucu:</span> {challenge.hint}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {challenge.options.map((opt, idx) => {
              const isAnswered = selectedAnswer !== null;
              const isThisCorrect = opt === challenge.correctAnswer;
              const isThisSelected = opt === selectedAnswer;

              let cardStyle =
                'bg-[#0a2333]/85 border-sky-400/25 text-sky-50 hover:border-sky-400/55 hover:bg-[#0e3045]';
              let letterStyle = 'bg-[#061722] border-sky-400/25 text-sky-200/80';

              if (isAnswered) {
                if (isThisCorrect) {
                  cardStyle =
                    'bg-[#0e3b4e]/90 border-[#38bdf8] text-white shadow-[0_0_16px_rgba(56,189,248,0.28)]';
                  letterStyle = 'bg-[#0ea5e9] border-[#7dd3fc] text-[#031926]';
                } else if (isThisSelected) {
                  cardStyle = 'bg-[#471a1a]/90 border-[#ef4444] text-red-100';
                  letterStyle = 'bg-[#c83e3b] border-[#f87171] text-white';
                } else {
                  cardStyle = 'bg-[#071924]/50 border-sky-400/10 text-sky-100/45';
                  letterStyle = 'bg-[#05121b] border-sky-400/10 text-sky-100/35';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectChallenge(opt)}
                  className={`min-h-[54px] rounded-xl border p-3.5 flex items-center justify-between gap-3 text-left transition-all ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                  } ${cardStyle}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-md border font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${letterStyle}`}
                    >
                      {CHOICE_LETTERS[idx]}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-snug">{opt}</span>
                  </div>
                  {isAnswered && isThisCorrect && <Check className="w-5 h-5 text-[#7dd3fc] shrink-0" />}
                  {isAnswered && isThisSelected && !isThisCorrect && (
                    <X className="w-5 h-5 text-[#f87171] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="space-y-3 pt-1">
              <div className="rounded-xl bg-[#091f2d]/80 border border-sky-400/25 p-3.5 text-xs sm:text-sm text-sky-50/90 leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#f5b06b] font-semibold mr-1.5">
                  ÇÖZÜM:
                </span>
                {challenge.explanation}
              </div>

              <button
                type="button"
                onClick={handleNextChallenge}
                className="w-full min-h-[48px] rounded-xl bio-cta-teal font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sonraki Biyo Lab Sorusu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
