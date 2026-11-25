import {AlertTriangle, Play} from 'lucide-react';
import type {FC} from 'react';
import {HISTORY_CATEGORY_LABELS} from '../../data/history';
import type {ExamFilter, QuizSource} from '../../types/chemistry';
import type {
  HistoryQuestionMode,
  HistoryQuizConfig,
  HistoryTopicFilter,
} from '../../types/history';

interface HistTestSetupViewProps {
  config: HistoryQuizConfig;
  favoriteCount: number;
  mistakeCount: number;
  poolCount: number;
  onChangeConfig: (next: HistoryQuizConfig) => void;
  onStartTest: () => void;
}

const TOPIC_OPTIONS: {id: HistoryTopicFilter; label: string}[] = [
  {id: 'ALL', label: 'Tümü'},
  {id: 'ILK_ORTA_TURK', label: HISTORY_CATEGORY_LABELS.ILK_ORTA_TURK},
  {id: 'TURK_ISLAM_SELCUKLU', label: HISTORY_CATEGORY_LABELS.TURK_ISLAM_SELCUKLU},
  {id: 'OSMANLI_KLASIK', label: HISTORY_CATEGORY_LABELS.OSMANLI_KLASIK},
  {id: 'OSMANLI_DEGISIM_SON', label: HISTORY_CATEGORY_LABELS.OSMANLI_DEGISIM_SON},
  {id: 'INKILAP_CAGDAS', label: HISTORY_CATEGORY_LABELS.INKILAP_CAGDAS},
];

export const HistTestSetupView: FC<HistTestSetupViewProps> = ({
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
    {id: 'TYT', label: 'TYT Tarih'},
    {id: 'AYT', label: 'AYT Tarih'},
  ];

  const modeOptions: {id: HistoryQuestionMode; label: string}[] = [
    {id: 'MIXED', label: 'Karma'},
    {id: 'EXAM_STYLE', label: 'YKS Tarzı'},
    {id: 'TERM_TO_DESC', label: 'Kavram → Özellik'},
    {id: 'DESC_TO_TERM', label: 'Özellik → Kavram'},
  ];

  const countOptions: (10 | 15 | 20 | 30)[] = [10, 15, 20, 30];

  const segBtnBase =
    'min-h-[44px] px-1.5 sm:px-3 rounded-lg text-[11px] sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center text-center';
  const segBtnInactive =
    'bg-[#281208]/85 border border-orange-400/20 text-orange-100/80 hover:border-orange-400/45 hover:text-white';

  return (
    <section aria-label="Tarih Test Kurulumu" className="w-full space-y-4 sm:space-y-5">
      <div className="hist-panel rounded-2xl p-3.5 sm:p-6 space-y-4">
        {/* 1. KAYNAK */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-orange-100/80 font-medium">
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
                  config.source === opt.id ? 'hist-active-orange font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SINAV KAPSAMI */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-orange-100/80 font-medium">
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
                  config.examFilter === opt.id ? 'hist-active-orange font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. SORU TİPİ */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-orange-100/80 font-medium">
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
                    ? 'hist-active-orange font-semibold'
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
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-orange-100/80 font-medium">
            SORU SAYISI
          </span>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full">
            {countOptions.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChangeConfig({...config, questionCount: count})}
                aria-pressed={config.questionCount === count}
                className={`${segBtnBase} tabular-nums ${
                  config.questionCount === count
                    ? 'hist-active-orange font-semibold'
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
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-orange-100/80 font-medium">
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
                  config.topic === topic.id ? 'hist-active-orange font-semibold' : segBtnInactive
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
              ? 'Tarih favori listen şu an boş. Test başlatmak için Sözlük sekmesinden yıldız simgesine dokunarak kavram ekle.'
              : config.source === 'MISTAKES'
                ? 'Henüz yanlış yanıtladığın bir Tarih kavramı yok. Test çözdükçe yanlışların burada otomatik toplanır.'
                : 'Seçili kaynak, sınav kapsamı ve konu filtresine uyan Tarih kavramı bulunamadı. Lütfen filtreleri genişlet.'}
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={poolCount === 0}
        onClick={onStartTest}
        className={`w-full min-h-[52px] rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all ${
          poolCount === 0
            ? 'bg-[#210f06] border border-orange-400/15 text-orange-100/35 cursor-not-allowed'
            : 'hist-cta-orange cursor-pointer active:scale-[0.99]'
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Tarih Testini Başlat</span>
      </button>
    </section>
  );
};
