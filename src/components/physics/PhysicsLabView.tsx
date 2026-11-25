import {ArrowLeft, Atom, Compass, RotateCcw, Zap} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {
  analyzeElectricCircuit,
  evaluatePhotoelectricEffect,
  PHOTOELECTRIC_METALS,
  simulateProjectileMotion,
  type CircuitTopology,
  type PhotoMetalId,
} from '../../utils/physicsLogic';

interface PhysicsLabViewProps {
  onExit: () => void;
}

type PhysicsLabMode = 'projectile' | 'circuit' | 'photoelectric';

const GRAVITY_BODIES = [
  {label: 'Dünya (10)', value: 10},
  {label: 'Mars (3.7)', value: 3.7},
  {label: 'Ay (1.6)', value: 1.6},
];

export const PhysicsLabView: FC<PhysicsLabViewProps> = ({onExit}) => {
  const [labMode, setLabMode] = useState<PhysicsLabMode>('projectile');

  // 1. Projectile state
  const [v0, setV0] = useState(40);
  const [angleDeg, setAngleDeg] = useState(45);
  const [gravity, setGravity] = useState(10);

  // 2. Circuit state
  const [topology, setTopology] = useState<CircuitTopology>('series');
  const [voltage, setVoltage] = useState(12);
  const [r1, setR1] = useState(4);
  const [r2, setR2] = useState(2);

  // 3. Photoelectric state
  const [metalId, setMetalId] = useState<PhotoMetalId>('cesium');
  const [wavelength, setWavelength] = useState(3100);
  const [intensityPct, setIntensityPct] = useState(75);

  const projectile = useMemo(
    () => simulateProjectileMotion(v0, angleDeg, gravity),
    [v0, angleDeg, gravity],
  );

  // Scale projectile curve safely to SVG viewport (24..286 x, 16..118 y)
  const projectileSvg = useMemo(() => {
    const maxScaleX = Math.max(250, projectile.range * 1.12);
    const maxScaleY = Math.max(90, projectile.maxHeight * 1.25);

    const pts = projectile.points
      .map((pt) => {
        const sx = 24 + (pt.x / maxScaleX) * 260;
        const sy = 116 - (pt.y / maxScaleY) * 94;
        return `${sx.toFixed(1)},${sy.toFixed(1)}`;
      })
      .join(' ');

    const peakX = 24 + (projectile.range / 2 / maxScaleX) * 260;
    const peakY = 116 - (projectile.maxHeight / maxScaleY) * 94;
    const endX = 24 + (projectile.range / maxScaleX) * 260;

    return {pts, peakX, peakY, endX};
  }, [projectile]);

  const circuit = useMemo(
    () => analyzeElectricCircuit(voltage, r1, r2, topology),
    [voltage, r1, r2, topology],
  );

  const photoelectric = useMemo(
    () => evaluatePhotoelectricEffect(metalId, wavelength, intensityPct),
    [metalId, wavelength, intensityPct],
  );

  return (
    <section aria-label="Fizik Laboratuvarı" className="w-full space-y-4">
      {/* Top Bar */}
      <div className="phys-panel rounded-xl px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onExit}
          className="min-h-[42px] px-2.5 sm:px-3 rounded-lg border border-violet-400/20 bg-[#140c29] text-violet-100/80 hover:text-white hover:border-violet-400/45 flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Test Kurulumu</span>
        </button>

        <div className="grid grid-cols-3 rounded-lg bg-[#0d071d]/85 border border-violet-400/20 p-1 gap-1">
          <button
            type="button"
            onClick={() => setLabMode('projectile')}
            aria-pressed={labMode === 'projectile'}
            className={`min-h-[36px] px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
              labMode === 'projectile'
                ? 'phys-active-violet font-semibold'
                : 'text-violet-100/75 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 hidden sm:inline shrink-0" />
            <span>Eğik Atış</span>
          </button>
          <button
            type="button"
            onClick={() => setLabMode('circuit')}
            aria-pressed={labMode === 'circuit'}
            className={`min-h-[36px] px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
              labMode === 'circuit'
                ? 'phys-active-violet font-semibold'
                : 'text-violet-100/75 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 hidden sm:inline shrink-0" />
            <span>Ohm Devresi</span>
          </button>
          <button
            type="button"
            onClick={() => setLabMode('photoelectric')}
            aria-pressed={labMode === 'photoelectric'}
            className={`min-h-[36px] px-2.5 sm:px-3 rounded-md text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
              labMode === 'photoelectric'
                ? 'phys-active-violet font-semibold'
                : 'text-violet-100/75 hover:text-white'
            }`}
          >
            <Atom className="w-3.5 h-3.5 hidden sm:inline shrink-0" />
            <span>Fotoelektrik</span>
          </button>
        </div>
      </div>

      {/* MODE 1: PROJECTILE MOTION SIMULATOR */}
      {labMode === 'projectile' && (
        <div className="phys-panel rounded-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 items-stretch">
          {/* Left Visual Stage */}
          <div className="phys-lcd rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">Menzil (X)</div>
                <div className="mt-0.5 font-mono text-base sm:text-lg font-bold text-[#c4b5fd] tabular-nums">
                  {projectile.range} m
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">h_max</div>
                <div className="mt-0.5 font-mono text-base sm:text-lg font-bold text-[#F2D082] tabular-nums">
                  {projectile.maxHeight} m
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">t_uçuş</div>
                <div className="mt-0.5 font-mono text-base sm:text-lg font-bold text-white tabular-nums">
                  {projectile.flightTime} s
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">v_x / v_y</div>
                <div className="mt-0.5 font-mono text-xs sm:text-sm font-semibold text-violet-300 tabular-nums">
                  {projectile.vx} / {projectile.vy}
                </div>
              </div>
            </div>

            <svg
              viewBox="0 0 300 132"
              className="w-full h-auto"
              role="img"
              aria-label="Eğik atış yörünge simülasyonu"
            >
              <line x1="24" y1="22" x2="286" y2="22" stroke="rgba(167,139,250,0.12)" strokeDasharray="3 3" />
              <line x1="24" y1="69" x2="286" y2="69" stroke="rgba(167,139,250,0.12)" strokeDasharray="3 3" />
              <line x1="24" y1="16" x2="24" y2="116" stroke="rgba(221,214,254,0.45)" strokeWidth="1.5" />
              <line x1="24" y1="116" x2="288" y2="116" stroke="rgba(221,214,254,0.45)" strokeWidth="1.5" />

              {/* Parabolic trajectory */}
              <polyline
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={projectileSvg.pts}
              />

              {/* h_max vertical guide */}
              <line
                x1={projectileSvg.peakX}
                y1={projectileSvg.peakY}
                x2={projectileSvg.peakX}
                y2="116"
                stroke="rgba(242,208,130,0.45)"
                strokeDasharray="3 3"
              />
              <circle cx={projectileSvg.peakX} cy={projectileSvg.peakY} r="4" fill="#F2D082" />
              <circle cx={projectileSvg.endX} cy="116" r="4" fill="#c084fc" />

              <text x="24" y="128" fill="rgba(221,214,254,0.75)" fontSize="8" fontFamily="monospace">
                0 m
              </text>
              <text
                x={Math.min(248, Math.max(40, projectileSvg.peakX - 18))}
                y={Math.max(12, projectileSvg.peakY - 6)}
                fill="#F2D082"
                fontSize="8"
                fontFamily="monospace"
              >
                h={projectile.maxHeight}m
              </text>
              <text
                x={Math.min(245, Math.max(60, projectileSvg.endX - 24))}
                y="128"
                fill="#c4b5fd"
                fontSize="8"
                fontFamily="monospace"
              >
                X={projectile.range}m
              </text>
            </svg>

            <p className="text-xs sm:text-sm text-violet-50/85 leading-relaxed bg-[#130c29]/75 border border-violet-400/20 rounded-lg px-3 py-2.5">
              Tepe noktasında düşey hız sıfırlanır (v_y = 0) ancak yatay hız v_x = {projectile.vx} m/s
              yörünge boyunca sabit kalır. Birbirini 90°&apos;ye tamamlayan açılar (ör. 37° ve 53°) eşit menzil verir.
            </p>
          </div>

          {/* Right Control Deck */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5 rounded-xl bg-[#130c29]/80 border border-violet-400/20 p-4">
              <label className="block space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">İlk Hız (v₀)</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">{v0} m/s</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={v0}
                  onChange={(e) => setV0(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">Atış Açısı (α)</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">{angleDeg}°</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={85}
                  step={1}
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>

              <div className="space-y-1.5 pt-1">
                <div className="font-mono text-[11px] uppercase tracking-wider text-violet-200/75 font-semibold">
                  YER ÇEKİMİ İVMESİ (g)
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {GRAVITY_BODIES.map((gOpt) => (
                    <button
                      key={gOpt.label}
                      type="button"
                      onClick={() => setGravity(gOpt.value)}
                      aria-pressed={gravity === gOpt.value}
                      className={`min-h-[38px] px-2 rounded-lg text-[11px] font-mono cursor-pointer ${
                        gravity === gOpt.value
                          ? 'phys-active-violet font-semibold'
                          : 'bg-[#170f33] border border-violet-400/20 text-violet-100 hover:border-violet-400/45'
                      }`}
                    >
                      {gOpt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 rounded-xl bg-[#130c29]/80 border border-violet-400/20 p-3.5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-violet-200/75 font-semibold">
                HIZLI ÖSYM DENEMELERİ
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setV0(50);
                    setAngleDeg(37);
                    setGravity(10);
                  }}
                  className="min-h-[38px] px-2 rounded-lg bg-[#181036] border border-violet-400/25 text-xs text-violet-100 hover:text-white hover:border-violet-400/50 cursor-pointer"
                >
                  37° (3-4-5)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setV0(50);
                    setAngleDeg(53);
                    setGravity(10);
                  }}
                  className="min-h-[38px] px-2 rounded-lg bg-[#181036] border border-violet-400/25 text-xs text-violet-100 hover:text-white hover:border-violet-400/50 cursor-pointer"
                >
                  53° (3-4-5)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setV0(40);
                    setAngleDeg(45);
                    setGravity(10);
                  }}
                  className="min-h-[38px] px-2 rounded-lg bg-[#181036] border border-violet-400/25 text-xs text-violet-100 hover:text-white hover:border-violet-400/50 cursor-pointer"
                >
                  45° Max
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: OHM & ELECTRIC CIRCUIT LAB */}
      {labMode === 'circuit' && (
        <div className="phys-panel rounded-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-stretch">
          <div className="phys-lcd rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2.5">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">R_eşdeğer</div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#c4b5fd] tabular-nums">
                  {circuit.equivalentResistance} Ω
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2.5">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">Ana Akım (I)</div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-[#F2D082] tabular-nums">
                  {circuit.totalCurrent} A
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2.5">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">Toplam Güç</div>
                <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-white tabular-nums">
                  {circuit.totalPower} W
                </div>
              </div>
            </div>

            {/* Live Circuit Schematic */}
            <svg
              viewBox="0 0 280 135"
              className="w-full max-w-[340px] mx-auto h-auto"
              role="img"
              aria-label="Seri ve paralel elektrik devresi şeması"
            >
              {topology === 'series' ? (
                <>
                  <rect x="40" y="24" width="200" height="84" rx="8" fill="none" stroke="#a78bfa" strokeWidth="2" />
                  {/* R1 */}
                  <rect x="82" y="14" width="44" height="20" rx="4" fill="#1b1236" stroke="#F2D082" strokeWidth="1.8" />
                  <text x="104" y="27" textAnchor="middle" fill="#F2D082" fontSize="9" fontFamily="monospace">
                    R₁={r1}Ω
                  </text>
                  {/* R2 */}
                  <rect x="156" y="14" width="44" height="20" rx="4" fill="#1b1236" stroke="#c4b5fd" strokeWidth="1.8" />
                  <text x="178" y="27" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">
                    R₂={r2}Ω
                  </text>
                  {/* Battery */}
                  <rect x="112" y="98" width="56" height="20" rx="4" fill="#140d2b" stroke="#8b5cf6" strokeWidth="1.5" />
                  <text x="140" y="111" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace">
                    V = {voltage}V
                  </text>
                </>
              ) : (
                <>
                  {/* Main loop + parallel branches */}
                  <rect x="40" y="22" width="200" height="88" rx="8" fill="none" stroke="#a78bfa" strokeWidth="2" />
                  <line x1="40" y1="62" x2="240" y2="62" stroke="#a78bfa" strokeWidth="2" />
                  {/* R1 top */}
                  <rect x="116" y="12" width="48" height="20" rx="4" fill="#1b1236" stroke="#F2D082" strokeWidth="1.8" />
                  <text x="140" y="25" textAnchor="middle" fill="#F2D082" fontSize="9" fontFamily="monospace">
                    R₁={r1}Ω
                  </text>
                  {/* R2 middle */}
                  <rect x="116" y="52" width="48" height="20" rx="4" fill="#1b1236" stroke="#c4b5fd" strokeWidth="1.8" />
                  <text x="140" y="65" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">
                    R₂={r2}Ω
                  </text>
                  {/* Battery */}
                  <rect x="112" y="100" width="56" height="20" rx="4" fill="#140d2b" stroke="#8b5cf6" strokeWidth="1.5" />
                  <text x="140" y="113" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace">
                    V = {voltage}V
                  </text>
                </>
              )}
            </svg>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="rounded-lg bg-[#140d2b]/85 border border-violet-400/20 p-2.5 tabular-nums">
                <div className="text-violet-200/70">R₁ Kolu</div>
                <div className="text-[#F2D082] font-semibold mt-0.5">
                  I₁={circuit.current1}A · V₁={circuit.voltage1}V · {circuit.power1}W
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/85 border border-violet-400/20 p-2.5 tabular-nums">
                <div className="text-violet-200/70">R₂ Kolu</div>
                <div className="text-[#c4b5fd] font-semibold mt-0.5">
                  I₂={circuit.current2}A · V₂={circuit.voltage2}V · {circuit.power2}W
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-violet-50/85 leading-relaxed bg-[#130c29]/75 border border-violet-400/20 rounded-lg px-3 py-2.5">
              {circuit.note}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3 rounded-xl bg-[#130c29]/80 border border-violet-400/20 p-4">
              <div className="space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-violet-200/75 font-semibold">
                  BAĞLANTI TİPİ
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTopology('series')}
                    aria-pressed={topology === 'series'}
                    className={`min-h-[42px] px-3 rounded-lg text-xs sm:text-sm font-medium cursor-pointer ${
                      topology === 'series'
                        ? 'phys-active-violet font-semibold'
                        : 'bg-[#170f33] border border-violet-400/20 text-violet-100 hover:border-violet-400/45'
                    }`}
                  >
                    Seri Bağlı
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopology('parallel')}
                    aria-pressed={topology === 'parallel'}
                    className={`min-h-[42px] px-3 rounded-lg text-xs sm:text-sm font-medium cursor-pointer ${
                      topology === 'parallel'
                        ? 'phys-active-violet font-semibold'
                        : 'bg-[#170f33] border border-violet-400/20 text-violet-100 hover:border-violet-400/45'
                    }`}
                  >
                    Paralel Bağlı
                  </button>
                </div>
              </div>

              <label className="block space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">Üreteç Gerilimi (V)</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">{voltage} V</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={36}
                  step={3}
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">Direnç R₁</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">{r1} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={r1}
                  onChange={(e) => setR1(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">Direnç R₂</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">{r2} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                setVoltage(12);
                setR1(4);
                setR2(2);
              }}
              className="w-full min-h-[42px] rounded-lg bg-[#170f33] border border-violet-400/25 text-xs font-medium text-violet-100 hover:text-white hover:border-violet-400/50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılan Devreye Sıfırla</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: PHOTOELECTRIC EFFECT LAB */}
      {labMode === 'photoelectric' && (
        <div className="phys-panel rounded-2xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-stretch">
          <div className="phys-lcd rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-violet-200/70">
                  EINSTEIN DENKLEMİ: E_foton = 12400 / λ
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[#c4b5fd] tabular-nums">
                  {photoelectric.photonEnergyEv} eV
                </div>
              </div>

              <div
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold ${
                  photoelectric.emitsElectrons
                    ? 'bg-[#25154a] border-violet-400/55 text-[#c4b5fd]'
                    : 'bg-[#3b1817] border-red-400/50 text-[#fca5a5]'
                }`}
              >
                {photoelectric.emitsElectrons ? '● ' : '✕ '}
                {photoelectric.statusLabel}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2.5">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">Eşik (E₀)</div>
                <div className="mt-0.5 font-mono text-base font-bold text-white tabular-nums">
                  {photoelectric.workFunctionEv} eV
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2.5">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">E_K (max)</div>
                <div className="mt-0.5 font-mono text-base font-bold text-[#F2D082] tabular-nums">
                  {photoelectric.maxKineticEv} eV
                </div>
              </div>
              <div className="rounded-lg bg-[#140d2b]/90 border border-violet-400/25 p-2.5">
                <div className="font-mono text-[10px] text-violet-200/70 uppercase">V_kesme</div>
                <div className="mt-0.5 font-mono text-base font-bold text-fuchsia-300 tabular-nums">
                  {photoelectric.stoppingVoltageV} V
                </div>
              </div>
            </div>

            {/* Photon -> Cathode -> Anode SVG */}
            <svg
              viewBox="0 0 280 110"
              className="w-full max-w-[340px] mx-auto h-auto"
              role="img"
              aria-label="Fotoelektrik tüp foton ve elektron diyagramı"
            >
              <rect x="24" y="16" width="232" height="78" rx="34" fill="rgba(20,13,43,0.75)" stroke="rgba(167,139,250,0.35)" strokeWidth="2" />
              {/* Cathode plate */}
              <rect x="58" y="30" width="8" height="50" rx="3" fill="#a78bfa" />
              <text x="52" y="104" fill="#c4b5fd" fontSize="8.5" fontFamily="monospace">Katot</text>
              {/* Anode plate */}
              <rect x="212" y="30" width="8" height="50" rx="3" fill="#94a3b8" />
              <text x="205" y="104" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">Anot</text>

              {/* Incoming photon ray */}
              <line x1="12" y1="24" x2="56" y2="52" stroke="#F2D082" strokeWidth="2" strokeDasharray="4 3" />
              <text x="8" y="18" fill="#F2D082" fontSize="8" fontFamily="monospace">h·f</text>

              {/* Emitted electrons */}
              {photoelectric.emitsElectrons ? (
                <>
                  <line x1="70" y1="45" x2="205" y2="45" stroke="#c084fc" strokeWidth="1.6" strokeDasharray="5 4" />
                  <circle cx="115" cy="45" r="3.5" fill="#e9d5ff" />
                  <circle cx="165" cy="45" r="3.5" fill="#e9d5ff" />
                  {photoelectric.relativeCurrentPct >= 50 && (
                    <>
                      <line x1="70" y1="65" x2="205" y2="65" stroke="#c084fc" strokeWidth="1.6" strokeDasharray="5 4" />
                      <circle cx="140" cy="65" r="3.5" fill="#e9d5ff" />
                    </>
                  )}
                  <text x="138" y="35" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontFamily="monospace">
                    e⁻ akımı (%{photoelectric.relativeCurrentPct})
                  </text>
                </>
              ) : (
                <text x="138" y="58" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontFamily="monospace">
                  E_foton &lt; E₀ : Elektron Kopmaz
                </text>
              )}
            </svg>

            <p className="text-xs sm:text-sm text-violet-50/90 leading-relaxed bg-[#130c29]/75 border border-violet-400/20 rounded-lg px-3 py-2.5">
              {photoelectric.explanation}
            </p>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-violet-200/75 font-semibold">
                KATOT METALİ SEÇİMİ
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(PHOTOELECTRIC_METALS) as PhotoMetalId[]).map((id) => {
                  const m = PHOTOELECTRIC_METALS[id];
                  const active = metalId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMetalId(id)}
                      aria-pressed={active}
                      className={`min-h-[44px] px-3 py-2 rounded-lg text-left cursor-pointer transition-all ${
                        active
                          ? 'phys-active-violet font-semibold'
                          : 'bg-[#170f33] border border-violet-400/20 text-violet-100 hover:border-violet-400/45'
                      }`}
                    >
                      <div className="text-xs sm:text-sm">{m.name}</div>
                      <div
                        className={`font-mono text-[11px] ${
                          active ? 'text-[#14092d]/80' : 'text-violet-200/65'
                        }`}
                      >
                        E₀ = {m.workFunctionEv} eV
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3.5 rounded-xl bg-[#130c29]/80 border border-violet-400/20 p-4">
              <label className="block space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">Dalga Boyu (λ)</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">{wavelength} Å</span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={7000}
                  step={100}
                  value={wavelength}
                  onChange={(e) => setWavelength(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-violet-100/85">Işık Şiddeti (Foton Akısı)</span>
                  <span className="text-[#F2D082] font-semibold tabular-nums">%{intensityPct}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={intensityPct}
                  onChange={(e) => setIntensityPct(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
