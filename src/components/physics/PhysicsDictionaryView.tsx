import {RotateCcw, Search, Star, X} from 'lucide-react';
import {useMemo, useState, type FC} from 'react';
import {PHYSICS_CATEGORY_LABELS, PHYSICS_EXAM_LEVEL_LABELS} from '../../data/physics';
import type {QuizSource} from '../../types/chemistry';
import type {
  PhysicsDictionaryFilterChip,
  PhysicsStatsMap,
  PhysicsTerm,
} from '../../types/physics';
import {filterPhysicsTerms} from '../../utils/physicsLogic';

interface PhysicsDictionaryViewProps {
  terms: readonly PhysicsTerm[];
  favorites: ReadonlySet<string>;
  stats: PhysicsStatsMap;
  mistakeCount: number;
  onToggleFavorite: (id: string) => void;
  onSelectTerm: (term: PhysicsTerm) => void;
  onResetStats: () => void;
}

const FILTER_CHIPS: {id: PhysicsDictionaryFilterChip; label: string}[] = [
  {id: 'ALL', label: 'Tüm Konular'},
  {id: 'MADDE_HAREKET', label: PHYSICS_CATEGORY_LABELS.MADDE_HAREKET},
  {id: 'ISI_BASINC', label: PHYSICS_CATEGORY_LABELS.ISI_BASINC},
  {id: 'ELEKTRIK_MANYETIZMA', label: PHYSICS_CATEGORY_LABELS.ELEKTRIK_MANYETIZMA},
  {id: 'DALGA_OPTIK', label: PHYSICS_CATEGORY_LABELS.DALGA_OPTIK},
  {id: 'CEMBER_MODERN', label: PHYSICS_CATEGORY_LABELS.CEMBER_MODERN},
  {id: 'TYT', label: 'TYT'},
  {id: 'AYT', label: 'AYT'},
];

export const PhysicsDictionaryView: FC<PhysicsDictionaryViewProps> = ({
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
  const [chip, setChip] = useState<PhysicsDictionaryFilterChip>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredTerms = useMemo(
    () =>
      filterPhysicsTerms(terms, {
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
    <section aria-label="Fizik Formül ve Yasa Sözlüğü" className="w-full space-y-3.5">
      {/* 1. Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-violet-200/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Formül, yasa veya birim ara (özkütle, Ohm, fotoelektrik...)"
          aria-label="Fizik kavramı ara"
          className="w-full min-h-[48px] pl-10 pr-11 rounded-xl bg-[#140c29]/75 border border-violet-400/30 text-sm sm:text-base text-white placeholder:text-violet-100/45 focus:outline-none focus:border-violet-300/70 shadow-[inset_0_1px_0_rgba(221,214,254,0.08)]"
        />
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Aramayı temizle"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-violet-200/65 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Segmented Source Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#0e081f]/85 border border-violet-400/20 p-1 gap-1">
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
                  ? 'bg-[#25154a] border border-violet-400/35 text-white shadow-sm'
                  : 'text-violet-100/70 hover:text-white border border-transparent'
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
                  ? 'phys-active-violet font-semibold'
                  : 'bg-[#140c29]/80 border border-violet-400/20 text-violet-100/75 hover:border-violet-400/45 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 4. Count & Reset Row */}
      <div className="flex items-center justify-between pt-1 px-0.5">
        <span className="font-mono text-xs tracking-wider text-violet-100/70 tabular-nums">
          {filteredTerms.length} KAVRAM &amp; FORMÜL
        </span>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-lg text-xs text-violet-100/75 hover:text-white hover:bg-violet-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* 5. Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="phys-panel rounded-xl p-8 text-center space-y-3">
          <p className="text-sm sm:text-base text-violet-100/80">
            Eşleşen fizik formülü veya kavramı bulunamadı
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-4 rounded-xl bg-[#221444] border border-violet-400/35 text-violet-100 hover:text-white text-sm font-medium cursor-pointer transition-colors"
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
                className="phys-card-row rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-2 transition-all"
              >
                <button
                  type="button"
                  onClick={() => onSelectTerm(term)}
                  className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer rounded-lg py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                >
                  <div className="w-[100px] sm:w-[116px] px-2 py-2.5 rounded-lg bg-[#110a24] border border-violet-400/30 text-center text-violet-300 font-mono font-semibold text-xs shrink-0 truncate">
                    {term.formula}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base font-medium text-white truncate">
                      {term.term}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-violet-200/65 min-w-0">
                      <span className="font-mono text-violet-300/90 shrink-0">
                        {PHYSICS_EXAM_LEVEL_LABELS[term.examLevel]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate min-w-0">{term.siUnit}</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(term.id)}
                  aria-label={isFav ? `${term.term} favorilerden çıkar` : `${term.term} favorilere ekle`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-violet-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFav ? 'fill-[#f2d082] text-[#f2d082]' : 'text-violet-200/45'
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
          aria-labelledby="phys-reset-dialog-title"
        >
          <div
            className="w-full max-w-sm phys-panel rounded-xl border border-violet-400/30 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="phys-reset-dialog-title" className="text-base font-semibold text-white">
              Fizik İstatistiklerini Sıfırla
            </h2>
            <p className="text-sm text-violet-50/85 leading-relaxed">
              Tüm fizik kavramlarındaki doğru ve yanlış sayıları sıfırlanacak. Favorilerin korunacaktır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="min-h-[44px] rounded-lg bg-[#140c29] border border-violet-400/25 text-violet-100 hover:text-white text-sm font-medium cursor-pointer"
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
