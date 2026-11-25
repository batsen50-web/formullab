import {BookOpen, BookText, FlaskConical, HelpCircle} from 'lucide-react';
import {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {AudioControl} from './components/AudioControl';
import {AdSenseSlot, LegalFooter} from './components/LegalFooter';
import {OfflineIndicator} from './components/OfflineIndicator';
import {PWAInstallButton} from './components/PWAInstallButton';
import {TestSetupView} from './components/TestSetupView';
import {COMPOUNDS} from './data/compounds';
import type {
  AppTab,
  Compound,
  QuizAnswerRecord,
  QuizConfig,
  QuizQuestion,
  StatsMap,
} from './types/chemistry';
import {canShowDailyAd, markDailyAdShown} from './utils/adFrequency';
import {
  calculateQuizSummary,
  generateQuizQuestions,
  getQuizPool,
  loadFavoritesFromStorage,
  loadStatsFromStorage,
  saveFavoritesToStorage,
  saveStatsToStorage,
} from './utils/chemistryLogic';
import {playClickSound} from './utils/soundEffects';

const CompoundDetailModal = lazy(() =>
  import('./components/CompoundDetailModal').then((m) => ({default: m.CompoundDetailModal})),
);
const DailyAdModal = lazy(() =>
  import('./components/DailyAdModal').then((m) => ({default: m.DailyAdModal})),
);
const DictionaryView = lazy(() =>
  import('./components/DictionaryView').then((m) => ({default: m.DictionaryView})),
);
const IonLabView = lazy(() =>
  import('./components/IonLabView').then((m) => ({default: m.IonLabView})),
);
const StudyGuideSection = lazy(() =>
  import('./components/StudyGuideSection').then((m) => ({default: m.StudyGuideSection})),
);
const TestActiveView = lazy(() =>
  import('./components/TestActiveView').then((m) => ({default: m.TestActiveView})),
);
const TestResultsView = lazy(() =>
  import('./components/TestResultsView').then((m) => ({default: m.TestResultsView})),
);

type TestPhase = 'setup' | 'active' | 'results';

const VALID_COMPOUND_IDS = new Set(COMPOUNDS.map((c) => c.id));

const DEFAULT_QUIZ_CONFIG: QuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

function ViewFallback() {
  return (
    <div
      className="lab-panel rounded-2xl p-6 min-h-[240px] flex items-center justify-center"
      role="status"
      aria-label="Yükleniyor"
    >
      <div className="font-mono text-xs tracking-wider text-emerald-200/70 animate-pulse">
        YÜKLENİYOR...
      </div>
    </div>
  );
}

function ErlenmeyerLogo() {
  return (
    <div
      className="w-9 h-9 rounded-xl bg-[#0e3225]/90 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_18px_rgba(52,211,153,0.32)] shrink-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5 text-[#4ae39e]"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3h6" />
        <path d="M10 3v5.4L5.2 17.6A2 2 0 0 0 7 20.5h10a2 2 0 0 0 1.8-2.9L14 8.4V3" />
        <path d="M7.6 15.5h8.8" strokeOpacity="0.6" />
        <circle cx="10.5" cy="17.8" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="13.8" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('test');
  const [favoritesList, setFavoritesList] = useState<string[]>(() =>
    loadFavoritesFromStorage().filter((id) => VALID_COMPOUND_IDS.has(id)),
  );
  const [stats, setStats] = useState<StatsMap>(() => loadStatsFromStorage());

  const [quizConfig, setQuizConfig] = useState<QuizConfig>(DEFAULT_QUIZ_CONFIG);
  const [testPhase, setTestPhase] = useState<TestPhase>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);

  const [detailCompound, setDetailCompound] = useState<Compound | null>(null);
  const [showDailyAd, setShowDailyAd] = useState(false);

  const favoritesSet = useMemo(() => new Set(favoritesList), [favoritesList]);

  const mistakeCount = useMemo(
    () => COMPOUNDS.filter((c) => (stats[c.id]?.wrong ?? 0) > 0).length,
    [stats],
  );

  useEffect(() => {
    saveFavoritesToStorage(favoritesList);
  }, [favoritesList]);

  useEffect(() => {
    saveStatsToStorage(stats);
  }, [stats]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button:not(:disabled), a[href]');
      if (interactive) {
        playClickSound();
      }
    };
    document.addEventListener('click', handleGlobalClick, {capture: true});
    return () => {
      document.removeEventListener('click', handleGlobalClick, {capture: true});
    };
  }, []);

  const quizPool = useMemo(
    () => getQuizPool(COMPOUNDS, quizConfig, favoritesSet, stats),
    [quizConfig, favoritesSet, stats],
  );

  const handleToggleFavorite = (compoundId: string) => {
    setFavoritesList((prev) =>
      prev.includes(compoundId) ? prev.filter((id) => id !== compoundId) : [...prev, compoundId],
    );
  };

  const handleResetStats = () => {
    setStats({});
  };

  const startQuizFromPool = (pool: readonly Compound[], configToUse: QuizConfig = quizConfig) => {
    const generated = generateQuizQuestions(pool, COMPOUNDS, configToUse);
    if (generated.length === 0) return;

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setAnswers([]);
    setCurrentStreak(0);
    setTestPhase('active');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectChoice = (choiceId: string) => {
    if (selectedChoiceId !== null) return;
    const question = questions[currentIndex];
    if (!question) return;

    const isCorrect = choiceId === question.compound.id;
    setSelectedChoiceId(choiceId);
    setAnswers((prev) => [...prev, {question, selectedCompoundId: choiceId, isCorrect}]);
    setCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setStats((prev) => {
      const existing = prev[question.compound.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.compound.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoiceId(null);
    } else {
      setTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
      if (canShowDailyAd()) {
        markDailyAdShown();
        setShowDailyAd(true);
      }
    }
  };

  const quizSummary = useMemo(() => calculateQuizSummary(answers), [answers]);

  const handleSwitchTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  return (
    <div className="min-h-[100dvh] lab-canvas flex flex-col overflow-x-clip">
      <div className="fixed inset-0 lab-grid-overlay pointer-events-none" aria-hidden="true" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-3.5 sm:px-6 pt-3.5 sm:pt-4 pb-2.5 sm:pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <ErlenmeyerLogo />
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-white truncate">
            formullab
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton />
          <AudioControl />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 pt-1.5 sm:pt-2 pb-[calc(5.75rem+env(safe-area-inset-bottom))] sm:pb-28 flex flex-col justify-between">
        <div>
          <Suspense fallback={<ViewFallback />}>
            {activeTab === 'test' && (
              <>
                {testPhase === 'setup' && (
                  <TestSetupView
                    config={quizConfig}
                    favoriteCount={favoritesSet.size}
                    mistakeCount={mistakeCount}
                    poolCount={quizPool.length}
                    onChangeConfig={setQuizConfig}
                    onStartTest={() => startQuizFromPool(quizPool, quizConfig)}
                  />
                )}

                {testPhase === 'active' && (
                  <TestActiveView
                    questions={questions}
                    currentIndex={currentIndex}
                    answers={answers}
                    currentStreak={currentStreak}
                    selectedChoiceId={selectedChoiceId}
                    onSelectChoice={handleSelectChoice}
                    onNext={handleNextQuestion}
                    onExit={() => setTestPhase('setup')}
                  />
                )}

                {testPhase === 'results' && (
                  <TestResultsView
                    summary={quizSummary}
                    favorites={favoritesSet}
                    onReturnSetup={() => setTestPhase('setup')}
                    onRestartSameConfig={() => startQuizFromPool(quizPool, quizConfig)}
                    onTestMistakes={(mistakes) =>
                      startQuizFromPool(mistakes, {
                        ...quizConfig,
                        questionCount:
                          mistakes.length <= 10
                            ? 10
                            : mistakes.length <= 15
                              ? 15
                              : 20,
                      })
                    }
                    onSelectCompound={(compound) => setDetailCompound(compound)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )}
              </>
            )}

            {activeTab === 'ionlab' && (
              <IonLabView
                compounds={COMPOUNDS}
                onSelectCompound={(compound) => setDetailCompound(compound)}
                onExit={() => handleSwitchTab('test')}
              />
            )}

            {activeTab === 'dictionary' && (
              <DictionaryView
                compounds={COMPOUNDS}
                favorites={favoritesSet}
                stats={stats}
                mistakeCount={mistakeCount}
                onToggleFavorite={handleToggleFavorite}
                onSelectCompound={(compound) => setDetailCompound(compound)}
                onResetStats={handleResetStats}
              />
            )}

            {activeTab === 'guide' && <StudyGuideSection standalone />}
          </Suspense>
        </div>

        <div className="mt-8 space-y-4">
          {((activeTab === 'test' && testPhase === 'setup') || activeTab === 'guide') && (
            <AdSenseSlot label="Sponsorlu Alan" />
          )}
          <LegalFooter />
        </div>
      </main>

      {/* Bottom 4-Tab Navigation Bar */}
      <nav
        aria-label="Ana Gezinme"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#081b14]/94 backdrop-blur-md border-t border-emerald-400/20 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-4">
          <button
            type="button"
            onClick={() => handleSwitchTab('test')}
            aria-current={activeTab === 'test' ? 'page' : undefined}
            className={`relative min-h-[58px] sm:min-h-[60px] py-2 flex flex-col items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'test'
                ? 'text-[#6ee7b7]'
                : 'text-emerald-100/50 hover:text-emerald-100/80'
            }`}
          >
            {activeTab === 'test' && (
              <span
                className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]"
                aria-hidden="true"
              />
            )}
            <HelpCircle className="w-5 h-5" />
            <span className="text-[11px] sm:text-xs font-medium tracking-tight">Test</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchTab('ionlab')}
            aria-current={activeTab === 'ionlab' ? 'page' : undefined}
            className={`relative min-h-[58px] sm:min-h-[60px] py-2 flex flex-col items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'ionlab'
                ? 'text-[#6ee7b7]'
                : 'text-emerald-100/50 hover:text-emerald-100/80'
            }`}
          >
            {activeTab === 'ionlab' && (
              <span
                className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]"
                aria-hidden="true"
              />
            )}
            <FlaskConical className="w-5 h-5" />
            <span className="text-[11px] sm:text-xs font-medium tracking-tight">İyon Lab</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchTab('dictionary')}
            aria-current={activeTab === 'dictionary' ? 'page' : undefined}
            className={`relative min-h-[58px] sm:min-h-[60px] py-2 flex flex-col items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'dictionary'
                ? 'text-[#6ee7b7]'
                : 'text-emerald-100/50 hover:text-emerald-100/80'
            }`}
          >
            {activeTab === 'dictionary' && (
              <span
                className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]"
                aria-hidden="true"
              />
            )}
            <BookOpen className="w-5 h-5" />
            <span className="text-[11px] sm:text-xs font-medium tracking-tight">Sözlük</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchTab('guide')}
            aria-current={activeTab === 'guide' ? 'page' : undefined}
            className={`relative min-h-[58px] sm:min-h-[60px] py-2 flex flex-col items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'text-[#6ee7b7]'
                : 'text-emerald-100/50 hover:text-emerald-100/80'
            }`}
          >
            {activeTab === 'guide' && (
              <span
                className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]"
                aria-hidden="true"
              />
            )}
            <BookText className="w-5 h-5" />
            <span className="text-[11px] sm:text-xs font-medium tracking-tight">Rehber</span>
          </button>
        </div>
      </nav>

      {/* Shared Compound Detail Modal */}
      {detailCompound && (
        <Suspense fallback={null}>
          <CompoundDetailModal
            compound={detailCompound}
            isFavorite={favoritesSet.has(detailCompound.id)}
            stats={stats[detailCompound.id]}
            onToggleFavorite={handleToggleFavorite}
            onClose={() => setDetailCompound(null)}
          />
        </Suspense>
      )}

      {/* Once-Per-Day AdSense Modal on Test Completion */}
      {showDailyAd && (
        <Suspense fallback={null}>
          <DailyAdModal isOpen={showDailyAd} onClose={() => setShowDailyAd(false)} />
        </Suspense>
      )}

      {/* Offline Status Toast */}
      <OfflineIndicator />
    </div>
  );
}
