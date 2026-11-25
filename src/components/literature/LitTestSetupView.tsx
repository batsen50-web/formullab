import {AlertTriangle, Play} from 'lucide-react';
import type {FC} from 'react';
import {LITERATURE_CATEGORY_LABELS} from '../../data/literature';
import type {ExamFilter, QuizSource} from '../../types/chemistry';
import type {
  LiteratureQuestionMode,
  LiteratureQuizConfig,
  LiteratureTopicFilter,
} from '../../types/literature';

interface LitTestSetupViewProps {
  config: LiteratureQuizConfig;
  favoriteCount: number;
  mistakeCount: number;
  poolCount: number;
  onChangeConfig: (next: LiteratureQuizConfig) => void;
  onStartTest: () => void;
}

const TOPIC_OPTIONS: {id: LiteratureTopicFilter; label: string}[] = [
  {id: 'ALL', label: 'Tümü'},
  {id: 'DIL_YAZIM_ANLAM', label: LITERATURE_CATEGORY_LABELS.DIL_YAZIM_ANLAM},
  {id: 'SOZCUK_CUMLE_DILBILGISI', label: LITERATURE_CATEGORY_LABELS.SOZCUK_CUMLE_DILBILGISI},
  {id: 'SIIR_SANAT_DONEMLER', label: LITERATURE_CATEGORY_LABELS.SIIR_SANAT_DONEMLER},
  {id: 'TANZIMAT_CUMHURIYET_SIIR', label: LITERATURE_CATEGORY_LABELS.TANZIMAT_CUMHURIYET_SIIR},
  {id: 'NESIR_ROMAN_TIYATRO_AKIM', label: LITERATURE_CATEGORY_LABELS.NESIR_ROMAN_TIYATRO_AKIM},
];

export const LitTestSetupView: FC<LitTestSetupViewProps> = ({
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
    {id: 'TYT', label: 'TYT Türkçe'},
    {id: 'AYT', label: 'AYT Edebiyat'},
  ];

  const modeOptions: {id: LiteratureQuestionMode; label: string}[] = [
    {id: 'MIXED', label: 'Karma'},
    {id: 'EXAM_STYLE', label: 'YKS Tarzı'},
    {id: 'TERM_TO_DESC', label: 'Kavram → Özellik'},
    {id: 'DESC_TO_TERM', label: 'Özellik → Kavram'},
  ];

  const countOptions: (10 | 15 | 20 | 30)[] = [10, 15, 20, 30];

  const segBtnBase =
    'min-h-[44px] px-1.5 sm:px-3 rounded-lg text-[11px] sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center text-center';
  const segBtnInactive =
    'bg-[#260c17]/85 border border-rose-400/20 text-rose-100/80 hover:border-rose-400/45 hover:text-white';

  return (
    <section aria-label="Türkçe ve Edebiyat Test Kurulumu" className="w-full space-y-4 sm:space-y-5">
      <div className="lit-panel rounded-2xl p-3.5 sm:p-6 space-y-4">
        {/* 1. KAYNAK */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-rose-100/80 font-medium">
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
                  config.source === opt.id ? 'lit-active-rose font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SINAV KAPSAMI */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-rose-100/80 font-medium">
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
                  config.examFilter === opt.id ? 'lit-active-rose font-semibold' : segBtnInactive
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. SORU TİPİ */}
        <div className="grid grid-cols-1 sm:grid-cols-[138px_1fr] items-start sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-rose-100/80 font-medium">
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
                    ? 'lit-active-rose font-semibold'
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
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-rose-100/80 font-medium">
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
                    ? 'lit-active-rose font-semibold'
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
          <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-rose-100/80 font-medium">
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
                  config.topic === topic.id ? 'lit-active-rose font-semibold' : segBtnInactive
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
              ? 'Türkçe & Edebiyat favori listen şu an boş. Test başlatmak için Sözlük sekmesinden yıldız simgesine dokunarak kavram ekle.'
              : config.source === 'MISTAKES'
                ? 'Henüz yanlış yanıtladığın bir Türkçe veya Edebiyat kavramı yok. Test çözdükçe yanlışların burada otomatik toplanır.'
                : 'Seçili kaynak, sınav kapsamı ve konu filtresine uyan kavram bulunamadı. Lütfen filtreleri genişlet (ör. TYT konuları ile AYT kapsamı kesişmez).'}
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={poolCount === 0}
        onClick={onStartTest}
        className={`w-full min-h-[52px] rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all ${
          poolCount === 0
            ? 'bg-[#220a14] border border-rose-400/15 text-rose-100/35 cursor-not-allowed'
            : 'lit-cta-rose cursor-pointer active:scale-[0.99]'
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Türkçe &amp; Edebiyat Testini Başlat</span>
      </button>
    </section>
  );
};
