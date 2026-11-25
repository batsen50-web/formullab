import {RotateCcw, Search, Star, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {RELIGION_CATEGORY_LABELS, RELIGION_EXAM_LEVEL_LABELS} from '../../data/religion';
import type {QuizSource} from '../../types/chemistry';
import type {
  ReligionDictionaryFilterChip,
  ReligionStatsMap,
  ReligionTerm,
} from '../../types/religion';
import {filterReligionTerms} from '../../utils/religionLogic';

interface RelDictionaryViewProps {
  terms: readonly ReligionTerm[];
  favorites: ReadonlySet<string>;
  stats: ReligionStatsMap;
  mistakeCount: number;
  onToggleFavorite: (id: string) => void;
  onSelectTerm: (term: ReligionTerm) => void;
  onResetStats: () => void;
}

const FILTER_CHIPS: {id: ReligionDictionaryFilterChip; label: string}[] = [
  {id: 'ALL', label: 'Tüm Konular'},
  {id: 'BILGI_IMAN_ALLAH', label: RELIGION_CATEGORY_LABELS.BILGI_IMAN_ALLAH},
  {id: 'IBADET_AHIRET_PEYGAMBER', label: RELIGION_CATEGORY_LABELS.IBADET_AHIRET_PEYGAMBER},
  {id: 'AHLAK_DEGERLER_GUNCEL', label: RELIGION_CATEGORY_LABELS.AHLAK_DEGERLER_GUNCEL},
  {id: 'MEDENIYET_BILIM_SAHSIYET', label: RELIGION_CATEGORY_LABELS.MEDENIYET_BILIM_SAHSIYET},
  {id: 'MEZHEP_TASAVVUF_DINLER', label: RELIGION_CATEGORY_LABELS.MEZHEP_TASAVVUF_DINLER},
  {id: 'TYT', label: 'TYT Din'},
  {id: 'AYT', label: 'AYT Din'},
];

export const RelDictionaryView: FC<RelDictionaryViewProps> = ({
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
  const [chip, setChip] = useState<ReligionDictionaryFilterChip>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredTerms = useMemo(
    () =>
      filterReligionTerms(terms, {
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
    <section aria-label="Din Kültürü Kavram Sözlüğü" className="w-full space-y-3.5">
      <div className="relative">
        <Search className="w-4 h-4 text-teal-200/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Kavram, ibadet, mezhep veya din ara (Tevekkül, Matüridilik, Tecessüs...)"
          aria-label="Din Kültürü kavramı ara"
          className="w-full min-h-[48px] pl-10 pr-11 rounded-xl bg-[#072020]/75 border border-teal-400/30 text-sm sm:text-base text-white placeholder:text-teal-100/45 focus:outline-none focus:border-teal-300/70 shadow-[inset_0_1px_0_rgba(204,251,241,0.08)]"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Aramayı temizle"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-teal-200/65 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#041515]/85 border border-teal-400/20 p-1 gap-1">
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
                  ? 'bg-[#0c3b3b] border border-teal-400/35 text-white shadow-sm'
                  : 'text-teal-100/70 hover:text-white border border-transparent'
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
                  ? 'rel-active-teal font-semibold'
                  : 'bg-[#072020]/80 border border-teal-400/20 text-teal-100/80 hover:border-teal-400/45 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-1 px-0.5">
        <span className="font-mono text-xs tracking-wider text-teal-100/70 tabular-nums">
          {filteredTerms.length} KAVRAM
        </span>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-lg text-xs text-teal-100/75 hover:text-white hover:bg-teal-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {filteredTerms.length === 0 ? (
        <div className="rel-panel rounded-xl p-8 text-center space-y-3">
          <p className="text-sm sm:text-base text-teal-100/80">
            Eşleşen Din Kültürü kavramı bulunamadı
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-4 rounded-xl bg-[#0c3b3b] border border-teal-400/35 text-teal-100 hover:text-white text-sm font-medium cursor-pointer transition-colors"
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
                className="rel-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => onSelectTerm(term)}
                  className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
                >
                  <div className="w-[96px] sm:w-[112px] px-2 py-2.5 rounded-lg bg-[#041717] border border-teal-400/30 text-center text-teal-300 font-mono font-semibold text-xs shrink-0 truncate">
                    {term.shortCode}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {term.term}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-teal-200/70 min-w-0">
                      <span className="font-mono text-teal-300/90 shrink-0">
                        {RELIGION_EXAM_LEVEL_LABELS[term.examLevel]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate min-w-0">{term.scopeOrSource}</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(term.id)}
                  aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-teal-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-teal-200/45'
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
          aria-labelledby="rel-reset-dialog-title"
        >
          <div
            className="w-full max-w-sm rel-panel rounded-xl border border-teal-400/30 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="rel-reset-dialog-title" className="text-base font-semibold text-white">
              Din Kültürü İstatistiklerini Sıfırla
            </h2>
            <p className="text-sm text-teal-50/85 leading-relaxed">
              Tüm Din Kültürü kavramlarındaki doğru ve yanlış sayıları sıfırlanacak. Favorilerin korunacaktır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-lg bg-[#072020] border border-teal-400/25 text-teal-100 hover:text-white text-sm font-medium cursor-pointer"
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
