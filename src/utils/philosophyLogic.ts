import type {ExamFilter, QuizSource} from '../types/chemistry';
import type {
  PhilosophyAnswerRecord,
  PhilosophyDictionaryFilterChip,
  PhilosophyExamQuestion,
  PhilosophyQuestion,
  PhilosophyQuizConfig,
  PhilosophyQuizSummary,
  PhilosophyStatsMap,
  PhilosophyTerm,
} from '../types/philosophy';

const PHIL_FAVORITES_KEY = 'formullab_phil_favorites_v1';
const PHIL_STATS_KEY = 'formullab_phil_stats_v1';

export function normalizePhilSearchText(value: string): string {
  return value.trim().toLocaleLowerCase('tr-TR');
}

export function matchesPhilExamFilter(
  examLevel: PhilosophyTerm['examLevel'],
  filter: ExamFilter | 'TYT' | 'AYT',
): boolean {
  if (filter === 'ALL') return true;
  if (filter === 'TYT') return examLevel === 'TYT' || examLevel === 'TYT_AYT';
  return examLevel === 'AYT' || examLevel === 'TYT_AYT';
}

export function filterPhilosophyTerms(
  terms: readonly PhilosophyTerm[],
  options: {
    searchQuery: string;
    source: QuizSource;
    chip: PhilosophyDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats: PhilosophyStatsMap;
  },
): PhilosophyTerm[] {
  const query = normalizePhilSearchText(options.searchQuery);

  return terms.filter((term) => {
    if (options.source === 'FAVORITES' && !options.favorites.has(term.id)) return false;
    if (options.source === 'MISTAKES' && (options.stats[term.id]?.wrong ?? 0) === 0) return false;
    if (options.source === 'HIGH_YIELD' && !term.isHighYield) return false;

    if (options.chip === 'TYT' || options.chip === 'AYT') {
      if (!matchesPhilExamFilter(term.examLevel, options.chip)) return false;
    } else if (options.chip !== 'ALL' && term.category !== options.chip) {
      return false;
    }

    if (query.length > 0) {
      const haystacks = [term.term, term.shortCode, term.thinkerOrField, term.mechanism, term.examTip];
      if (!haystacks.some((item) => normalizePhilSearchText(item).includes(query))) {
        return false;
      }
    }
    return true;
  });
}

export function getPhilosophyQuizPool(
  terms: readonly PhilosophyTerm[],
  config: PhilosophyQuizConfig,
  favorites: ReadonlySet<string>,
  stats: PhilosophyStatsMap,
): PhilosophyTerm[] {
  return terms.filter((term) => {
    if (config.source === 'FAVORITES' && !favorites.has(term.id)) return false;
    if (config.source === 'MISTAKES' && (stats[term.id]?.wrong ?? 0) === 0) return false;
    if (config.source === 'HIGH_YIELD' && !term.isHighYield) return false;
    if (!matchesPhilExamFilter(term.examLevel, config.examFilter)) return false;
    if (config.topic !== 'ALL' && term.category !== config.topic) return false;
    return true;
  });
}

export function getPhilosophyExamQuestionPool(
  examQuestions: readonly PhilosophyExamQuestion[],
  allTerms: readonly PhilosophyTerm[],
  config: PhilosophyQuizConfig,
  favorites: ReadonlySet<string>,
  stats: PhilosophyStatsMap,
): PhilosophyExamQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));

  return examQuestions.filter((q) => {
    if (!matchesPhilExamFilter(q.examLevel, config.examFilter)) return false;
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

export function generatePhilosophyQuestions(
  pool: readonly PhilosophyTerm[],
  allTerms: readonly PhilosophyTerm[],
  config: PhilosophyQuizConfig,
  rng: () => number = Math.random,
  examQuestions: readonly PhilosophyExamQuestion[] = [],
  favorites: ReadonlySet<string> = new Set(),
  stats: PhilosophyStatsMap = {},
): PhilosophyQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const matchedExamPool =
    examQuestions.length > 0
      ? shuffleArray(
          getPhilosophyExamQuestionPool(examQuestions, allTerms, config, favorites, stats),
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
    return shuffleArray<PhilosophyQuestion>([...examSlice, ...conceptSlice], rng);
  }

  if (pool.length === 0) return [];
  const totalNeeded = Math.min(config.questionCount, pool.length);
  return buildConceptQuestions(pool, allTerms, config, totalNeeded, rng);
}

function buildExamQuestion(
  eq: PhilosophyExamQuestion,
  termMap: Map<string, PhilosophyTerm>,
  allTerms: readonly PhilosophyTerm[],
  rng: () => number,
): PhilosophyQuestion {
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
  pool: readonly PhilosophyTerm[],
  allTerms: readonly PhilosophyTerm[],
  config: PhilosophyQuizConfig,
  count: number,
  rng: () => number,
): PhilosophyQuestion[] {
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
    const distractors: PhilosophyTerm[] = [];
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

export function calculatePhilosophySummary(
  answers: readonly PhilosophyAnswerRecord[],
): PhilosophyQuizSummary {
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakeMap = new Map<string, PhilosophyTerm>();

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

export function loadPhilFavoritesFromStorage(validIds: ReadonlySet<string>): Set<string> {
  try {
    const raw = localStorage.getItem(PHIL_FAVORITES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id)));
  } catch {
    return new Set();
  }
}

export function savePhilFavoritesToStorage(favorites: ReadonlySet<string>): void {
  try {
    localStorage.setItem(PHIL_FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch {
    // Ignore
  }
}

export function loadPhilStatsFromStorage(validIds: ReadonlySet<string>): PhilosophyStatsMap {
  try {
    const raw = localStorage.getItem(PHIL_STATS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const safe: PhilosophyStatsMap = {};
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

export function savePhilStatsToStorage(stats: PhilosophyStatsMap): void {
  try {
    localStorage.setItem(PHIL_STATS_KEY, JSON.stringify(stats));
  } catch {
    // Ignore
  }
}

// ============================================================================
// INTERACTIVE PHILOSOPHY LAB DATA & EVALUATORS (FİLOZOF, AKIL YÜRÜTME, MATRİS)
// ============================================================================

export type ThinkerEra = 'ANTIK' | 'ORTA' | 'YENI_AYDINLANMA' | 'CAGDAS_TURK';

export interface PhilThinkerEntry {
  id: string;
  thinker: string;
  era: ThinkerEra;
  schoolOrConcept: string;
  famousQuoteOrThesis: string;
  examTip: string;
}

export const THINKER_ERA_LABELS: Record<'ALL' | ThinkerEra, string> = {
  ALL: 'Tümü',
  ANTIK: 'MÖ 6.yy – İlk Çağ',
  ORTA: 'Orta Çağ (Hristiyan/İslam)',
  YENI_AYDINLANMA: '15–19. yy Modern',
  CAGDAS_TURK: '20. yy & Türkiye',
};

export const PHIL_THINKERS: PhilThinkerEntry[] = [
  {
    id: 'pt_thales',
    thinker: 'Thales',
    era: 'ANTIK',
    schoolOrConcept: 'İlk Filozof · Arkhe: Su',
    famousQuoteOrThesis: 'Evrenin ana maddesi (arkhe) doğadaki su ilkesidir.',
    examTip: 'Mitoloji yerine doğayı akılla açıklayan ilk Milet filozofudur.',
  },
  {
    id: 'pt_herakleitos',
    thinker: 'Herakleitos',
    era: 'ANTIK',
    schoolOrConcept: 'Oluş Felsefesi · Logos',
    famousQuoteOrThesis: 'Aynı ırmakta iki kez yıkanılmaz; her şey akar.',
    examTip: 'Değişimi reddeden Parmenides’in tam karşıtıdır.',
  },
  {
    id: 'pt_sokrates',
    thinker: 'Sokrates',
    era: 'ANTIK',
    schoolOrConcept: 'Maieutik · Rasyonalist Ahlak',
    famousQuoteOrThesis: 'Bilgi erdemdir; kimse bilerek kötülük yapmaz.',
    examTip: 'İroni ve doğurtmaca (Maieutik) yöntemiyle bilgiyi açığa çıkarır.',
  },
  {
    id: 'pt_platon',
    thinker: 'Platon',
    era: 'ANTIK',
    schoolOrConcept: 'İdealar Kuramı · Episteme',
    famousQuoteOrThesis: 'Duyular dünyası gölgedir; gerçek varlık değişmez İdealardır.',
    examTip: 'Devlet eserinde filozofların yönettiği ideal devleti anlatır.',
  },
  {
    id: 'pt_aristoteles',
    thinker: 'Aristoteles',
    era: 'ANTIK',
    schoolOrConcept: 'Madde-Form · Altın Orta',
    famousQuoteOrThesis: 'Öz (form) maddeden ayrı değil, onun içindedir; erdem iki aşırılığın ortasıdır.',
    examTip: 'Dört Neden (Maddi, Formsel, Fail, Ereksel) kuramını geliştirmiştir.',
  },
  {
    id: 'pt_farabi',
    thinker: 'Fârâbî',
    era: 'ORTA',
    schoolOrConcept: 'Zorunlu Varlık · Erdemli Şehir',
    famousQuoteOrThesis: 'Varlık Zorunlu Varlık (Allah) ve Mümkün Varlık olarak ikiye ayrılır.',
    examTip: 'Muallim-i Sânî (İkinci Öğretmen) unvanıyla bilinir.',
  },
  {
    id: 'pt_gazali',
    thinker: 'Gazâlî',
    era: 'ORTA',
    schoolOrConcept: 'Entüisyonizm · Kalp Gözü',
    famousQuoteOrThesis: 'Akıl metafizik hakikatte yetersizdir; kesin bilgi kalp gözü (sezgi) ile gelir.',
    examTip: 'Tehâfütü’l-Felâsife eseriyle filozofları eleştirmiştir.',
  },
  {
    id: 'pt_ibn_rusd',
    thinker: 'İbn Rüşd',
    era: 'ORTA',
    schoolOrConcept: 'Akıl–Vahiy Uzlaşısı',
    famousQuoteOrThesis: 'Din ile felsefe aynı hakikatin iki kardeş ifadesidir, çelişmezler.',
    examTip: 'Gazâlî’ye karşı Tehâfütü’t-Tehâfüt eserini yazmıştır.',
  },
  {
    id: 'pt_ockham',
    thinker: 'Ockhamlı William',
    era: 'ORTA',
    schoolOrConcept: 'Nominalizm (Adcılık)',
    famousQuoteOrThesis: 'Tümeller bağımsız varlık değil, tekillere verilen zihinsel adlardır.',
    examTip: 'Deneysel modern bilimin önünü açmıştır.',
  },
  {
    id: 'pt_bacon',
    thinker: 'Francis Bacon',
    era: 'YENI_AYDINLANMA',
    schoolOrConcept: 'Tümevarım · İdoller',
    famousQuoteOrThesis: 'Bilgi güçtür; doğaya egemen olmak için önyargılar (idoller) aşılmalıdır.',
    examTip: 'Novum Organum ile deneysel tümevarım yöntemini savunmuştur.',
  },
  {
    id: 'pt_descartes',
    thinker: 'René Descartes',
    era: 'YENI_AYDINLANMA',
    schoolOrConcept: 'Kartezyen Düalizm · Metodik Şüphe',
    famousQuoteOrThesis: 'Düşünüyorum, o hâlde varım (Cogito ergo sum).',
    examTip: 'Ruh ve maddeyi iki ayrı töz kabul eder.',
  },
  {
    id: 'pt_locke',
    thinker: 'John Locke',
    era: 'YENI_AYDINLANMA',
    schoolOrConcept: 'Empirizm · Tabula Rasa',
    famousQuoteOrThesis: 'İnsan zihni doğuştan boş levhadır; bilgi deneyle yazılır.',
    examTip: 'Yaşam, özgürlük ve mülkiyeti doğal haklar sayar.',
  },
  {
    id: 'pt_kant',
    thinker: 'Immanuel Kant',
    era: 'YENI_AYDINLANMA',
    schoolOrConcept: 'Kritisizm · Ödev Ahlakı',
    famousQuoteOrThesis: 'Görüsüz kavramlar boş, kavramsız görüler kördür; ahlak ödev duygusudur.',
    examTip: 'Aklını kendin kullanma cesaretini göster (Aydınlanma).',
  },
  {
    id: 'pt_hegel',
    thinker: 'G. W. F. Hegel',
    era: 'YENI_AYDINLANMA',
    schoolOrConcept: 'Diyalektik İdealizm · Tin',
    famousQuoteOrThesis: 'Gerçek olan akılsaldır; tarih Tez–Antitez–Sentez ile ilerler.',
    examTip: 'Diyalektiği düşünce/tin temeline oturtur.',
  },
  {
    id: 'pt_popper',
    thinker: 'Karl Popper',
    era: 'CAGDAS_TURK',
    schoolOrConcept: 'Yanlışlanabilirlik',
    famousQuoteOrThesis: 'Bir kuramı bilimsel yapan doğrulanması değil yanlışlanabilir olmasıdır.',
    examTip: 'Viyana Çevresinin doğrulama ölçütünü eleştirmiştir.',
  },
  {
    id: 'pt_kuhn',
    thinker: 'Thomas Kuhn',
    era: 'CAGDAS_TURK',
    schoolOrConcept: 'Paradigma & Bilimsel Devrim',
    famousQuoteOrThesis: 'Bilim bunalımlar sonucu eski paradigmanın yıkılıp yenisinin kurulmasıyla sıçrar.',
    examTip: 'Bilimi toplumsal/tarihsel bir etkinlik olarak görür.',
  },
  {
    id: 'pt_sartre',
    thinker: 'Jean-Paul Sartre',
    era: 'CAGDAS_TURK',
    schoolOrConcept: 'Varoluşçuluk (Egzistansiyalizm)',
    famousQuoteOrThesis: 'Varoluş özden önce gelir; insan özgürlüğe mahkûmdur.',
    examTip: 'İnsan kendi eylemleriyle kendi özünü yaratır ve sorumludur.',
  },
  {
    id: 'pt_topcu_kucuradi',
    thinker: 'Nurettin Topçu & İoanna Kuçuradi',
    era: 'CAGDAS_TURK',
    schoolOrConcept: 'Türkiye’de Çağdaş Etik',
    famousQuoteOrThesis: 'Topçu: İsyan Ahlakı (iradeci sorumluluk); Kuçuradi: İnsan Hakları ve Değerler Etiği.',
    examTip: 'Aydın Sayılı (bilim tarihi) ve Hilmi Ziya Ülken (düşünce tarihi) diğer temel Türk düşünürleridir.',
  },
];

export interface ThinkerQuizItem {
  target: PhilThinkerEntry;
  choices: string[];
}

export function buildThinkerQuizItem(
  items: readonly PhilThinkerEntry[],
  rng: () => number = Math.random,
): ThinkerQuizItem {
  const target = items[Math.floor(rng() * items.length)];
  const others = shuffleArray(
    items.filter((i) => i.id !== target.id).map((i) => i.thinker),
    rng,
  ).slice(0, 3);
  return {target, choices: shuffleArray([target.thinker, ...others], rng)};
}

export type ReasoningType =
  | 'ONERME_DEGIL'
  | 'TUMDENGELIM'
  | 'TUMEVARIM'
  | 'ANALOJI'
  | 'CELISKI_SAFSATA';

export interface PhilReasoningItem {
  id: string;
  statement: string;
  category: ReasoningType;
  label: string;
  explanation: string;
}

export const REASONING_TYPE_LABELS: Record<ReasoningType, string> = {
  ONERME_DEGIL: 'Önerme Olmayan İfade',
  TUMDENGELIM: 'Tümdengelim (Dedüksiyon)',
  TUMEVARIM: 'Tümevarım (Endüksiyon)',
  ANALOJI: 'Analoji (Benzeşim)',
  CELISKI_SAFSATA: 'Çelişki / Safsata',
};

export const PHIL_REASONING_ITEMS: PhilReasoningItem[] = [
  {
    id: 'pr_1',
    statement: 'Bütün insanlar ölümlüdür. Sokrates de bir insandır. O hâlde Sokrates ölümlüdür.',
    category: 'TUMDENGELIM',
    label: REASONING_TYPE_LABELS.TUMDENGELIM,
    explanation: 'Genel bir ilkeden ("Bütün insanlar...") tekil sonuca zorunlu olarak inilmiştir.',
  },
  {
    id: 'pr_2',
    statement: 'Bakır, demir, gümüş ve altın ısıtılınca genleşir; o hâlde bütün metaller ısıtılınca genleşir.',
    category: 'TUMEVARIM',
    label: REASONING_TYPE_LABELS.TUMEVARIM,
    explanation: 'Tekil gözlemlerden hareketle genel bir doğa yasasına ulaşılmıştır.',
  },
  {
    id: 'pr_3',
    statement: 'Ankara ve Konya karasal iklime sahiptir; Ankara’da buğday yetiştiğine göre Konya’da da yetişir.',
    category: 'ANALOJI',
    label: REASONING_TYPE_LABELS.ANALOJI,
    explanation: 'İki özel şehir arasındaki benzerlikten hareketle başka bir ortak özellik çıkarılmıştır.',
  },
  {
    id: 'pr_4',
    statement: 'Lütfen ders çalışırken kapıyı kapatır mısın?',
    category: 'ONERME_DEGIL',
    label: REASONING_TYPE_LABELS.ONERME_DEGIL,
    explanation: 'İstek ve soru cümleleri doğru veya yanlış yargı bildirmediği için önerme değildir.',
  },
  {
    id: 'pr_5',
    statement: 'Senin bu ekonomik önerin yanlıştır çünkü sen zaten hiç zengin olmadın!',
    category: 'CELISKI_SAFSATA',
    label: REASONING_TYPE_LABELS.CELISKI_SAFSATA,
    explanation: 'İddianın içeriği yerine kişinin şahsına saldırıldığı için Ad Hominem safsatasıdır.',
  },
  {
    id: 'pr_6',
    statement: 'Hiçbir üçgen dört kenarlı değildir. ABC bir üçgendir. O hâlde ABC dört kenarlı değildir.',
    category: 'TUMDENGELIM',
    label: REASONING_TYPE_LABELS.TUMDENGELIM,
    explanation: 'Genel matematik tanımından tekil şekle zorunlu tümdengelim yapılmıştır.',
  },
  {
    id: 'pr_7',
    statement: 'Şu ana kadar gözlediğimiz tüm kuğular beyazdı; o hâlde tüm kuğular beyazdır.',
    category: 'TUMEVARIM',
    label: REASONING_TYPE_LABELS.TUMEVARIM,
    explanation: 'Tekil gözlemlere dayalı tümevarımdır (Popper tek siyah kuğuyla yanlışlanabileceğini gösterir).',
  },
  {
    id: 'pr_8',
    statement: 'Keşke bu yaz hep birlikte felsefe kampına gidebilsek!',
    category: 'ONERME_DEGIL',
    label: REASONING_TYPE_LABELS.ONERME_DEGIL,
    explanation: 'Dilek/temenni cümlelerinin doğruluk değeri yoktur; önerme sayılmaz.',
  },
];

export interface PhilDisciplineEntry {
  id: string;
  discipline: string;
  coreQuestion: string;
  keyConcepts: string;
  mainSchools: string;
}

export const PHIL_DISCIPLINES: PhilDisciplineEntry[] = [
  {
    id: 'pd_ontoloji',
    discipline: 'Varlık Felsefesi (Ontoloji)',
    coreQuestion: 'Varlık var mıdır? Varlığın ana maddesi ve niteliği nedir?',
    keyConcepts: 'Arkhe, Töz, Reel/İdeal Varlık, Fenomen',
    mainSchools: 'Nihilizm, Realizm, Materyalizm, İdealizm, Oluşçuluk, Varoluşçuluk',
  },
  {
    id: 'pd_epistemoloji',
    discipline: 'Bilgi Felsefesi (Epistemoloji)',
    coreQuestion: 'Doğru bilgi mümkün müdür? Bilginin kaynağı ve ölçütü nedir?',
    keyConcepts: 'Suje, Obje, A Priori / A Posteriori, Tabula Rasa',
    mainSchools: 'Septisizm, Rasyonalizm, Empirizm, Kritisizm, Entüisyonizm, Pragmatizm',
  },
  {
    id: 'pd_bilim',
    discipline: 'Bilim Felsefesi',
    coreQuestion: 'Bilimi diğer bilgi türlerinden ayıran ölçüt nedir? Bilim nasıl ilerler?',
    keyConcepts: 'Hipotez, Kuram, Paradigma, Bilimsel Devrim',
    mainSchools: 'Mantıkçı Pozitivizm (Doğrulanabilirlik), Popper (Yanlışlanabilirlik), Kuhn',
  },
  {
    id: 'pd_etik',
    discipline: 'Ahlak Felsefesi (Etik)',
    coreQuestion: 'İyi ve kötü nedir? Evrensel bir ahlak yasası var mıdır? İnsan özgür müdür?',
    keyConcepts: 'Ödev, Vicdan, Erdem, İrade Özgürlüğü',
    mainSchools: 'Determinizm, Otodeterminizm, Hedonizm, Utilitarizm, Kant Ödev Etiği',
  },
  {
    id: 'pd_din',
    discipline: 'Din Felsefesi',
    coreQuestion: 'Tanrı’nın varlığı akılla temellendirilebilir mi? Evrenle ilişkisi nedir?',
    keyConcepts: 'Aşkınlık, İçkinlik, Kötülük Problemi, İman–Akıl',
    mainSchools: 'Teizm, Deizm, Panteizm, Panenteizm, Ateizm, Agnostisizm',
  },
  {
    id: 'pd_siyaset',
    discipline: 'Siyaset Felsefesi',
    coreQuestion: 'İktidarın kaynağı nedir? En ideal yönetim biçimi mümkün müdür?',
    keyConcepts: 'Meşruiyet, Egemenlik, Sivil Toplum, Güçler Ayrılığı',
    mainSchools: 'Toplumsal Sözleşme, Liberalizm, Sosyalizm, Anarşizm, Ütopya & Distopya',
  },
  {
    id: 'pd_estetik',
    discipline: 'Sanat Felsefesi & Estetik',
    coreQuestion: 'Güzel nedir? Sanat doğanın taklidi mi yoksa yaratma mıdır?',
    keyConcepts: 'Estetik Haz, Mimesis, Çıkarsız Beğeni',
    mainSchools: 'Taklit (Platon/Aristoteles), Yaratma (Croce), Oyun (Schiller)',
  },
];
