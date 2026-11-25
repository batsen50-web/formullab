import {RotateCcw, Search, Star, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {LITERATURE_CATEGORY_LABELS, LITERATURE_EXAM_LEVEL_LABELS} from '../../data/literature';
import type {QuizSource} from '../../types/chemistry';
import type {
  LiteratureDictionaryFilterChip,
  LiteratureStatsMap,
  LiteratureTerm,
} from '../../types/literature';
import {filterLiteratureTerms} from '../../utils/literatureLogic';

interface LitDictionaryViewProps {
  terms: readonly LiteratureTerm[];
  favorites: ReadonlySet<string>;
  stats: LiteratureStatsMap;
  mistakeCount: number;
  onToggleFavorite: (id: string) => void;
  onSelectTerm: (term: LiteratureTerm) => void;
  onResetStats: () => void;
}

const FILTER_CHIPS: {id: LiteratureDictionaryFilterChip; label: string}[] = [
  {id: 'ALL', label: 'Tüm Konular'},
  {id: 'DIL_YAZIM_ANLAM', label: LITERATURE_CATEGORY_LABELS.DIL_YAZIM_ANLAM},
  {id: 'SOZCUK_CUMLE_DILBILGISI', label: LITERATURE_CATEGORY_LABELS.SOZCUK_CUMLE_DILBILGISI},
  {id: 'SIIR_SANAT_DONEMLER', label: LITERATURE_CATEGORY_LABELS.SIIR_SANAT_DONEMLER},
  {id: 'TANZIMAT_CUMHURIYET_SIIR', label: LITERATURE_CATEGORY_LABELS.TANZIMAT_CUMHURIYET_SIIR},
  {id: 'NESIR_ROMAN_TIYATRO_AKIM', label: LITERATURE_CATEGORY_LABELS.NESIR_ROMAN_TIYATRO_AKIM},
  {id: 'TYT', label: 'TYT Türkçe'},
  {id: 'AYT', label: 'AYT Edebiyat'},
];

export const LitDictionaryView: FC<LitDictionaryViewProps> = ({
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
  const [chip, setChip] = useState<LiteratureDictionaryFilterChip>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredTerms = useMemo(
    () =>
      filterLiteratureTerms(terms, {
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
    <section aria-label="Türkçe ve Edebiyat Kavram Sözlüğü" className="w-full space-y-3.5">
      {/* 1. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-rose-200/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kavram, şair, eser veya dil bilgisi konusu ara (Tevriye, Tutunamayanlar, Fiilimsi...)"
          aria-label="Türkçe ve Edebiyat kavramı ara"
          className="w-full min-h-[48px] pl-10 pr-11 rounded-xl bg-[#260c17]/75 border border-rose-400/30 text-sm sm:text-base text-white placeholder:text-rose-100/45 focus:outline-none focus:border-rose-300/70 shadow-[inset_0_1px_0_rgba(255,228,230,0.08)]"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Aramayı temizle"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-rose-200/65 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Segmented Source Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#18070f]/85 border border-rose-400/20 p-1 gap-1">
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
                  ? 'bg-[#481226] border border-rose-400/35 text-white shadow-sm'
                  : 'text-rose-100/70 hover:text-white border border-transparent'
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
                  ? 'lit-active-rose font-semibold'
                  : 'bg-[#260c17]/80 border border-rose-400/20 text-rose-100/80 hover:border-rose-400/45 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 4. Count & Reset Row */}
      <div className="flex items-center justify-between pt-1 px-0.5">
        <span className="font-mono text-xs tracking-wider text-rose-100/70 tabular-nums">
          {filteredTerms.length} KAVRAM
        </span>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-lg text-xs text-rose-100/75 hover:text-white hover:bg-rose-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* 5. Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="lit-panel rounded-xl p-8 text-center space-y-3">
          <p className="text-sm sm:text-base text-rose-100/80">
            Eşleşen Türkçe veya Edebiyat kavramı bulunamadı
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-4 rounded-xl bg-[#481226] border border-rose-400/35 text-rose-100 hover:text-white text-sm font-medium cursor-pointer transition-colors"
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
                className="lit-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => onSelectTerm(term)}
                  className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
                >
                  <div className="w-[96px] sm:w-[112px] px-2 py-2.5 rounded-lg bg-[#1d0811] border border-rose-400/30 text-center text-rose-300 font-mono font-semibold text-xs shrink-0 truncate">
                    {term.shortCode}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {term.term}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-rose-200/70 min-w-0">
                      <span className="font-mono text-rose-300/90 shrink-0">
                        {LITERATURE_EXAM_LEVEL_LABELS[term.examLevel]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate min-w-0">{term.periodOrTopic}</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(term.id)}
                  aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-rose-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-rose-200/45'
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
          aria-labelledby="lit-reset-dialog-title"
        >
          <div
            className="w-full max-w-sm lit-panel rounded-xl border border-rose-400/30 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="lit-reset-dialog-title" className="text-base font-semibold text-white">
              Türkçe &amp; Edebiyat İstatistiklerini Sıfırla
            </h2>
            <p className="text-sm text-rose-50/85 leading-relaxed">
              Tüm Türkçe ve Edebiyat kavramlarındaki doğru ve yanlış sayıları sıfırlanacak. Favorilerin korunacaktır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-lg bg-[#260c17] border border-rose-400/25 text-rose-100 hover:text-white text-sm font-medium cursor-pointer"
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
