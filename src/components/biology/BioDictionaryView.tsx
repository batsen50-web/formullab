import {RotateCcw, Search, Star, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {BIOLOGY_CATEGORY_LABELS, BIOLOGY_EXAM_LEVEL_LABELS} from '../../data/biology';
import type {
  BiologyDictionaryFilterChip,
  BiologyStatsMap,
  BiologyTerm,
} from '../../types/biology';
import type {QuizSource} from '../../types/chemistry';
import {filterBiologyTerms} from '../../utils/biologyLogic';

interface BioDictionaryViewProps {
  terms: readonly BiologyTerm[];
  favorites: ReadonlySet<string>;
  stats: BiologyStatsMap;
  mistakeCount: number;
  onToggleFavorite: (id: string) => void;
  onSelectTerm: (term: BiologyTerm) => void;
  onResetStats: () => void;
}

const FILTER_CHIPS: {id: BiologyDictionaryFilterChip; label: string}[] = [
  {id: 'ALL', label: 'Tüm Konular'},
  {id: 'CANLI_TEMEL', label: BIOLOGY_CATEGORY_LABELS.CANLI_TEMEL},
  {id: 'HUCRE_ORGANEL', label: BIOLOGY_CATEGORY_LABELS.HUCRE_ORGANEL},
  {id: 'METABOLIZMA', label: BIOLOGY_CATEGORY_LABELS.METABOLIZMA},
  {id: 'SISTEMLER', label: BIOLOGY_CATEGORY_LABELS.SISTEMLER},
  {id: 'GENETIK_EKOLOJI', label: BIOLOGY_CATEGORY_LABELS.GENETIK_EKOLOJI},
  {id: 'TYT', label: 'TYT'},
  {id: 'AYT', label: 'AYT'},
];

export const BioDictionaryView: FC<BioDictionaryViewProps> = ({
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
  const [chip, setChip] = useState<BiologyDictionaryFilterChip>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredTerms = useMemo(
    () =>
      filterBiologyTerms(terms, {
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
    <section aria-label="Biyoloji Kavram Sözlüğü" className="w-full space-y-3.5">
      {/* 1. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-sky-200/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kavram, organel veya hormon ara (mitokondri, ADH...)"
          aria-label="Biyoloji kavramı ara"
          className="w-full min-h-[48px] pl-10 pr-11 rounded-xl bg-[#09202e]/75 border border-sky-400/30 text-sm sm:text-base text-white placeholder:text-sky-100/45 focus:outline-none focus:border-sky-300/70 shadow-[inset_0_1px_0_rgba(186,230,253,0.08)]"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Aramayı temizle"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-sky-200/65 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Segmented Source Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#061824]/85 border border-sky-400/20 p-1 gap-1">
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
                  ? 'bg-[#10364c] border border-sky-400/35 text-white shadow-sm'
                  : 'text-sky-100/70 hover:text-white border border-transparent'
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
                  ? 'bio-active-teal font-semibold'
                  : 'bg-[#09202e]/80 border border-sky-400/20 text-sky-100/75 hover:border-sky-400/45 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 4. Count & Reset Row */}
      <div className="flex items-center justify-between pt-1 px-0.5">
        <span className="font-mono text-xs tracking-wider text-sky-100/70 tabular-nums">
          {filteredTerms.length} KAVRAM
        </span>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-lg text-xs text-sky-100/75 hover:text-white hover:bg-sky-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* 5. Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="bio-panel rounded-xl p-8 text-center space-y-3">
          <p className="text-sm sm:text-base text-sky-100/80">
            Eşleşen biyoloji kavramı bulunamadı
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-4 rounded-xl bg-[#0e3246] border border-sky-400/35 text-sky-100 hover:text-white text-sm font-medium cursor-pointer transition-colors"
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
                className="bio-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => onSelectTerm(term)}
                  className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                >
                  <div className="w-[96px] sm:w-[112px] px-2 py-2.5 rounded-lg bg-[#081d2b] border border-sky-400/30 text-center text-sky-300 font-mono font-semibold text-xs shrink-0 truncate">
                    {term.shortCode}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {term.term}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-sky-200/65 min-w-0">
                      <span className="font-mono text-sky-300/90 shrink-0">
                        {BIOLOGY_EXAM_LEVEL_LABELS[term.examLevel]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate min-w-0">{term.locationOrSystem}</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(term.id)}
                  aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#f2d082] text-[#f2d082]' : 'text-sky-200/45'
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
          aria-labelledby="bio-reset-dialog-title"
        >
          <div
            className="w-full max-w-sm bio-panel rounded-xl border border-sky-400/30 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="bio-reset-dialog-title" className="text-base font-semibold text-white">
              Biyoloji İstatistiklerini Sıfırla
            </h2>
            <p className="text-sm text-sky-50/85 leading-relaxed">
              Tüm biyoloji kavramlarındaki doğru ve yanlış sayıları sıfırlanacak. Favorilerin korunacaktır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-lg bg-[#09202e] border border-sky-400/25 text-sky-100 hover:text-white text-sm font-medium cursor-pointer"
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
