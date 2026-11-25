import {PHYSICS_EXAM_QUESTIONS} from '../data/physicsQuestions';
import type {ExamFilter, QuizSource} from '../types/chemistry';
import type {
  PhysicsAnswerRecord,
  PhysicsDictionaryFilterChip,
  PhysicsExamQuestion,
  PhysicsQuestion,
  PhysicsQuizConfig,
  PhysicsQuizSummary,
  PhysicsStatsMap,
  PhysicsTerm,
} from '../types/physics';
import {matchesExamFilter, normalizeSearchText, shuffleArray} from './chemistryLogic';

export function matchesPhysicsSourceFilter(
  item: PhysicsTerm,
  source: QuizSource,
  favorites: ReadonlySet<string>,
  stats: PhysicsStatsMap = {},
): boolean {
  if (source === 'ALL') return true;
  if (source === 'FAVORITES') return favorites.has(item.id);
  if (source === 'MISTAKES') return (stats[item.id]?.wrong ?? 0) > 0;
  return item.isHighYield;
}

const searchableCache = new WeakMap<PhysicsTerm, string>();

function getNormalizedPhysicsText(item: PhysicsTerm): string {
  const cached = searchableCache.get(item);
  if (cached !== undefined) return cached;

  const normalized = [item.term, item.formula, item.siUnit, item.mechanism, item.examTip]
    .map(normalizeSearchText)
    .join(' ');
  searchableCache.set(item, normalized);
  return normalized;
}

export function filterPhysicsTerms(
  terms: readonly PhysicsTerm[],
  params: {
    searchQuery: string;
    source: QuizSource;
    chip: PhysicsDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats?: PhysicsStatsMap;
  },
): PhysicsTerm[] {
  const normalizedQuery = normalizeSearchText(params.searchQuery);

  return terms.filter((item) => {
    if (!matchesPhysicsSourceFilter(item, params.source, params.favorites, params.stats ?? {})) {
      return false;
    }

    if (params.chip === 'TYT' || params.chip === 'AYT') {
      if (!matchesExamFilter(item.examLevel, params.chip)) {
        return false;
      }
    } else if (params.chip !== 'ALL') {
      if (item.category !== params.chip) {
        return false;
      }
    }

    if (normalizedQuery.length > 0 && !getNormalizedPhysicsText(item).includes(normalizedQuery)) {
      return false;
    }

    return true;
  });
}

export function getPhysicsQuizPool(
  terms: readonly PhysicsTerm[],
  config: PhysicsQuizConfig,
  favorites: ReadonlySet<string>,
  stats: PhysicsStatsMap = {},
): PhysicsTerm[] {
  return terms.filter((item) => {
    if (!matchesPhysicsSourceFilter(item, config.source, favorites, stats)) {
      return false;
    }
    if (!matchesExamFilter(item.examLevel, config.examFilter as ExamFilter)) {
      return false;
    }
    if (config.topic !== 'ALL' && item.category !== config.topic) {
      return false;
    }
    return true;
  });
}

export function getPhysicsExamQuestionPool(
  examQuestions: readonly PhysicsExamQuestion[],
  allTerms: readonly PhysicsTerm[],
  config: PhysicsQuizConfig,
  favorites: ReadonlySet<string>,
  stats: PhysicsStatsMap = {},
): PhysicsExamQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  return examQuestions.filter((q) => {
    if (!matchesExamFilter(q.examLevel, config.examFilter as ExamFilter)) {
      return false;
    }
    if (config.topic !== 'ALL' && q.category !== config.topic) {
      return false;
    }
    if (config.source === 'HIGH_YIELD' && !q.isHighYield) {
      return false;
    }
    if (config.source === 'FAVORITES' && !favorites.has(q.relatedTermId)) {
      return false;
    }
    if (config.source === 'MISTAKES' && (stats[q.relatedTermId]?.wrong ?? 0) === 0) {
      return false;
    }
    return termMap.has(q.relatedTermId);
  });
}

function buildScenarioQuestion(
  examQuestion: PhysicsExamQuestion,
  termMap: Map<string, PhysicsTerm>,
  fallbackTerm: PhysicsTerm,
  rng: () => number,
): PhysicsQuestion {
  const relatedTerm = termMap.get(examQuestion.relatedTermId) ?? fallbackTerm;
  const taggedChoices = examQuestion.choices.map((label, idx) => ({
    id: `${examQuestion.id}-opt-${idx}`,
    label,
    isCorrect: idx === examQuestion.correctIndex,
  }));
  return {
    kind: 'EXAM_STYLE',
    examQuestion,
    term: relatedTerm,
    type: 'EXAM_STYLE',
    shuffledChoices: shuffleArray(taggedChoices, rng),
  };
}

function buildConceptQuestion(
  term: PhysicsTerm,
  allTerms: readonly PhysicsTerm[],
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM',
  rng: () => number,
): PhysicsQuestion {
  const sameCategoryPool = shuffleArray(
    allTerms.filter((item) => item.id !== term.id && item.category === term.category),
    rng,
  );
  const otherCategoryPool = shuffleArray(
    allTerms.filter((item) => item.id !== term.id && item.category !== term.category),
    rng,
  );

  const distractors: PhysicsTerm[] = [];
  const seenIds = new Set<string>([term.id]);

  for (const candidate of [...sameCategoryPool, ...otherCategoryPool]) {
    if (distractors.length >= 3) break;
    if (!seenIds.has(candidate.id)) {
      seenIds.add(candidate.id);
      distractors.push(candidate);
    }
  }

  return {
    kind: 'CONCEPT',
    term,
    type,
    choices: shuffleArray([term, ...distractors], rng),
  };
}

export function generatePhysicsQuestions(
  pool: readonly PhysicsTerm[],
  allTerms: readonly PhysicsTerm[],
  config: Pick<PhysicsQuizConfig, 'questionMode' | 'questionCount'> &
    Partial<Pick<PhysicsQuizConfig, 'source' | 'examFilter' | 'topic'>>,
  rng: () => number = Math.random,
  examQuestions: readonly PhysicsExamQuestion[] = PHYSICS_EXAM_QUESTIONS,
  favorites: ReadonlySet<string> = new Set(),
  stats: PhysicsStatsMap = {},
): PhysicsQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const fullConfig: PhysicsQuizConfig = {
    source: config.source ?? 'ALL',
    examFilter: config.examFilter ?? 'ALL',
    topic: config.topic ?? 'ALL',
    questionMode: config.questionMode,
    questionCount: config.questionCount,
  };

  const matchingExamQuestions = shuffleArray(
    getPhysicsExamQuestionPool(examQuestions, allTerms, fullConfig, favorites, stats),
    rng,
  );

  if (config.questionMode === 'EXAM_STYLE') {
    const selected = matchingExamQuestions.slice(0, config.questionCount);
    if (selected.length > 0) {
      return selected.map((eq) => buildScenarioQuestion(eq, termMap, allTerms[0], rng));
    }
    if (pool.length === 0) return [];
    const fallbackTargets = shuffleArray(pool, rng).slice(
      0,
      Math.min(config.questionCount, pool.length),
    );
    return fallbackTargets.map((term, idx) =>
      buildConceptQuestion(term, allTerms, idx % 2 === 0 ? 'TERM_TO_DESC' : 'DESC_TO_TERM', rng),
    );
  }

  if (pool.length === 0 && matchingExamQuestions.length === 0) return [];

  if (config.questionMode === 'MIXED') {
    const totalNeeded = config.questionCount;
    const scenarioTargetCount =
      matchingExamQuestions.length > 0
        ? Math.min(matchingExamQuestions.length, Math.ceil(totalNeeded * 0.5))
        : 0;

    const selectedScenarios = matchingExamQuestions
      .slice(0, scenarioTargetCount)
      .map((eq) => buildScenarioQuestion(eq, termMap, allTerms[0], rng));

    const conceptNeeded = totalNeeded - selectedScenarios.length;
    const conceptTargets = shuffleArray(pool, rng).slice(0, Math.min(conceptNeeded, pool.length));
    const selectedConcepts = conceptTargets.map((term, idx) =>
      buildConceptQuestion(term, allTerms, idx % 2 === 0 ? 'TERM_TO_DESC' : 'DESC_TO_TERM', rng),
    );

    return shuffleArray([...selectedScenarios, ...selectedConcepts], rng);
  }

  if (pool.length === 0) return [];
  const targetCount = Math.min(config.questionCount, pool.length);
  const selectedTargets = shuffleArray(pool, rng).slice(0, targetCount);

  return selectedTargets.map((term) =>
    buildConceptQuestion(term, allTerms, config.questionMode as 'TERM_TO_DESC' | 'DESC_TO_TERM', rng),
  );
}

export function calculatePhysicsSummary(records: readonly PhysicsAnswerRecord[]): PhysicsQuizSummary {
  const total = records.length;
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakes: PhysicsTerm[] = [];
  const seenMistakeIds = new Set<string>();

  for (const record of records) {
    if (record.isCorrect) {
      correctCount += 1;
      currentStreak += 1;
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
      const related = record.question.term;
      if (!seenMistakeIds.has(related.id)) {
        seenMistakeIds.add(related.id);
        mistakes.push(related);
      }
    }
  }

  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return {
    total,
    correctCount,
    percentage,
    bestStreak,
    mistakes,
  };
}

// ==========================================
// PHYSICS LAB PURE SIMULATION HELPERS
// ==========================================

export interface ProjectileSimulationResult {
  vx: number;
  vy: number;
  flightTime: number;
  maxHeight: number;
  range: number;
  points: {x: number; y: number}[];
}

export function simulateProjectileMotion(
  v0: number,
  angleDeg: number,
  gravity: number,
): ProjectileSimulationResult {
  const safeV0 = Math.max(1, v0);
  const safeG = Math.max(0.5, gravity);
  const rad = (Math.min(89, Math.max(1, angleDeg)) * Math.PI) / 180;
  const vx = Number((safeV0 * Math.cos(rad)).toFixed(2));
  const vy = Number((safeV0 * Math.sin(rad)).toFixed(2));

  const flightTime = Number(((2 * vy) / safeG).toFixed(2));
  const maxHeight = Number(((vy * vy) / (2 * safeG)).toFixed(2));
  const range = Number((vx * flightTime).toFixed(2));

  const steps = 28;
  const points: {x: number; y: number}[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (flightTime * i) / steps;
    const x = vx * t;
    const y = Math.max(0, vy * t - 0.5 * safeG * t * t);
    points.push({x: Number(x.toFixed(2)), y: Number(y.toFixed(2))});
  }

  return {vx, vy, flightTime, maxHeight, range, points};
}

export type CircuitTopology = 'series' | 'parallel';

export interface CircuitAnalysisResult {
  equivalentResistance: number;
  totalCurrent: number;
  current1: number;
  current2: number;
  voltage1: number;
  voltage2: number;
  totalPower: number;
  power1: number;
  power2: number;
  note: string;
}

export function analyzeElectricCircuit(
  voltage: number,
  r1: number,
  r2: number,
  topology: CircuitTopology,
): CircuitAnalysisResult {
  const safeV = Math.max(0, voltage);
  const safeR1 = Math.max(0.5, r1);
  const safeR2 = Math.max(0.5, r2);

  if (topology === 'series') {
    const rEq = safeR1 + safeR2;
    const iTotal = safeV / rEq;
    const v1 = iTotal * safeR1;
    const v2 = iTotal * safeR2;
    const p1 = v1 * iTotal;
    const p2 = v2 * iTotal;
    return {
      equivalentResistance: Number(rEq.toFixed(2)),
      totalCurrent: Number(iTotal.toFixed(2)),
      current1: Number(iTotal.toFixed(2)),
      current2: Number(iTotal.toFixed(2)),
      voltage1: Number(v1.toFixed(2)),
      voltage2: Number(v2.toFixed(2)),
      totalPower: Number((safeV * iTotal).toFixed(2)),
      power1: Number(p1.toFixed(2)),
      power2: Number(p2.toFixed(2)),
      note: 'Seri bağlı devrede her iki dirençten aynı ana kol akımı (I) geçer; direnci büyük olanın gerilim payı ve harcadığı güç (I²R) daha büyüktür.',
    };
  }

  const rEq = (safeR1 * safeR2) / (safeR1 + safeR2);
  const i1 = safeV / safeR1;
  const i2 = safeV / safeR2;
  const iTotal = i1 + i2;
  const p1 = safeV * i1;
  const p2 = safeV * i2;

  return {
    equivalentResistance: Number(rEq.toFixed(2)),
    totalCurrent: Number(iTotal.toFixed(2)),
    current1: Number(i1.toFixed(2)),
    current2: Number(i2.toFixed(2)),
    voltage1: Number(safeV.toFixed(2)),
    voltage2: Number(safeV.toFixed(2)),
    totalPower: Number((safeV * iTotal).toFixed(2)),
    power1: Number(p1.toFixed(2)),
    power2: Number(p2.toFixed(2)),
    note: 'Paralel bağlı kollarda gerilim (V) ortaktır; direnci küçük olan koldan daha büyük akım geçer ve P = V²/R gereği daha parlak yanar.',
  };
}

export type PhotoMetalId = 'cesium' | 'sodium' | 'zinc' | 'platinum';

export const PHOTOELECTRIC_METALS: Record<
  PhotoMetalId,
  {name: string; workFunctionEv: number; thresholdAngstrom: number}
> = {
  cesium: {name: 'Sezyum (Cs)', workFunctionEv: 2.0, thresholdAngstrom: 6200},
  sodium: {name: 'Sodyum (Na)', workFunctionEv: 2.3, thresholdAngstrom: 5391},
  zinc: {name: 'Çinko (Zn)', workFunctionEv: 4.3, thresholdAngstrom: 2884},
  platinum: {name: 'Platin (Pt)', workFunctionEv: 6.3, thresholdAngstrom: 1968},
};

export interface PhotoelectricResult {
  photonEnergyEv: number;
  workFunctionEv: number;
  maxKineticEv: number;
  stoppingVoltageV: number;
  emitsElectrons: boolean;
  relativeCurrentPct: number;
  statusLabel: string;
  explanation: string;
}

export function evaluatePhotoelectricEffect(
  metalId: PhotoMetalId,
  wavelengthAngstrom: number,
  intensityPct: number,
): PhotoelectricResult {
  const metal = PHOTOELECTRIC_METALS[metalId];
  const safeLambda = Math.max(800, wavelengthAngstrom);
  const photonEnergyEv = Number((12400 / safeLambda).toFixed(2));
  const diff = photonEnergyEv - metal.workFunctionEv;
  const emitsElectrons = diff > 0;
  const maxKineticEv = emitsElectrons ? Number(diff.toFixed(2)) : 0;
  const stoppingVoltageV = maxKineticEv;
  const relativeCurrentPct = emitsElectrons ? Math.max(0, Math.min(100, Math.round(intensityPct))) : 0;

  return {
    photonEnergyEv,
    workFunctionEv: metal.workFunctionEv,
    maxKineticEv,
    stoppingVoltageV,
    emitsElectrons,
    relativeCurrentPct,
    statusLabel: emitsElectrons ? 'FOTOELEKTRİK AKIM VAR' : 'EŞİK ENERJİSİ AŞILMADI',
    explanation: emitsElectrons
      ? `E_foton (${photonEnergyEv} eV) > E₀ (${metal.workFunctionEv} eV) olduğundan fotoelektron koparılır. Kalan ${maxKineticEv} eV kinetik enerjiye dönüşür; ışık şiddeti (%${relativeCurrentPct}) yalnızca kopan elektron sayısını belirler.`
      : `E_foton (${photonEnergyEv} eV) < E₀ (${metal.workFunctionEv} eV) olduğundan ışık şiddeti ne kadar artırılırsa artırılsın katottan elektron sökülemez (λ < ${metal.thresholdAngstrom} Å olmalı).`,
  };
}

// ==========================================
// LOCAL STORAGE PERSISTENCE
// ==========================================
export const PHYS_FAVORITES_STORAGE_KEY = 'formullab_phys_favorites_v1';
export const PHYS_STATS_STORAGE_KEY = 'formullab_phys_stats_v1';

export function loadPhysFavoritesFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PHYS_FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function savePhysFavoritesToStorage(ids: readonly string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PHYS_FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadPhysStatsFromStorage(): PhysicsStatsMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(PHYS_STATS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean: PhysicsStatsMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (
        value &&
        typeof value === 'object' &&
        typeof (value as {correct?: unknown}).correct === 'number' &&
        typeof (value as {wrong?: unknown}).wrong === 'number'
      ) {
        clean[key] = {
          correct: Math.max(0, Math.floor((value as {correct: number}).correct)),
          wrong: Math.max(0, Math.floor((value as {wrong: number}).wrong)),
        };
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function savePhysStatsToStorage(stats: PhysicsStatsMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PHYS_STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}
