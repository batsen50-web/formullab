import type {ExamFilter, QuizSource} from '../types/chemistry';
import type {
  LiteratureAnswerRecord,
  LiteratureDictionaryFilterChip,
  LiteratureExamQuestion,
  LiteratureQuestion,
  LiteratureQuizConfig,
  LiteratureQuizSummary,
  LiteratureStatsMap,
  LiteratureTerm,
} from '../types/literature';

const LIT_FAVORITES_KEY = 'formullab_lit_favorites_v1';
const LIT_STATS_KEY = 'formullab_lit_stats_v1';

export function normalizeLitSearchText(value: string): string {
  return value.trim().toLocaleLowerCase('tr-TR');
}

export function matchesLitExamFilter(
  examLevel: LiteratureTerm['examLevel'],
  filter: ExamFilter | 'TYT' | 'AYT',
): boolean {
  if (filter === 'ALL') return true;
  if (filter === 'TYT') return examLevel === 'TYT' || examLevel === 'TYT_AYT';
  return examLevel === 'AYT' || examLevel === 'TYT_AYT';
}

export function filterLiteratureTerms(
  terms: readonly LiteratureTerm[],
  options: {
    searchQuery: string;
    source: QuizSource;
    chip: LiteratureDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats: LiteratureStatsMap;
  },
): LiteratureTerm[] {
  const query = normalizeLitSearchText(options.searchQuery);

  return terms.filter((term) => {
    if (options.source === 'FAVORITES' && !options.favorites.has(term.id)) {
      return false;
    }
    if (options.source === 'MISTAKES' && (options.stats[term.id]?.wrong ?? 0) === 0) {
      return false;
    }
    if (options.source === 'HIGH_YIELD' && !term.isHighYield) {
      return false;
    }

    if (options.chip === 'TYT' || options.chip === 'AYT') {
      if (!matchesLitExamFilter(term.examLevel, options.chip)) return false;
    } else if (options.chip !== 'ALL' && term.category !== options.chip) {
      return false;
    }

    if (query.length > 0) {
      const haystacks = [
        term.term,
        term.shortCode,
        term.periodOrTopic,
        term.mechanism,
        term.examTip,
      ];
      const matched = haystacks.some((item) => normalizeLitSearchText(item).includes(query));
      if (!matched) return false;
    }

    return true;
  });
}

export function getLiteratureQuizPool(
  terms: readonly LiteratureTerm[],
  config: LiteratureQuizConfig,
  favorites: ReadonlySet<string>,
  stats: LiteratureStatsMap,
): LiteratureTerm[] {
  return terms.filter((term) => {
    if (config.source === 'FAVORITES' && !favorites.has(term.id)) return false;
    if (config.source === 'MISTAKES' && (stats[term.id]?.wrong ?? 0) === 0) return false;
    if (config.source === 'HIGH_YIELD' && !term.isHighYield) return false;

    if (!matchesLitExamFilter(term.examLevel, config.examFilter)) return false;
    if (config.topic !== 'ALL' && term.category !== config.topic) return false;

    return true;
  });
}

export function getLiteratureExamQuestionPool(
  examQuestions: readonly LiteratureExamQuestion[],
  allTerms: readonly LiteratureTerm[],
  config: LiteratureQuizConfig,
  favorites: ReadonlySet<string>,
  stats: LiteratureStatsMap,
): LiteratureExamQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));

  return examQuestions.filter((q) => {
    if (!matchesLitExamFilter(q.examLevel, config.examFilter)) return false;
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

export function generateLiteratureQuestions(
  pool: readonly LiteratureTerm[],
  allTerms: readonly LiteratureTerm[],
  config: LiteratureQuizConfig,
  rng: () => number = Math.random,
  examQuestions: readonly LiteratureExamQuestion[] = [],
  favorites: ReadonlySet<string> = new Set(),
  stats: LiteratureStatsMap = {},
): LiteratureQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const matchedExamPool =
    examQuestions.length > 0
      ? shuffleArray(
          getLiteratureExamQuestionPool(examQuestions, allTerms, config, favorites, stats),
          rng,
        )
      : [];

  if (config.questionMode === 'EXAM_STYLE' && matchedExamPool.length > 0) {
    const pickedExam = matchedExamPool.slice(
      0,
      Math.min(config.questionCount, matchedExamPool.length),
    );
    return pickedExam.map((eq) => buildExamScenarioQuestion(eq, termMap, allTerms, rng));
  }

  if (config.questionMode === 'MIXED' && matchedExamPool.length > 0) {
    const totalNeeded = Math.min(config.questionCount, pool.length + matchedExamPool.length);
    const desiredExamCount = Math.min(
      matchedExamPool.length,
      Math.max(1, Math.round(totalNeeded * 0.5)),
    );
    const examSlice = matchedExamPool
      .slice(0, desiredExamCount)
      .map((eq) => buildExamScenarioQuestion(eq, termMap, allTerms, rng));

    const remainingNeeded = totalNeeded - examSlice.length;
    const conceptSlice = buildConceptQuestions(pool, allTerms, config, remainingNeeded, rng);

    return shuffleArray<LiteratureQuestion>([...examSlice, ...conceptSlice], rng);
  }

  if (pool.length === 0) return [];
  const totalNeeded = Math.min(config.questionCount, pool.length);
  return buildConceptQuestions(pool, allTerms, config, totalNeeded, rng);
}

function buildExamScenarioQuestion(
  eq: LiteratureExamQuestion,
  termMap: Map<string, LiteratureTerm>,
  allTerms: readonly LiteratureTerm[],
  rng: () => number,
): LiteratureQuestion {
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
  pool: readonly LiteratureTerm[],
  allTerms: readonly LiteratureTerm[],
  config: LiteratureQuizConfig,
  count: number,
  rng: () => number,
): LiteratureQuestion[] {
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
    const distractors: LiteratureTerm[] = [];
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

export function calculateLiteratureSummary(
  answers: readonly LiteratureAnswerRecord[],
): LiteratureQuizSummary {
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakeMap = new Map<string, LiteratureTerm>();

  for (const ans of answers) {
    if (ans.isCorrect) {
      correctCount += 1;
      currentStreak += 1;
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
      mistakeMap.set(ans.question.term.id, ans.question.term);
    }
  }

  const total = answers.length;
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return {
    total,
    correctCount,
    percentage,
    bestStreak,
    mistakes: Array.from(mistakeMap.values()),
  };
}

export function loadLitFavoritesFromStorage(validIds: ReadonlySet<string>): Set<string> {
  try {
    const raw = localStorage.getItem(LIT_FAVORITES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(
      parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id)),
    );
  } catch {
    return new Set();
  }
}

export function saveLitFavoritesToStorage(favorites: ReadonlySet<string>): void {
  try {
    localStorage.setItem(LIT_FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch {
    // Ignore quota errors
  }
}

export function loadLitStatsFromStorage(validIds: ReadonlySet<string>): LiteratureStatsMap {
  try {
    const raw = localStorage.getItem(LIT_STATS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const safe: LiteratureStatsMap = {};
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

export function saveLitStatsToStorage(stats: LiteratureStatsMap): void {
  try {
    localStorage.setItem(LIT_STATS_KEY, JSON.stringify(stats));
  } catch {
    // Ignore quota errors
  }
}

// ============================================================================
// INTERACTIVE LITERATURE LAB DATA & EVALUATORS (ESER–YAZAR, SANAT, SES/YAZIM)
// ============================================================================

export type WorkAuthorCategory = 'ILKLER' | 'SIIR_MESNEVI' | 'ROMAN_HIKAYE' | 'TIYATRO_NESIR';

export interface WorkAuthorEntry {
  id: string;
  work: string;
  author: string;
  period: string;
  category: WorkAuthorCategory;
  summary: string;
  examTip: string;
}

export const WORK_AUTHOR_CATEGORY_LABELS: Record<'ALL' | WorkAuthorCategory, string> = {
  ALL: 'Tümü',
  ILKLER: 'İlkler',
  SIIR_MESNEVI: 'Şiir & Mesnevi',
  ROMAN_HIKAYE: 'Roman & Hikâye',
  TIYATRO_NESIR: 'Tiyatro & Nesir',
};

export const WORK_AUTHOR_ITEMS: WorkAuthorEntry[] = [
  {
    id: 'wa_kutadgu_bilig',
    work: 'Kutadgu Bilig',
    author: 'Yusuf Has Hacib',
    period: 'Geçiş Dönemi (1069)',
    category: 'ILKLER',
    summary: 'İlk mesnevi, ilk siyasetname, aruzla yazılmış ilk eser; 4 alegorik devlet kişisi.',
    examTip: 'Kün Togdı (Adalet), Ay Toldı (Mutluluk), Ögdülmiş (Akıl), Odgurmış (Akıbet).',
  },
  {
    id: 'wa_divanu_lugat',
    work: "Dîvânu Lugâti't-Türk",
    author: 'Kaşgarlı Mahmut',
    period: 'Geçiş Dönemi (1074)',
    category: 'ILKLER',
    summary: 'Türkçenin ilk sözlüğü, ilk dil bilgisi kitabı, ilk halk edebiyatı antolojisi ve haritalı eseri.',
    examTip: 'Araplara Türkçe öğretmek amacıyla yazılmış olup koşuk, sagu ve sav örneklerini korumuştur.',
  },
  {
    id: 'wa_harname',
    work: 'Harnâme',
    author: 'Şeyhi',
    period: 'Divan Edebiyatı (15. yy)',
    category: 'SIIR_MESNEVI',
    summary: 'Boynuz ararken kulağından olan eşek üzerinden toplumsal hiciv yapan 126 beyitlik fabl mesnevi.',
    examTip: 'Anadolu’daki ilk fabl ve taşlama mesnevisi örneklerindendir.',
  },
  {
    id: 'wa_muhakeme',
    work: "Muhakemetü'l-Lugateyn",
    author: 'Ali Şir Nevai',
    period: 'Çağatay Divan (15. yy)',
    category: 'TIYATRO_NESIR',
    summary: 'Türkçenin edebî ifade gücü bakımından Farsçadan üstün olduğunu örneklerle kanıtlar.',
    examTip: 'Nevai aynı zamanda ilk hamse sahibi ve Mecalisü’n-Nefais adlı ilk tezkirenin yazarıdır.',
  },
  {
    id: 'wa_sikayetname',
    work: 'Şikâyetname',
    author: 'Fuzuli',
    period: 'Divan Edebiyatı (16. yy)',
    category: 'TIYATRO_NESIR',
    summary: 'Bağlanan maaşını alamayınca Nişancı Celalzade Mustafa Çelebi’ye yazdığı hicivli ünlü mektup.',
    examTip: '"Selam verdim rüşvet değildir deyü almadılar" sözü bu mektuptadır.',
  },
  {
    id: 'wa_husn_u_ask',
    work: 'Hüsn ü Aşk',
    author: 'Şeyh Galip',
    period: 'Divan · Sebk-i Hindî (18. yy)',
    category: 'SIIR_MESNEVI',
    summary: 'Kalp ülkesine ulaşmaya çalışan Aşk’ın Hüsn’le vuslatını anlatan tasavvufi-alegorik mesnevi.',
    examTip: 'Nabi’nin Hayrabad’ına karşılık daha özgün bir mesnevi yazmak iddiasıyla 26 yaşında kaleme alınmıştır.',
  },
  {
    id: 'wa_siham_i_kaza',
    work: 'Siham-ı Kaza',
    author: "Nef'i",
    period: 'Divan Edebiyatı (17. yy)',
    category: 'SIIR_MESNEVI',
    summary: 'Kaza Okları anlamına gelen ve dönemin devlet adamlarını sert biçimde yeren hiciv eseri.',
    examTip: 'Nef’i kaside ve fahriye (kendini övme) sanatında Divan şiirinin zirvesidir.',
  },
  {
    id: 'wa_sair_evlenmesi',
    work: 'Şair Evlenmesi',
    author: 'İbrahim Şinasi',
    period: 'Tanzimat I. Dönem (1860)',
    category: 'ILKLER',
    summary: 'Müştak Bey ile Kumru Hanım üzerinden görücü usulü evliliği eleştiren tek perdelik töre komedisi.',
    examTip: 'Batılı anlamda yazılan İLK YERLİ TİYATRO eseridir.',
  },
  {
    id: 'wa_intibah',
    work: 'İntibah',
    author: 'Namık Kemal',
    period: 'Tanzimat I. Dönem (1876)',
    category: 'ILKLER',
    summary: 'Ali Bey, Mahpeyker ve Dilaşub ekseninde yanlış aşkın yıkımını anlatan ilk edebî roman.',
    examTip: 'Namık Kemal ayrıca ilk tarihî roman "Cezmi" ve sahnelenen ilk oyun "Vatan yahut Silistre"yi yazmıştır.',
  },
  {
    id: 'wa_araba_sevdasi',
    work: 'Araba Sevdası',
    author: 'Recaizade Mahmut Ekrem',
    period: 'Tanzimat II. Dönem',
    category: 'ILKLER',
    summary: 'Yanlış Batılılaşmış mirasyedi Bihruz Bey’in Periveş’e duyduğu gülünç aşkı anlatan İLK REALİST roman.',
    examTip: 'Eski-yeni tartışmasında "Zemzeme" ile kulak için uyağı savunan Ekrem’in başyapıtıdır.',
  },
  {
    id: 'wa_karabibik',
    work: 'Karabibik',
    author: 'Nabizade Nazım',
    period: 'Tanzimat II. Dönem',
    category: 'ILKLER',
    summary: 'Antalya Kaş Beymelek köyündeki toprak ve öküz mücadelesini anlatan İLK KÖY ROMANI.',
    examTip: 'Nabizade ayrıca kıskançlık temasını işlediği ilk tezli/natüralist roman denemesi "Zehra"yı yazmıştır.',
  },
  {
    id: 'wa_kucuk_seyler',
    work: 'Küçük Şeyler',
    author: 'Sami Paşazade Sezai',
    period: 'Tanzimat II. Dönem',
    category: 'ILKLER',
    summary: 'Küçük ayrıntılar ve gerçekçi gözlemle yazılmış Batılı teknikteki İLK MODERN HİKÂYE kitabı.',
    examTip: 'Yazarın esaret konusunu işlediği ünlü romanı ise "Sergüzeşt"tir (Dilber).',
  },
  {
    id: 'wa_ask_i_memnu',
    work: 'Aşk-ı Memnu',
    author: 'Halit Ziya Uşaklıgil',
    period: 'Servetifünun',
    category: 'ROMAN_HIKAYE',
    summary: 'Adnan Bey’in yalısında Bihter, Behlül ve Nihal arasındaki yasak aşkı kusursuz realist teknikle işler.',
    examTip: 'Modern Türk romanının kurucusu Halit Ziya’nın "Mai ve Siyah"ta ise başkahramanı Ahmet Cemil’dir.',
  },
  {
    id: 'wa_eylul',
    work: 'Eylül',
    author: 'Mehmet Rauf',
    period: 'Servetifünun (1901)',
    category: 'ILKLER',
    summary: 'Suat, Süreyya ve Necip arasındaki iç çatışmaları dış aksiyondan arındırarak anlatan İLK PSİKOLOJİK ROMAN.',
    examTip: 'Ruh çözümlemeleri bakımından Türk romanında dönüm noktasıdır.',
  },
  {
    id: 'wa_piyale',
    work: 'Piyale',
    author: 'Ahmet Haşim',
    period: 'Fecriati / Saf Şiir',
    category: 'SIIR_MESNEVI',
    summary: 'Ön sözündeki poetikasıyla şiiri "anlamdan ziyade musiki" sayan sembolist-empresyonist başyapıt.',
    examTip: '"Merdiven" ve "Bir Günün Sonunda Arzu" gibi şaheserleri içerir; tüm şiirleri aruzludur.',
  },
  {
    id: 'wa_safahat',
    work: 'Safahat',
    author: 'Mehmet Akif Ersoy',
    period: 'Millî Dönem Bağımsız',
    category: 'SIIR_MESNEVI',
    summary: 'Sokağın gerçeklerini, yoksulluğu (Küfe, Seyfi Baba) ve İslam birliğini anlatan 7 bölümlük şiir külliyatı.',
    examTip: 'İstiklal Marşı milletin eseri olduğu gerekçesiyle Safahat’a alınmamıştır.',
  },
  {
    id: 'wa_kendi_gok_kubbemiz',
    work: 'Kendi Gök Kubbemiz',
    author: 'Yahya Kemal Beyatlı',
    period: 'Millî Dönem Bağımsız',
    category: 'SIIR_MESNEVI',
    summary: 'Sessiz Gemi, Süleymaniye’de Bayram Sabahı ve İstanbul aşkını aruz musikisiyle işleyen neo-klasik kitap.',
    examTip: 'Yahya Kemal yalnız "Ok" şiirini heceyle, diğer tüm şiirlerini aruzla yazmıştır.',
  },
  {
    id: 'wa_yaban',
    work: 'Yaban',
    author: 'Yakup Kadri Karaosmanoğlu',
    period: 'Millî Edebiyat',
    category: 'ROMAN_HIKAYE',
    summary: 'Kolunu kaybetmiş subay Ahmet Celal’in Orta Anadolu köyünde yaşadığı aydın–köylü kopukluğunu işler.',
    examTip: 'Yakup Kadri’nin Kiralık Konak–Sodom ve Gomore–Ankara–Panorama zincirinin en çarpıcı tezli romanıdır.',
  },
  {
    id: 'wa_atesten_gomlek',
    work: 'Ateşten Gömlek',
    author: 'Halide Edip Adıvar',
    period: 'Millî Edebiyat',
    category: 'ILKLER',
    summary: 'Peyami, Ayşe ve Binbaşı İhsan üzerinden Kurtuluş Savaşı’nı doğrudan anlatan İLK ROMAN.',
    examTip: 'Halide Edip’in Rabia ve Peregrini karakterleriyle Doğu–Batı sentezini kurduğu eseri ise "Sinekli Bakkal"dır.',
  },
  {
    id: 'wa_huzur',
    work: 'Huzur',
    author: 'Ahmet Hamdi Tanpınar',
    period: 'Cumhuriyet · Bireyin İç Dünyası',
    category: 'ROMAN_HIKAYE',
    summary: 'İhsan, Nuran, Suat ve Mümtaz bölümleriyle İstanbul, aşk, musiki ve kültür bunalımını işler.',
    examTip: 'Tanpınar’ın bürokrasi eleştirisi yaptığı ünlü ironik romanı "Saatleri Ayarlama Enstitüsü"dür (Hayri İrdal).',
  },
  {
    id: 'wa_dokuzuncu_hariciye',
    work: 'Dokuzuncu Hariciye Koğuşu',
    author: 'Peyami Safa',
    period: 'Cumhuriyet · Bireyin İç Dünyası',
    category: 'ROMAN_HIKAYE',
    summary: 'Kemik veremi hastası 15 yaşındaki gencin Nüzhet’e aşkını ve hastane psikolojisini anlatır.',
    examTip: 'Türk edebiyatında ilk otobiyografik psikolojik romanlardandır.',
  },
  {
    id: 'wa_ince_memed',
    work: 'İnce Memed',
    author: 'Yaşar Kemal',
    period: 'Cumhuriyet · Toplumcu Gerçekçi',
    category: 'ROMAN_HIKAYE',
    summary: 'Çukurova’da Abdi Ağa zulmüne karşı dağa çıkan Memed’in halk kahramanına dönüşüm destanı.',
    examTip: 'Dört ciltlik eser Anadolu eşkıyalığını mitolojik doğa betimlemeleriyle verir.',
  },
  {
    id: 'wa_tutunamayanlar',
    work: 'Tutunamayanlar',
    author: 'Oğuz Atay',
    period: 'Cumhuriyet · Postmodern',
    category: 'ILKLER',
    summary: 'Turgut Özben’in intihar eden arkadaşı Selim Işık’ın izini sürerken burjuva düzenini sorgulaması.',
    examTip: 'Türk edebiyatının İLK POSTMODERN ROMANI olup bilinç akışı, parodi ve üstkurmaca içerir.',
  },
  {
    id: 'wa_anayurt_oteli',
    work: 'Anayurt Oteli',
    author: 'Yusuf Atılgan',
    period: 'Cumhuriyet · Modernist',
    category: 'ROMAN_HIKAYE',
    summary: 'İstasyon yanındaki otelin katibi Zebercet’in gecikmeli Ankara treniyle gelen kadına saplantılı yalnızlığı.',
    examTip: 'Yusuf Atılgan’ın bir diğer kült modernist romanı "Aylak Adam"da başkişi Bay C.’dir.',
  },
  {
    id: 'wa_kesanli_ali',
    work: 'Keşanlı Ali Destanı',
    author: 'Haldun Taner',
    period: 'Cumhuriyet Tiyatrosu (1964)',
    category: 'ILKLER',
    summary: 'Sineklidağ gecekondu mahallesinde işlemediği bir suçla kahramanlaşan Ali’nin müzikli taşlaması.',
    examTip: 'Türk tiyatrosunun İLK EPİK TİYATRO örneğidir.',
  },
  {
    id: 'wa_canli_maymun',
    work: 'Canlı Maymun Lokantası',
    author: 'Güngör Dilmen',
    period: 'Cumhuriyet Tiyatrosu',
    category: 'TIYATRO_NESIR',
    summary: 'Batılı kapitalist çift ile yoksul Çinli şair Wong arasındaki yabancılaşmayı absürt kurguyla anlatır.',
    examTip: 'Türk edebiyatındaki İLK ABSÜRT (UYUMSUZ) TİYATRO örneğidir.',
  },
  {
    id: 'wa_cile',
    work: 'Çile',
    author: 'Necip Fazıl Kısakürek',
    period: 'Cumhuriyet · Öz Şiir',
    category: 'SIIR_MESNEVI',
    summary: 'Kaldırımlar, Sakarya Türküsü ve "Poetika" bölümünü içeren metafizik-mistik şiir kitabı.',
    examTip: 'Necip Fazıl’ın Büyük Doğu dergisi ve "Bir Adam Yaratmak" tiyatrosu da çok önemlidir.',
  },
  {
    id: 'wa_uvecinka',
    work: 'Üvercinka',
    author: 'Cemal Süreya',
    period: 'İkinci Yeni (1958)',
    category: 'SIIR_MESNEVI',
    summary: '"Güvercin kanadı"ndan türetilmiş adıyla İkinci Yeni imgeciliğinin ve çarpıcı aşk dilinin dönüm noktası.',
    examTip: 'Cemal Süreya ayrıca "Papirüs" dergisinin kurucusu ve "Sevda Sözleri" şairidir.',
  },
];

export interface WorkAuthorQuizItem {
  target: WorkAuthorEntry;
  choices: string[];
}

export function buildWorkAuthorQuizItem(
  items: readonly WorkAuthorEntry[],
  rng: () => number = Math.random,
): WorkAuthorQuizItem | null {
  if (items.length < 4) return null;
  const target = items[Math.floor(rng() * items.length)];
  const uniqueAuthors = Array.from(
    new Set(items.filter((i) => i.author !== target.author).map((i) => i.author)),
  );
  const distractors = shuffleArray(uniqueAuthors, rng).slice(0, 3);
  return {
    target,
    choices: shuffleArray([target.author, ...distractors], rng),
  };
}

export interface VerseDeviceEntry {
  id: string;
  verseLines: string[];
  poet: string;
  device: string;
  formOrMeter: string;
  explanation: string;
  examTip: string;
}

export const VERSE_DEVICE_ITEMS: VerseDeviceEntry[] = [
  {
    id: 'vd_baki_tevriye',
    verseLines: [
      'Âvâzeyi bu âleme Dâvûd gibi sal',
      'Bâkî kalan bu kubbede bir hoş sadâ imiş',
    ],
    poet: 'Bâkî (16. yy Divan)',
    device: 'Tevriye & Telmih',
    formOrMeter: 'Gazel · Aruz',
    explanation:
      '"Bâkî" sözcüğü hem "ebedî, kalıcı" hem de şairin kendi mahlası olarak iki gerçek anlamıyla kullanılmıştır (Tevriye). Hz. Davud’un güzel sesine gönderme (Telmih) vardır.',
    examTip: 'Tevriye için en klasik ÖSYM beyitlerindendir: iki anlamın ikisi de gerçek olmalıdır.',
  },
  {
    id: 'vd_nedim_tecahul',
    verseLines: [
      'Şakaklarıma kar mı yağdı ne var?',
      'Benim mi Allah’ım bu çizgili yüz?',
    ],
    poet: 'Cahit Sıtkı Tarancı (Otuz Beş Yaş)',
    device: 'Tecahülüarif & Açık İstiare',
    formOrMeter: '11’li Hece · Beşlik',
    explanation:
      'Şair saçlarının beyazladığını ve yaşlandığını bildiği hâlde bilmezlikten gelerek soru sormaktadır (Tecahülüarif). Beyaz saçlar "kar"a benzetilip benzeyen (saç) söylenmediği için Açık İstiare vardır.',
    examTip: 'Bilip bilmezlikten gelme soruları her zaman Tecahülüarif işaretidir.',
  },
  {
    id: 'vd_husnutalil_gul',
    verseLines: [
      'Yeni bir ülkede yem vermek için atlarına',
      'Nice bin atlı kapılmıştı fetih rüzgârına',
    ],
    poet: 'Yahya Kemal Beyatlı (Akıncılar)',
    device: 'Hüsnütalil & Epik Anlatım',
    formOrMeter: 'Aruz · Mesnevi Uyak (aa)',
    explanation:
      'Akıncıların fetih seferi "yeni bir ülkede atlarına yem vermek" gibi şiirsel, hayalî bir nedene bağlanarak güzel nedene bağlama (Hüsnütalil) yapılmıştır.',
    examTip: 'Uyak incelemesi: "-ına" redif, "-r-" yarım uyaktır.',
  },
  {
    id: 'vd_fuzuli_telmih',
    verseLines: [
      'Bende Mecnûn’dan füzûn âşıklık istidâdı var',
      'Âşık-ı sâdık menem Mecnûn’un ancak adı var',
    ],
    poet: 'Fuzûlî (16. yy Divan)',
    device: 'Telmih & Mübalağa',
    formOrMeter: 'Gazel · Matla (aa)',
    explanation:
      'Ünlü Leyla ile Mecnun kıssasına hatırlatma yapılmıştır (Telmih). Şair kendisinin Mecnun’dan daha büyük bir âşık olduğunu söyleyerek abartma (Mübalağa) kurar.',
    examTip: 'Matla beyti aa kafiyeli olduğu için gazelin ilk beyti olduğu buradan da anlaşılır.',
  },
  {
    id: 'vd_karacaoglan_varsagi',
    verseLines: [
      'Bre ağalar bre beyler',
      'Ölmeden bir dem sürelim',
      'Gözümüze kara toprak',
      'Dolmadan bir dem sürelim',
    ],
    poet: 'Karacaoğlan (17. yy Halk)',
    device: 'Varsağı · Teşhis/Mecaz',
    formOrMeter: '8’li Hece · abcb',
    explanation:
      '8’li hece kalıbı ve "bre" gibi yiğitçe, meydan okuyan ünlemler bu dörtlüğü doğrudan Varsağı nazım biçimi yapar.',
    examTip: 'Semai de 8’lidir; ama "bre, hey, behey" varsa kesinlikle Varsağıdır.',
  },
  {
    id: 'vd_yunus_tezat',
    verseLines: [
      'Ağlarım hâtıra geldikçe gülüştüklerimiz',
      'Yâd-ı mâzî ile dil-hûn olur ümmîdlerimiz',
    ],
    poet: 'Mâhir Baba / Klasik Örnek',
    device: 'Tezat',
    formOrMeter: 'Aruz · Beyit',
    explanation:
      '"Ağlamak" ve "gülüşmek" birbirine tamamen zıt iki durum olarak aynı dizede yan yana getirilmiştir.',
    examTip: 'Tezat yalnız sözcük zıtlığıyla değil anlam karşıtlığıyla da kurulur.',
  },
  {
    id: 'vd_mecazi_mursel',
    verseLines: [
      'Dalgalan sen de şafaklar gibi ey şanlı hilâl',
      'Olsun artık dökülen kanlarımın hepsi helâl',
    ],
    poet: 'Mehmet Akif Ersoy (İstiklâl Marşı)',
    device: 'Mecazımürsel & Teşbih',
    formOrMeter: 'Aruz · aa',
    explanation:
      '"Hilâl" sözcüğüyle parça-bütün ilgisi kurularak Türk bayrağı kastedilmiştir (Mecazımürsel). "Şafaklar gibi" ifadesinde ise edatlı benzetme (Teşbih) vardır.',
    examTip: 'Parça-bütün, iç-dış, sanatçı-eser ilişkileri Mecazımürsel (Ad Aktarması) doğurur.',
  },
  {
    id: 'vd_kinaye_atasozu',
    verseLines: [
      'Dedim dilber niçin sararıp soldun',
      'Dedi çektiğim hep kendi elimdendir',
    ],
    poet: 'Âşık Şiiri Geleneği (Örnek Dörtlük)',
    device: 'Kinaye & İstiare',
    formOrMeter: '11’li Hece',
    explanation:
      '"Kendi elimden çekmek" ifadesi hem gerçek hem de "kendi yaptıklarının sonucuna katlanmak" mecaz anlamına gelir; asıl kastedilen mecaz anlam olduğu için Kinayedir.',
    examTip: 'Kinayede mecaz anlam asıl, gerçek anlam ikincildir; Tevriyede ise her iki anlam gerçektir!',
  },
  {
    id: 'vd_irsalimesel',
    verseLines: [
      'Tok olanlar bilemez çektiğini aç kalanın',
      'Sırtı pek kimseye ahvâl-i şitâ yaz görünür',
    ],
    poet: 'Sâbit / Hikemî Örnek',
    device: 'İrsalimesel & Tezat',
    formOrMeter: 'Aruz · Beyit',
    explanation:
      '"Tok açın hâlinden anlamaz" atasözü anlamı ve "yaz / şitâ (kış)" karşıtlığı ile düşünceyi güçlendiren İrsalimesel sanatı kurulmuştur.',
    examTip: 'Nabi ve Hikemî tarz şairler beyit içinde atasözüne (İrsalimesel) sık yer verir.',
  },
  {
    id: 'vd_nefi_mubalaga',
    verseLines: [
      'Bir katre içen çeşme-i pür-hûn-ı fenâdan',
      'Başın alamaz bir dahi bârân-ı belâdan',
    ],
    poet: 'Fuzûlî / Divan Şiiri',
    device: 'Mübalağa & Kapalı İstiare',
    formOrMeter: 'Aruz · aa (Kaside/Gazel)',
    explanation:
      'Belanın yağmur gibi yağması ve dünya faniliğinin kanlı bir çeşmeye benzetilmesi abartılı (Mübalağa) ve istiareli bir söyleyiş kurar.',
    examTip: 'Klasik kasidelerde övgü ve yergide Mübalağa vazgeçilmezdir.',
  },
  {
    id: 'vd_kadi_tuyug',
    verseLines: [
      'Dilberin işi itâb u nâz olur',
      'Çeşmi câdû gamzesi gammâz olur',
      'Ey gönül sabr et tahammül kıl ana',
      'Yâra erişmek işi az az olur',
    ],
    poet: 'Kadı Burhaneddin (14. yy Divan)',
    device: 'Tuyuğ · Cinas/Redif',
    formOrMeter: '11’li Aruz (Fâilâtün Fâilâtün Fâilün)',
    explanation:
      'Tek dörtlük, aaxa uyak düzeni ve 11 heceye denk gelen "fâilâtün fâilâtün fâilün" kalıbı ile Türklere özgü Tuyuğ biçiminin kusursuz örneğidir.',
    examTip: 'Tuyuğun en önemli özelliği rubaiden farklı olarak tek kalıpla (fâilâtün...) yazılması ve sıkça cinas kullanmasıdır.',
  },
  {
    id: 'vd_nedim_sarki',
    verseLines: [
      'Gidelim serv-i revânım yürü Sa’d-âbâd’a',
      'İşte üç çifte kayık iskelede âmâde',
      'Gidelim serv-i revânım yürü Sa’d-âbâd’a',
    ],
    poet: 'Nedim (18. yy Lale Devri)',
    device: 'Şarkı (Nakarat) · Mahallîleşme',
    formOrMeter: 'Aruz · Murabba Şarkı',
    explanation:
      'Bestelenmek üzere yazılmış, üçüncü/dördüncü dizede nakaratı tekrarlanan ve Lale Devri İstanbul eğlencelerini somut dille yansıtan Şarkı örneğidir.',
    examTip: 'Nedim bütün şiirlerini aruzla yazmış olmasına rağmen birkaç türküsü hecelidir.',
  },
];

export interface OrthographyTrapItem {
  id: string;
  correctForm: string;
  wrongForm: string;
  rule: string;
  example: string;
}

export const ORTHOGRAPHY_TRAPS: OrthographyTrapItem[] = [
  {
    id: 'ort_yalniz',
    correctForm: 'yalnız',
    wrongForm: 'yanlız',
    rule: '"Yalın" kökünden ünlü düşmesiyle (-ız) türediği için önce L sonra N gelir.',
    example: 'Bu akşam evde yalnız çalışacağım.',
  },
  {
    id: 'ort_yanlis',
    correctForm: 'yanlış',
    wrongForm: 'yalnış',
    rule: '"Yanıl-" fiilinden (-ış) ünlü düşmesiyle türediği için önce N sonra L gelir.',
    example: 'Sorudaki yanlış seçeneği hemen fark etti.',
  },
  {
    id: 'ort_terk_etmek',
    correctForm: 'terk etmek',
    wrongForm: 'terketmek',
    rule: 'İlk kelimesinde ses düşmesi veya ünsüz türemesi yoksa yardımcı fiiller ayrı yazılır.',
    example: 'Eski alışkanlıkları terk etmek kolay değildir.',
  },
  {
    id: 'ort_vazgecmek',
    correctForm: 'vazgeçmek / Vaz mı geçtin?',
    wrongForm: 'vaz geçmek / Vazgeçtin mi?',
    rule: 'Anlamca kaynaşmış "vazgeçmek" bitişik yazılır; "mı/mi" ise ilk kelimeden sonra araya girebilir.',
    example: 'Bunca emekten sonra yarıştan vaz mı geçtin?',
  },
  {
    id: 'ort_semizotu',
    correctForm: 'semizotu / dereotu',
    wrongForm: 'semiz otu / dere otu',
    rule: 'Gelenekleşmiş olarak bitişik yazılan ot adları istisnalardandır ("ayrık otu" ise ayrıdır).',
    example: 'Salataya taze dereotu ve semizotu doğradı.',
  },
  {
    id: 'ort_bal_rengi',
    correctForm: 'bal rengi',
    wrongForm: 'balrengi',
    rule: 'Renk adı kendi anlamını koruyorsa ayrı; anlam değişimi varsa ("camgöbeği, vişneçürüğü") bitişik yazılır.',
    example: 'Salonun perdelerini bal rengi seçtiler.',
  },
  {
    id: 'ort_ana_dili',
    correctForm: 'ana dili',
    wrongForm: 'anadili',
    rule: 'İkinci sözcük gerçek anlamını koruduğu için TDK’ye göre ayrı yazılır.',
    example: 'Öğrencilerin ana dili bilincini güçlendirmek gerekir.',
  },
  {
    id: 'ort_yer_cekimi',
    correctForm: 'yer çekimi',
    wrongForm: 'yerçekimi',
    rule: 'Bilim/fizik terimi de olsa ikinci kelime anlamını koruduğundan ayrı yazılır.',
    example: 'Ay yüzeyindeki yer çekimi Dünya’dakinin altıda biridir.',
  },
  {
    id: 'ort_tbmm',
    correctForm: 'Türkiye Büyük Millet Meclisine',
    wrongForm: 'Türkiye Büyük Millet Meclisi’ne',
    rule: 'Kurum, kuruluş, kurul ve iş yeri adlarına gelen ekler kesme işaretiyle ayrılmaz.',
    example: 'Yeni yasa teklifi Türkiye Büyük Millet Meclisine sunuldu.',
  },
  {
    id: 'ort_tdknin',
    correctForm: 'TDK’nin / TÜBİTAK’ın',
    wrongForm: 'TDK’nın / TÜBİTAK’a değil',
    rule: 'Büyük harfli kısaltmalarda "K" sesi "ke" okunur; kesmeden sonra ek buna göre getirilir.',
    example: 'TDK’nin son yazım kılavuzu güncellemesini inceledik.',
  },
  {
    id: 'ort_cm3e',
    correctForm: 'cm³e / m²ye',
    wrongForm: 'cm³’e / m²’ye',
    rule: 'Üslü ve noktalı kısaltmalardan sonra ayrıca kesme işareti kullanılmaz.',
    example: 'Bu deponun hacmi 250 m³e kadar çıkıyor.',
  },
  {
    id: 'ort_herhangi_bir',
    correctForm: 'herhangi bir / hiçbir',
    wrongForm: 'her hangi bir / hiç bir',
    rule: '"Herhangi" bitişik + "bir" ayrı yazılır; "hiçbir, birkaç, biraz, birtakım (bazı)" bitişiktir.',
    example: 'Herhangi bir sorun yaşamadan tüm testleri bitirdi.',
  },
  {
    id: 'ort_halbu_ki',
    correctForm: 'hâlbuki / mademki / oysaki',
    wrongForm: 'hâlbu ki / madem ki / oysa ki',
    rule: 'Bağlaç olduğu hâlde kalıplaştığı için bitişik yazılan SOMBaHÇeM istisnalarıdır.',
    example: 'Mademki erken çıktık, sahilden yürüyelim.',
  },
  {
    id: 'ort_saat_nokta',
    correctForm: '14.30’da / 15.00’te',
    wrongForm: '14:30’da / 15.00’da',
    rule: 'Saat ve dakika arasına tek nokta konur; tam saatlerde çift sıfır okunmaz ("on beşte").',
    example: 'Deneme sınavı yarın tam 09.00’da başlayacak.',
  },
];

export interface TurkishSoundAnalysis {
  cleaned: string;
  vowels: string[];
  syllableCount: number;
  bigHarmonyApplies: boolean;
  passesBigHarmony: boolean;
  bigHarmonyReason: string;
  passesSmallHarmony: boolean;
  smallHarmonyReason: string;
  specialNote: string | null;
}

const BACK_VOWELS = new Set(['a', 'ı', 'o', 'u', 'â', 'û']);
const FRONT_VOWELS = new Set(['e', 'i', 'ö', 'ü', 'î']);
const ALL_VOWELS = new Set([...BACK_VOWELS, ...FRONT_VOWELS]);

const FLAT_VOWELS = new Set(['a', 'e', 'ı', 'i', 'â', 'î']);
const ROUND_VOWELS = new Set(['o', 'ö', 'u', 'ü', 'û']);
const FLAT_WIDE_OR_NARROW_ROUND = new Set(['a', 'e', 'u', 'ü', 'â', 'û']);

const SOUND_PRESET_NOTES: Record<string, string> = {
  geliyor:
    'Tuzak: "-yor" eki Büyük ve Küçük Ünlü Uyumunu bozar; ayrıca kök "gel-" olduğundan ünlü daralması YOKTUR.',
  gözlüyor:
    'Kök "gözle-" geniş ünlüyle bittiğinden "-yor" etkisiyle ünlü daralması (e → ü) oluşmuştur.',
  bana: 'Türkçede yalnızca "ben+e → bana" ve "sen+e → sana" sözcüklerinde ÜNLÜ DEĞİŞİMİ vardır.',
  minicik:
    'Ünsüz düşmesi: "minik + -cik → minicik" (sonundaki "k" ünsüzü düşmüştür).',
  alçalmak:
    'Ünsüz düşmesi: "alçak + -l → alçalmak" (sonundaki "k" ünsüzü düşmüştür).',
  adaşı:
    'Ünsüz düşmesi: "ad + -daş → adaş" (ortadaki "d" ünsüzlerinden biri düşmüştür).',
  hakkı:
    'Ünsüz türemesi (ikizleşme): Arapça "hak + -ı → hakkı" (ikinci "k" türemiştir).',
  affetmek:
    'Ünsüz türemesi: "af + etmek → affetmek" (ikizleşmeden dolayı bitişik yazılır).',
  kaybolmak:
    'Ünlü düşmesi + Ünsüz yumuşaması: "kayıp + olmak → kaybolmak" (ı düşer, p → b olur).',
  sabırla:
    'Ünlü düşmesi kontrolü: "sabır" tek başınayken ı durur; ancak "sabrı" biçiminde ünlü ek gelince orta hece ünlüsü düşer.',
  kitapçı:
    'Ünsüz benzeşmesi (sertleşme): Fıstıkçı Şahap ("p") sonrası "-cı" → "-çı" olmuştur.',
  hukuku:
    'Ünsüz yumuşamasına aykırılık: "hukuk + -u" iki ünlü arasında kalsa da "hukuğu" olmaz.',
  kömürlük:
    'Tüm ünlüler ince (ö-ü-ü) ve yuvarlaktan sonra dar yuvarlak geldiği için her iki ünlü uyumuna da uyar.',
  elma: 'Tek birleşimsiz kök olmasına rağmen kalın (a) ve ince (e) bir arada olduğundan Büyük Ünlü Uyumuna uymaz (eskiden alma).',
  anne: 'Aslında "ana" kökenli olduğu hâlde zamanla incelen "anne" Büyük Ünlü Uyumuna uymaz (istisna).',
  kardeş: 'Eski "karındaş"tan geldiği için Büyük Ünlü Uyumuna uymayan Türkçe istisnalardandır.',
  çilek: 'Tüm ünlüler ince (i-e) ve düz olduğu için hem Büyük hem Küçük Ünlü Uyumuna uyar.',
  kavun: 'Küçük Ünlü Uyumuna AYKIRIDIR: Düz "a"dan sonra yuvarlak "u" gelemez.',
};

export function analyzeTurkishWordSound(rawWord: string): TurkishSoundAnalysis {
  const cleaned = rawWord.trim().toLocaleLowerCase('tr-TR');
  const chars = Array.from(cleaned);
  const vowels = chars.filter((ch) => ALL_VOWELS.has(ch));
  const syllableCount = vowels.length;

  const specialNote = SOUND_PRESET_NOTES[cleaned] ?? null;

  if (syllableCount === 0) {
    return {
      cleaned,
      vowels,
      syllableCount: 0,
      bigHarmonyApplies: false,
      passesBigHarmony: false,
      bigHarmonyReason: 'En az bir ünlü harf içeren Türkçe bir sözcük girin.',
      passesSmallHarmony: false,
      smallHarmonyReason: 'Ünlü bulunamadı.',
      specialNote,
    };
  }

  if (syllableCount === 1) {
    return {
      cleaned,
      vowels,
      syllableCount: 1,
      bigHarmonyApplies: false,
      passesBigHarmony: true,
      bigHarmonyReason: 'Tek heceli sözcüklerde ünlü uyumu aranmaz (kural dışı değildir).',
      passesSmallHarmony: true,
      smallHarmonyReason: 'Tek heceli sözcüklerde uyum aranmaz.',
      specialNote,
    };
  }

  const allBack = vowels.every((v) => BACK_VOWELS.has(v));
  const allFront = vowels.every((v) => FRONT_VOWELS.has(v));
  const passesBigHarmony = allBack || allFront;
  const bigHarmonyReason = passesBigHarmony
    ? allBack
      ? `Tüm ünlüler kalın (${vowels.join(' - ')}) olduğu için Büyük Ünlü Uyumuna UYAR.`
      : `Tüm ünlüler ince (${vowels.join(' - ')}) olduğu için Büyük Ünlü Uyumuna UYAR.`
    : `Kalın ve ince ünlüler karıştığı (${vowels.join(' - ')}) için Büyük Ünlü Uyumuna UYMAZ.`;

  let passesSmallHarmony = true;
  let smallHarmonyReason = `Ünlü dizilimi (${vowels.join(' - ')}) düz/yuvarlak kuralını sağladığı için Küçük Ünlü Uyumuna UYAR.`;

  for (let i = 0; i < vowels.length - 1; i += 1) {
    const cur = vowels[i];
    const nxt = vowels[i + 1];
    if (FLAT_VOWELS.has(cur) && !FLAT_VOWELS.has(nxt)) {
      passesSmallHarmony = false;
      smallHarmonyReason = `Düz ünlüden ("${cur}") sonra yuvarlak ünlü ("${nxt}") geldiği için Küçük Ünlü Uyumunu BOZAR.`;
      break;
    }
    if (ROUND_VOWELS.has(cur) && !FLAT_WIDE_OR_NARROW_ROUND.has(nxt)) {
      passesSmallHarmony = false;
      smallHarmonyReason = `Yuvarlak ünlüden ("${cur}") sonra "${nxt}" gelemez (yalnız a, e, u, ü gelir) — Küçük Ünlü Uyumunu BOZAR.`;
      break;
    }
  }

  return {
    cleaned,
    vowels,
    syllableCount,
    bigHarmonyApplies: true,
    passesBigHarmony,
    bigHarmonyReason,
    passesSmallHarmony,
    smallHarmonyReason,
    specialNote,
  };
}
