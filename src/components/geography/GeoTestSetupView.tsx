import {AlertTriangle, Play} from 'lucide-react';
import type {FC} from 'react';
import {GEOGRAPHY_CATEGORY_LABELS} from '../../data/geography';
import type {ExamFilter, QuizSource} from '../../types/chemistry';
import type {
  GeographyQuestionMode,
  GeographyQuizConfig,
  GeographyTopicFilter,
} from '../../types/geography';

interface GeoTestSetupViewProps {
  config: GeographyQuizConfig;
  favoriteCount: number;
  mistakeCount: number;
  poolCount: number;
  onChangeConfig: (next: GeographyQuizConfig) => void;
  onStartTest: () => void;
}

const TOPIC_OPTIONS: {id: GeographyTopicFilter; label: string}[] = [
  {id: 'ALL', label: 'Tümü'},
  {id: 'HARITA_KONUM', label: GEOGRAPHY_CATEGORY_LABELS.HARITA_KONUM},
  {id: 'IKLIM_BIYOM', label: GEOGRAPHY_CATEGORY_LABELS.IKLIM_BIYOM},
  {id: 'YERYUZU_SU', label: GEOGRAPHY_CATEGORY_LABELS.YERYUZU_SU},
  {id: 'NUFUS_EKONOMI', label: GEOGRAPHY_CATEGORY_LABELS.NUFUS_EKONOMI},
  {id: 'ULUSLARARASI_AFET', label: GEOGRAPHY_CATEGORY_LABELS.ULUSLARARASI_AFET},
];

export const GeoTestSetupView: FC<GeoTestSetupViewProps> = ({
  config,
  favoriteCount,
  mistakeCount,
  poolCount,
  onChangeConfig,
  onStartTest,
}) => {
  const sourceOptions: {id: QuizSource; label: string}[] = [
    {id: 'ALL', label: 'Tüm Havuz'},
    {id: 'FAVORITES', label: `Favori (${favoriteCount})`},
    {id: 'MISTAKES', label: `Yanlışlarım (${mistakeCount})`},
    {id: 'HIGH_YIELD', label: 'Kritik'},
  ];

  const examOptions: {id: ExamFilter; label: string}[] = [
    {id: 'ALL', label: 'Tümü'},
    {id: 'TYT', label: 'TYT'},
    {id: 'AYT', label: 'AYT'},
  ];

  const modeOptions: {id: GeographyQuestionMode; label: string}[] = [
    {id: 'MIXED', label: 'Karma'},
    {id: 'EXAM_STYLE', label: 'YKS Tarzı'},
    {id: 'TERM_TO_DESC', label: 'Terim → Özellik'},
    {id: 'DESC_TO_TERM', label: 'Özellik → Terim'},
  ];

  const countOptions: (10 | 15 | 20)[] = [10, 15, 20];

  const segBtnBase =
    'min-h-[44px] px-1.5 sm:px-3 rounded-lg text-[11px] sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center text-center';
  const segBtnInactive =
    'bg-[#211408]/85 border border-amber-400/20 text-amber-100/75 hover:border-amber-400/45 hover:text-white';

  return (
    <section aria-label="Coğrafya Test Kurulumu" className="w-full space-y-4 sm:space-y-5">
      <div className="geo-panel rounded-2xl p-3.5 sm:p-6 space-y-4">
        {/* 1. KAYNAK */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-amber-100/80 font-medium">
            KAYNAK
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full">
            {sourceOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeConfig({...config, source: opt.id})}
                aria-pressed={config.source === opt.id}
                className={`${segBtnBase} ${
                  config.source === opt.id ? 'geo-active-amber font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SINAV KAPSAMI */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-amber-100/80 font-medium">
            SINAV KAPSAMI
          </span>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full">
            {examOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeConfig({...config, examFilter: opt.id})}
                aria-pressed={config.examFilter === opt.id}
                className={`${segBtnBase} ${
                  config.examFilter === opt.id ? 'geo-active-amber font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. SORU TİPİ */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-amber-100/80 font-medium">
            SORU TİPİ
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full">
            {modeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeConfig({...config, questionMode: opt.id})}
                aria-pressed={config.questionMode === opt.id}
                className={`${segBtnBase} ${
                  config.questionMode === opt.id
                    ? 'geo-active-amber font-semibold'
                    : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. SORU SAYISI */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-amber-100/80 font-medium">
            SORU SAYISI
          </span>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full">
            {countOptions.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChangeConfig({...config, questionCount: count})}
                aria-pressed={config.questionCount === count}
                className={`${segBtnBase} tabular-nums ${
                  config.questionCount === count
                    ? 'geo-active-amber font-semibold'
                    : segBtnInactive
                }`}
              >
                {count} Soru
              </button>
            ))}
          </div>
        </div>

        {/* 5. KONU */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4 pt-0.5">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-amber-100/80 font-medium">
            KONU
          </span>
          <div className="flex flex-wrap gap-2">
            {TOPIC_OPTIONS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => onChangeConfig({...config, topic: topic.id})}
                aria-pressed={config.topic === topic.id}
                className={`min-h-[42px] px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center ${
                  config.topic === topic.id ? 'geo-active-amber font-semibold' : segBtnInactive
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {poolCount === 0 && (
        <div
          role="alert"
          className="rounded-xl border border-[#e3b341]/60 bg-[#322408]/65 px-4 py-3.5 flex items-start gap-3 text-sm text-[#f7dca1]"
        >
          <AlertTriangle className="w-5 h-5 text-[#f2c45a] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {config.source === 'FAVORITES'
              ? 'Coğrafya favori listen şu an boş. Test başlatmak için Sözlük sekmesinden yıldız simgesine dokunarak kavram ekle.'
              : config.source === 'MISTAKES'
                ? 'Henüz yanlış yanıtladığın bir coğrafya kavramı yok. Test çözdükçe yanlışların burada otomatik toplanır.'
                : 'Seçili kaynak, sınav kapsamı ve konu filtresine uyan kavram bulunamadı. Lütfen filtreleri genişlet.'}
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={poolCount === 0}
        onClick={onStartTest}
        className={`w-full min-h-[52px] rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all ${
          poolCount === 0
            ? 'bg-[#1c1207] border border-amber-400/15 text-amber-100/35 cursor-not-allowed'
            : 'geo-cta-amber cursor-pointer active:scale-[0.99]'
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Coğrafya Testini Başlat</span>
      </button>
    </section>
  );
};
