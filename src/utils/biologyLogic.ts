import {BIOLOGY_EXAM_QUESTIONS} from '../data/biologyQuestions';
import type {
  BiologyAnswerRecord,
  BiologyDictionaryFilterChip,
  BiologyExamQuestion,
  BiologyQuestion,
  BiologyQuizConfig,
  BiologyQuizSummary,
  BiologyStatsMap,
  BiologyTerm,
} from '../types/biology';
import type {ExamFilter, QuizSource} from '../types/chemistry';
import {matchesExamFilter, normalizeSearchText, shuffleArray} from './chemistryLogic';

export function matchesBiologySourceFilter(
  item: BiologyTerm,
  source: QuizSource,
  favorites: ReadonlySet<string>,
  stats: BiologyStatsMap = {},
): boolean {
  if (source === 'ALL') return true;
  if (source === 'FAVORITES') return favorites.has(item.id);
  if (source === 'MISTAKES') return (stats[item.id]?.wrong ?? 0) > 0;
  return item.isHighYield;
}

const searchableCache = new WeakMap<BiologyTerm, string>();

function getNormalizedBiologyText(item: BiologyTerm): string {
  const cached = searchableCache.get(item);
  if (cached !== undefined) return cached;

  const normalized = [
    item.term,
    item.shortCode,
    item.locationOrSystem,
    item.mechanism,
    item.examTip,
  ]
    .map(normalizeSearchText)
    .join(' ');
  searchableCache.set(item, normalized);
  return normalized;
}

export function filterBiologyTerms(
  terms: readonly BiologyTerm[],
  params: {
    searchQuery: string;
    source: QuizSource;
    chip: BiologyDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats?: BiologyStatsMap;
  },
): BiologyTerm[] {
  const normalizedQuery = normalizeSearchText(params.searchQuery);

  return terms.filter((item) => {
    if (!matchesBiologySourceFilter(item, params.source, params.favorites, params.stats ?? {})) {
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

    if (normalizedQuery.length > 0 && !getNormalizedBiologyText(item).includes(normalizedQuery)) {
      return false;
    }

    return true;
  });
}

export function getBiologyQuizPool(
  terms: readonly BiologyTerm[],
  config: BiologyQuizConfig,
  favorites: ReadonlySet<string>,
  stats: BiologyStatsMap = {},
): BiologyTerm[] {
  return terms.filter((item) => {
    if (!matchesBiologySourceFilter(item, config.source, favorites, stats)) {
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

export function getBiologyExamQuestionPool(
  examQuestions: readonly BiologyExamQuestion[],
  allTerms: readonly BiologyTerm[],
  config: BiologyQuizConfig,
  favorites: ReadonlySet<string>,
  stats: BiologyStatsMap = {},
): BiologyExamQuestion[] {
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
  examQuestion: BiologyExamQuestion,
  termMap: Map<string, BiologyTerm>,
  fallbackTerm: BiologyTerm,
  rng: () => number,
): BiologyQuestion {
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
  term: BiologyTerm,
  allTerms: readonly BiologyTerm[],
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM',
  rng: () => number,
): BiologyQuestion {
  const sameCategoryPool = shuffleArray(
    allTerms.filter((item) => item.id !== term.id && item.category === term.category),
    rng,
  );
  const otherCategoryPool = shuffleArray(
    allTerms.filter((item) => item.id !== term.id && item.category !== term.category),
    rng,
  );

  const distractors: BiologyTerm[] = [];
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

export function generateBiologyQuestions(
  pool: readonly BiologyTerm[],
  allTerms: readonly BiologyTerm[],
  config: Pick<BiologyQuizConfig, 'questionMode' | 'questionCount'> &
    Partial<Pick<BiologyQuizConfig, 'source' | 'examFilter' | 'topic'>>,
  rng: () => number = Math.random,
  examQuestions: readonly BiologyExamQuestion[] = BIOLOGY_EXAM_QUESTIONS,
  favorites: ReadonlySet<string> = new Set(),
  stats: BiologyStatsMap = {},
): BiologyQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const fullConfig: BiologyQuizConfig = {
    source: config.source ?? 'ALL',
    examFilter: config.examFilter ?? 'ALL',
    topic: config.topic ?? 'ALL',
    questionMode: config.questionMode,
    questionCount: config.questionCount,
  };

  const matchingExamQuestions = shuffleArray(
    getBiologyExamQuestionPool(examQuestions, allTerms, fullConfig, favorites, stats),
    rng,
  );

  if (config.questionMode === 'EXAM_STYLE') {
    const selected = matchingExamQuestions.slice(0, config.questionCount);
    if (selected.length > 0) {
      return selected.map((eq) => buildScenarioQuestion(eq, termMap, allTerms[0], rng));
    }
    // Graceful fallback if specific filter (e.g. a narrow favorite/mistake subset) has 0 prebuilt scenario questions
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

export function calculateBiologySummary(records: readonly BiologyAnswerRecord[]): BiologyQuizSummary {
  const total = records.length;
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakes: BiologyTerm[] = [];
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

export const BIO_FAVORITES_STORAGE_KEY = 'formullab_bio_favorites_v1';
export const BIO_STATS_STORAGE_KEY = 'formullab_bio_stats_v1';

export function loadBioFavoritesFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(BIO_FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function saveBioFavoritesToStorage(ids: readonly string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(BIO_FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadBioStatsFromStorage(): BiologyStatsMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(BIO_STATS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean: BiologyStatsMap = {};
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

export function saveBioStatsToStorage(stats: BiologyStatsMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(BIO_STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}
