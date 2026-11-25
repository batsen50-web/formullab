import {RotateCcw, Search, Star, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {HISTORY_CATEGORY_LABELS, HISTORY_EXAM_LEVEL_LABELS} from '../../data/history';
import type {QuizSource} from '../../types/chemistry';
import type {
  HistoryDictionaryFilterChip,
  HistoryStatsMap,
  HistoryTerm,
} from '../../types/history';
import {filterHistoryTerms} from '../../utils/historyLogic';

interface HistDictionaryViewProps {
  terms: readonly HistoryTerm[];
  favorites: ReadonlySet<string>;
  stats: HistoryStatsMap;
  mistakeCount: number;
  onToggleFavorite: (id: string) => void;
  onSelectTerm: (term: HistoryTerm) => void;
  onResetStats: () => void;
}

const FILTER_CHIPS: {id: HistoryDictionaryFilterChip; label: string}[] = [
  {id: 'ALL', label: 'Tüm Konular'},
  {id: 'ILK_ORTA_TURK', label: HISTORY_CATEGORY_LABELS.ILK_ORTA_TURK},
  {id: 'TURK_ISLAM_SELCUKLU', label: HISTORY_CATEGORY_LABELS.TURK_ISLAM_SELCUKLU},
  {id: 'OSMANLI_KLASIK', label: HISTORY_CATEGORY_LABELS.OSMANLI_KLASIK},
  {id: 'OSMANLI_DEGISIM_SON', label: HISTORY_CATEGORY_LABELS.OSMANLI_DEGISIM_SON},
  {id: 'INKILAP_CAGDAS', label: HISTORY_CATEGORY_LABELS.INKILAP_CAGDAS},
  {id: 'TYT', label: 'TYT Tarih'},
  {id: 'AYT', label: 'AYT Tarih'},
];

export const HistDictionaryView: FC<HistDictionaryViewProps> = ({
  terms,
  favorites,
  stats,
  mistakeCount,
  onToggleFavorite,
  onSelectTerm,
  onResetStats,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [source, setSource] = useState<QuizSource>('ALL');
  const [chip, setChip] = useState<HistoryDictionaryFilterChip>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredTerms = useMemo(
    () =>
      filterHistoryTerms(terms, {
        searchQuery,
        source,
        chip,
        favorites,
        stats,
      }),
    [terms, searchQuery, source, chip, favorites, stats],
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
    <section aria-label="Tarih Kavram Sözlüğü" className="w-full space-y-3.5">
      <div className="relative">
        <Search className="w-4 h-4 text-orange-200/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tarih kavramı, savaş, antlaşma veya dönem ara (Malazgirt, Tımar, Lozan...)"
          aria-label="Tarih kavramı ara"
          className="w-full min-h-[48px] pl-10 pr-11 rounded-xl bg-[#281208]/75 border border-orange-400/30 text-sm sm:text-base text-white placeholder:text-orange-100/45 focus:outline-none focus:border-orange-300/70 shadow-[inset_0_1px_0_rgba(255,237,213,0.08)]"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Aramayı temizle"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-orange-200/65 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#180a04]/85 border border-orange-400/20 p-1 gap-1">
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
                  ? 'bg-[#4f220d] border border-orange-400/35 text-white shadow-sm'
                  : 'text-orange-100/70 hover:text-white border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

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
                  ? 'hist-active-orange font-semibold'
                  : 'bg-[#281208]/80 border border-orange-400/20 text-orange-100/80 hover:border-orange-400/45 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-1 px-0.5">
        <span className="font-mono text-xs tracking-wider text-orange-100/70 tabular-nums">
          {filteredTerms.length} KAVRAM
        </span>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-lg text-xs text-orange-100/75 hover:text-white hover:bg-orange-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {filteredTerms.length === 0 ? (
        <div className="hist-panel rounded-xl p-8 text-center space-y-3">
          <p className="text-sm sm:text-base text-orange-100/80">
            Eşleşen Tarih kavramı bulunamadı
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-4 rounded-xl bg-[#4f220d] border border-orange-400/35 text-orange-100 hover:text-white text-sm font-medium cursor-pointer transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredTerms.map((term) => {
            const isFav = favorites.has(term.id);

            return (
              <div
                key={term.id}
                className="hist-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => onSelectTerm(term)}
                  className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
                >
                  <div className="w-[96px] sm:w-[112px] px-2 py-2.5 rounded-lg bg-[#1c0b04] border border-orange-400/30 text-center text-orange-300 font-mono font-semibold text-xs shrink-0 truncate">
                    {term.shortCode}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {term.term}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-orange-200/70 min-w-0">
                      <span className="font-mono text-orange-300/90 shrink-0">
                        {HISTORY_EXAM_LEVEL_LABELS[term.examLevel]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate min-w-0">{term.eraOrDate}</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(term.id)}
                  aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-orange-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-orange-200/45'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowResetConfirm(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hist-reset-dialog-title"
        >
          <div
            className="w-full max-w-sm hist-panel rounded-xl border border-orange-400/30 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="hist-reset-dialog-title" className="text-base font-semibold text-white">
              Tarih İstatistiklerini Sıfırla
            </h2>
            <p className="text-sm text-orange-50/85 leading-relaxed">
              Tüm Tarih kavramlarındaki doğru ve yanlış sayıları sıfırlanacak. Favorilerin korunacaktır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-lg bg-[#281208] border border-orange-400/25 text-orange-100 hover:text-white text-sm font-medium cursor-pointer"
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
