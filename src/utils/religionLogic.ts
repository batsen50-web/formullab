import type {ExamFilter, QuizSource} from '../types/chemistry';
import type {
  ReligionAnswerRecord,
  ReligionDictionaryFilterChip,
  ReligionExamQuestion,
  ReligionQuestion,
  ReligionQuizConfig,
  ReligionQuizSummary,
  ReligionStatsMap,
  ReligionTerm,
} from '../types/religion';

const REL_FAVORITES_KEY = 'formullab_rel_favorites_v1';
const REL_STATS_KEY = 'formullab_rel_stats_v1';

export function normalizeRelSearchText(value: string): string {
  return value.trim().toLocaleLowerCase('tr-TR');
}

export function matchesRelExamFilter(
  examLevel: ReligionTerm['examLevel'],
  filter: ExamFilter | 'TYT' | 'AYT',
): boolean {
  if (filter === 'ALL') return true;
  if (filter === 'TYT') return examLevel === 'TYT' || examLevel === 'TYT_AYT';
  return examLevel === 'AYT' || examLevel === 'TYT_AYT';
}

export function filterReligionTerms(
  terms: readonly ReligionTerm[],
  options: {
    searchQuery: string;
    source: QuizSource;
    chip: ReligionDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats: ReligionStatsMap;
  },
): ReligionTerm[] {
  const query = normalizeRelSearchText(options.searchQuery);

  return terms.filter((term) => {
    if (options.source === 'FAVORITES' && !options.favorites.has(term.id)) return false;
    if (options.source === 'MISTAKES' && (options.stats[term.id]?.wrong ?? 0) === 0) return false;
    if (options.source === 'HIGH_YIELD' && !term.isHighYield) return false;

    if (options.chip === 'TYT' || options.chip === 'AYT') {
      if (!matchesRelExamFilter(term.examLevel, options.chip)) return false;
    } else if (options.chip !== 'ALL' && term.category !== options.chip) {
      return false;
    }

    if (query.length > 0) {
      const haystacks = [term.term, term.shortCode, term.scopeOrSource, term.mechanism, term.examTip];
      if (!haystacks.some((item) => normalizeRelSearchText(item).includes(query))) {
        return false;
      }
    }
    return true;
  });
}

export function getReligionQuizPool(
  terms: readonly ReligionTerm[],
  config: ReligionQuizConfig,
  favorites: ReadonlySet<string>,
  stats: ReligionStatsMap,
): ReligionTerm[] {
  return terms.filter((term) => {
    if (config.source === 'FAVORITES' && !favorites.has(term.id)) return false;
    if (config.source === 'MISTAKES' && (stats[term.id]?.wrong ?? 0) === 0) return false;
    if (config.source === 'HIGH_YIELD' && !term.isHighYield) return false;
    if (!matchesRelExamFilter(term.examLevel, config.examFilter)) return false;
    if (config.topic !== 'ALL' && term.category !== config.topic) return false;
    return true;
  });
}

export function getReligionExamQuestionPool(
  examQuestions: readonly ReligionExamQuestion[],
  allTerms: readonly ReligionTerm[],
  config: ReligionQuizConfig,
  favorites: ReadonlySet<string>,
  stats: ReligionStatsMap,
): ReligionExamQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));

  return examQuestions.filter((q) => {
    if (!matchesRelExamFilter(q.examLevel, config.examFilter)) return false;
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

export function generateReligionQuestions(
  pool: readonly ReligionTerm[],
  allTerms: readonly ReligionTerm[],
  config: ReligionQuizConfig,
  rng: () => number = Math.random,
  examQuestions: readonly ReligionExamQuestion[] = [],
  favorites: ReadonlySet<string> = new Set(),
  stats: ReligionStatsMap = {},
): ReligionQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const matchedExamPool =
    examQuestions.length > 0
      ? shuffleArray(
          getReligionExamQuestionPool(examQuestions, allTerms, config, favorites, stats),
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
    return shuffleArray<ReligionQuestion>([...examSlice, ...conceptSlice], rng);
  }

  if (pool.length === 0) return [];
  const totalNeeded = Math.min(config.questionCount, pool.length);
  return buildConceptQuestions(pool, allTerms, config, totalNeeded, rng);
}

function buildExamQuestion(
  eq: ReligionExamQuestion,
  termMap: Map<string, ReligionTerm>,
  allTerms: readonly ReligionTerm[],
  rng: () => number,
): ReligionQuestion {
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
  pool: readonly ReligionTerm[],
  allTerms: readonly ReligionTerm[],
  config: ReligionQuizConfig,
  count: number,
  rng: () => number,
): ReligionQuestion[] {
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
    const distractors: ReligionTerm[] = [];
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

export function calculateReligionSummary(
  answers: readonly ReligionAnswerRecord[],
): ReligionQuizSummary {
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakeMap = new Map<string, ReligionTerm>();

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

export function loadRelFavoritesFromStorage(validIds: ReadonlySet<string>): Set<string> {
  try {
    const raw = localStorage.getItem(REL_FAVORITES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id)));
  } catch {
    return new Set();
  }
}

export function saveRelFavoritesToStorage(favorites: ReadonlySet<string>): void {
  try {
    localStorage.setItem(REL_FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch {
    // Ignore
  }
}

export function loadRelStatsFromStorage(validIds: ReadonlySet<string>): ReligionStatsMap {
  try {
    const raw = localStorage.getItem(REL_STATS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const safe: ReligionStatsMap = {};
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

export function saveRelStatsToStorage(stats: ReligionStatsMap): void {
  try {
    localStorage.setItem(REL_STATS_KEY, JSON.stringify(stats));
  } catch {
    // Ignore
  }
}

// ============================================================================
// INTERACTIVE RELIGION LAB DATA & EVALUATORS (KAVRAM, MEZHEP, DİNLER LABI)
// ============================================================================

export interface RelConceptItem {
  id: string;
  title: string;
  group: 'EFAL' | 'ESMA' | 'AHLAK';
  clue: string;
  answer: string;
  note: string;
}

export const REL_CONCEPT_ITEMS: RelConceptItem[] = [
  {
    id: 'rc_farz_ayn',
    title: 'Beş vakit namaz, Ramazan orucu ve zenginlere zekât',
    group: 'EFAL',
    clue: 'Her ergen ve akıllı Müslümanın bizzat kendisinin yapmakla sorumlu olduğu kesin emir.',
    answer: 'Farz-ı Ayn',
    note: 'Başkası yapınca sorumluluk kişiden düşmez.',
  },
  {
    id: 'rc_farz_kifaye',
    title: 'Cenaze namazı kılmak ve verilen selamı almak',
    group: 'EFAL',
    clue: 'Toplumda bir grup Müslüman yapınca diğerlerinden sorumluluğun düştüğü farz.',
    answer: 'Farz-ı Kifaye',
    note: 'Hiç kimse yapmazsa bütün toplum sorumlu olur.',
  },
  {
    id: 'rc_vacip',
    title: 'Vitir namazı, Bayram namazı, Kurban ve Fıtır sadakası',
    group: 'EFAL',
    clue: 'Delili farz kadar kesin olmamakla birlikte yapılması gerekli güçlü dinî buyruk.',
    answer: 'Vacip',
    note: 'İnkârı dinden çıkarmaz fakat terki dinen sorumluluk doğurur.',
  },
  {
    id: 'rc_mendup',
    title: 'Kuşluk namazı, Pazartesi-Perşembe orucu ve güzel koku sürünmek',
    group: 'EFAL',
    clue: 'Yapıldığında sevap kazandıran, yapılmadığında günah olmayan güzel davranış.',
    answer: 'Mendup (Müstehap)',
    note: 'Sünnet-i Gayrimüekkede de sevap kazandıran gönüllü ibadetlerdendir.',
  },
  {
    id: 'rc_halik',
    title: 'el-Hâlık · el-Bâri · el-Musavvir',
    group: 'ESMA',
    clue: 'Haşr 24’te geçen: Yoktan yaratan, uyumlu kılan ve şekil/suret veren isimler.',
    answer: 'Yaratma Sıfatlı Esmayıhüsna',
    note: 'Allah’ın Tekvin (yaratma) sıfatının kâinattaki tecellileridir.',
  },
  {
    id: 'rc_rezzak',
    title: 'er-Rezzak · eş-Şâfî',
    group: 'ESMA',
    clue: 'Bütün canlılara rızık veren ve hastalıklara şifa lutfeden Allah’ın güzel isimleri.',
    answer: 'Rızık & Şifa İsimleri',
    note: 'Tıbbi tedavi sebeplere sarılmak, şifayı Allah’tan beklemek ise tevekküldür.',
  },
  {
    id: 'rc_tecessus',
    title: 'Başkalarının gizli kusurunu ve özel hayatını araştırmak',
    group: 'AHLAK',
    clue: 'Hucurat 12’de suizan ve gıybetle birlikte yasaklanan mahremiyet ihlali.',
    answer: 'Tecessüs',
    note: 'İslam özel hayatın gizliliğini (mahremiyeti) kesin biçimde korur.',
  },
  {
    id: 'rc_gipta',
    title: 'Başkasındaki ilim veya hayrı görüp "keşke bende de olsa" diye imrenmek',
    group: 'AHLAK',
    clue: 'Kıskançlıkla (Haset) karıştırılmaması gereken olumlu yarışma duygusu.',
    answer: 'Gıpta',
    note: 'Haset başkasının elindekinin yok olmasını ister (haram); Gıpta ise iyilikte özenmedir.',
  },
];

export interface RelConceptQuizItem {
  target: RelConceptItem;
  choices: string[];
}

export function buildRelConceptQuiz(
  items: readonly RelConceptItem[],
  rng: () => number = Math.random,
): RelConceptQuizItem {
  const target = items[Math.floor(rng() * items.length)];
  const others = shuffleArray(
    Array.from(new Set(items.filter((i) => i.answer !== target.answer).map((i) => i.answer))),
    rng,
  ).slice(0, 3);
  return {target, choices: shuffleArray([target.answer, ...others], rng)};
}

export interface RelTraditionEntry {
  id: string;
  name: string;
  type: 'İtikadi' | 'Fıkhi' | 'Tasavvufi';
  founderOrCenter: string;
  hallmark: string;
  examTip: string;
}

export const REL_TRADITIONS: RelTraditionEntry[] = [
  {
    id: 'rt_maturidi',
    name: 'Matüridilik',
    type: 'İtikadi',
    founderOrCenter: 'İmam Matüridi · Semerkant',
    hallmark: 'Akıl vahiy gelmese de Allah’ı bulabilir; Tekvin ayrı subuti sıfattır.',
    examTip: 'Türklerin büyük çoğunluğunun itikatta benimsediği ekoldür.',
  },
  {
    id: 'rt_esari',
    name: 'Eşarilik',
    type: 'İtikadi',
    founderOrCenter: 'İmam Eşari · Bağdat',
    hallmark: 'Dinî sorumluluk ancak peygamber ve vahiy gönderildikten sonra başlar.',
    examTip: 'Ehlisünnet’in iki ana itikadi mezhebinden biridir.',
  },
  {
    id: 'rt_hanefi',
    name: 'Hanefilik',
    type: 'Fıkhi',
    founderOrCenter: 'Ebu Hanife · Kûfe (Fıkhu’l-Ekber)',
    hallmark: 'Kitap ve Sünnet yanında kıyas (rey), istihsan ve örfe geniş yer verir.',
    examTip: 'Türkiye, Orta Asya ve Balkan Müslümanları arasında en yaygındır.',
  },
  {
    id: 'rt_maliki',
    name: 'Malikilik',
    type: 'Fıkhi',
    founderOrCenter: 'İmam Malik · Medine (el-Muvatta)',
    hallmark: 'Medine halkının yaşayan uygulamasını (Amel-i Ehl-i Medine) temel kaynak sayar.',
    examTip: 'Kuzey ve Batı Afrika’da yaygındır.',
  },
  {
    id: 'rt_safii',
    name: 'Şafiilik',
    type: 'Fıkhi',
    founderOrCenter: 'İmam Şafii · Mısır (er-Risale)',
    hallmark: 'Fıkıh usulünün ilk sistemli kitabını yazmış; istihsan yerine kıyası öne almıştır.',
    examTip: 'Anadolu’nun doğu ve güneydoğusu ile Mısır/Endonezya’da yaygındır.',
  },
  {
    id: 'rt_yesevilik',
    name: 'Yesevilik',
    type: 'Tasavvufi',
    founderOrCenter: 'Hoca Ahmet Yesevi · Türkistan',
    hallmark: 'İlk Türk tarikatıdır; Türkçe Hikmet şiirleriyle göçebe Türklere İslam’ı öğretti.',
    examTip: 'Horasan Erenleri aracılığıyla Anadolu irfanına temel oluşturdu.',
  },
  {
    id: 'rt_mevlevilik',
    name: 'Mevlevilik',
    type: 'Tasavvufi',
    founderOrCenter: 'Mevlana & Sultan Veled · Konya',
    hallmark: 'İlahi aşk, müzik, ney ve Sema ayiniyle insanı kâmilleştirmeyi hedefler.',
    examTip: 'Mesnevi eseri ve 17 Aralık Şebiarus anmaları merkezdedir.',
  },
  {
    id: 'rt_alevi_bektasi',
    name: 'Alevilik – Bektaşilik',
    type: 'Tasavvufi',
    founderOrCenter: 'Hacı Bektaş Veli · Sulucakarahöyük',
    hallmark: 'Dört Kapı Kırk Makam, Cem, Musahiplik, Semah ve On İki Hizmet üzerine kuruludur.',
    examTip: 'Makalat eseri ve "Eline, beline, diline sahip ol" ilkesi temeldir.',
  },
];

export interface RelWorldBeliefEntry {
  id: string;
  name: string;
  category: 'Semavi Din' | 'Doğu Dini' | 'İnanç Akımı';
  scriptureOrCore: string;
  symbolOrKey: string;
  summary: string;
}

export const REL_BELIEF_SYSTEMS: RelWorldBeliefEntry[] = [
  {
    id: 'rb_yahudilik',
    name: 'Yahudilik',
    category: 'Semavi Din',
    scriptureOrCore: 'Tanah (Tevrat) & Talmud',
    symbolOrKey: 'Sinagog · Haham · Menora · Şabat',
    summary: 'Cumartesi dinlenme yasağı (Şabat) ve Fısıh/Yom Kippur bayramları öne çıkar.',
  },
  {
    id: 'rb_hristiyanlik',
    name: 'Hristiyanlık',
    category: 'Semavi Din',
    scriptureOrCore: 'Kitab-ı Mukaddes (4 İncil)',
    symbolOrKey: 'Teslis · İznik Konsili · 7 Sakrament',
    summary: 'Katolik (Papa), Ortodoks (Patrik) ve Protestan (Luther) üç ana mezheptir.',
  },
  {
    id: 'rb_hinduizm',
    name: 'Hinduizm',
    category: 'Doğu Dini',
    scriptureOrCore: 'Vedalar & Upanişadlar',
    symbolOrKey: 'Kast · Karma · Reenkarnasyon · Mokşa',
    summary: 'Kurucusu yoktur; ruhun yeniden doğuşu ve kast düzeni temeldir.',
  },
  {
    id: 'rb_budizm',
    name: 'Budizm',
    category: 'Doğu Dini',
    scriptureOrCore: 'Tripitaka (Üç Sepet)',
    symbolOrKey: 'Buda · 4 Yüce Gerçek · Nirvana',
    summary: 'Kast sistemini reddeder; Sekiz Aşamalı Yol ile arzuların sönmesini hedefler.',
  },
  {
    id: 'rb_teizm',
    name: 'Teizm',
    category: 'İnanç Akımı',
    scriptureOrCore: 'Yaratıcı + Vahiy + Peygamber',
    symbolOrKey: 'Evrene müdahale eden Tanrı',
    summary: 'Tanrı evreni yaratır, insanlara vahiy ve peygamber gönderir, duaları işitir.',
  },
  {
    id: 'rb_deizm',
    name: 'Deizm',
    category: 'İnanç Akımı',
    scriptureOrCore: 'Yaratıcı var, Din/Vahiy yok',
    symbolOrKey: 'Akılla bulunan ilk neden',
    summary: 'Tanrı evreni yaratıp yasalarını koyduktan sonra peygamber ve mucize göndermez.',
  },
  {
    id: 'rb_agnostisizm',
    name: 'Agnostisizm (Bilinemezcilik)',
    category: 'İnanç Akımı',
    scriptureOrCore: 'Tanrı bilinemez',
    symbolOrKey: 'İnsan aklının sınırı',
    summary: 'Tanrı’nın varlığının da yokluğunun da kesin olarak bilinemeyeceğini savunur.',
  },
  {
    id: 'rb_nihilizm',
    name: 'Nihilizm & Sekülarizm',
    category: 'İnanç Akımı',
    scriptureOrCore: 'Hiççilik / Dünyevileşme',
    symbolOrKey: 'Değer inkârı vs Dünya odaklılık',
    summary: 'Nihilizm tüm anlam ve değerleri reddederken Sekülarizm dini yalnız bireye indirger.',
  },
];
