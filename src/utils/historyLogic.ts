import type {ExamFilter, QuizSource} from '../types/chemistry';
import type {
  HistoryAnswerRecord,
  HistoryDictionaryFilterChip,
  HistoryExamQuestion,
  HistoryQuestion,
  HistoryQuizConfig,
  HistoryQuizSummary,
  HistoryStatsMap,
  HistoryTerm,
} from '../types/history';

const HIST_FAVORITES_KEY = 'formullab_hist_favorites_v1';
const HIST_STATS_KEY = 'formullab_hist_stats_v1';

export function normalizeHistSearchText(value: string): string {
  return value.trim().toLocaleLowerCase('tr-TR');
}

export function matchesHistExamFilter(
  examLevel: HistoryTerm['examLevel'],
  filter: ExamFilter | 'TYT' | 'AYT',
): boolean {
  if (filter === 'ALL') return true;
  if (filter === 'TYT') return examLevel === 'TYT' || examLevel === 'TYT_AYT';
  return examLevel === 'AYT' || examLevel === 'TYT_AYT';
}

export function filterHistoryTerms(
  terms: readonly HistoryTerm[],
  options: {
    searchQuery: string;
    source: QuizSource;
    chip: HistoryDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats: HistoryStatsMap;
  },
): HistoryTerm[] {
  const query = normalizeHistSearchText(options.searchQuery);

  return terms.filter((term) => {
    if (options.source === 'FAVORITES' && !options.favorites.has(term.id)) return false;
    if (options.source === 'MISTAKES' && (options.stats[term.id]?.wrong ?? 0) === 0) return false;
    if (options.source === 'HIGH_YIELD' && !term.isHighYield) return false;

    if (options.chip === 'TYT' || options.chip === 'AYT') {
      if (!matchesHistExamFilter(term.examLevel, options.chip)) return false;
    } else if (options.chip !== 'ALL' && term.category !== options.chip) {
      return false;
    }

    if (query.length > 0) {
      const haystacks = [term.term, term.shortCode, term.eraOrDate, term.mechanism, term.examTip];
      if (!haystacks.some((item) => normalizeHistSearchText(item).includes(query))) {
        return false;
      }
    }

    return true;
  });
}

export function getHistoryQuizPool(
  terms: readonly HistoryTerm[],
  config: HistoryQuizConfig,
  favorites: ReadonlySet<string>,
  stats: HistoryStatsMap,
): HistoryTerm[] {
  return terms.filter((term) => {
    if (config.source === 'FAVORITES' && !favorites.has(term.id)) return false;
    if (config.source === 'MISTAKES' && (stats[term.id]?.wrong ?? 0) === 0) return false;
    if (config.source === 'HIGH_YIELD' && !term.isHighYield) return false;
    if (!matchesHistExamFilter(term.examLevel, config.examFilter)) return false;
    if (config.topic !== 'ALL' && term.category !== config.topic) return false;
    return true;
  });
}

export function getHistoryExamQuestionPool(
  examQuestions: readonly HistoryExamQuestion[],
  allTerms: readonly HistoryTerm[],
  config: HistoryQuizConfig,
  favorites: ReadonlySet<string>,
  stats: HistoryStatsMap,
): HistoryExamQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));

  return examQuestions.filter((q) => {
    if (!matchesHistExamFilter(q.examLevel, config.examFilter)) return false;
    if (config.topic !== 'ALL' && q.category !== config.topic) return false;
    if (config.source === 'HIGH_YIELD' && !q.isHighYield) return false;

    const linkedTerm = termMap.get(q.relatedTermId);
    if (config.source === 'FAVORITES' && (!linkedTerm || !favorites.has(linkedTerm.id))) {
      return false;
    }
    if (
      config.source === 'MISTAKES' &&
      (!linkedTerm || (stats[linkedTerm.id]?.wrong ?? 0) === 0)
    ) {
      return false;
    }
    return true;
  });
}

export function shuffleArray<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateHistoryQuestions(
  pool: readonly HistoryTerm[],
  allTerms: readonly HistoryTerm[],
  config: HistoryQuizConfig,
  rng: () => number = Math.random,
  examQuestions: readonly HistoryExamQuestion[] = [],
  favorites: ReadonlySet<string> = new Set(),
  stats: HistoryStatsMap = {},
): HistoryQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const matchedExamPool =
    examQuestions.length > 0
      ? shuffleArray(
          getHistoryExamQuestionPool(examQuestions, allTerms, config, favorites, stats),
          rng,
        )
      : [];

  if (config.questionMode === 'EXAM_STYLE' && matchedExamPool.length > 0) {
    const pickedExam = matchedExamPool.slice(
      0,
      Math.min(config.questionCount, matchedExamPool.length),
    );
    return pickedExam.map((eq) => buildExamQuestion(eq, termMap, allTerms, rng));
  }

  if (config.questionMode === 'MIXED' && matchedExamPool.length > 0) {
    const totalNeeded = Math.min(config.questionCount, pool.length + matchedExamPool.length);
    const desiredExamCount = Math.min(
      matchedExamPool.length,
      Math.max(1, Math.round(totalNeeded * 0.5)),
    );
    const examSlice = matchedExamPool
      .slice(0, desiredExamCount)
      .map((eq) => buildExamQuestion(eq, termMap, allTerms, rng));
    const remainingNeeded = totalNeeded - examSlice.length;
    const conceptSlice = buildConceptQuestions(pool, allTerms, config, remainingNeeded, rng);
    return shuffleArray<HistoryQuestion>([...examSlice, ...conceptSlice], rng);
  }

  if (pool.length === 0) return [];
  const totalNeeded = Math.min(config.questionCount, pool.length);
  return buildConceptQuestions(pool, allTerms, config, totalNeeded, rng);
}

function buildExamQuestion(
  eq: HistoryExamQuestion,
  termMap: Map<string, HistoryTerm>,
  allTerms: readonly HistoryTerm[],
  rng: () => number,
): HistoryQuestion {
  const linkedTerm = termMap.get(eq.relatedTermId) ?? allTerms[0];
  const indexedChoices = eq.choices.map((label, idx) => ({
    id: `${eq.id}_c${idx}`,
    label,
    isCorrect: idx === eq.correctIndex,
  }));

  return {
    kind: 'EXAM_STYLE',
    examQuestion: eq,
    term: linkedTerm,
    type: 'EXAM_STYLE',
    shuffledChoices: shuffleArray(indexedChoices, rng),
  };
}

function buildConceptQuestions(
  pool: readonly HistoryTerm[],
  allTerms: readonly HistoryTerm[],
  config: HistoryQuizConfig,
  count: number,
  rng: () => number,
): HistoryQuestion[] {
  if (pool.length === 0 || count <= 0) return [];
  const pickedTargets = shuffleArray(pool, rng).slice(0, count);

  return pickedTargets.map((target) => {
    const type: 'TERM_TO_DESC' | 'DESC_TO_TERM' =
      config.questionMode === 'TERM_TO_DESC'
        ? 'TERM_TO_DESC'
        : config.questionMode === 'DESC_TO_TERM'
          ? 'DESC_TO_TERM'
          : rng() < 0.5
            ? 'TERM_TO_DESC'
            : 'DESC_TO_TERM';

    const sameCat = allTerms.filter((t) => t.id !== target.id && t.category === target.category);
    const otherCat = allTerms.filter((t) => t.id !== target.id && t.category !== target.category);

    const distractorCandidates = [...shuffleArray(sameCat, rng), ...shuffleArray(otherCat, rng)];
    const distractors: HistoryTerm[] = [];
    const seen = new Set<string>([target.term.toLowerCase()]);

    for (const candidate of distractorCandidates) {
      if (distractors.length >= 3) break;
      const key = candidate.term.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        distractors.push(candidate);
      }
    }

    return {
      kind: 'CONCEPT',
      term: target,
      type,
      choices: shuffleArray([target, ...distractors], rng),
    };
  });
}

export function calculateHistorySummary(
  answers: readonly HistoryAnswerRecord[],
): HistoryQuizSummary {
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakeMap = new Map<string, HistoryTerm>();

  for (const ans of answers) {
    if (ans.isCorrect) {
      correctCount += 1;
      currentStreak += 1;
      if (currentStreak > bestStreak) bestStreak = currentStreak;
    } else {
      currentStreak = 0;
      mistakeMap.set(ans.question.term.id, ans.question.term);
    }
  }

  const total = answers.length;
  return {
    total,
    correctCount,
    percentage: total === 0 ? 0 : Math.round((correctCount / total) * 100),
    bestStreak,
    mistakes: Array.from(mistakeMap.values()),
  };
}

export function loadHistFavoritesFromStorage(validIds: ReadonlySet<string>): Set<string> {
  try {
    const raw = localStorage.getItem(HIST_FAVORITES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id)));
  } catch {
    return new Set();
  }
}

export function saveHistFavoritesToStorage(favorites: ReadonlySet<string>): void {
  try {
    localStorage.setItem(HIST_FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch {
    // Ignore
  }
}

export function loadHistStatsFromStorage(validIds: ReadonlySet<string>): HistoryStatsMap {
  try {
    const raw = localStorage.getItem(HIST_STATS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const safe: HistoryStatsMap = {};
    for (const [id, entry] of Object.entries(parsed)) {
      if (!validIds.has(id) || !entry || typeof entry !== 'object') continue;
      const record = entry as {correct?: unknown; wrong?: unknown};
      const correct =
        typeof record.correct === 'number' && Number.isFinite(record.correct) ? record.correct : 0;
      const wrong =
        typeof record.wrong === 'number' && Number.isFinite(record.wrong) ? record.wrong : 0;
      if (correct > 0 || wrong > 0) {
        safe[id] = {correct: Math.max(0, correct), wrong: Math.max(0, wrong)};
      }
    }
    return safe;
  } catch {
    return {};
  }
}

export function saveHistStatsToStorage(stats: HistoryStatsMap): void {
  try {
    localStorage.setItem(HIST_STATS_KEY, JSON.stringify(stats));
  } catch {
    // Ignore
  }
}

// ============================================================================
// INTERACTIVE HISTORY LAB DATA & EVALUATORS (KRONOLOJİ, ANTLAŞMA, KURUMLAR)
// ============================================================================

export type TimelineEra = 'ILK_TURK' | 'SELCUKLU' | 'OSMANLI' | 'INKILAP';

export interface TimelineEventItem {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  era: TimelineEra;
  significance: string;
}

export const TIMELINE_ERA_LABELS: Record<'ALL' | TimelineEra, string> = {
  ALL: 'Tümü',
  ILK_TURK: 'İlk Türk & İslam',
  SELCUKLU: 'Selçuklu Dönemi',
  OSMANLI: 'Osmanlı Dönemi',
  INKILAP: 'Millî Mücadele & Cumhuriyet',
};

export const HIST_TIMELINE_EVENTS: TimelineEventItem[] = [
  {
    id: 'tl_kades',
    year: -1280,
    yearLabel: 'MÖ 1280',
    title: 'Kadeş Antlaşması (Hitit–Mısır)',
    era: 'ILK_TURK',
    significance: 'Tarihte bilinen ilk yazılı eşitlikçi barış antlaşması.',
  },
  {
    id: 'tl_kavimler',
    year: 375,
    yearLabel: '375',
    title: 'Kavimler Göçü',
    era: 'ILK_TURK',
    significance: 'Roma ikiye ayrıldı; İlk Çağ kapanıp Orta Çağ başladı.',
  },
  {
    id: 'tl_talas',
    year: 751,
    yearLabel: '751',
    title: 'Talas Savaşı',
    era: 'ILK_TURK',
    significance: 'Karlukların desteğiyle Abbasiler kazandı; Türk-İslam tarihi başladı.',
  },
  {
    id: 'tl_dandanakan',
    year: 1040,
    yearLabel: '1040',
    title: 'Dandanakan Savaşı',
    era: 'SELCUKLU',
    significance: 'Gazneliler geriledi, Büyük Selçuklu Devleti resmen kuruldu.',
  },
  {
    id: 'tl_malazgirt',
    year: 1071,
    yearLabel: '1071',
    title: 'Malazgirt Zaferi',
    era: 'SELCUKLU',
    significance: 'Anadolu’nun kapıları Türklere açıldı; I. Beylikler kuruldu.',
  },
  {
    id: 'tl_miryokefalon',
    year: 1176,
    yearLabel: '1176',
    title: 'Miryokefalon Savaşı',
    era: 'SELCUKLU',
    significance: 'Anadolu kesin olarak Türk yurdu hâline geldi.',
  },
  {
    id: 'tl_kosedag',
    year: 1243,
    yearLabel: '1243',
    title: 'Kösedağ Savaşı',
    era: 'SELCUKLU',
    significance: 'Türkiye Selçuklu Moğol egemenliğine girdi; II. Beylikler kuruldu.',
  },
  {
    id: 'tl_ankara',
    year: 1402,
    yearLabel: '1402',
    title: 'Ankara Savaşı',
    era: 'OSMANLI',
    significance: '11 yıllık Fetret Devri başladı; Anadolu Türk birliği geçici bozuldu.',
  },
  {
    id: 'tl_istanbul',
    year: 1453,
    yearLabel: '1453',
    title: 'İstanbul’un Fethi',
    era: 'OSMANLI',
    significance: 'Orta Çağ kapandı, Yeni Çağ başladı; Osmanlı İmparatorluk oldu.',
  },
  {
    id: 'tl_ridaniye',
    year: 1517,
    yearLabel: '1517',
    title: 'Ridaniye Zaferi',
    era: 'OSMANLI',
    significance: 'Memlûk yıkıldı; Halifelik ve Baharat Yolu Osmanlı’ya geçti.',
  },
  {
    id: 'tl_karlofca',
    year: 1699,
    yearLabel: '1699',
    title: 'Karlofça Antlaşması',
    era: 'OSMANLI',
    significance: 'Osmanlı batıda ilk kez büyük çapta toprak kaybetti.',
  },
  {
    id: 'tl_tanzimat',
    year: 1839,
    yearLabel: '1839',
    title: 'Tanzimat Fermanı',
    era: 'OSMANLI',
    significance: 'Padişah kanun gücünün üstünlüğünü resmen ilan etti.',
  },
  {
    id: 'tl_mondros',
    year: 1918,
    yearLabel: '30 Ekim 1918',
    title: 'Mondros Ateşkes Antlaşması',
    era: 'INKILAP',
    significance: '7. ve 24. maddelerle Anadolu işgallere açık hâle geldi.',
  },
  {
    id: 'tl_tbmm',
    year: 1920,
    yearLabel: '23 Nisan 1920',
    title: 'I. TBMM’nin Açılması',
    era: 'INKILAP',
    significance: 'Millî egemenlik ilkesiyle yeni Türk devleti kuruldu.',
  },
  {
    id: 'tl_lozan',
    year: 1923,
    yearLabel: '24 Temmuz 1923',
    title: 'Lozan Barış Antlaşması',
    era: 'INKILAP',
    significance: 'Yeni Türkiye’nin tam bağımsızlığı dünyaca tanındı.',
  },
  {
    id: 'tl_montro',
    year: 1936,
    yearLabel: '1936',
    title: 'Montrö Boğazlar Sözleşmesi',
    era: 'INKILAP',
    significance: 'Boğazlar Komisyonu kalktı, tam Türk egemenliği sağlandı.',
  },
];

export interface ChronologyChallenge {
  events: TimelineEventItem[];
  earliestId: string;
}

export function buildChronologyChallenge(
  items: readonly TimelineEventItem[],
  rng: () => number = Math.random,
): ChronologyChallenge {
  const picked = shuffleArray(items, rng).slice(0, 4);
  const earliest = [...picked].sort((a, b) => a.year - b.year)[0];
  return {events: picked, earliestId: earliest.id};
}

export interface BattleTreatyEntry {
  id: string;
  name: string;
  year: string;
  parties: string;
  keyClause: string;
  examTip: string;
}

export const HIST_BATTLES_TREATIES: BattleTreatyEntry[] = [
  {
    id: 'bt_pasinler',
    name: 'Pasinler Savaşı',
    year: '1048',
    parties: 'Büyük Selçuklu ↔ Bizans–Gürcü',
    keyClause: 'Selçuklu ile Bizans arasındaki ilk büyük askerî zaferdir.',
    examTip: 'Anadolu’ya yönelik keşif akınları bu zaferle hızlanmıştır.',
  },
  {
    id: 'bt_preveze',
    name: 'Preveze Deniz Zaferi',
    year: '1538',
    parties: 'Barbaros Hayrettin Paşa ↔ Haçlı Donanması',
    keyClause: 'Akdeniz’in bir Türk gölü hâline gelmesini sağladı.',
    examTip: '27 Eylül günümüzde Deniz Kuvvetleri Günü olarak kutlanır.',
  },
  {
    id: 'bt_zitvatorok',
    name: 'Zitvatorok Antlaşması',
    year: '1606',
    parties: 'Osmanlı ↔ Avusturya',
    keyClause: 'Avusturya arşidükü protokolde Osmanlı padişahına denk sayıldı.',
    examTip: '1533 İstanbul Antlaşması’ndaki protokol üstünlüğü sona erdi.',
  },
  {
    id: 'bt_kasri_sirin',
    name: 'Kasr-ı Şirin Antlaşması',
    year: '1639',
    parties: 'Osmanlı (IV. Murat) ↔ Safevi (İran)',
    keyClause: 'Bağdat Osmanlı’da kaldı; bugünkü Türkiye–İran sınırı büyük ölçüde çizildi.',
    examTip: 'Günümüze kadar en uzun süre korunan doğu sınır antlaşmasıdır.',
  },
  {
    id: 'bt_kucuk_kaynarca',
    name: 'Küçük Kaynarca Antlaşması',
    year: '1774',
    parties: 'Osmanlı ↔ Rusya',
    keyClause: 'Kırım bağımsız oldu, ilk savaş tazminatı ödendi, Ortodoksların himayesi verildi.',
    examTip: 'Rusya’nın Osmanlı iç işlerine karışmasının en büyük dayanağıdır.',
  },
  {
    id: 'bt_balta_limani',
    name: 'Balta Limanı Ticaret Antlaşması',
    year: '1838',
    parties: 'Osmanlı ↔ İngiltere',
    keyClause: 'İngiliz tüccarlara %5 iç gümrük ayrıcalığı tanınıp tekeller kaldırıldı.',
    examTip: 'Osmanlı lonca üretimini çökertip devleti yarı sömürge pazarına çevirdi.',
  },
  {
    id: 'bt_gumru',
    name: 'Gümrü Antlaşması',
    year: '1920',
    parties: 'TBMM (15. Kolordu) ↔ Ermenistan',
    keyClause: 'Sevr’in geçersizliği Ermenistan’a kabul ettirildi; Doğu Cephesi kapandı.',
    examTip: 'TBMM’nin ilk askerî-siyasi başarısı ve "Türkiye" adının geçtiği ilk antlaşmadır.',
  },
  {
    id: 'bt_moskova',
    name: 'Moskova Antlaşması',
    year: '1921',
    parties: 'TBMM ↔ Sovyet Rusya',
    keyClause: 'Çarlık antlaşmaları ve kapitülasyonlar reddedildi; Batum Gürcistan’a bırakıldı.',
    examTip: 'Misak-ı Millî’den verilen ilk taviz Batum’dur.',
  },
  {
    id: 'bt_mudanya',
    name: 'Mudanya Ateşkes Antlaşması',
    year: '1922',
    parties: 'TBMM ↔ İtilaf Devletleri',
    keyClause: 'Doğu Trakya, İstanbul ve Boğazlar savaş yapılmadan TBMM’ye devredildi.',
    examTip: 'İstanbul Hükümeti hukuken yok sayılmıştır.',
  },
  {
    id: 'bt_lozan',
    name: 'Lozan Barış Antlaşması',
    year: '1923',
    parties: 'TBMM ↔ İtilaf Devletleri',
    keyClause: 'Kapitülasyonlar ve Düyûn-ı Umûmiye kaldırıldı; tam bağımsızlık tescillendi.',
    examTip: 'Musul hariç tüm sınır ve egemenlik sorunları karara bağlandı.',
  },
];

export interface BattleQuizItem {
  target: BattleTreatyEntry;
  choices: string[];
}

export function buildBattleQuizItem(
  items: readonly BattleTreatyEntry[],
  rng: () => number = Math.random,
): BattleQuizItem {
  const target = items[Math.floor(rng() * items.length)];
  const distractors = shuffleArray(
    items.filter((i) => i.id !== target.id).map((i) => i.name),
    rng,
  ).slice(0, 3);
  return {target, choices: shuffleArray([target.name, ...distractors], rng)};
}

export interface HistoryInstitutionEntry {
  id: string;
  name: string;
  period: string;
  role: string;
  examTip: string;
}

export const HIST_INSTITUTIONS: HistoryInstitutionEntry[] = [
  {
    id: 'inst_kurultay',
    name: 'Kurultay (Toy / Kengeş)',
    period: 'İlk Türk Devletleri',
    role: 'Devlet işlerinin görüşüldüğü, son kararın kağana ait olduğu danışma meclisi.',
    examTip: 'Hatun (kağanın eşi) da kurultaya katılır ve elçileri kabul ederdi.',
  },
  {
    id: 'inst_ikta',
    name: 'İkta & Tımar (Dirlik) Sistemi',
    period: 'Selçuklu & Osmanlı',
    role: 'Mirî toprakların gelirini maaş ve atlı asker (cebelü) yetiştirme karşılığı görevlilere ayırır.',
    examTip: 'Hazineden para çıkmadan ordu beslenir ve taşra güvenliği sağlanırdı.',
  },
  {
    id: 'inst_seyfiye',
    name: 'Seyfiye Sınıfı',
    period: 'Osmanlı Divanı',
    role: 'Yönetim ve askerî kanat: Sadrazam, Vezirler, Kaptanıderya, Yeniçeri Ağası, Beylerbeyi.',
    examTip: 'Genellikle Enderun ve devşirme kökenlilerden yükselirdi.',
  },
  {
    id: 'inst_ilmiye',
    name: 'İlmiye Sınıfı',
    period: 'Osmanlı Divanı',
    role: 'Din, eğitim ve yargı kanadı: Şeyhülislam (fetva), Kazasker (atama/temyiz), Kadı, Müderris.',
    examTip: 'İlmiye sınıfı üyeleri medrese mezunu Müslüman Türklerden oluşurdu.',
  },
  {
    id: 'inst_kalemiye',
    name: 'Kalemiye Sınıfı',
    period: 'Osmanlı Divanı',
    role: 'Bürokrasi, maliye ve dışişleri kanadı: Nişancı (tuğra/örfi hukuk), Defterdar, Reisülküttab.',
    examTip: 'Reisülküttablık 17. yüzyıldan itibaren dışişleri bakanlığı önemine yükselmiştir.',
  },
  {
    id: 'inst_enderun',
    name: 'Enderun Mektebi',
    period: 'Osmanlı Sarayı',
    role: 'Devşirme kökenli zeki gençlerin yüksek devlet yöneticisi olarak yetiştirildiği saray okulu.',
    examTip: 'Sadrazam ve vezirlerin çoğu Enderun’dan yetişmiştir.',
  },
  {
    id: 'inst_ahilik_lonca',
    name: 'Ahilik & Lonca Teşkilatı',
    period: 'Selçuklu & Osmanlı',
    role: 'Esnaf kalitesini, çırak-kalfa-usta eğitimini ve Narh (tavan fiyat) sistemini denetler.',
    examTip: 'İş yeri açma ruhsatına "Gedik" adı verilirdi.',
  },
  {
    id: 'inst_tevhid_i_tedrisat',
    name: 'Tevhid-i Tedrisat Kanunu',
    period: 'Cumhuriyet (3 Mart 1924)',
    role: 'Tüm medrese, yabancı okul ve eğitim kurumlarını Millî Eğitim Bakanlığı çatısında topladı.',
    examTip: 'Eğitimde ikiliği sona erdirerek laik ve çağdaş öğretim birliğini kurdu.',
  },
];
