import {shuffleArray} from './chemistryLogic';

export type DnaBase = 'A' | 'T' | 'G' | 'C';
export type RnaBase = 'A' | 'U' | 'G' | 'C';

export interface CodonAnalysis {
  dnaTemplate: [DnaBase, DnaBase, DnaBase];
  dnaCoding: [DnaBase, DnaBase, DnaBase];
  mrnaCodon: string;
  trnaAnticodon: string | null;
  aminoAcid: string;
  aminoAcidCode: string;
  isStart: boolean;
  isStop: boolean;
  dnaHydrogenBonds: number;
  purineCountInDnaTemplate: number;
  pyrimidineCountInDnaTemplate: number;
  note: string;
}

const DNA_COMPLEMENT: Record<DnaBase, DnaBase> = {
  A: 'T',
  T: 'A',
  G: 'C',
  C: 'G',
};

const DNA_TO_MRNA: Record<DnaBase, RnaBase> = {
  A: 'U',
  T: 'A',
  G: 'C',
  C: 'G',
};

const MRNA_TO_TRNA: Record<RnaBase, RnaBase> = {
  A: 'U',
  U: 'A',
  G: 'C',
  C: 'G',
};

const CODON_TABLE: Record<string, {name: string; code: string; isStart?: boolean; isStop?: boolean}> = {
  UUU: {name: 'Fenilalanin', code: 'Phe'},
  UUC: {name: 'Fenilalanin', code: 'Phe'},
  UUA: {name: 'Lösin', code: 'Leu'},
  UUG: {name: 'Lösin', code: 'Leu'},
  CUU: {name: 'Lösin', code: 'Leu'},
  CUC: {name: 'Lösin', code: 'Leu'},
  CUA: {name: 'Lösin', code: 'Leu'},
  CUG: {name: 'Lösin', code: 'Leu'},
  AUU: {name: 'İzolösin', code: 'Ile'},
  AUC: {name: 'İzolösin', code: 'Ile'},
  AUA: {name: 'İzolösin', code: 'Ile'},
  AUG: {name: 'Metiyonin (Başlangıç)', code: 'Met', isStart: true},
  GUU: {name: 'Valin', code: 'Val'},
  GUC: {name: 'Valin', code: 'Val'},
  GUA: {name: 'Valin', code: 'Val'},
  GUG: {name: 'Valin', code: 'Val'},
  UCU: {name: 'Serin', code: 'Ser'},
  UCC: {name: 'Serin', code: 'Ser'},
  UCA: {name: 'Serin', code: 'Ser'},
  UCG: {name: 'Serin', code: 'Ser'},
  AGU: {name: 'Serin', code: 'Ser'},
  AGC: {name: 'Serin', code: 'Ser'},
  CCU: {name: 'Prolin', code: 'Pro'},
  CCC: {name: 'Prolin', code: 'Pro'},
  CCA: {name: 'Prolin', code: 'Pro'},
  CCG: {name: 'Prolin', code: 'Pro'},
  ACU: {name: 'Treonin', code: 'Thr'},
  ACC: {name: 'Treonin', code: 'Thr'},
  ACA: {name: 'Treonin', code: 'Thr'},
  ACG: {name: 'Treonin', code: 'Thr'},
  GCU: {name: 'Alanin', code: 'Ala'},
  GCC: {name: 'Alanin', code: 'Ala'},
  GCA: {name: 'Alanin', code: 'Ala'},
  GCG: {name: 'Alanin', code: 'Ala'},
  UAU: {name: 'Tirozin', code: 'Tyr'},
  UAC: {name: 'Tirozin', code: 'Tyr'},
  UAA: {name: 'Durdurma (Stop)', code: 'STOP', isStop: true},
  UAG: {name: 'Durdurma (Stop)', code: 'STOP', isStop: true},
  UGA: {name: 'Durdurma (Stop)', code: 'STOP', isStop: true},
  CAU: {name: 'Histidin', code: 'His'},
  CAC: {name: 'Histidin', code: 'His'},
  CAA: {name: 'Glutamin', code: 'Gln'},
  CAG: {name: 'Glutamin', code: 'Gln'},
  AAU: {name: 'Asparajin', code: 'Asn'},
  AAC: {name: 'Asparajin', code: 'Asn'},
  AAA: {name: 'Lizin', code: 'Lys'},
  AAG: {name: 'Lizin', code: 'Lys'},
  GAU: {name: 'Aspartik Asit', code: 'Asp'},
  GAC: {name: 'Aspartik Asit', code: 'Asp'},
  GAA: {name: 'Glutamik Asit', code: 'Glu'},
  GAG: {name: 'Glutamik Asit', code: 'Glu'},
  UGU: {name: 'Sistein', code: 'Cys'},
  UGC: {name: 'Sistein', code: 'Cys'},
  UGG: {name: 'Triptofan', code: 'Trp'},
  CGU: {name: 'Arjinin', code: 'Arg'},
  CGC: {name: 'Arjinin', code: 'Arg'},
  CGA: {name: 'Arjinin', code: 'Arg'},
  CGG: {name: 'Arjinin', code: 'Arg'},
  AGA: {name: 'Arjinin', code: 'Arg'},
  AGG: {name: 'Arjinin', code: 'Arg'},
  GGU: {name: 'Glisin', code: 'Gly'},
  GGC: {name: 'Glisin', code: 'Gly'},
  GGA: {name: 'Glisin', code: 'Gly'},
  GGG: {name: 'Glisin', code: 'Gly'},
};

export function analyzeDnaTriplet(dnaTemplate: [DnaBase, DnaBase, DnaBase]): CodonAnalysis {
  const dnaCoding: [DnaBase, DnaBase, DnaBase] = [
    DNA_COMPLEMENT[dnaTemplate[0]],
    DNA_COMPLEMENT[dnaTemplate[1]],
    DNA_COMPLEMENT[dnaTemplate[2]],
  ];

  const mrnaBases: [RnaBase, RnaBase, RnaBase] = [
    DNA_TO_MRNA[dnaTemplate[0]],
    DNA_TO_MRNA[dnaTemplate[1]],
    DNA_TO_MRNA[dnaTemplate[2]],
  ];
  const mrnaCodon = mrnaBases.join('');
  const entry = CODON_TABLE[mrnaCodon] ?? {name: 'Bilinmeyen', code: '---'};
  const isStop = Boolean(entry.isStop);
  const isStart = Boolean(entry.isStart);

  const trnaAnticodon = isStop
    ? null
    : mrnaBases.map((b) => MRNA_TO_TRNA[b]).join('');

  const dnaHydrogenBonds = dnaTemplate.reduce(
    (sum, base) => sum + (base === 'G' || base === 'C' ? 3 : 2),
    0,
  );

  const purineCountInDnaTemplate = dnaTemplate.filter((b) => b === 'A' || b === 'G').length;
  const pyrimidineCountInDnaTemplate = 3 - purineCountInDnaTemplate;

  let note = 'mRNA kodonu ribozomda tRNA antikodonu ile geçici H-bağı kurarak amino asit getirir.';
  if (isStart) {
    note = 'AUG başlangıç kodonudur; tüm polipeptit sentezleri metiyonin ile başlar (DNA kalıbı TAC).';
  } else if (isStop) {
    note = `${mrnaCodon} durdurma kodonudur; karşılık gelen tRNA yoktur, sonlandırıcı protein sentezi bitirir.`;
  } else if (mrnaCodon === 'GUG') {
    note = 'Orak hücre anemisinde GAG (Glutamik asit) → GUG (Valin) nokta mutasyonu hemoglobin yapısını bozar.';
  }

  return {
    dnaTemplate,
    dnaCoding,
    mrnaCodon,
    trnaAnticodon,
    aminoAcid: entry.name,
    aminoAcidCode: entry.code,
    isStart,
    isStop,
    dnaHydrogenBonds,
    purineCountInDnaTemplate,
    pyrimidineCountInDnaTemplate,
    note,
  };
}

export type EnzymePresetId = 'pepsin' | 'amylase' | 'trypsin';

export interface EnzymePreset {
  id: EnzymePresetId;
  name: string;
  optimumPh: number;
  phSpread: number;
  optimumTemp: number;
  location: string;
}

export const ENZYME_PRESETS: Record<EnzymePresetId, EnzymePreset> = {
  pepsin: {
    id: 'pepsin',
    name: 'Pepsin (Mide)',
    optimumPh: 2.0,
    phSpread: 1.6,
    optimumTemp: 37,
    location: 'Mide (Asidik Ortam · Protein Sindirimi)',
  },
  amylase: {
    id: 'amylase',
    name: 'Amilaz (Tükürük)',
    optimumPh: 7.0,
    phSpread: 1.7,
    optimumTemp: 37,
    location: 'Ağız & Onikiparmak Bağırsağı (Nötr Ortam)',
  },
  trypsin: {
    id: 'trypsin',
    name: 'Tripsin (İnce Bağırsak)',
    optimumPh: 8.5,
    phSpread: 1.6,
    optimumTemp: 37,
    location: 'İnce Bağırsak (Bazik Ortam · Polipeptit)',
  },
};

export interface EnzymeRateEvaluation {
  ratePercent: number;
  tempFactor: number;
  phFactor: number;
  substrateFactor: number;
  status: 'OPTIMAL' | 'SLOW' | 'DENATURED';
  statusLabel: string;
  explanation: string;
}

export function evaluateEnzymeRate(
  presetId: EnzymePresetId,
  tempC: number,
  ph: number,
  substratePercent: number,
): EnzymeRateEvaluation {
  const preset = ENZYME_PRESETS[presetId];

  let tempFactor = 0;
  if (tempC >= 55) {
    tempFactor = 0;
  } else if (tempC <= preset.optimumTemp) {
    tempFactor = Math.max(0, Math.exp(-Math.pow((tempC - preset.optimumTemp) / 17, 2)));
  } else {
    tempFactor = Math.max(0, 1 - Math.pow((tempC - preset.optimumTemp) / 18, 1.8));
  }

  const phDistance = Math.abs(ph - preset.optimumPh);
  const phFactor = phDistance > 3.6 ? 0 : Math.exp(-Math.pow(phDistance / preset.phSpread, 2));

  const clampedSubstrate = Math.max(0, Math.min(100, substratePercent));
  const substrateFactor = clampedSubstrate / (clampedSubstrate + 22);
  const normalizedSubstrateFactor = clampedSubstrate === 0 ? 0 : substrateFactor / (100 / 122);

  const rawRate = tempFactor * phFactor * normalizedSubstrateFactor * 100;
  const ratePercent = Math.round(Math.max(0, Math.min(100, rawRate)));

  if (tempC >= 55) {
    return {
      ratePercent: 0,
      tempFactor,
      phFactor,
      substrateFactor: normalizedSubstrateFactor,
      status: 'DENATURED',
      statusLabel: 'DENATÜRE (GERİ DÖNÜŞÜMSÜZ)',
      explanation: `${tempC} °C’de enzimin 3 boyutlu protein yapısı bozulur (denatürasyon). Sıcaklık düşürülse bile tepkime yeniden başlamaz.`,
    };
  }

  if (phFactor < 0.08) {
    return {
      ratePercent,
      tempFactor,
      phFactor,
      substrateFactor: normalizedSubstrateFactor,
      status: 'DENATURED',
      statusLabel: 'pH UYUMSUZ (İNERT)',
      explanation: `${preset.name} optimum pH ${preset.optimumPh.toFixed(1)} değerinde çalışır; pH ${ph.toFixed(1)} düzeyinde aktif bölge iyonlaşması bozulur.`,
    };
  }

  if (tempC <= 10) {
    return {
      ratePercent,
      tempFactor,
      phFactor,
      substrateFactor: normalizedSubstrateFactor,
      status: 'SLOW',
      statusLabel: 'SOĞUKTA İNAKTİF (YAVAŞ)',
      explanation: `0–10 °C aralığında moleküllerin kinetik enerjisi düşüktür; enzim yapısı bozulmaz, ısıtıldığında tekrar hızlanır.`,
    };
  }

  if (ratePercent >= 65) {
    return {
      ratePercent,
      tempFactor,
      phFactor,
      substrateFactor: normalizedSubstrateFactor,
      status: 'OPTIMAL',
      statusLabel: 'OPTİMAL AKTİVİTE',
      explanation: `${preset.name} için sıcaklık (${tempC} °C) ve pH (${ph.toFixed(1)}) uyumlu; enzim-substrat kompleksi hızla oluşuyor.`,
    };
  }

  return {
    ratePercent,
    tempFactor,
    phFactor,
    substrateFactor: normalizedSubstrateFactor,
    status: 'SLOW',
    statusLabel: 'SINIRLI HIZ',
    explanation: `Substrat (%${clampedSubstrate}), sıcaklık (${tempC} °C) veya pH (${ph.toFixed(1)}) optimumdan uzak olduğu için hız kısıtlı.`,
  };
}

export type CellWallType = 'plant' | 'animal';
export type TonicityType = 'hypotonic' | 'isotonic' | 'hypertonic';

export interface OsmosisOutcome {
  title: string;
  waterDirection: string;
  turgorLevel: string;
  osmoticPressure: string;
  summary: string;
}

export function evaluateOsmosis(cellType: CellWallType, tonicity: TonicityType): OsmosisOutcome {
  if (tonicity === 'isotonic') {
    return {
      title: 'İzotonik Denge',
      waterDirection: 'Net Su Geçişi = 0 (Çift Yönlü Eşit)',
      turgorLevel: 'Normal',
      osmoticPressure: 'Sabit',
      summary: 'Hücre içi ve dış ortam derişimi eşittir; hücre hacmi ve yoğunluğu değişmeden korunur.',
    };
  }

  if (tonicity === 'hypertonic') {
    return {
      title: 'Plazmoliz (Su Kaybı)',
      waterDirection: 'Hücre İçinden → Dış Ortama',
      turgorLevel: 'Azalır (Turgor Sıfırlanır)',
      osmoticPressure: 'Artar (Emme Kuvveti ↑)',
      summary:
        cellType === 'plant'
          ? 'Bitki hücresi su kaybeder; hücre zarı büzülerek selüloz çeperden uzaklaşır, merkezi koful küçülür.'
          : 'Hayvan hücresi su kaybederek büzüşür (krenasyon); hücre içi yoğunluk ve osmotik basınç artar.',
    };
  }

  return cellType === 'plant'
    ? {
        title: 'Turgor Durumu (Deplazmoliz)',
        waterDirection: 'Dış Ortamdan → Hücre İçine',
        turgorLevel: 'Maksimum (Çepere Basınç ↑)',
        osmoticPressure: 'Azalır (Emme Kuvveti ↓)',
        summary: 'Bitki hücresi su alarak şişer ancak selüloz çeper sayesinde patlamaz; otsu bitkilerde dikliği sağlar.',
      }
    : {
        title: 'Hemoliz Riski (Şişme ve Patlama)',
        waterDirection: 'Dış Ortamdan → Hücre İçine',
        turgorLevel: 'Zar Gerilir → Hemoliz',
        osmoticPressure: 'Azalır',
        summary: 'Hayvan hücresinde hücre çeperi olmadığı için aşırı su girişi hücre zarının patlamasına (hemoliz) yol açar.',
      };
}

export interface BioLabChallenge {
  id: string;
  prompt: string;
  hint: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const BIO_LAB_CHALLENGE_BANK: BioLabChallenge[] = [
  {
    id: 'chl-aug',
    prompt: 'DNA anlamlı (kalıp) zincirindeki TAC üçlüsü transkripsiyonla hangi mRNA başlangıç kodonuna dönüşür?',
    hint: 'RNA’da Timin yerine Urasil (U) gelir: T→A, A→U, C→G.',
    options: ['AUG', 'UAC', 'ATG', 'GUA'],
    correctAnswer: 'AUG',
    explanation: 'Kalıp DNA TAC → mRNA AUG (Başlangıç kodonu / Metiyonin). tRNA antikodonu ise UAC’tır.',
  },
  {
    id: 'chl-hbonds',
    prompt: 'DNA kalıp dizisi G-C-T olan 3 baz çiftlik segmentte toplam kaç zayıf hidrojen bağı bulunur?',
    hint: 'G≡C arasında 3, A=T arasında 2 hidrojen bağı kurulur.',
    options: ['8 hidrojen bağı', '7 hidrojen bağı', '9 hidrojen bağı', '6 hidrojen bağı'],
    correctAnswer: '8 hidrojen bağı',
    explanation: 'G≡C (3) + C≡G (3) + T=A (2) = toplam 8 zayıf hidrojen bağı vardır.',
  },
  {
    id: 'chl-stop',
    prompt: 'Aşağıdaki mRNA kodonlarından hangisine karşılık gelen bir tRNA antikodonu yoktur?',
    hint: 'Durdurma (stop) kodonları tRNA bağlamaz.',
    options: ['UAG', 'AUG', 'GGG', 'UUU'],
    correctAnswer: 'UAG',
    explanation: 'UAA, UAG ve UGA durdurma kodonlarıdır; bunlara karşılık amino asit ve tRNA bulunmaz.',
  },
  {
    id: 'chl-pepsin',
    prompt: 'Mide ortamında protein sindiren Pepsin enzimi en yüksek reaksiyon hızına hangi pH değerinde ulaşır?',
    hint: 'Mide öz suyu HCl nedeniyle kuvvetli asidiktir.',
    options: ['pH 2.0', 'pH 7.0', 'pH 8.5', 'pH 11.0'],
    correctAnswer: 'pH 2.0',
    explanation: 'Pepsin asidik mide ortamında (optimum pH ≈ 2.0) en yüksek aktiviteyi gösterir; bazik ortamda çalışamaz.',
  },
  {
    id: 'chl-denature',
    prompt: '65 °C’ye ısıtılıp ardından 37 °C’ye soğutulan bir amilaz çözeltisinde tepkime neden yeniden başlamaz?',
    hint: 'Yüksek sıcaklık üç boyutlu protein yapısını etkiler.',
    options: [
      'Enzim geri dönüşümsüz denatüre olmuştur',
      'Substratlar soğukta donmuştur',
      'Aktivasyon enerjisi sıfırlanmıştır',
      'Peptit bağları yerine ester bağları kurulmuştur',
    ],
    correctAnswer: 'Enzim geri dönüşümsüz denatüre olmuştur',
    explanation: '55–60 °C üzerindeki yüksek sıcaklık enzimin üç boyutlu yapısını ve aktif merkezini kalıcı olarak bozar.',
  },
  {
    id: 'chl-hemolysis',
    prompt: 'Saf suya (hipotonik ortama) bırakılan bir bitki hücresi ve bir alyuvar hücresi için hangisi doğrudur?',
    hint: 'Bitki hücresinde selüloz çeper vardır, alyuvarda yoktur.',
    options: [
      'Bitki hücresi turgor olur, alyuvar hemolize uğrar',
      'Her ikisi de plazmoliz olur',
      'Her ikisi de patlayarak hemoliz olur',
      'Bitki hücresi patlar, alyuvar büzüşür',
    ],
    correctAnswer: 'Bitki hücresi turgor olur, alyuvar hemolize uğrar',
    explanation: 'Hipotonik ortamda her iki hücre de su alır; çeperli bitki hücresi turgor durumuna geçerken çepersiz alyuvar patlar (hemoliz).',
  },
  {
    id: 'chl-plasmolysis',
    prompt: 'Çok tuzlu (hipertonik) bir çözeltiye konulan bitki hücresinde aşağıdaki değişimlerden hangisi gözlenir?',
    hint: 'Hücre dışarıya su verir.',
    options: [
      'Osmotik basınç artar, turgor basıncı azalır',
      'Turgor basıncı artar, osmotik basınç azalır',
      'Merkezi koful büyür ve zarı çepere iter',
      'Emme kuvveti sıfırlanır',
    ],
    correctAnswer: 'Osmotik basınç artar, turgor basıncı azalır',
    explanation: 'Plazmolize uğrayan hücre su kaybettiği için yoğunluğu ve osmotik basıncı artar, turgor basıncı ise düşer.',
  },
  {
    id: 'chl-sickle',
    prompt: 'mRNA’da GAG yerine GUG kodonu oluşmasıyla Glutamik asit yerine Valin eklenmesi ne tür bir olaydır?',
    hint: 'Tek nükleotit değişimi farklı amino asit kodlamıştır.',
    options: [
      'Nokta mutasyon (Orak hücre anemisi)',
      'Krossing over parça değişimi',
      'Normal transkripsiyon düzenlemesi',
      'Plazmoliz tepkimesi',
    ],
    correctAnswer: 'Nokta mutasyon (Orak hücre anemisi)',
    explanation: 'Tek baz değişimi (A→U) kodon anlamını değiştirerek hemoglobin beta zincirinde yapısal bozulmaya yol açar.',
  },
];

export function generateBioLabChallenge(
  excludeId?: string,
  rng: () => number = Math.random,
): BioLabChallenge {
  const pool = excludeId
    ? BIO_LAB_CHALLENGE_BANK.filter((c) => c.id !== excludeId)
    : BIO_LAB_CHALLENGE_BANK;
  const picked = shuffleArray(pool, rng)[0] ?? BIO_LAB_CHALLENGE_BANK[0];
  return {
    ...picked,
    options: shuffleArray(picked.options, rng),
  };
}
