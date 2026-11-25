import {AlertTriangle, Play} from 'lucide-react';
import type {FC} from 'react';
import {PHYSICS_CATEGORY_LABELS} from '../../data/physics';
import type {ExamFilter, QuizSource} from '../../types/chemistry';
import type {
  PhysicsQuestionMode,
  PhysicsQuizConfig,
  PhysicsTopicFilter,
} from '../../types/physics';

interface PhysicsTestSetupViewProps {
  config: PhysicsQuizConfig;
  favoriteCount: number;
  mistakeCount: number;
  poolCount: number;
  onChangeConfig: (next: PhysicsQuizConfig) => void;
  onStartTest: () => void;
}

const TOPIC_OPTIONS: {id: PhysicsTopicFilter; label: string}[] = [
  {id: 'ALL', label: 'Tümü'},
  {id: 'MADDE_HAREKET', label: PHYSICS_CATEGORY_LABELS.MADDE_HAREKET},
  {id: 'ISI_BASINC', label: PHYSICS_CATEGORY_LABELS.ISI_BASINC},
  {id: 'ELEKTRIK_MANYETIZMA', label: PHYSICS_CATEGORY_LABELS.ELEKTRIK_MANYETIZMA},
  {id: 'DALGA_OPTIK', label: PHYSICS_CATEGORY_LABELS.DALGA_OPTIK},
  {id: 'CEMBER_MODERN', label: PHYSICS_CATEGORY_LABELS.CEMBER_MODERN},
];

export const PhysicsTestSetupView: FC<PhysicsTestSetupViewProps> = ({
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

  const modeOptions: {id: PhysicsQuestionMode; label: string}[] = [
    {id: 'MIXED', label: 'Karma'},
    {id: 'EXAM_STYLE', label: 'YKS Tarzı'},
    {id: 'TERM_TO_DESC', label: 'Formül → İlke'},
    {id: 'DESC_TO_TERM', label: 'İlke → Formül'},
  ];

  const countOptions: (10 | 15 | 20)[] = [10, 15, 20];

  const segBtnBase =
    'min-h-[44px] px-1.5 sm:px-3 rounded-lg text-[11px] sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center text-center';
  const segBtnInactive =
    'bg-[#130c29]/85 border border-violet-400/20 text-violet-100/75 hover:border-violet-400/45 hover:text-white';

  return (
    <section aria-label="Fizik Test Kurulumu" className="w-full space-y-4 sm:space-y-5">
      <div className="phys-panel rounded-2xl p-3.5 sm:p-6 space-y-4">
        {/* 1. KAYNAK */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-violet-100/80 font-medium">
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
                  config.source === opt.id ? 'phys-active-violet font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SINAV KAPSAMI */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-violet-100/80 font-medium">
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
                  config.examFilter === opt.id ? 'phys-active-violet font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. SORU TİPİ */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-violet-100/80 font-medium">
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
                    ? 'phys-active-violet font-semibold'
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
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-violet-100/80 font-medium">
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
                    ? 'phys-active-violet font-semibold'
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
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-violet-100/80 font-medium">
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
                  config.topic === topic.id ? 'phys-active-violet font-semibold' : segBtnInactive
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
              ? 'Fizik favori listen şu an boş. Test başlatmak için Sözlük sekmesinden yıldız simgesine dokunarak formül ekle.'
              : config.source === 'MISTAKES'
                ? 'Henüz yanlış yanıtladığın bir fizik kavramı yok. Test çözdükçe yanlışların burada otomatik toplanır.'
                : 'Seçili kaynak, sınav kapsamı ve konu filtresine uyan fizik kavramı bulunamadı. Lütfen filtreleri genişlet.'}
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={poolCount === 0}
        onClick={onStartTest}
        className={`w-full min-h-[52px] rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all ${
          poolCount === 0
            ? 'bg-[#110b22] border border-violet-400/15 text-violet-100/35 cursor-not-allowed'
            : 'phys-cta-violet cursor-pointer active:scale-[0.99]'
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Fizik Testini Başlat</span>
      </button>
    </section>
  );
};
