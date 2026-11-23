import {RotateCcw, Search, Star, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {CATEGORY_LABELS, EXAM_LEVEL_LABELS} from '../data/compounds';
import type {Compound, DictionaryFilterChip, QuizSource, StatsMap} from '../types/chemistry';
import {filterDictionaryCompounds} from '../utils/chemistryLogic';
import {FormulaText} from './FormulaText';

interface DictionaryViewProps {
  compounds: readonly Compound[];
  favorites: ReadonlySet<string>;
  stats: StatsMap;
  mistakeCount: number;
  onToggleFavorite: (id: string) => void;
  onSelectCompound: (compound: Compound) => void;
  onResetStats: () => void;
}

const FILTER_CHIPS: {id: DictionaryFilterChip; label: string}[] = [
  {id: 'ALL', label: 'Tüm Konular'},
  {id: 'YAYGIN_ADLAR', label: CATEGORY_LABELS.YAYGIN_ADLAR},
  {id: 'IYONIK', label: CATEGORY_LABELS.IYONIK},
  {id: 'KOVALENT', label: CATEGORY_LABELS.KOVALENT},
  {id: 'ASIT_BAZ_TUZ', label: CATEGORY_LABELS.ASIT_BAZ_TUZ},
  {id: 'ORGANIK', label: CATEGORY_LABELS.ORGANIK},
  {id: 'TYT', label: 'TYT'},
  {id: 'AYT', label: 'AYT'},
];

export const DictionaryView: FC<DictionaryViewProps> = ({
  compounds,
  favorites,
  stats,
  mistakeCount,
  onToggleFavorite,
  onSelectCompound,
  onResetStats,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [source, setSource] = useState<QuizSource>('ALL');
  const [chip, setChip] = useState<DictionaryFilterChip>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredCompounds = useMemo(
    () =>
      filterDictionaryCompounds(compounds, {
        searchQuery,
        source,
        chip,
        favorites,
        stats,
      }),
    [compounds, searchQuery, source, chip, favorites, stats],
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSource('ALL');
    setChip('ALL');
  };

  const sourceTabs: {id: QuizSource; label: string}[] = [
    {id: 'ALL', label: 'Tümü'},
    {id: 'FAVORITES', label: `Favori (${favorites.size})`},
    {id: 'MISTAKES', label: `Yanlışlarım (${mistakeCount})`},
    {id: 'HIGH_YIELD', label: 'Kritik'},
  ];

  return (
    <section aria-label="Bileşik Sözlüğü" className="w-full space-y-3.5">
      {/* 1. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-emerald-200/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Formül veya ad ara (H2SO4, kezzap...)"
          aria-label="Formül veya bileşik adı ara"
          className="w-full min-h-[48px] pl-10 pr-11 rounded-xl bg-[#0e2920]/75 border border-emerald-400/30 text-sm sm:text-base text-white placeholder:text-emerald-100/45 focus:outline-none focus:border-emerald-300/70 shadow-[inset_0_1px_0_rgba(167,243,208,0.08)]"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Aramayı temizle"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-emerald-200/65 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Segmented Source Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#091f17]/85 border border-emerald-400/20 p-1 gap-1">
        {sourceTabs.map((tab) => {
          const active = source === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSource(tab.id)}
              aria-pressed={active}
              className={`min-h-[40px] px-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center justify-center ${
                active
                  ? 'bg-[#173e30] border border-emerald-400/35 text-white shadow-sm'
                  : 'text-emerald-100/70 hover:text-white border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Topic & Exam Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:flex-wrap">
        {FILTER_CHIPS.map((item) => {
          const active = chip === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setChip(item.id)}
              aria-pressed={active}
              className={`min-h-[42px] sm:min-h-[38px] px-3.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center justify-center ${
                active
                  ? 'lab-active-mint font-semibold'
                  : 'bg-[#0e2a20]/80 border border-emerald-400/20 text-emerald-100/75 hover:border-emerald-400/45 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 4. Count & Reset Row */}
      <div className="flex items-center justify-between pt-1 px-0.5">
        <span className="font-mono text-xs tracking-wider text-emerald-100/70 tabular-nums">
          {filteredCompounds.length} KAYIT
        </span>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-lg text-xs text-emerald-100/75 hover:text-white hover:bg-emerald-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* 5. Compound Rows List or Empty State */}
      {filteredCompounds.length === 0 ? (
        <div className="lab-panel rounded-xl p-8 text-center space-y-3">
          <p className="text-sm sm:text-base text-emerald-100/80">
            Eşleşen bileşik bulunamadı
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-4 rounded-xl bg-[#13382b] border border-emerald-400/35 text-emerald-100 hover:text-white text-sm font-medium cursor-pointer transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredCompounds.map((compound) => {
            const isFav = favorites.has(compound.id);
            const showSystematic =
              compound.commonName.trim().toLowerCase() !==
              compound.systematicName.trim().toLowerCase();

            return (
              <div
                key={compound.id}
                className="lab-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => onSelectCompound(compound)}
                  className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  <div className="min-w-[88px] sm:min-w-[104px] px-2 py-2.5 rounded-lg bg-[#0d2d22] border border-emerald-400/30 text-center text-emerald-300 font-semibold text-sm sm:text-base shrink-0">
                    <FormulaText formula={compound.formula} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {compound.commonName}
                    </div>
                    <div className="mt-1 flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-[#0c261d] border border-emerald-400/25 text-emerald-200/85 shrink-0">
                        {EXAM_LEVEL_LABELS[compound.examLevel]}
                      </span>
                      {showSystematic && (
                        <span className="text-xs text-[#8fb3a4] truncate min-w-0">
                          {compound.systematicName}
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(compound.id)}
                  aria-label={isFav ? `${compound.commonName} favorilerden çıkar` : `${compound.commonName} favorilere ekle`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-emerald-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#f2d082] text-[#f2d082]' : 'text-emerald-200/45'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog for Reset Stats */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowResetConfirm(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
        >
          <div
            className="w-full max-w-sm lab-panel rounded-xl border border-emerald-400/30 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="reset-dialog-title" className="text-base font-semibold text-white">
              İstatistikleri Sıfırla
            </h2>
            <p className="text-sm text-emerald-50/85 leading-relaxed">
              Tüm bileşiklerdeki doğru ve yanlış sayıları sıfırlanacak. Favorilerin korunacaktır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-lg bg-[#0d271e] border border-emerald-400/25 text-emerald-100 hover:text-white text-sm font-medium cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetStats();
                  setShowResetConfirm(false);
                }}
                className="min-h-[44px] rounded-lg bg-[#c83e3b] hover:bg-[#dc4c49] text-white text-sm font-semibold cursor-pointer"
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
