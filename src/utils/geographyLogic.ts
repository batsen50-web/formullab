import type {ExamFilter, QuizSource} from '../types/chemistry';
import type {
  GeographyAnswerRecord,
  GeographyDictionaryFilterChip,
  GeographyExamQuestion,
  GeographyQuestion,
  GeographyQuizConfig,
  GeographyQuizSummary,
  GeographyStatsMap,
  GeographyTerm,
} from '../types/geography';

const GEO_FAVORITES_KEY = 'formullab_geo_favorites_v1';
const GEO_STATS_KEY = 'formullab_geo_stats_v1';

export function normalizeGeoSearchText(value: string): string {
  return value.trim().toLocaleLowerCase('tr-TR');
}

export function matchesGeoExamFilter(
  examLevel: GeographyTerm['examLevel'],
  filter: ExamFilter | 'TYT' | 'AYT',
): boolean {
  if (filter === 'ALL') return true;
  if (filter === 'TYT') return examLevel === 'TYT' || examLevel === 'TYT_AYT';
  return examLevel === 'AYT' || examLevel === 'TYT_AYT';
}

export function filterGeographyTerms(
  terms: readonly GeographyTerm[],
  options: {
    searchQuery: string;
    source: QuizSource;
    chip: GeographyDictionaryFilterChip;
    favorites: ReadonlySet<string>;
    stats: GeographyStatsMap;
  },
): GeographyTerm[] {
  const query = normalizeGeoSearchText(options.searchQuery);

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
      if (!matchesGeoExamFilter(term.examLevel, options.chip)) return false;
    } else if (options.chip !== 'ALL' && term.category !== options.chip) {
      return false;
    }

    if (query.length > 0) {
      const haystacks = [
        term.term,
        term.shortCode,
        term.regionOrScope,
        term.mechanism,
        term.examTip,
      ];
      const matched = haystacks.some((item) => normalizeGeoSearchText(item).includes(query));
      if (!matched) return false;
    }

    return true;
  });
}

export function getGeographyQuizPool(
  terms: readonly GeographyTerm[],
  config: GeographyQuizConfig,
  favorites: ReadonlySet<string>,
  stats: GeographyStatsMap,
): GeographyTerm[] {
  return terms.filter((term) => {
    if (config.source === 'FAVORITES' && !favorites.has(term.id)) return false;
    if (config.source === 'MISTAKES' && (stats[term.id]?.wrong ?? 0) === 0) return false;
    if (config.source === 'HIGH_YIELD' && !term.isHighYield) return false;

    if (!matchesGeoExamFilter(term.examLevel, config.examFilter)) return false;
    if (config.topic !== 'ALL' && term.category !== config.topic) return false;

    return true;
  });
}

export function getGeographyExamQuestionPool(
  examQuestions: readonly GeographyExamQuestion[],
  allTerms: readonly GeographyTerm[],
  config: GeographyQuizConfig,
  favorites: ReadonlySet<string>,
  stats: GeographyStatsMap,
): GeographyExamQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));

  return examQuestions.filter((q) => {
    if (!matchesGeoExamFilter(q.examLevel, config.examFilter)) return false;
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

export function generateGeographyQuestions(
  pool: readonly GeographyTerm[],
  allTerms: readonly GeographyTerm[],
  config: GeographyQuizConfig,
  rng: () => number = Math.random,
  examQuestions: readonly GeographyExamQuestion[] = [],
  favorites: ReadonlySet<string> = new Set(),
  stats: GeographyStatsMap = {},
): GeographyQuestion[] {
  const termMap = new Map(allTerms.map((t) => [t.id, t]));
  const matchedExamPool =
    examQuestions.length > 0
      ? shuffleArray(
          getGeographyExamQuestionPool(examQuestions, allTerms, config, favorites, stats),
          rng,
        )
      : [];

  if (config.questionMode === 'EXAM_STYLE' && matchedExamPool.length > 0) {
    const pickedExam = matchedExamPool.slice(0, Math.min(config.questionCount, matchedExamPool.length));
    return pickedExam.map((eq) => buildExamScenarioQuestion(eq, termMap, allTerms, rng));
  }

  if (config.questionMode === 'MIXED' && matchedExamPool.length > 0) {
    const totalNeeded = Math.min(config.questionCount, pool.length + matchedExamPool.length);
    const desiredExamCount = Math.min(matchedExamPool.length, Math.max(1, Math.round(totalNeeded * 0.4)));
    const examSlice = matchedExamPool
      .slice(0, desiredExamCount)
      .map((eq) => buildExamScenarioQuestion(eq, termMap, allTerms, rng));

    const remainingNeeded = totalNeeded - examSlice.length;
    const conceptSlice = buildConceptQuestions(pool, allTerms, config, remainingNeeded, rng);

    return shuffleArray<GeographyQuestion>([...examSlice, ...conceptSlice], rng);
  }

  if (pool.length === 0) return [];
  const totalNeeded = Math.min(config.questionCount, pool.length);
  return buildConceptQuestions(pool, allTerms, config, totalNeeded, rng);
}

function buildExamScenarioQuestion(
  eq: GeographyExamQuestion,
  termMap: Map<string, GeographyTerm>,
  allTerms: readonly GeographyTerm[],
  rng: () => number,
): GeographyQuestion {
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
  pool: readonly GeographyTerm[],
  allTerms: readonly GeographyTerm[],
  config: GeographyQuizConfig,
  count: number,
  rng: () => number,
): GeographyQuestion[] {
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
    const distractors: GeographyTerm[] = [];
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

export function calculateGeographySummary(
  answers: readonly GeographyAnswerRecord[],
): GeographyQuizSummary {
  let correctCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  const mistakeMap = new Map<string, GeographyTerm>();

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
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return {
    total,
    correctCount,
    percentage,
    bestStreak,
    mistakes: Array.from(mistakeMap.values()),
  };
}

export function loadGeoFavoritesFromStorage(): string[] {
  try {
    const raw = window.localStorage.getItem(GEO_FAVORITES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function saveGeoFavoritesToStorage(favorites: readonly string[]): void {
  try {
    window.localStorage.setItem(GEO_FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadGeoStatsFromStorage(): GeographyStatsMap {
  try {
    const raw = window.localStorage.getItem(GEO_STATS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    const clean: GeographyStatsMap = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const record = value as Record<string, unknown>;
        const correct =
          typeof record.correct === 'number' && record.correct >= 0
            ? Math.floor(record.correct)
            : 0;
        const wrong =
          typeof record.wrong === 'number' && record.wrong >= 0 ? Math.floor(record.wrong) : 0;
        clean[key] = {correct, wrong};
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveGeoStatsToStorage(stats: GeographyStatsMap): void {
  try {
    window.localStorage.setItem(GEO_STATS_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}

// ============================================================================
// HARİTA LAB VERİLERİ & HESAPLAMA SİMÜLATÖRLERİ
// ============================================================================

export type WorldHotspotType = 'KANAL' | 'BOGAZ' | 'BURUN';

export interface WorldMapHotspot {
  id: string;
  name: string;
  type: WorldHotspotType;
  /** SVG viewBox (0..600) X koordinatı */
  x: number;
  /** SVG viewBox (0..300) Y koordinatı */
  y: number;
  connects: string;
  importance: string;
  examTip: string;
}

export const WORLD_MAP_HOTSPOTS: WorldMapHotspot[] = [
  {
    id: 'bering',
    name: 'Bering Boğazı',
    type: 'BOGAZ',
    x: 42,
    y: 54,
    connects: 'Büyük Okyanus ↔ Kuzey Buz Denizi',
    importance: 'Asya ile Kuzey Amerika’yı ayırır; Tarih Değiştirme Çizgisi (180° meridyeni) yakınından geçer.',
    examTip: 'Soğuk iklim ve kutup kenarı nedeniyle deniz ticareti yoğunluğu düşüktür.',
  },
  {
    id: 'panama',
    name: 'Panama Kanalı',
    type: 'KANAL',
    x: 158,
    y: 148,
    connects: 'Karayip Denizi (Atlas) ↔ Büyük Okyanus',
    importance: '1914’te açılan havuzlu (asansörlü) kanal, Macellan Boğazı’na göre rotayı ~12.000 km kısaltır.',
    examTip: 'Doğal değil insan yapımı su yoludur; ABD doğu–batı kıyıları arası ticarette kritiktir.',
  },
  {
    id: 'macellan',
    name: 'Macellan Boğazı',
    type: 'BOGAZ',
    x: 185,
    y: 256,
    connects: 'Atlas Okyanusu ↔ Büyük Okyanus (Güney Amerika ucu)',
    importance: 'Panama Kanalı açılmadan önce iki okyanus arasındaki en önemli doğal geçitti.',
    examTip: 'Panama açıldıktan sonra ticari önemi azalmıştır.',
  },
  {
    id: 'dover',
    name: 'Dover Boğazı',
    type: 'BOGAZ',
    x: 286,
    y: 74,
    connects: 'Manş Denizi ↔ Kuzey Denizi',
    importance: 'İngiltere ile Fransa arasında dünyanın en işlek Avrupa deniz ticareti boğazlarından biridir.',
    examTip: 'Altında Manş Tüneli yer alır; Batı Avrupa limanlarını okyanusa bağlar.',
  },
  {
    id: 'kiel',
    name: 'Kiel Kanalı',
    type: 'KANAL',
    x: 312,
    y: 66,
    connects: 'Kuzey Denizi ↔ Baltık Denizi',
    importance: 'Almanya sınırları içinde Danimarka yarımadasını dolaşmadan Baltık’a kısa geçiş sağlar.',
    examTip: 'İskandinavya ve Baltık ülkelerinin Kuzey Denizi’ne açılan insan yapımı kanalıdır.',
  },
  {
    id: 'cebelitarik',
    name: 'Cebelitarık Boğazı',
    type: 'BOGAZ',
    x: 283,
    y: 103,
    connects: 'Akdeniz ↔ Atlas Okyanusu',
    importance: 'İspanya ile Fas arasında Akdeniz’in batı okyanus çıkış kapısıdır.',
    examTip: 'Akdeniz’i Atlas Okyanusu’na bağlayan doğal boğazdır; Süveyş ile birlikte Avrupa–Asya rotasını açar.',
  },
  {
    id: 'turk_bogazlari',
    name: 'İstanbul ve Çanakkale Boğazları',
    type: 'BOGAZ',
    x: 342,
    y: 96,
    connects: 'Karadeniz ↔ Marmara ↔ Ege / Akdeniz',
    importance: 'Karadeniz’e kıyısı olan tüm ülkelerin açık denizlere çıkışındaki tek doğal geçittir.',
    examTip: 'Yıllık gemi trafiği Panama’nın ~4 katı, Süveyş’in ~3 katıdır; ria kıyı tipindedir.',
  },
  {
    id: 'suveys',
    name: 'Süveyş Kanalı',
    type: 'KANAL',
    x: 350,
    y: 117,
    connects: 'Akdeniz ↔ Kızıldeniz',
    importance: '1869’da açıldı; Avrupa–Asya deniz yolunda Afrika’yı (Ümit Burnu) dolaşma zorunluluğunu kaldırdı.',
    examTip: 'Kapaksız ve düz bir insan yapımı kanaldır; Mısır sınırları içindedir.',
  },
  {
    id: 'babulmendep',
    name: 'Babülmendep Boğazı',
    type: 'BOGAZ',
    x: 368,
    y: 144,
    connects: 'Kızıldeniz ↔ Aden Körfezi / Hint Okyanusu',
    importance: 'Süveyş Kanalı’ndan geçen gemilerin Hint Okyanusu’na açıldığı stratejik boğazdır.',
    examTip: 'Yemen–Cibuti/Eritre arasındadır; korsanlık ve güvenlik açısından kritik darboğazdır.',
  },
  {
    id: 'hurmuz',
    name: 'Hürmüz Boğazı',
    type: 'BOGAZ',
    x: 393,
    y: 125,
    connects: 'Basra Körfezi ↔ Umman Denizi / Hint Okyanusu',
    importance: 'Küresel petrol ve LNG taşımacılığının en kritik enerji darboğazıdır.',
    examTip: 'Sorularda "petrol sevkiyatı" vurgulanıyorsa doğru cevap hemen her zaman Hürmüz Boğazı’dır.',
  },
  {
    id: 'umit_burnu',
    name: 'Ümit Burnu',
    type: 'BURUN',
    x: 332,
    y: 235,
    connects: 'Atlas Okyanusu ↔ Hint Okyanusu (Güney Afrika)',
    importance: 'Süveyş Kanalı açılmadan önce Avrupa–Hindistan rotası buradan geçerdi; Süveyş sonrası trafiği azaldı.',
    examTip: 'Süveyş Kanalı kapalı kaldığında veya dev tankerler sığmadığında yeniden alternatif rota olur.',
  },
  {
    id: 'malakka',
    name: 'Malakka Boğazı',
    type: 'BOGAZ',
    x: 472,
    y: 162,
    connects: 'Hint Okyanusu (Andaman) ↔ Büyük Okyanus (Güney Çin Denizi)',
    importance: 'Çin, Japonya ve Güney Kore’nin Avrupa ile Orta Doğu’ya uzanan ana deniz ticareti kapısıdır.',
    examTip: 'Malezya ile Endonezya (Sumatra) adası arasında yer alır; dünya konteyner trafiğinin kalbidir.',
  },
];

export type TurkeyHotspotLayer = 'LANDFORM' | 'RESOURCE';

export interface TurkeyMapHotspot {
  id: string;
  name: string;
  layer: TurkeyHotspotLayer;
  /** SVG viewBox (0..600) X koordinatı */
  x: number;
  /** SVG viewBox (0..280) Y koordinatı */
  y: number;
  region: string;
  summary: string;
  examTip: string;
}

export const TURKEY_MAP_HOTSPOTS: TurkeyMapHotspot[] = [
  {
    id: 'tr_yildiz',
    name: 'Yıldız Dağları Masifi',
    layer: 'LANDFORM',
    x: 92,
    y: 36,
    region: 'Marmara (Trakya)',
    summary: 'I. Jeolojik Zamanda oluşmuş sert masif arazi; tektonik deprem riski düşüktür.',
    examTip: 'Marmara’da dağlık engebeli yapısına rağmen deprem riski KAF hattına göre daha az olan masif alanıdır.',
  },
  {
    id: 'tr_zonguldak',
    name: 'Zonguldak Taş Kömürü & Ereğli',
    layer: 'RESOURCE',
    x: 196,
    y: 44,
    region: 'Batı Karadeniz',
    summary: 'I. Zaman taş kömürü yatakları ve yüksek kalorili enerji kaynağı nedeniyle demir-çelik sanayisinin merkezidir.',
    examTip: 'Karabük ve Ereğli demir-çelik fabrikaları ham maddeye (Sivas) değil enerji kaynağı taş kömürüne yakın kurulmuştur.',
  },
  {
    id: 'tr_bafra_carsamba',
    name: 'Bafra ve Çarşamba Ovaları',
    layer: 'LANDFORM',
    x: 312,
    y: 44,
    region: 'Orta Karadeniz',
    summary: 'Kızılırmak (Bafra) ve Yeşilırmak (Çarşamba) nehirlerinin kıyı derinliğinin az olduğu yerde oluşturduğu verimli deltalar.',
    examTip: 'Orta Karadeniz’de dağlar geride ve alçak olduğu için hinterland geniştir ve kıyı delta oluşumu kolaydır.',
  },
  {
    id: 'tr_kackar_cay',
    name: 'Kaçkarlar, Rize Çay & DOKAP',
    layer: 'RESOURCE',
    x: 472,
    y: 46,
    region: 'Doğu Karadeniz',
    summary: 'Türkiye’nin en çok yağış alan, buzul sirk göllerine sahip bölümü; çay üretiminin %100’ü ve yoğun heyelan alanı.',
    examTip: 'Fön rüzgârı Rize’de mikroklima turunçgil yetişmesine olanak verir; DOKAP Yeşil Yol ile ekoturizm geliştirir.',
  },
  {
    id: 'tr_murgul',
    name: 'Artvin Murgul Bakır & Çoruh',
    layer: 'RESOURCE',
    x: 505,
    y: 52,
    region: 'Doğu Karadeniz',
    summary: 'Önemli bakır yatakları (Murgul) ile Çoruh Nehri üzerindeki yüksek hidroelektrik barajlar (Deriner, Yusufeli) bulunur.',
    examTip: 'Kastamonu Küre, Elazığ Maden ve Artvin Murgul Türkiye’nin üç büyük bakır çıkarım merkezidir.',
  },
  {
    id: 'tr_ege_kirik',
    name: 'Ege Horst–Graben Sistemi',
    layer: 'LANDFORM',
    x: 94,
    y: 138,
    region: 'Kıyı Ege',
    summary: 'Kaz, Madra, Yunt, Bozdağlar, Aydın ve Menteşe kırık dağları ile Gediz, Bakırçay, Küçük ve Büyük Menderes graben ovaları.',
    examTip: 'Dağların kıyıya dik uzanması enine kıyı tipi oluşturur; denizel hava ve ulaşım iç kesimlere kolay sokulur.',
  },
  {
    id: 'tr_kirka_bor',
    name: 'Eskişehir Kırka & Bor Havzası',
    layer: 'RESOURCE',
    x: 168,
    y: 108,
    region: 'İç Batı Anadolu',
    summary: 'Dünya bor rezervinin yaklaşık %73’ünü barındıran kuşağın merkezi (Eskişehir Kırka, Kütahya Emet, Balıkesir Bigadiç).',
    examTip: 'Bor III. Zaman (Tersiyer) göl havzalarında tortullanmıştır; cam, seramik, temizlik ve uzay teknolojisinde kullanılır.',
  },
  {
    id: 'tr_tuz_kop',
    name: 'Tuz Gölü, Obruk Platosu & KOP',
    layer: 'LANDFORM',
    x: 266,
    y: 148,
    region: 'İç Anadolu',
    summary: 'Türkiye’nin en az yağış alan kapalı havzası; yer altı suyu çekilmesiyle obruklar artmakta, KOP Mavi Tünel ile Göksu suyu aktarılmaktadır.',
    examTip: 'Konya Türkiye’de buğday ve mısır üretiminde önemli merkezdir; Halomorfik (tuzlu) topraklar bu çevrede yaygındır.',
  },
  {
    id: 'tr_teke_taseli',
    name: 'Teke–Taşeli Karstik Platoları',
    layer: 'LANDFORM',
    x: 184,
    y: 214,
    region: 'Batı–Orta Toroslar',
    summary: 'Kalkerli yapı nedeniyle lapya, dolin, polye, mağara ve travertenlerin yaygın olduğu seyrek nüfuslu platolar.',
    examTip: 'Su yer altına sızdığı ve arazi engebeli olduğu için tarım ve yerleşme seyrektir; kalanklı kıyı örneği bulunur.',
  },
  {
    id: 'tr_cukurova',
    name: 'Çukurova Deltası',
    layer: 'LANDFORM',
    x: 318,
    y: 204,
    region: 'Adana (Doğu Akdeniz)',
    summary: 'Seyhan ve Ceyhan nehirlerinin alüvyonlarıyla oluşturduğu Türkiye’nin en büyük kıyı delta ovası.',
    examTip: 'Verimli alüvyal toprak ve Akdeniz iklimi sayesinde yılda birden fazla tarım ürünü (turunçgil, soya, yer fıstığı, mısır) alınır.',
  },
  {
    id: 'tr_divrigi',
    name: 'Sivas Divriği Demir Havzası',
    layer: 'RESOURCE',
    x: 382,
    y: 112,
    region: 'Yukarı Kızılırmak',
    summary: 'Malatya Hekimhan–Hasan Çelebi ile birlikte Türkiye’nin en yüksek tenörlü demir cevheri çıkarım merkezidir.',
    examTip: 'Çıkarılan demir demir yoluyla Karabük, Ereğli ve İskenderun demir-çelik tesislerine taşınır.',
  },
  {
    id: 'tr_erzurum_kars',
    name: 'Erzurum–Kars Lav Platosu',
    layer: 'LANDFORM',
    x: 498,
    y: 94,
    region: 'Doğu Anadolu',
    summary: 'Volkanik tüf ve lav örtüsü üzerinde sert karasal iklimin yaz yağışlarıyla çayır ve verimli Çernezyom toprağı gelişmiştir.',
    examTip: 'Yaz yağışları otlakları yeşerttiği için mera büyükbaş hayvancılığı Türkiye’de burada en gelişmiştir.',
  },
  {
    id: 'tr_gap_urfa',
    name: 'GAP & Şanlıurfa (Atatürk Barajı)',
    layer: 'RESOURCE',
    x: 410,
    y: 202,
    region: 'Güneydoğu Anadolu',
    summary: 'Fırat–Dicle üzerindeki 14 HES ve geniş sulama projeleriyle Şanlıurfa Türkiye pamuk üretiminin lideri olmuştur.',
    examTip: 'GAP tarım, enerji, sanayi ve istihdamı kapsayan en bütüncül bölgesel kalkınma projesidir.',
  },
  {
    id: 'tr_batman_van',
    name: 'Batman Petrol & Van Gölü Havzası',
    layer: 'RESOURCE',
    x: 492,
    y: 172,
    region: 'Güneydoğu – Doğu',
    summary: 'Batman–Raman Türkiye’nin ana yerli petrol çıkarım merkezi; doğusunda tektonik + volkanik set (karma) oluşumlu Van Gölü bulunur.',
    examTip: 'Batman petrol rafinerisi ham maddeye yakınlık faktörüyle kurulmuş tek rafinerimizdir.',
  },
];

export interface LocalTimeResult {
  meridianDiff: number;
  totalMinutesDiff: number;
  hoursDiff: number;
  minutesRemainder: number;
  directionLabel: 'Doğuda (+İleri)' | 'Batıda (-Geri)' | 'Aynı Meridyen';
  targetTimeFormatted: string;
  dayShiftNote: string;
}

export function calculateLocalTimeDifference(
  lon1Deg: number,
  lon1Hemisphere: 'E' | 'W',
  hour1: number,
  minute1: number,
  lon2Deg: number,
  lon2Hemisphere: 'E' | 'W',
): LocalTimeResult {
  const signed1 = lon1Hemisphere === 'E' ? lon1Deg : -lon1Deg;
  const signed2 = lon2Hemisphere === 'E' ? lon2Deg : -lon2Deg;
  const signedDiff = signed2 - signed1;
  const meridianDiff = Math.abs(signedDiff);
  const totalMinutesDiff = meridianDiff * 4;
  const hoursDiff = Math.floor(totalMinutesDiff / 60);
  const minutesRemainder = totalMinutesDiff % 60;

  const baseMinutes = hour1 * 60 + minute1;
  const rawTargetMinutes = baseMinutes + signedDiff * 4;

  let dayShiftNote = 'Aynı Gün';
  if (rawTargetMinutes >= 1440) {
    dayShiftNote = 'Ertesi Gün (+1 Gün)';
  } else if (rawTargetMinutes < 0) {
    dayShiftNote = 'Önceki Gün (-1 Gün)';
  }

  const wrappedMinutes = ((rawTargetMinutes % 1440) + 1440) % 1440;
  const targetH = Math.floor(wrappedMinutes / 60);
  const targetM = wrappedMinutes % 60;
  const targetTimeFormatted = `${String(targetH).padStart(2, '0')}:${String(targetM).padStart(2, '0')}`;

  const directionLabel: LocalTimeResult['directionLabel'] =
    signedDiff > 0 ? 'Doğuda (+İleri)' : signedDiff < 0 ? 'Batıda (-Geri)' : 'Aynı Meridyen';

  return {
    meridianDiff,
    totalMinutesDiff,
    hoursDiff,
    minutesRemainder,
    directionLabel,
    targetTimeFormatted,
    dayShiftNote,
  };
}

export interface ScaleAndSlopeResult {
  realDistanceKm: number;
  scaleClass: 'Büyük Ölçekli (Plan / Topoğrafya)' | 'Orta Ölçekli' | 'Küçük Ölçekli (Atlas / Duvar)';
  slopePercent: number;
  slopePermille: number;
}

export function calculateScaleAndSlope(
  scaleDenominator: number,
  mapLengthCm: number,
  elevationDiffM: number,
  horizontalDistKm: number,
): ScaleAndSlopeResult {
  const safeDenom = Math.max(1000, scaleDenominator);
  const safeMapCm = Math.max(0.5, mapLengthCm);
  const safeElev = Math.max(0, elevationDiffM);
  const safeHorizKm = Math.max(0.1, horizontalDistKm);

  const realDistanceKm = Number(((safeMapCm * safeDenom) / 100_000).toFixed(2));

  let scaleClass: ScaleAndSlopeResult['scaleClass'];
  if (safeDenom <= 200_000) {
    scaleClass = 'Büyük Ölçekli (Plan / Topoğrafya)';
  } else if (safeDenom <= 500_000) {
    scaleClass = 'Orta Ölçekli';
  } else {
    scaleClass = 'Küçük Ölçekli (Atlas / Duvar)';
  }

  const horizMeters = safeHorizKm * 1000;
  const slopePercent = Number(((safeElev / horizMeters) * 100).toFixed(2));
  const slopePermille = Number(((safeElev / horizMeters) * 1000).toFixed(1));

  return {
    realDistanceKm,
    scaleClass,
    slopePercent,
    slopePermille,
  };
}
