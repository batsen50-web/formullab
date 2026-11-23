import type {
  Compound,
  DictionaryFilterChip,
  EffectiveQuestionType,
  ExamFilter,
  QuizAnswerRecord,
  QuizConfig,
  QuizQuestion,
  QuizSource,
  QuizSummary,
  StatsMap,
} from '../types/chemistry';

export interface FormulaToken {
  text: string;
  isSub: boolean;
}

const SUBSCRIPT_MAP: Record<string, string> = {
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
};

const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: 'c',
  Ç: 'c',
  ğ: 'g',
  Ğ: 'g',
  ı: 'i',
  İ: 'i',
  I: 'i',
  ö: 'o',
  Ö: 'o',
  ş: 's',
  Ş: 's',
  ü: 'u',
  Ü: 'u',
};

export function parseFormulaTokens(formula: string): FormulaToken[] {
  const tokens: FormulaToken[] = [];
  let i = 0;
  let buffer = '';

  while (i < formula.length) {
    if (formula[i] === '_' && i + 1 < formula.length && /\d/.test(formula[i + 1])) {
      if (buffer.length > 0) {
        tokens.push({text: buffer, isSub: false});
        buffer = '';
      }
      i += 1;
      let digits = '';
      while (i < formula.length && /\d/.test(formula[i])) {
        digits += formula[i];
        i += 1;
      }
      tokens.push({text: digits, isSub: true});
    } else {
      buffer += formula[i];
      i += 1;
    }
  }

  if (buffer.length > 0) {
    tokens.push({text: buffer, isSub: false});
  }

  return tokens;
}

export function normalizeSearchText(input: string): string {
  return input
    .trim()
    .split('')
    .map((ch) => SUBSCRIPT_MAP[ch] ?? TURKISH_CHAR_MAP[ch] ?? ch)
    .join('')
    .toLowerCase();
}

export function matchesExamFilter(
  examLevel: Compound['examLevel'],
  examFilter: ExamFilter,
): boolean {
  if (examFilter === 'ALL') return true;
  if (examFilter === 'TYT') return examLevel === 'TYT' || examLevel === 'TYT_AYT';
  return examLevel === 'AYT' || examLevel === 'TYT_AYT';
}

export function matchesSourceFilter(
  compound: Compound,
  source: QuizSource,
  favorites: ReadonlySet<string>,
  stats: StatsMap = {},
): boolean {
  if (source === 'ALL') return true;
  if (source === 'FAVORITES') return favorites.has(compound.id);
  if (source === 'MISTAKES') return (stats[compound.id]?.wrong ?? 0) > 0;
  return compound.isHighYield;
}

const searchableCache = new WeakMap<Compound, string>();

function getNormalizedCompoundText(compound: Compound): string {
  const cached = searchableCache.get(compound);
  if (cached !== undefined) return cached;

  const normalized = [
    compound.plainFormula,
    compound.commonName,
    compound.systematicName,
    compound.bondType,
  ]
    .map(normalizeSearchText)
    .join(' ');
  searchableCache.set(compound, normalized);
  return normalized;
}

export function filterDictionaryCompounds(
  compounds: readonly Compound[],
  params: {
    searchQuery: string;
    source: QuizSource;
    chip: DictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats?: StatsMap;
  },
): Compound[] {
  const normalizedQuery = normalizeSearchText(params.searchQuery);

  return compounds.filter((compound) => {
    if (!matchesSourceFilter(compound, params.source, params.favorites, params.stats ?? {})) {
      return false;
    }

    if (params.chip === 'TYT' || params.chip === 'AYT') {
      if (!matchesExamFilter(compound.examLevel, params.chip)) {
        return false;
      }
    } else if (params.chip !== 'ALL') {
      if (compound.category !== params.chip) {
        return false;
      }
    }

    if (normalizedQuery.length > 0 && !getNormalizedCompoundText(compound).includes(normalizedQuery)) {
      return false;
    }

    return true;
  });
}

export function getQuizPool(
  compounds: readonly Compound[],
  config: QuizConfig,
  favorites: ReadonlySet<string>,
  stats: StatsMap = {},
): Compound[] {
  return compounds.filter((compound) => {
    if (!matchesSourceFilter(compound, config.source, favorites, stats)) {
      return false;
    }
    if (!matchesExamFilter(compound.examLevel, config.examFilter)) {
      return false;
    }
    if (config.topic !== 'ALL' && compound.category !== config.topic) {
      return false;
    }
    return true;
  });
}

export function shuffleArray<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

export function generateQuizQuestions(
  pool: readonly Compound[],
  allCompounds: readonly Compound[],
  config: Pick<QuizConfig, 'questionMode' | 'questionCount'>,
  rng: () => number = Math.random,
): QuizQuestion[] {
  if (pool.length === 0) return [];

  const targetCount = Math.min(config.questionCount, pool.length);
  const selectedTargets = shuffleArray(pool, rng).slice(0, targetCount);

  return selectedTargets.map((compound, index) => {
    let type: EffectiveQuestionType;
    if (config.questionMode === 'MIXED') {
      type = index % 2 === 0 ? 'FORMULA_TO_NAME' : 'NAME_TO_FORMULA';
    } else {
      type = config.questionMode;
    }

    const sameCategoryPool = shuffleArray(
      allCompounds.filter((item) => item.id !== compound.id && item.category === compound.category),
      rng,
    );
    const otherCategoryPool = shuffleArray(
      allCompounds.filter((item) => item.id !== compound.id && item.category !== compound.category),
      rng,
    );

    const distractors: Compound[] = [];
    const seenIds = new Set<string>([compound.id]);

    for (const candidate of [...sameCategoryPool, ...otherCategoryPool]) {
      if (distractors.length >= 3) break;
      if (!seenIds.has(candidate.id)) {
        seenIds.add(candidate.id);
        distractors.push(candidate);
      }
    }

    const choices = shuffleArray([compound, ...distractors], rng);

    return {
      compound,
      type,
      choices,
    };
  });
}

export function formatCompoundNameForPrompt(compound: Compound): string {
  if (
    compound.commonName.trim().toLowerCase() ===
    compound.systematicName.trim().toLowerCase()
  ) {
    return compound.commonName;
  }
  if (compound.commonName.includes('(')) {
    return `${compound.commonName} · ${compound.systematicName}`;
  }
  return `${compound.commonName} (${compound.systematicName})`;
}

export function calculateQuizSummary(records: readonly QuizAnswerRecord[]): QuizSummary {
  const total = records.length;
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakes: Compound[] = [];
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
      if (!seenMistakeIds.has(record.question.compound.id)) {
        seenMistakeIds.add(record.question.compound.id);
        mistakes.push(record.question.compound);
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

export const FAVORITES_STORAGE_KEY = 'formullab_favorites_v1';
export const STATS_STORAGE_KEY = 'formullab_stats_v1';

export function loadFavoritesFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function saveFavoritesToStorage(ids: readonly string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function loadStatsFromStorage(): StatsMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean: StatsMap = {};
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

export function saveStatsToStorage(stats: StatsMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors cleanly
  }
}
