import {
  ArrowLeft,
  Atom,
  BookOpen,
  BookText,
  Compass,
  Dna,
  Feather,
  FlaskConical,
  Globe2,
  HelpCircle,
  Landmark,
  Scale,
} from 'lucide-react';
import {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {AudioControl} from './components/AudioControl';
import {HomeWelcomeMenu} from './components/HomeWelcomeMenu';
import {LegalFooter} from './components/LegalFooter';
import {OfflineIndicator} from './components/OfflineIndicator';
import {PWAInstallButton} from './components/PWAInstallButton';
import {
  BioDnaLogo,
  ErlenmeyerLogo,
  GeographyGlobeLogo,
  HistoryLandmarkLogo,
  HomeLogo,
  LiteratureQuillLogo,
  PhilosophyScaleLogo,
  PhysicsAtomLogo,
  ReligionStarLogo,
} from './components/SubjectLogos';
import {TestSetupView} from './components/TestSetupView';
import {BioTestSetupView} from './components/biology/BioTestSetupView';
import {GeoTestSetupView} from './components/geography/GeoTestSetupView';
import {HistTestSetupView} from './components/history/HistTestSetupView';
import {LitTestSetupView} from './components/literature/LitTestSetupView';
import {PhilTestSetupView} from './components/philosophy/PhilTestSetupView';
import {PhysicsTestSetupView} from './components/physics/PhysicsTestSetupView';
import {RelTestSetupView} from './components/religion/RelTestSetupView';
import {BIOLOGY_TERMS} from './data/biology';
import {BIOLOGY_EXAM_QUESTIONS} from './data/biologyQuestions';
import {COMPOUNDS} from './data/compounds';
import {GEOGRAPHY_TERMS} from './data/geography';
import {GEOGRAPHY_EXAM_QUESTIONS} from './data/geographyQuestions';
import {HISTORY_TERMS} from './data/history';
import {HISTORY_EXAM_QUESTIONS} from './data/historyQuestions';
import {LITERATURE_TERMS} from './data/literature';
import {LITERATURE_EXAM_QUESTIONS} from './data/literatureQuestions';
import {PHILOSOPHY_TERMS} from './data/philosophy';
import {PHILOSOPHY_EXAM_QUESTIONS} from './data/philosophyQuestions';
import {PHYSICS_TERMS} from './data/physics';
import {PHYSICS_EXAM_QUESTIONS} from './data/physicsQuestions';
import {RELIGION_TERMS} from './data/religion';
import {RELIGION_EXAM_QUESTIONS} from './data/religionQuestions';
import type {
  BiologyAnswerRecord,
  BiologyQuestion,
  BiologyQuizConfig,
  BiologyStatsMap,
  BiologyTerm,
  ScreenMode,
  SubjectId,
} from './types/biology';
import type {
  AppTab,
  Compound,
  QuizAnswerRecord,
  QuizConfig,
  QuizQuestion,
  StatsMap,
} from './types/chemistry';
import type {
  GeographyAnswerRecord,
  GeographyQuestion,
  GeographyQuizConfig,
  GeographyStatsMap,
  GeographyTerm,
} from './types/geography';
import type {
  HistoryAnswerRecord,
  HistoryQuestion,
  HistoryQuizConfig,
  HistoryStatsMap,
  HistoryTerm,
} from './types/history';
import type {
  LiteratureAnswerRecord,
  LiteratureQuestion,
  LiteratureQuizConfig,
  LiteratureStatsMap,
  LiteratureTerm,
} from './types/literature';
import type {
  PhilosophyAnswerRecord,
  PhilosophyQuestion,
  PhilosophyQuizConfig,
  PhilosophyStatsMap,
  PhilosophyTerm,
} from './types/philosophy';
import type {
  PhysicsAnswerRecord,
  PhysicsQuestion,
  PhysicsQuizConfig,
  PhysicsStatsMap,
  PhysicsTerm,
} from './types/physics';
import type {
  ReligionAnswerRecord,
  ReligionQuestion,
  ReligionQuizConfig,
  ReligionStatsMap,
  ReligionTerm,
} from './types/religion';
import {
  calculateBiologySummary,
  generateBiologyQuestions,
  getBiologyExamQuestionPool,
  getBiologyQuizPool,
  loadBioFavoritesFromStorage,
  loadBioStatsFromStorage,
  saveBioFavoritesToStorage,
  saveBioStatsToStorage,
} from './utils/biologyLogic';
import {
  calculateQuizSummary,
  generateQuizQuestions,
  getQuizPool,
  loadFavoritesFromStorage,
  loadStatsFromStorage,
  saveFavoritesToStorage,
  saveStatsToStorage,
} from './utils/chemistryLogic';
import {
  calculateGeographySummary,
  generateGeographyQuestions,
  getGeographyExamQuestionPool,
  getGeographyQuizPool,
  loadGeoFavoritesFromStorage,
  loadGeoStatsFromStorage,
  saveGeoFavoritesToStorage,
  saveGeoStatsToStorage,
} from './utils/geographyLogic';
import {
  calculateHistorySummary,
  generateHistoryQuestions,
  getHistoryExamQuestionPool,
  getHistoryQuizPool,
  loadHistFavoritesFromStorage,
  loadHistStatsFromStorage,
  saveHistFavoritesToStorage,
  saveHistStatsToStorage,
} from './utils/historyLogic';
import {
  calculateLiteratureSummary,
  generateLiteratureQuestions,
  getLiteratureExamQuestionPool,
  getLiteratureQuizPool,
  loadLitFavoritesFromStorage,
  loadLitStatsFromStorage,
  saveLitFavoritesToStorage,
  saveLitStatsToStorage,
} from './utils/literatureLogic';
import {
  calculatePhilosophySummary,
  generatePhilosophyQuestions,
  getPhilosophyExamQuestionPool,
  getPhilosophyQuizPool,
  loadPhilFavoritesFromStorage,
  loadPhilStatsFromStorage,
  savePhilFavoritesToStorage,
  savePhilStatsToStorage,
} from './utils/philosophyLogic';
import {
  calculatePhysicsSummary,
  generatePhysicsQuestions,
  getPhysicsExamQuestionPool,
  getPhysicsQuizPool,
  loadPhysFavoritesFromStorage,
  loadPhysStatsFromStorage,
  savePhysFavoritesToStorage,
  savePhysStatsToStorage,
} from './utils/physicsLogic';
import {
  calculateReligionSummary,
  generateReligionQuestions,
  getReligionExamQuestionPool,
  getReligionQuizPool,
  loadRelFavoritesFromStorage,
  loadRelStatsFromStorage,
  saveRelFavoritesToStorage,
  saveRelStatsToStorage,
} from './utils/religionLogic';
import {playClickSound} from './utils/soundEffects';

const CompoundDetailModal = lazy(() =>
  import('./components/CompoundDetailModal').then((m) => ({default: m.CompoundDetailModal})),
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

const BioDetailModal = lazy(() =>
  import('./components/biology/BioDetailModal').then((m) => ({default: m.BioDetailModal})),
);
const BioDictionaryView = lazy(() =>
  import('./components/biology/BioDictionaryView').then((m) => ({default: m.BioDictionaryView})),
);
const BioLabView = lazy(() =>
  import('./components/biology/BioLabView').then((m) => ({default: m.BioLabView})),
);
const BioStudyGuideSection = lazy(() =>
  import('./components/biology/BioStudyGuideSection').then((m) => ({
    default: m.BioStudyGuideSection,
  })),
);
const BioTestActiveView = lazy(() =>
  import('./components/biology/BioTestActiveView').then((m) => ({default: m.BioTestActiveView})),
);
const BioTestResultsView = lazy(() =>
  import('./components/biology/BioTestResultsView').then((m) => ({default: m.BioTestResultsView})),
);

const PhysicsDetailModal = lazy(() =>
  import('./components/physics/PhysicsDetailModal').then((m) => ({default: m.PhysicsDetailModal})),
);
const PhysicsDictionaryView = lazy(() =>
  import('./components/physics/PhysicsDictionaryView').then((m) => ({
    default: m.PhysicsDictionaryView,
  })),
);
const PhysicsLabView = lazy(() =>
  import('./components/physics/PhysicsLabView').then((m) => ({default: m.PhysicsLabView})),
);
const PhysicsStudyGuideSection = lazy(() =>
  import('./components/physics/PhysicsStudyGuideSection').then((m) => ({
    default: m.PhysicsStudyGuideSection,
  })),
);
const PhysicsTestActiveView = lazy(() =>
  import('./components/physics/PhysicsTestActiveView').then((m) => ({
    default: m.PhysicsTestActiveView,
  })),
);
const PhysicsTestResultsView = lazy(() =>
  import('./components/physics/PhysicsTestResultsView').then((m) => ({
    default: m.PhysicsTestResultsView,
  })),
);

const GeoDetailModal = lazy(() =>
  import('./components/geography/GeoDetailModal').then((m) => ({default: m.GeoDetailModal})),
);
const GeoDictionaryView = lazy(() =>
  import('./components/geography/GeoDictionaryView').then((m) => ({default: m.GeoDictionaryView})),
);
const GeoMapLabView = lazy(() =>
  import('./components/geography/GeoMapLabView').then((m) => ({default: m.GeoMapLabView})),
);
const GeoStudyGuideSection = lazy(() =>
  import('./components/geography/GeoStudyGuideSection').then((m) => ({
    default: m.GeoStudyGuideSection,
  })),
);
const GeoTestActiveView = lazy(() =>
  import('./components/geography/GeoTestActiveView').then((m) => ({default: m.GeoTestActiveView})),
);
const GeoTestResultsView = lazy(() =>
  import('./components/geography/GeoTestResultsView').then((m) => ({
    default: m.GeoTestResultsView,
  })),
);

const LitDetailModal = lazy(() =>
  import('./components/literature/LitDetailModal').then((m) => ({default: m.LitDetailModal})),
);
const LitDictionaryView = lazy(() =>
  import('./components/literature/LitDictionaryView').then((m) => ({
    default: m.LitDictionaryView,
  })),
);
const LitLabView = lazy(() =>
  import('./components/literature/LitLabView').then((m) => ({default: m.LitLabView})),
);
const LitStudyGuideSection = lazy(() =>
  import('./components/literature/LitStudyGuideSection').then((m) => ({
    default: m.LitStudyGuideSection,
  })),
);
const LitTestActiveView = lazy(() =>
  import('./components/literature/LitTestActiveView').then((m) => ({
    default: m.LitTestActiveView,
  })),
);
const LitTestResultsView = lazy(() =>
  import('./components/literature/LitTestResultsView').then((m) => ({
    default: m.LitTestResultsView,
  })),
);

const HistDetailModal = lazy(() =>
  import('./components/history/HistDetailModal').then((m) => ({default: m.HistDetailModal})),
);
const HistDictionaryView = lazy(() =>
  import('./components/history/HistDictionaryView').then((m) => ({default: m.HistDictionaryView})),
);
const HistLabView = lazy(() =>
  import('./components/history/HistLabView').then((m) => ({default: m.HistLabView})),
);
const HistStudyGuideSection = lazy(() =>
  import('./components/history/HistStudyGuideSection').then((m) => ({
    default: m.HistStudyGuideSection,
  })),
);
const HistTestActiveView = lazy(() =>
  import('./components/history/HistTestActiveView').then((m) => ({default: m.HistTestActiveView})),
);
const HistTestResultsView = lazy(() =>
  import('./components/history/HistTestResultsView').then((m) => ({
    default: m.HistTestResultsView,
  })),
);

const RelDetailModal = lazy(() =>
  import('./components/religion/RelDetailModal').then((m) => ({default: m.RelDetailModal})),
);
const RelDictionaryView = lazy(() =>
  import('./components/religion/RelDictionaryView').then((m) => ({default: m.RelDictionaryView})),
);
const RelLabView = lazy(() =>
  import('./components/religion/RelLabView').then((m) => ({default: m.RelLabView})),
);
const RelStudyGuideSection = lazy(() =>
  import('./components/religion/RelStudyGuideSection').then((m) => ({
    default: m.RelStudyGuideSection,
  })),
);
const RelTestActiveView = lazy(() =>
  import('./components/religion/RelTestActiveView').then((m) => ({default: m.RelTestActiveView})),
);
const RelTestResultsView = lazy(() =>
  import('./components/religion/RelTestResultsView').then((m) => ({default: m.RelTestResultsView})),
);

const PhilDetailModal = lazy(() =>
  import('./components/philosophy/PhilDetailModal').then((m) => ({default: m.PhilDetailModal})),
);
const PhilDictionaryView = lazy(() =>
  import('./components/philosophy/PhilDictionaryView').then((m) => ({
    default: m.PhilDictionaryView,
  })),
);
const PhilLabView = lazy(() =>
  import('./components/philosophy/PhilLabView').then((m) => ({default: m.PhilLabView})),
);
const PhilStudyGuideSection = lazy(() =>
  import('./components/philosophy/PhilStudyGuideSection').then((m) => ({
    default: m.PhilStudyGuideSection,
  })),
);
const PhilTestActiveView = lazy(() =>
  import('./components/philosophy/PhilTestActiveView').then((m) => ({
    default: m.PhilTestActiveView,
  })),
);
const PhilTestResultsView = lazy(() =>
  import('./components/philosophy/PhilTestResultsView').then((m) => ({
    default: m.PhilTestResultsView,
  })),
);

type TestPhase = 'setup' | 'active' | 'results';

const VALID_COMPOUND_IDS = new Set(COMPOUNDS.map((c) => c.id));
const VALID_BIOLOGY_IDS = new Set(BIOLOGY_TERMS.map((t) => t.id));
const VALID_PHYSICS_IDS = new Set(PHYSICS_TERMS.map((t) => t.id));
const VALID_GEOGRAPHY_IDS = new Set(GEOGRAPHY_TERMS.map((t) => t.id));
const VALID_LITERATURE_IDS = new Set(LITERATURE_TERMS.map((t) => t.id));
const VALID_HISTORY_IDS = new Set(HISTORY_TERMS.map((t) => t.id));
const VALID_RELIGION_IDS = new Set(RELIGION_TERMS.map((t) => t.id));
const VALID_PHILOSOPHY_IDS = new Set(PHILOSOPHY_TERMS.map((t) => t.id));

const DEFAULT_QUIZ_CONFIG: QuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

const DEFAULT_BIO_QUIZ_CONFIG: BiologyQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

const DEFAULT_PHYS_QUIZ_CONFIG: PhysicsQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

const DEFAULT_GEO_QUIZ_CONFIG: GeographyQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

const DEFAULT_LIT_QUIZ_CONFIG: LiteratureQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 15,
  topic: 'ALL',
};

const DEFAULT_HIST_QUIZ_CONFIG: HistoryQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

const DEFAULT_REL_QUIZ_CONFIG: ReligionQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

const DEFAULT_PHIL_QUIZ_CONFIG: PhilosophyQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

function ViewFallback({theme}: {theme: ScreenMode}) {
  return (
    <div
      className={`rounded-2xl p-6 min-h-[240px] flex items-center justify-center ${
        theme === 'biology'
          ? 'bio-panel'
          : theme === 'physics'
            ? 'phys-panel'
            : theme === 'geography'
              ? 'geo-panel'
              : theme === 'literature'
                ? 'lit-panel'
                : theme === 'history'
                  ? 'hist-panel'
                  : theme === 'religion'
                    ? 'rel-panel'
                    : theme === 'philosophy'
                      ? 'phil-panel'
                      : theme === 'home'
                        ? 'home-panel'
                        : 'lab-panel'
      }`}
      role="status"
      aria-label="Yükleniyor"
    >
      <div
        className={`font-mono text-xs tracking-wider animate-pulse ${
          theme === 'biology'
            ? 'text-sky-200/70'
            : theme === 'physics'
              ? 'text-violet-200/70'
              : theme === 'geography'
                ? 'text-amber-200/70'
                : theme === 'literature'
                  ? 'text-rose-200/70'
                  : theme === 'history'
                    ? 'text-orange-200/70'
                    : theme === 'religion'
                      ? 'text-teal-200/70'
                      : theme === 'philosophy'
                        ? 'text-indigo-200/70'
                        : theme === 'home'
                          ? 'text-zinc-300/70'
                          : 'text-emerald-200/70'
        }`}
      >
        YÜKLENİYOR...
      </div>
    </div>
  );
}

export default function App() {
  const [screenMode, setScreenMode] = useState<ScreenMode>('home');
  const [activeTab, setActiveTab] = useState<AppTab>('test');

  // Chemistry state
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

  // Biology state
  const [bioFavoritesList, setBioFavoritesList] = useState<string[]>(() =>
    loadBioFavoritesFromStorage().filter((id) => VALID_BIOLOGY_IDS.has(id)),
  );
  const [bioStats, setBioStats] = useState<BiologyStatsMap>(() => loadBioStatsFromStorage());
  const [bioQuizConfig, setBioQuizConfig] = useState<BiologyQuizConfig>(DEFAULT_BIO_QUIZ_CONFIG);
  const [bioTestPhase, setBioTestPhase] = useState<TestPhase>('setup');
  const [bioQuestions, setBioQuestions] = useState<BiologyQuestion[]>([]);
  const [bioCurrentIndex, setBioCurrentIndex] = useState(0);
  const [bioSelectedChoiceId, setBioSelectedChoiceId] = useState<string | null>(null);
  const [bioAnswers, setBioAnswers] = useState<BiologyAnswerRecord[]>([]);
  const [bioCurrentStreak, setBioCurrentStreak] = useState(0);
  const [detailBioTerm, setDetailBioTerm] = useState<BiologyTerm | null>(null);

  // Physics state
  const [physFavoritesList, setPhysFavoritesList] = useState<string[]>(() =>
    loadPhysFavoritesFromStorage().filter((id) => VALID_PHYSICS_IDS.has(id)),
  );
  const [physStats, setPhysStats] = useState<PhysicsStatsMap>(() => loadPhysStatsFromStorage());
  const [physQuizConfig, setPhysQuizConfig] = useState<PhysicsQuizConfig>(DEFAULT_PHYS_QUIZ_CONFIG);
  const [physTestPhase, setPhysTestPhase] = useState<TestPhase>('setup');
  const [physQuestions, setPhysQuestions] = useState<PhysicsQuestion[]>([]);
  const [physCurrentIndex, setPhysCurrentIndex] = useState(0);
  const [physSelectedChoiceId, setPhysSelectedChoiceId] = useState<string | null>(null);
  const [physAnswers, setPhysAnswers] = useState<PhysicsAnswerRecord[]>([]);
  const [physCurrentStreak, setPhysCurrentStreak] = useState(0);
  const [detailPhysTerm, setDetailPhysTerm] = useState<PhysicsTerm | null>(null);

  // Geography state
  const [geoFavoritesList, setGeoFavoritesList] = useState<string[]>(() =>
    loadGeoFavoritesFromStorage().filter((id) => VALID_GEOGRAPHY_IDS.has(id)),
  );
  const [geoStats, setGeoStats] = useState<GeographyStatsMap>(() => loadGeoStatsFromStorage());
  const [geoQuizConfig, setGeoQuizConfig] = useState<GeographyQuizConfig>(DEFAULT_GEO_QUIZ_CONFIG);
  const [geoTestPhase, setGeoTestPhase] = useState<TestPhase>('setup');
  const [geoQuestions, setGeoQuestions] = useState<GeographyQuestion[]>([]);
  const [geoCurrentIndex, setGeoCurrentIndex] = useState(0);
  const [geoSelectedChoiceId, setGeoSelectedChoiceId] = useState<string | null>(null);
  const [geoAnswers, setGeoAnswers] = useState<GeographyAnswerRecord[]>([]);
  const [geoCurrentStreak, setGeoCurrentStreak] = useState(0);
  const [detailGeoTerm, setDetailGeoTerm] = useState<GeographyTerm | null>(null);

  // Literature state
  const [litFavoritesList, setLitFavoritesList] = useState<string[]>(() =>
    Array.from(loadLitFavoritesFromStorage(VALID_LITERATURE_IDS)),
  );
  const [litStats, setLitStats] = useState<LiteratureStatsMap>(() =>
    loadLitStatsFromStorage(VALID_LITERATURE_IDS),
  );
  const [litQuizConfig, setLitQuizConfig] = useState<LiteratureQuizConfig>(DEFAULT_LIT_QUIZ_CONFIG);
  const [litTestPhase, setLitTestPhase] = useState<TestPhase>('setup');
  const [litQuestions, setLitQuestions] = useState<LiteratureQuestion[]>([]);
  const [litCurrentIndex, setLitCurrentIndex] = useState(0);
  const [litSelectedChoiceId, setLitSelectedChoiceId] = useState<string | null>(null);
  const [litAnswers, setLitAnswers] = useState<LiteratureAnswerRecord[]>([]);
  const [litCurrentStreak, setLitCurrentStreak] = useState(0);
  const [detailLitTerm, setDetailLitTerm] = useState<LiteratureTerm | null>(null);

  // History state
  const [histFavoritesList, setHistFavoritesList] = useState<string[]>(() =>
    Array.from(loadHistFavoritesFromStorage(VALID_HISTORY_IDS)),
  );
  const [histStats, setHistStats] = useState<HistoryStatsMap>(() =>
    loadHistStatsFromStorage(VALID_HISTORY_IDS),
  );
  const [histQuizConfig, setHistQuizConfig] = useState<HistoryQuizConfig>(DEFAULT_HIST_QUIZ_CONFIG);
  const [histTestPhase, setHistTestPhase] = useState<TestPhase>('setup');
  const [histQuestions, setHistQuestions] = useState<HistoryQuestion[]>([]);
  const [histCurrentIndex, setHistCurrentIndex] = useState(0);
  const [histSelectedChoiceId, setHistSelectedChoiceId] = useState<string | null>(null);
  const [histAnswers, setHistAnswers] = useState<HistoryAnswerRecord[]>([]);
  const [histCurrentStreak, setHistCurrentStreak] = useState(0);
  const [detailHistTerm, setDetailHistTerm] = useState<HistoryTerm | null>(null);

  // Religion state
  const [relFavoritesList, setRelFavoritesList] = useState<string[]>(() =>
    Array.from(loadRelFavoritesFromStorage(VALID_RELIGION_IDS)),
  );
  const [relStats, setRelStats] = useState<ReligionStatsMap>(() =>
    loadRelStatsFromStorage(VALID_RELIGION_IDS),
  );
  const [relQuizConfig, setRelQuizConfig] = useState<ReligionQuizConfig>(DEFAULT_REL_QUIZ_CONFIG);
  const [relTestPhase, setRelTestPhase] = useState<TestPhase>('setup');
  const [relQuestions, setRelQuestions] = useState<ReligionQuestion[]>([]);
  const [relCurrentIndex, setRelCurrentIndex] = useState(0);
  const [relSelectedChoiceId, setRelSelectedChoiceId] = useState<string | null>(null);
  const [relAnswers, setRelAnswers] = useState<ReligionAnswerRecord[]>([]);
  const [relCurrentStreak, setRelCurrentStreak] = useState(0);
  const [detailRelTerm, setDetailRelTerm] = useState<ReligionTerm | null>(null);

  // Philosophy state
  const [philFavoritesList, setPhilFavoritesList] = useState<string[]>(() =>
    Array.from(loadPhilFavoritesFromStorage(VALID_PHILOSOPHY_IDS)),
  );
  const [philStats, setPhilStats] = useState<PhilosophyStatsMap>(() =>
    loadPhilStatsFromStorage(VALID_PHILOSOPHY_IDS),
  );
  const [philQuizConfig, setPhilQuizConfig] = useState<PhilosophyQuizConfig>(
    DEFAULT_PHIL_QUIZ_CONFIG,
  );
  const [philTestPhase, setPhilTestPhase] = useState<TestPhase>('setup');
  const [philQuestions, setPhilQuestions] = useState<PhilosophyQuestion[]>([]);
  const [philCurrentIndex, setPhilCurrentIndex] = useState(0);
  const [philSelectedChoiceId, setPhilSelectedChoiceId] = useState<string | null>(null);
  const [philAnswers, setPhilAnswers] = useState<PhilosophyAnswerRecord[]>([]);
  const [philCurrentStreak, setPhilCurrentStreak] = useState(0);
  const [detailPhilTerm, setDetailPhilTerm] = useState<PhilosophyTerm | null>(null);

  const favoritesSet = useMemo(() => new Set(favoritesList), [favoritesList]);
  const bioFavoritesSet = useMemo(() => new Set(bioFavoritesList), [bioFavoritesList]);
  const physFavoritesSet = useMemo(() => new Set(physFavoritesList), [physFavoritesList]);
  const geoFavoritesSet = useMemo(() => new Set(geoFavoritesList), [geoFavoritesList]);
  const litFavoritesSet = useMemo(() => new Set(litFavoritesList), [litFavoritesList]);
  const histFavoritesSet = useMemo(() => new Set(histFavoritesList), [histFavoritesList]);
  const relFavoritesSet = useMemo(() => new Set(relFavoritesList), [relFavoritesList]);
  const philFavoritesSet = useMemo(() => new Set(philFavoritesList), [philFavoritesList]);

  const mistakeCount = useMemo(
    () => COMPOUNDS.filter((c) => (stats[c.id]?.wrong ?? 0) > 0).length,
    [stats],
  );
  const bioMistakeCount = useMemo(
    () => BIOLOGY_TERMS.filter((t) => (bioStats[t.id]?.wrong ?? 0) > 0).length,
    [bioStats],
  );
  const physMistakeCount = useMemo(
    () => PHYSICS_TERMS.filter((t) => (physStats[t.id]?.wrong ?? 0) > 0).length,
    [physStats],
  );
  const geoMistakeCount = useMemo(
    () => GEOGRAPHY_TERMS.filter((t) => (geoStats[t.id]?.wrong ?? 0) > 0).length,
    [geoStats],
  );
  const litMistakeCount = useMemo(
    () => LITERATURE_TERMS.filter((t) => (litStats[t.id]?.wrong ?? 0) > 0).length,
    [litStats],
  );
  const histMistakeCount = useMemo(
    () => HISTORY_TERMS.filter((t) => (histStats[t.id]?.wrong ?? 0) > 0).length,
    [histStats],
  );
  const relMistakeCount = useMemo(
    () => RELIGION_TERMS.filter((t) => (relStats[t.id]?.wrong ?? 0) > 0).length,
    [relStats],
  );
  const philMistakeCount = useMemo(
    () => PHILOSOPHY_TERMS.filter((t) => (philStats[t.id]?.wrong ?? 0) > 0).length,
    [philStats],
  );

  // Sync root document background color with current screen theme
  useEffect(() => {
    const bgColor =
      screenMode === 'home'
        ? '#090a0d'
        : screenMode === 'biology'
          ? '#04111a'
          : screenMode === 'physics'
            ? '#0a0716'
            : screenMode === 'geography'
              ? '#130c05'
              : screenMode === 'literature'
                ? '#16070d'
                : screenMode === 'history'
                  ? '#170b05'
                  : screenMode === 'religion'
                    ? '#041515'
                    : screenMode === 'philosophy'
                      ? '#080c1c'
                      : '#06140f';
    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
  }, [screenMode]);

  useEffect(() => {
    saveFavoritesToStorage(favoritesList);
  }, [favoritesList]);

  useEffect(() => {
    saveStatsToStorage(stats);
  }, [stats]);

  useEffect(() => {
    saveBioFavoritesToStorage(bioFavoritesList);
  }, [bioFavoritesList]);

  useEffect(() => {
    saveBioStatsToStorage(bioStats);
  }, [bioStats]);

  useEffect(() => {
    savePhysFavoritesToStorage(physFavoritesList);
  }, [physFavoritesList]);

  useEffect(() => {
    savePhysStatsToStorage(physStats);
  }, [physStats]);

  useEffect(() => {
    saveGeoFavoritesToStorage(geoFavoritesList);
  }, [geoFavoritesList]);

  useEffect(() => {
    saveGeoStatsToStorage(geoStats);
  }, [geoStats]);

  useEffect(() => {
    saveLitFavoritesToStorage(litFavoritesSet);
  }, [litFavoritesSet]);

  useEffect(() => {
    saveLitStatsToStorage(litStats);
  }, [litStats]);

  useEffect(() => {
    saveHistFavoritesToStorage(histFavoritesSet);
  }, [histFavoritesSet]);

  useEffect(() => {
    saveHistStatsToStorage(histStats);
  }, [histStats]);

  useEffect(() => {
    saveRelFavoritesToStorage(relFavoritesSet);
  }, [relFavoritesSet]);

  useEffect(() => {
    saveRelStatsToStorage(relStats);
  }, [relStats]);

  useEffect(() => {
    savePhilFavoritesToStorage(philFavoritesSet);
  }, [philFavoritesSet]);

  useEffect(() => {
    savePhilStatsToStorage(philStats);
  }, [philStats]);

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

  // Chemistry handlers
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
    setScreenMode('chemistry');
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
    }
  };

  const quizSummary = useMemo(() => calculateQuizSummary(answers), [answers]);

  // Biology handlers
  const bioQuizPool = useMemo(
    () => getBiologyQuizPool(BIOLOGY_TERMS, bioQuizConfig, bioFavoritesSet, bioStats),
    [bioQuizConfig, bioFavoritesSet, bioStats],
  );

  const bioExamPool = useMemo(
    () =>
      getBiologyExamQuestionPool(
        BIOLOGY_EXAM_QUESTIONS,
        BIOLOGY_TERMS,
        bioQuizConfig,
        bioFavoritesSet,
        bioStats,
      ),
    [bioQuizConfig, bioFavoritesSet, bioStats],
  );

  const effectiveBioPoolCount = useMemo(() => {
    if (bioQuizConfig.questionMode === 'EXAM_STYLE') {
      return bioExamPool.length > 0 ? bioExamPool.length : bioQuizPool.length;
    }
    if (bioQuizConfig.questionMode === 'MIXED') {
      return bioQuizPool.length + bioExamPool.length;
    }
    return bioQuizPool.length;
  }, [bioQuizConfig.questionMode, bioExamPool.length, bioQuizPool.length]);

  const handleToggleBioFavorite = (termId: string) => {
    setBioFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetBioStats = () => {
    setBioStats({});
  };

  const startBioQuizFromPool = (
    pool: readonly BiologyTerm[],
    configToUse: BiologyQuizConfig = bioQuizConfig,
  ) => {
    const generated = generateBiologyQuestions(
      pool,
      BIOLOGY_TERMS,
      configToUse,
      Math.random,
      BIOLOGY_EXAM_QUESTIONS,
      bioFavoritesSet,
      bioStats,
    );
    if (generated.length === 0) return;

    setBioQuestions(generated);
    setBioCurrentIndex(0);
    setBioSelectedChoiceId(null);
    setBioAnswers([]);
    setBioCurrentStreak(0);
    setBioTestPhase('active');
    setScreenMode('biology');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectBioChoice = (choiceId: string, isCorrect: boolean) => {
    if (bioSelectedChoiceId !== null) return;
    const question = bioQuestions[bioCurrentIndex];
    if (!question) return;

    setBioSelectedChoiceId(choiceId);
    setBioAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setBioCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setBioStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextBioQuestion = () => {
    if (bioCurrentIndex + 1 < bioQuestions.length) {
      setBioCurrentIndex((prev) => prev + 1);
      setBioSelectedChoiceId(null);
    } else {
      setBioTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const bioQuizSummary = useMemo(() => calculateBiologySummary(bioAnswers), [bioAnswers]);

  // Physics handlers
  const physQuizPool = useMemo(
    () => getPhysicsQuizPool(PHYSICS_TERMS, physQuizConfig, physFavoritesSet, physStats),
    [physQuizConfig, physFavoritesSet, physStats],
  );

  const physExamPool = useMemo(
    () =>
      getPhysicsExamQuestionPool(
        PHYSICS_EXAM_QUESTIONS,
        PHYSICS_TERMS,
        physQuizConfig,
        physFavoritesSet,
        physStats,
      ),
    [physQuizConfig, physFavoritesSet, physStats],
  );

  const effectivePhysPoolCount = useMemo(() => {
    if (physQuizConfig.questionMode === 'EXAM_STYLE') {
      return physExamPool.length > 0 ? physExamPool.length : physQuizPool.length;
    }
    if (physQuizConfig.questionMode === 'MIXED') {
      return physQuizPool.length + physExamPool.length;
    }
    return physQuizPool.length;
  }, [physQuizConfig.questionMode, physExamPool.length, physQuizPool.length]);

  const handleTogglePhysFavorite = (termId: string) => {
    setPhysFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetPhysStats = () => {
    setPhysStats({});
  };

  const startPhysQuizFromPool = (
    pool: readonly PhysicsTerm[],
    configToUse: PhysicsQuizConfig = physQuizConfig,
  ) => {
    const generated = generatePhysicsQuestions(
      pool,
      PHYSICS_TERMS,
      configToUse,
      Math.random,
      PHYSICS_EXAM_QUESTIONS,
      physFavoritesSet,
      physStats,
    );
    if (generated.length === 0) return;

    setPhysQuestions(generated);
    setPhysCurrentIndex(0);
    setPhysSelectedChoiceId(null);
    setPhysAnswers([]);
    setPhysCurrentStreak(0);
    setPhysTestPhase('active');
    setScreenMode('physics');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectPhysChoice = (choiceId: string, isCorrect: boolean) => {
    if (physSelectedChoiceId !== null) return;
    const question = physQuestions[physCurrentIndex];
    if (!question) return;

    setPhysSelectedChoiceId(choiceId);
    setPhysAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setPhysCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setPhysStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextPhysQuestion = () => {
    if (physCurrentIndex + 1 < physQuestions.length) {
      setPhysCurrentIndex((prev) => prev + 1);
      setPhysSelectedChoiceId(null);
    } else {
      setPhysTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const physQuizSummary = useMemo(() => calculatePhysicsSummary(physAnswers), [physAnswers]);

  // Geography handlers
  const geoQuizPool = useMemo(
    () => getGeographyQuizPool(GEOGRAPHY_TERMS, geoQuizConfig, geoFavoritesSet, geoStats),
    [geoQuizConfig, geoFavoritesSet, geoStats],
  );

  const geoExamPool = useMemo(
    () =>
      getGeographyExamQuestionPool(
        GEOGRAPHY_EXAM_QUESTIONS,
        GEOGRAPHY_TERMS,
        geoQuizConfig,
        geoFavoritesSet,
        geoStats,
      ),
    [geoQuizConfig, geoFavoritesSet, geoStats],
  );

  const effectiveGeoPoolCount = useMemo(() => {
    if (geoQuizConfig.questionMode === 'EXAM_STYLE') {
      return geoExamPool.length > 0 ? geoExamPool.length : geoQuizPool.length;
    }
    if (geoQuizConfig.questionMode === 'MIXED') {
      return geoQuizPool.length + geoExamPool.length;
    }
    return geoQuizPool.length;
  }, [geoQuizConfig.questionMode, geoExamPool.length, geoQuizPool.length]);

  const handleToggleGeoFavorite = (termId: string) => {
    setGeoFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetGeoStats = () => {
    setGeoStats({});
  };

  const startGeoQuizFromPool = (
    pool: readonly GeographyTerm[],
    configToUse: GeographyQuizConfig = geoQuizConfig,
  ) => {
    const generated = generateGeographyQuestions(
      pool,
      GEOGRAPHY_TERMS,
      configToUse,
      Math.random,
      GEOGRAPHY_EXAM_QUESTIONS,
      geoFavoritesSet,
      geoStats,
    );
    if (generated.length === 0) return;

    setGeoQuestions(generated);
    setGeoCurrentIndex(0);
    setGeoSelectedChoiceId(null);
    setGeoAnswers([]);
    setGeoCurrentStreak(0);
    setGeoTestPhase('active');
    setScreenMode('geography');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectGeoChoice = (choiceId: string, isCorrect: boolean) => {
    if (geoSelectedChoiceId !== null) return;
    const question = geoQuestions[geoCurrentIndex];
    if (!question) return;

    setGeoSelectedChoiceId(choiceId);
    setGeoAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setGeoCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setGeoStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextGeoQuestion = () => {
    if (geoCurrentIndex + 1 < geoQuestions.length) {
      setGeoCurrentIndex((prev) => prev + 1);
      setGeoSelectedChoiceId(null);
    } else {
      setGeoTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const geoQuizSummary = useMemo(() => calculateGeographySummary(geoAnswers), [geoAnswers]);

  // Literature handlers
  const litQuizPool = useMemo(
    () => getLiteratureQuizPool(LITERATURE_TERMS, litQuizConfig, litFavoritesSet, litStats),
    [litQuizConfig, litFavoritesSet, litStats],
  );

  const litExamPool = useMemo(
    () =>
      getLiteratureExamQuestionPool(
        LITERATURE_EXAM_QUESTIONS,
        LITERATURE_TERMS,
        litQuizConfig,
        litFavoritesSet,
        litStats,
      ),
    [litQuizConfig, litFavoritesSet, litStats],
  );

  const effectiveLitPoolCount = useMemo(() => {
    if (litQuizConfig.questionMode === 'EXAM_STYLE') {
      return litExamPool.length > 0 ? litExamPool.length : litQuizPool.length;
    }
    if (litQuizConfig.questionMode === 'MIXED') {
      return litQuizPool.length + litExamPool.length;
    }
    return litQuizPool.length;
  }, [litQuizConfig.questionMode, litExamPool.length, litQuizPool.length]);

  const handleToggleLitFavorite = (termId: string) => {
    setLitFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetLitStats = () => {
    setLitStats({});
  };

  const startLitQuizFromPool = (
    pool: readonly LiteratureTerm[],
    configToUse: LiteratureQuizConfig = litQuizConfig,
  ) => {
    const generated = generateLiteratureQuestions(
      pool,
      LITERATURE_TERMS,
      configToUse,
      Math.random,
      LITERATURE_EXAM_QUESTIONS,
      litFavoritesSet,
      litStats,
    );
    if (generated.length === 0) return;

    setLitQuestions(generated);
    setLitCurrentIndex(0);
    setLitSelectedChoiceId(null);
    setLitAnswers([]);
    setLitCurrentStreak(0);
    setLitTestPhase('active');
    setScreenMode('literature');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectLitChoice = (choiceId: string, isCorrect: boolean) => {
    if (litSelectedChoiceId !== null) return;
    const question = litQuestions[litCurrentIndex];
    if (!question) return;

    setLitSelectedChoiceId(choiceId);
    setLitAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setLitCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setLitStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextLitQuestion = () => {
    if (litCurrentIndex + 1 < litQuestions.length) {
      setLitCurrentIndex((prev) => prev + 1);
      setLitSelectedChoiceId(null);
    } else {
      setLitTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const litQuizSummary = useMemo(() => calculateLiteratureSummary(litAnswers), [litAnswers]);

  // History handlers
  const histQuizPool = useMemo(
    () => getHistoryQuizPool(HISTORY_TERMS, histQuizConfig, histFavoritesSet, histStats),
    [histQuizConfig, histFavoritesSet, histStats],
  );

  const histExamPool = useMemo(
    () =>
      getHistoryExamQuestionPool(
        HISTORY_EXAM_QUESTIONS,
        HISTORY_TERMS,
        histQuizConfig,
        histFavoritesSet,
        histStats,
      ),
    [histQuizConfig, histFavoritesSet, histStats],
  );

  const effectiveHistPoolCount = useMemo(() => {
    if (histQuizConfig.questionMode === 'EXAM_STYLE') {
      return histExamPool.length > 0 ? histExamPool.length : histQuizPool.length;
    }
    if (histQuizConfig.questionMode === 'MIXED') {
      return histQuizPool.length + histExamPool.length;
    }
    return histQuizPool.length;
  }, [histQuizConfig.questionMode, histExamPool.length, histQuizPool.length]);

  const handleToggleHistFavorite = (termId: string) => {
    setHistFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetHistStats = () => {
    setHistStats({});
  };

  const startHistQuizFromPool = (
    pool: readonly HistoryTerm[],
    configToUse: HistoryQuizConfig = histQuizConfig,
  ) => {
    const generated = generateHistoryQuestions(
      pool,
      HISTORY_TERMS,
      configToUse,
      Math.random,
      HISTORY_EXAM_QUESTIONS,
      histFavoritesSet,
      histStats,
    );
    if (generated.length === 0) return;

    setHistQuestions(generated);
    setHistCurrentIndex(0);
    setHistSelectedChoiceId(null);
    setHistAnswers([]);
    setHistCurrentStreak(0);
    setHistTestPhase('active');
    setScreenMode('history');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectHistChoice = (choiceId: string, isCorrect: boolean) => {
    if (histSelectedChoiceId !== null) return;
    const question = histQuestions[histCurrentIndex];
    if (!question) return;

    setHistSelectedChoiceId(choiceId);
    setHistAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setHistCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setHistStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextHistQuestion = () => {
    if (histCurrentIndex + 1 < histQuestions.length) {
      setHistCurrentIndex((prev) => prev + 1);
      setHistSelectedChoiceId(null);
    } else {
      setHistTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const histQuizSummary = useMemo(() => calculateHistorySummary(histAnswers), [histAnswers]);

  // Religion handlers
  const relQuizPool = useMemo(
    () => getReligionQuizPool(RELIGION_TERMS, relQuizConfig, relFavoritesSet, relStats),
    [relQuizConfig, relFavoritesSet, relStats],
  );

  const relExamPool = useMemo(
    () =>
      getReligionExamQuestionPool(
        RELIGION_EXAM_QUESTIONS,
        RELIGION_TERMS,
        relQuizConfig,
        relFavoritesSet,
        relStats,
      ),
    [relQuizConfig, relFavoritesSet, relStats],
  );

  const effectiveRelPoolCount = useMemo(() => {
    if (relQuizConfig.questionMode === 'EXAM_STYLE') {
      return relExamPool.length > 0 ? relExamPool.length : relQuizPool.length;
    }
    if (relQuizConfig.questionMode === 'MIXED') {
      return relQuizPool.length + relExamPool.length;
    }
    return relQuizPool.length;
  }, [relQuizConfig.questionMode, relExamPool.length, relQuizPool.length]);

  const handleToggleRelFavorite = (termId: string) => {
    setRelFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetRelStats = () => {
    setRelStats({});
  };

  const startRelQuizFromPool = (
    pool: readonly ReligionTerm[],
    configToUse: ReligionQuizConfig = relQuizConfig,
  ) => {
    const generated = generateReligionQuestions(
      pool,
      RELIGION_TERMS,
      configToUse,
      Math.random,
      RELIGION_EXAM_QUESTIONS,
      relFavoritesSet,
      relStats,
    );
    if (generated.length === 0) return;

    setRelQuestions(generated);
    setRelCurrentIndex(0);
    setRelSelectedChoiceId(null);
    setRelAnswers([]);
    setRelCurrentStreak(0);
    setRelTestPhase('active');
    setScreenMode('religion');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectRelChoice = (choiceId: string, isCorrect: boolean) => {
    if (relSelectedChoiceId !== null) return;
    const question = relQuestions[relCurrentIndex];
    if (!question) return;

    setRelSelectedChoiceId(choiceId);
    setRelAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setRelCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setRelStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextRelQuestion = () => {
    if (relCurrentIndex + 1 < relQuestions.length) {
      setRelCurrentIndex((prev) => prev + 1);
      setRelSelectedChoiceId(null);
    } else {
      setRelTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const relQuizSummary = useMemo(() => calculateReligionSummary(relAnswers), [relAnswers]);

  // Philosophy handlers
  const philQuizPool = useMemo(
    () => getPhilosophyQuizPool(PHILOSOPHY_TERMS, philQuizConfig, philFavoritesSet, philStats),
    [philQuizConfig, philFavoritesSet, philStats],
  );

  const philExamPool = useMemo(
    () =>
      getPhilosophyExamQuestionPool(
        PHILOSOPHY_EXAM_QUESTIONS,
        PHILOSOPHY_TERMS,
        philQuizConfig,
        philFavoritesSet,
        philStats,
      ),
    [philQuizConfig, philFavoritesSet, philStats],
  );

  const effectivePhilPoolCount = useMemo(() => {
    if (philQuizConfig.questionMode === 'EXAM_STYLE') {
      return philExamPool.length > 0 ? philExamPool.length : philQuizPool.length;
    }
    if (philQuizConfig.questionMode === 'MIXED') {
      return philQuizPool.length + philExamPool.length;
    }
    return philQuizPool.length;
  }, [philQuizConfig.questionMode, philExamPool.length, philQuizPool.length]);

  const handleTogglePhilFavorite = (termId: string) => {
    setPhilFavoritesList((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId],
    );
  };

  const handleResetPhilStats = () => {
    setPhilStats({});
  };

  const startPhilQuizFromPool = (
    pool: readonly PhilosophyTerm[],
    configToUse: PhilosophyQuizConfig = philQuizConfig,
  ) => {
    const generated = generatePhilosophyQuestions(
      pool,
      PHILOSOPHY_TERMS,
      configToUse,
      Math.random,
      PHILOSOPHY_EXAM_QUESTIONS,
      philFavoritesSet,
      philStats,
    );
    if (generated.length === 0) return;

    setPhilQuestions(generated);
    setPhilCurrentIndex(0);
    setPhilSelectedChoiceId(null);
    setPhilAnswers([]);
    setPhilCurrentStreak(0);
    setPhilTestPhase('active');
    setScreenMode('philosophy');
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSelectPhilChoice = (choiceId: string, isCorrect: boolean) => {
    if (philSelectedChoiceId !== null) return;
    const question = philQuestions[philCurrentIndex];
    if (!question) return;

    setPhilSelectedChoiceId(choiceId);
    setPhilAnswers((prev) => [...prev, {question, selectedId: choiceId, isCorrect}]);
    setPhilCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));

    setPhilStats((prev) => {
      const existing = prev[question.term.id] ?? {correct: 0, wrong: 0};
      return {
        ...prev,
        [question.term.id]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          wrong: existing.wrong + (isCorrect ? 0 : 1),
        },
      };
    });
  };

  const handleNextPhilQuestion = () => {
    if (philCurrentIndex + 1 < philQuestions.length) {
      setPhilCurrentIndex((prev) => prev + 1);
      setPhilSelectedChoiceId(null);
    } else {
      setPhilTestPhase('results');
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  };

  const philQuizSummary = useMemo(() => calculatePhilosophySummary(philAnswers), [philAnswers]);

  const handleSwitchTab = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleEnterSubject = (subject: SubjectId) => {
    setScreenMode(subject);
    setActiveTab('test');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleReturnHome = () => {
    setScreenMode('home');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const isBiology = screenMode === 'biology';
  const isPhysics = screenMode === 'physics';
  const isGeography = screenMode === 'geography';
  const isLiterature = screenMode === 'literature';
  const isHistory = screenMode === 'history';
  const isReligion = screenMode === 'religion';
  const isPhilosophy = screenMode === 'philosophy';
  const canvasClass =
    screenMode === 'home'
      ? 'home-canvas'
      : isBiology
        ? 'bio-canvas'
        : isPhysics
          ? 'phys-canvas'
          : isGeography
            ? 'geo-canvas'
            : isLiterature
              ? 'lit-canvas'
              : isHistory
                ? 'hist-canvas'
                : isReligion
                  ? 'rel-canvas'
                  : isPhilosophy
                    ? 'phil-canvas'
                    : 'lab-canvas';
  const gridClass =
    screenMode === 'home'
      ? 'home-grid-overlay'
      : isBiology
        ? 'bio-grid-overlay'
        : isPhysics
          ? 'phys-grid-overlay'
          : isGeography
            ? 'geo-grid-overlay'
            : isLiterature
              ? 'lit-grid-overlay'
              : isHistory
                ? 'hist-grid-overlay'
                : isReligion
                  ? 'rel-grid-overlay'
                  : isPhilosophy
                    ? 'phil-grid-overlay'
                    : 'lab-grid-overlay';

  return (
    <div className={`min-h-[100dvh] ${canvasClass} flex flex-col overflow-x-clip`}>
      <div className={`fixed inset-0 ${gridClass} pointer-events-none`} aria-hidden="true" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-3.5 sm:px-6 pt-3.5 sm:pt-4 pb-2.5 sm:pb-3 flex items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {screenMode !== 'home' && (
            <button
              type="button"
              onClick={handleReturnHome}
              aria-label="Ana Menüye Dön"
              className={`min-h-[42px] px-2.5 sm:px-3 rounded-xl border flex items-center gap-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isBiology
                  ? 'bg-[#09202e]/90 border-sky-400/25 text-sky-100/85 hover:text-white hover:border-sky-400/50'
                  : isPhysics
                    ? 'bg-[#140c29]/90 border-violet-400/25 text-violet-100/85 hover:text-white hover:border-violet-400/50'
                    : isGeography
                      ? 'bg-[#211408]/90 border-amber-400/25 text-amber-100/85 hover:text-white hover:border-amber-400/50'
                      : isLiterature
                        ? 'bg-[#260c17]/90 border-rose-400/25 text-rose-100/85 hover:text-white hover:border-rose-400/50'
                        : isHistory
                          ? 'bg-[#281208]/90 border-orange-400/25 text-orange-100/85 hover:text-white hover:border-orange-400/50'
                          : isReligion
                            ? 'bg-[#072020]/90 border-teal-400/25 text-teal-100/85 hover:text-white hover:border-teal-400/50'
                            : isPhilosophy
                              ? 'bg-[#101633]/90 border-indigo-400/25 text-indigo-100/85 hover:text-white hover:border-indigo-400/50'
                              : 'bg-[#0d261e]/90 border-emerald-400/25 text-emerald-100/85 hover:text-white hover:border-emerald-400/50'
              }`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Ana Menü</span>
            </button>
          )}

          {screenMode === 'home' ? (
            <HomeLogo />
          ) : isBiology ? (
            <BioDnaLogo />
          ) : isPhysics ? (
            <PhysicsAtomLogo />
          ) : isGeography ? (
            <GeographyGlobeLogo />
          ) : isLiterature ? (
            <LiteratureQuillLogo />
          ) : isHistory ? (
            <HistoryLandmarkLogo />
          ) : isReligion ? (
            <ReligionStarLogo />
          ) : isPhilosophy ? (
            <PhilosophyScaleLogo />
          ) : (
            <ErlenmeyerLogo />
          )}

          <div className="flex items-baseline gap-2 min-w-0">
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-white truncate">
              formullab
            </h1>
            {screenMode !== 'home' && (
              <span
                className={`font-mono text-[11px] sm:text-xs font-medium whitespace-nowrap ${
                  isBiology
                    ? 'text-sky-300/90'
                    : isPhysics
                      ? 'text-violet-300/90'
                      : isGeography
                        ? 'text-amber-300/90'
                        : isLiterature
                          ? 'text-rose-300/90'
                          : isHistory
                            ? 'text-orange-300/90'
                            : isReligion
                              ? 'text-teal-300/90'
                              : isPhilosophy
                                ? 'text-indigo-300/90'
                                : 'text-emerald-300/90'
                }`}
              >
                ·{' '}
                {isBiology
                  ? 'Biyoloji'
                  : isPhysics
                    ? 'Fizik'
                    : isGeography
                      ? 'Coğrafya'
                      : isLiterature
                        ? 'Türkçe & Edebiyat'
                        : isHistory
                          ? 'Tarih'
                          : isReligion
                            ? 'Din Kültürü'
                            : isPhilosophy
                              ? 'Felsefe'
                              : 'Kimya'}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton theme={screenMode} />
          <AudioControl theme={screenMode} />
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`relative z-10 flex-1 w-full max-w-4xl mx-auto px-3.5 sm:px-6 pt-1.5 sm:pt-2 flex flex-col justify-between ${
          screenMode === 'home'
            ? 'pb-8 sm:pb-10'
            : 'pb-[calc(5.75rem+env(safe-area-inset-bottom))] sm:pb-28'
        }`}
      >
        <div>
          {screenMode === 'home' ? (
            <HomeWelcomeMenu
              chemistryStats={{
                totalItems: COMPOUNDS.length,
                favoriteCount: favoritesSet.size,
                mistakeCount,
              }}
              biologyStats={{
                totalItems: BIOLOGY_TERMS.length,
                favoriteCount: bioFavoritesSet.size,
                mistakeCount: bioMistakeCount,
              }}
              physicsStats={{
                totalItems: PHYSICS_TERMS.length,
                favoriteCount: physFavoritesSet.size,
                mistakeCount: physMistakeCount,
              }}
              geographyStats={{
                totalItems: GEOGRAPHY_TERMS.length,
                favoriteCount: geoFavoritesSet.size,
                mistakeCount: geoMistakeCount,
              }}
              literatureStats={{
                totalItems: LITERATURE_TERMS.length,
                favoriteCount: litFavoritesSet.size,
                mistakeCount: litMistakeCount,
              }}
              historyStats={{
                totalItems: HISTORY_TERMS.length,
                favoriteCount: histFavoritesSet.size,
                mistakeCount: histMistakeCount,
              }}
              religionStats={{
                totalItems: RELIGION_TERMS.length,
                favoriteCount: relFavoritesSet.size,
                mistakeCount: relMistakeCount,
              }}
              philosophyStats={{
                totalItems: PHILOSOPHY_TERMS.length,
                favoriteCount: philFavoritesSet.size,
                mistakeCount: philMistakeCount,
              }}
              examQuestionCount={BIOLOGY_EXAM_QUESTIONS.length}
              physicsExamCount={PHYSICS_EXAM_QUESTIONS.length}
              geographyExamCount={GEOGRAPHY_EXAM_QUESTIONS.length}
              literatureExamCount={LITERATURE_EXAM_QUESTIONS.length}
              historyExamCount={HISTORY_EXAM_QUESTIONS.length}
              religionExamCount={RELIGION_EXAM_QUESTIONS.length}
              philosophyExamCount={PHILOSOPHY_EXAM_QUESTIONS.length}
              onEnterSubject={handleEnterSubject}
            />
          ) : (
            <Suspense fallback={<ViewFallback theme={screenMode} />}>
              {/* CHEMISTRY VIEWS */}
              {screenMode === 'chemistry' && (
                <>
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
                </>
              )}

              {/* BIOLOGY VIEWS */}
              {screenMode === 'biology' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {bioTestPhase === 'setup' && (
                        <BioTestSetupView
                          config={bioQuizConfig}
                          favoriteCount={bioFavoritesSet.size}
                          mistakeCount={bioMistakeCount}
                          poolCount={effectiveBioPoolCount}
                          onChangeConfig={setBioQuizConfig}
                          onStartTest={() => startBioQuizFromPool(bioQuizPool, bioQuizConfig)}
                        />
                      )}

                      {bioTestPhase === 'active' && (
                        <BioTestActiveView
                          questions={bioQuestions}
                          currentIndex={bioCurrentIndex}
                          answers={bioAnswers}
                          currentStreak={bioCurrentStreak}
                          selectedId={bioSelectedChoiceId}
                          onSelectChoice={handleSelectBioChoice}
                          onNext={handleNextBioQuestion}
                          onExit={() => setBioTestPhase('setup')}
                        />
                      )}

                      {bioTestPhase === 'results' && (
                        <BioTestResultsView
                          summary={bioQuizSummary}
                          favorites={bioFavoritesSet}
                          onReturnSetup={() => setBioTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startBioQuizFromPool(bioQuizPool, bioQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startBioQuizFromPool(mistakes, {
                              ...bioQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : 20,
                            })
                          }
                          onSelectTerm={(term) => setDetailBioTerm(term)}
                          onToggleFavorite={handleToggleBioFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && (
                    <BioLabView onExit={() => handleSwitchTab('test')} />
                  )}

                  {activeTab === 'dictionary' && (
                    <BioDictionaryView
                      terms={BIOLOGY_TERMS}
                      favorites={bioFavoritesSet}
                      stats={bioStats}
                      mistakeCount={bioMistakeCount}
                      onToggleFavorite={handleToggleBioFavorite}
                      onSelectTerm={(term) => setDetailBioTerm(term)}
                      onResetStats={handleResetBioStats}
                    />
                  )}

                  {activeTab === 'guide' && <BioStudyGuideSection standalone />}
                </>
              )}

              {/* PHYSICS VIEWS */}
              {screenMode === 'physics' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {physTestPhase === 'setup' && (
                        <PhysicsTestSetupView
                          config={physQuizConfig}
                          favoriteCount={physFavoritesSet.size}
                          mistakeCount={physMistakeCount}
                          poolCount={effectivePhysPoolCount}
                          onChangeConfig={setPhysQuizConfig}
                          onStartTest={() => startPhysQuizFromPool(physQuizPool, physQuizConfig)}
                        />
                      )}

                      {physTestPhase === 'active' && (
                        <PhysicsTestActiveView
                          questions={physQuestions}
                          currentIndex={physCurrentIndex}
                          answers={physAnswers}
                          currentStreak={physCurrentStreak}
                          selectedId={physSelectedChoiceId}
                          onSelectChoice={handleSelectPhysChoice}
                          onNext={handleNextPhysQuestion}
                          onExit={() => setPhysTestPhase('setup')}
                        />
                      )}

                      {physTestPhase === 'results' && (
                        <PhysicsTestResultsView
                          summary={physQuizSummary}
                          favorites={physFavoritesSet}
                          onReturnSetup={() => setPhysTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startPhysQuizFromPool(physQuizPool, physQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startPhysQuizFromPool(mistakes, {
                              ...physQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : 20,
                            })
                          }
                          onSelectTerm={(term) => setDetailPhysTerm(term)}
                          onToggleFavorite={handleTogglePhysFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && (
                    <PhysicsLabView onExit={() => handleSwitchTab('test')} />
                  )}

                  {activeTab === 'dictionary' && (
                    <PhysicsDictionaryView
                      terms={PHYSICS_TERMS}
                      favorites={physFavoritesSet}
                      stats={physStats}
                      mistakeCount={physMistakeCount}
                      onToggleFavorite={handleTogglePhysFavorite}
                      onSelectTerm={(term) => setDetailPhysTerm(term)}
                      onResetStats={handleResetPhysStats}
                    />
                  )}

                  {activeTab === 'guide' && <PhysicsStudyGuideSection standalone />}
                </>
              )}

              {/* GEOGRAPHY VIEWS */}
              {screenMode === 'geography' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {geoTestPhase === 'setup' && (
                        <GeoTestSetupView
                          config={geoQuizConfig}
                          favoriteCount={geoFavoritesSet.size}
                          mistakeCount={geoMistakeCount}
                          poolCount={effectiveGeoPoolCount}
                          onChangeConfig={setGeoQuizConfig}
                          onStartTest={() => startGeoQuizFromPool(geoQuizPool, geoQuizConfig)}
                        />
                      )}

                      {geoTestPhase === 'active' && (
                        <GeoTestActiveView
                          questions={geoQuestions}
                          currentIndex={geoCurrentIndex}
                          answers={geoAnswers}
                          currentStreak={geoCurrentStreak}
                          selectedId={geoSelectedChoiceId}
                          onSelectChoice={handleSelectGeoChoice}
                          onNext={handleNextGeoQuestion}
                          onExit={() => setGeoTestPhase('setup')}
                        />
                      )}

                      {geoTestPhase === 'results' && (
                        <GeoTestResultsView
                          summary={geoQuizSummary}
                          favorites={geoFavoritesSet}
                          onReturnSetup={() => setGeoTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startGeoQuizFromPool(geoQuizPool, geoQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startGeoQuizFromPool(mistakes, {
                              ...geoQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : 20,
                            })
                          }
                          onSelectTerm={(term) => setDetailGeoTerm(term)}
                          onToggleFavorite={handleToggleGeoFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && (
                    <GeoMapLabView onExit={() => handleSwitchTab('test')} />
                  )}

                  {activeTab === 'dictionary' && (
                    <GeoDictionaryView
                      terms={GEOGRAPHY_TERMS}
                      favorites={geoFavoritesSet}
                      stats={geoStats}
                      mistakeCount={geoMistakeCount}
                      onToggleFavorite={handleToggleGeoFavorite}
                      onSelectTerm={(term) => setDetailGeoTerm(term)}
                      onResetStats={handleResetGeoStats}
                    />
                  )}

                  {activeTab === 'guide' && <GeoStudyGuideSection standalone />}
                </>
              )}

              {/* TURKISH & LITERATURE VIEWS */}
              {screenMode === 'literature' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {litTestPhase === 'setup' && (
                        <LitTestSetupView
                          config={litQuizConfig}
                          favoriteCount={litFavoritesSet.size}
                          mistakeCount={litMistakeCount}
                          poolCount={effectiveLitPoolCount}
                          onChangeConfig={setLitQuizConfig}
                          onStartTest={() => startLitQuizFromPool(litQuizPool, litQuizConfig)}
                        />
                      )}

                      {litTestPhase === 'active' && (
                        <LitTestActiveView
                          questions={litQuestions}
                          currentIndex={litCurrentIndex}
                          answers={litAnswers}
                          currentStreak={litCurrentStreak}
                          selectedId={litSelectedChoiceId}
                          onSelectChoice={handleSelectLitChoice}
                          onNext={handleNextLitQuestion}
                          onExit={() => setLitTestPhase('setup')}
                        />
                      )}

                      {litTestPhase === 'results' && (
                        <LitTestResultsView
                          summary={litQuizSummary}
                          favorites={litFavoritesSet}
                          onReturnSetup={() => setLitTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startLitQuizFromPool(litQuizPool, litQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startLitQuizFromPool(mistakes, {
                              ...litQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : mistakes.length <= 20
                                      ? 20
                                      : 30,
                            })
                          }
                          onSelectTerm={(term) => setDetailLitTerm(term)}
                          onToggleFavorite={handleToggleLitFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && <LitLabView />}

                  {activeTab === 'dictionary' && (
                    <LitDictionaryView
                      terms={LITERATURE_TERMS}
                      favorites={litFavoritesSet}
                      stats={litStats}
                      mistakeCount={litMistakeCount}
                      onToggleFavorite={handleToggleLitFavorite}
                      onSelectTerm={(term) => setDetailLitTerm(term)}
                      onResetStats={handleResetLitStats}
                    />
                  )}

                  {activeTab === 'guide' && <LitStudyGuideSection standalone />}
                </>
              )}

              {/* HISTORY VIEWS */}
              {screenMode === 'history' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {histTestPhase === 'setup' && (
                        <HistTestSetupView
                          config={histQuizConfig}
                          favoriteCount={histFavoritesSet.size}
                          mistakeCount={histMistakeCount}
                          poolCount={effectiveHistPoolCount}
                          onChangeConfig={setHistQuizConfig}
                          onStartTest={() => startHistQuizFromPool(histQuizPool, histQuizConfig)}
                        />
                      )}

                      {histTestPhase === 'active' && (
                        <HistTestActiveView
                          questions={histQuestions}
                          currentIndex={histCurrentIndex}
                          answers={histAnswers}
                          currentStreak={histCurrentStreak}
                          selectedId={histSelectedChoiceId}
                          onSelectChoice={handleSelectHistChoice}
                          onNext={handleNextHistQuestion}
                          onExit={() => setHistTestPhase('setup')}
                        />
                      )}

                      {histTestPhase === 'results' && (
                        <HistTestResultsView
                          summary={histQuizSummary}
                          favorites={histFavoritesSet}
                          onReturnSetup={() => setHistTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startHistQuizFromPool(histQuizPool, histQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startHistQuizFromPool(mistakes, {
                              ...histQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : mistakes.length <= 20
                                      ? 20
                                      : 30,
                            })
                          }
                          onSelectTerm={(term) => setDetailHistTerm(term)}
                          onToggleFavorite={handleToggleHistFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && <HistLabView />}

                  {activeTab === 'dictionary' && (
                    <HistDictionaryView
                      terms={HISTORY_TERMS}
                      favorites={histFavoritesSet}
                      stats={histStats}
                      mistakeCount={histMistakeCount}
                      onToggleFavorite={handleToggleHistFavorite}
                      onSelectTerm={(term) => setDetailHistTerm(term)}
                      onResetStats={handleResetHistStats}
                    />
                  )}

                  {activeTab === 'guide' && <HistStudyGuideSection standalone />}
                </>
              )}

              {/* RELIGION VIEWS */}
              {screenMode === 'religion' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {relTestPhase === 'setup' && (
                        <RelTestSetupView
                          config={relQuizConfig}
                          favoriteCount={relFavoritesSet.size}
                          mistakeCount={relMistakeCount}
                          poolCount={effectiveRelPoolCount}
                          onChangeConfig={setRelQuizConfig}
                          onStartTest={() => startRelQuizFromPool(relQuizPool, relQuizConfig)}
                        />
                      )}

                      {relTestPhase === 'active' && (
                        <RelTestActiveView
                          questions={relQuestions}
                          currentIndex={relCurrentIndex}
                          answers={relAnswers}
                          currentStreak={relCurrentStreak}
                          selectedId={relSelectedChoiceId}
                          onSelectChoice={handleSelectRelChoice}
                          onNext={handleNextRelQuestion}
                          onExit={() => setRelTestPhase('setup')}
                        />
                      )}

                      {relTestPhase === 'results' && (
                        <RelTestResultsView
                          summary={relQuizSummary}
                          favorites={relFavoritesSet}
                          onReturnSetup={() => setRelTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startRelQuizFromPool(relQuizPool, relQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startRelQuizFromPool(mistakes, {
                              ...relQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : mistakes.length <= 20
                                      ? 20
                                      : 30,
                            })
                          }
                          onSelectTerm={(term) => setDetailRelTerm(term)}
                          onToggleFavorite={handleToggleRelFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && <RelLabView />}

                  {activeTab === 'dictionary' && (
                    <RelDictionaryView
                      terms={RELIGION_TERMS}
                      favorites={relFavoritesSet}
                      stats={relStats}
                      mistakeCount={relMistakeCount}
                      onToggleFavorite={handleToggleRelFavorite}
                      onSelectTerm={(term) => setDetailRelTerm(term)}
                      onResetStats={handleResetRelStats}
                    />
                  )}

                  {activeTab === 'guide' && <RelStudyGuideSection standalone />}
                </>
              )}

              {/* PHILOSOPHY VIEWS */}
              {screenMode === 'philosophy' && (
                <>
                  {activeTab === 'test' && (
                    <>
                      {philTestPhase === 'setup' && (
                        <PhilTestSetupView
                          config={philQuizConfig}
                          favoriteCount={philFavoritesSet.size}
                          mistakeCount={philMistakeCount}
                          poolCount={effectivePhilPoolCount}
                          onChangeConfig={setPhilQuizConfig}
                          onStartTest={() => startPhilQuizFromPool(philQuizPool, philQuizConfig)}
                        />
                      )}

                      {philTestPhase === 'active' && (
                        <PhilTestActiveView
                          questions={philQuestions}
                          currentIndex={philCurrentIndex}
                          answers={philAnswers}
                          currentStreak={philCurrentStreak}
                          selectedId={philSelectedChoiceId}
                          onSelectChoice={handleSelectPhilChoice}
                          onNext={handleNextPhilQuestion}
                          onExit={() => setPhilTestPhase('setup')}
                        />
                      )}

                      {philTestPhase === 'results' && (
                        <PhilTestResultsView
                          summary={philQuizSummary}
                          favorites={philFavoritesSet}
                          onReturnSetup={() => setPhilTestPhase('setup')}
                          onRestartSameConfig={() =>
                            startPhilQuizFromPool(philQuizPool, philQuizConfig)
                          }
                          onTestMistakes={(mistakes) =>
                            startPhilQuizFromPool(mistakes, {
                              ...philQuizConfig,
                              questionCount:
                                mistakes.length <= 10
                                  ? 10
                                  : mistakes.length <= 15
                                    ? 15
                                    : mistakes.length <= 20
                                      ? 20
                                      : 30,
                            })
                          }
                          onSelectTerm={(term) => setDetailPhilTerm(term)}
                          onToggleFavorite={handleTogglePhilFavorite}
                        />
                      )}
                    </>
                  )}

                  {activeTab === 'ionlab' && <PhilLabView />}

                  {activeTab === 'dictionary' && (
                    <PhilDictionaryView
                      terms={PHILOSOPHY_TERMS}
                      favorites={philFavoritesSet}
                      stats={philStats}
                      mistakeCount={philMistakeCount}
                      onToggleFavorite={handleTogglePhilFavorite}
                      onSelectTerm={(term) => setDetailPhilTerm(term)}
                      onResetStats={handleResetPhilStats}
                    />
                  )}

                  {activeTab === 'guide' && <PhilStudyGuideSection standalone />}
                </>
              )}
            </Suspense>
          )}
        </div>

        <div className="mt-8">
          <LegalFooter theme={screenMode} />
        </div>
      </main>

      {/* Bottom 4-Tab Navigation Bar (visible only inside a subject) */}
      {screenMode !== 'home' && (
        <nav
          aria-label="Ana Gezinme"
          className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t pb-[env(safe-area-inset-bottom)] ${
            isBiology
              ? 'bg-[#04141f]/94 border-sky-400/20'
              : isPhysics
                ? 'bg-[#0c071b]/94 border-violet-400/20'
                : isGeography
                  ? 'bg-[#160d05]/94 border-amber-400/20'
                  : isLiterature
                    ? 'bg-[#18070f]/94 border-rose-400/20'
                    : isHistory
                      ? 'bg-[#180a04]/94 border-orange-400/20'
                      : isReligion
                        ? 'bg-[#041515]/94 border-teal-400/20'
                        : isPhilosophy
                          ? 'bg-[#080c1c]/94 border-indigo-400/20'
                          : 'bg-[#081b14]/94 border-emerald-400/20'
          }`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-4">
            <button
              type="button"
              onClick={() => handleSwitchTab('test')}
              aria-current={activeTab === 'test' ? 'page' : undefined}
              className={`relative min-h-[58px] sm:min-h-[60px] py-2 flex flex-col items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                activeTab === 'test'
                  ? isBiology
                    ? 'text-[#7dd3fc]'
                    : isPhysics
                      ? 'text-[#c4b5fd]'
                      : isGeography
                        ? 'text-[#fcd34d]'
                        : isLiterature
                          ? 'text-[#fda4af]'
                          : isHistory
                            ? 'text-[#fdba74]'
                            : isReligion
                              ? 'text-[#5eead4]'
                              : isPhilosophy
                                ? 'text-[#a5b4fc]'
                                : 'text-[#6ee7b7]'
                  : isBiology
                    ? 'text-sky-100/50 hover:text-sky-100/85'
                    : isPhysics
                      ? 'text-violet-100/50 hover:text-violet-100/85'
                      : isGeography
                        ? 'text-amber-100/50 hover:text-amber-100/85'
                        : isLiterature
                          ? 'text-rose-100/50 hover:text-rose-100/85'
                          : isHistory
                            ? 'text-orange-100/50 hover:text-orange-100/85'
                            : isReligion
                              ? 'text-teal-100/50 hover:text-teal-100/85'
                              : isPhilosophy
                                ? 'text-indigo-100/50 hover:text-indigo-100/85'
                                : 'text-emerald-100/50 hover:text-emerald-100/80'
              }`}
            >
              {activeTab === 'test' && (
                <span
                  className={`absolute top-0 left-0 right-0 h-[2.5px] ${
                    isBiology
                      ? 'bg-gradient-to-r from-sky-400/60 via-[#7dd3fc] to-sky-400/60 shadow-[0_0_14px_rgba(56,189,248,0.9)]'
                      : isPhysics
                        ? 'bg-gradient-to-r from-violet-400/60 via-[#c4b5fd] to-violet-400/60 shadow-[0_0_14px_rgba(167,139,250,0.9)]'
                        : isGeography
                          ? 'bg-gradient-to-r from-amber-400/60 via-[#fcd34d] to-amber-400/60 shadow-[0_0_14px_rgba(245,158,11,0.9)]'
                          : isLiterature
                            ? 'bg-gradient-to-r from-rose-400/60 via-[#fda4af] to-rose-400/60 shadow-[0_0_14px_rgba(244,63,94,0.9)]'
                            : isHistory
                              ? 'bg-gradient-to-r from-orange-400/60 via-[#fdba74] to-orange-400/60 shadow-[0_0_14px_rgba(249,115,22,0.9)]'
                              : isReligion
                                ? 'bg-gradient-to-r from-teal-400/60 via-[#5eead4] to-teal-400/60 shadow-[0_0_14px_rgba(20,184,166,0.9)]'
                                : isPhilosophy
                                  ? 'bg-gradient-to-r from-indigo-400/60 via-[#a5b4fc] to-indigo-400/60 shadow-[0_0_14px_rgba(99,102,241,0.9)]'
                                  : 'bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]'
                  }`}
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
                  ? isBiology
                    ? 'text-[#7dd3fc]'
                    : isPhysics
                      ? 'text-[#c4b5fd]'
                      : isGeography
                        ? 'text-[#fcd34d]'
                        : isLiterature
                          ? 'text-[#fda4af]'
                          : isHistory
                            ? 'text-[#fdba74]'
                            : isReligion
                              ? 'text-[#5eead4]'
                              : isPhilosophy
                                ? 'text-[#a5b4fc]'
                                : 'text-[#6ee7b7]'
                  : isBiology
                    ? 'text-sky-100/50 hover:text-sky-100/85'
                    : isPhysics
                      ? 'text-violet-100/50 hover:text-violet-100/85'
                      : isGeography
                        ? 'text-amber-100/50 hover:text-amber-100/85'
                        : isLiterature
                          ? 'text-rose-100/50 hover:text-rose-100/85'
                          : isHistory
                            ? 'text-orange-100/50 hover:text-orange-100/85'
                            : isReligion
                              ? 'text-teal-100/50 hover:text-teal-100/85'
                              : isPhilosophy
                                ? 'text-indigo-100/50 hover:text-indigo-100/85'
                                : 'text-emerald-100/50 hover:text-emerald-100/80'
              }`}
            >
              {activeTab === 'ionlab' && (
                <span
                  className={`absolute top-0 left-0 right-0 h-[2.5px] ${
                    isBiology
                      ? 'bg-gradient-to-r from-sky-400/60 via-[#7dd3fc] to-sky-400/60 shadow-[0_0_14px_rgba(56,189,248,0.9)]'
                      : isPhysics
                        ? 'bg-gradient-to-r from-violet-400/60 via-[#c4b5fd] to-violet-400/60 shadow-[0_0_14px_rgba(167,139,250,0.9)]'
                        : isGeography
                          ? 'bg-gradient-to-r from-amber-400/60 via-[#fcd34d] to-amber-400/60 shadow-[0_0_14px_rgba(245,158,11,0.9)]'
                          : isLiterature
                            ? 'bg-gradient-to-r from-rose-400/60 via-[#fda4af] to-rose-400/60 shadow-[0_0_14px_rgba(244,63,94,0.9)]'
                            : isHistory
                              ? 'bg-gradient-to-r from-orange-400/60 via-[#fdba74] to-orange-400/60 shadow-[0_0_14px_rgba(249,115,22,0.9)]'
                              : isReligion
                                ? 'bg-gradient-to-r from-teal-400/60 via-[#5eead4] to-teal-400/60 shadow-[0_0_14px_rgba(20,184,166,0.9)]'
                                : isPhilosophy
                                  ? 'bg-gradient-to-r from-indigo-400/60 via-[#a5b4fc] to-indigo-400/60 shadow-[0_0_14px_rgba(99,102,241,0.9)]'
                                  : 'bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]'
                  }`}
                  aria-hidden="true"
                />
              )}
              {isBiology ? (
                <Dna className="w-5 h-5" />
              ) : isPhysics ? (
                <Atom className="w-5 h-5" />
              ) : isGeography ? (
                <Globe2 className="w-5 h-5" />
              ) : isLiterature ? (
                <Feather className="w-5 h-5" />
              ) : isHistory ? (
                <Landmark className="w-5 h-5" />
              ) : isReligion ? (
                <Compass className="w-5 h-5" />
              ) : isPhilosophy ? (
                <Scale className="w-5 h-5" />
              ) : (
                <FlaskConical className="w-5 h-5" />
              )}
              <span className="text-[11px] sm:text-xs font-medium tracking-tight">
                {isBiology
                  ? 'Biyo Lab'
                  : isPhysics
                    ? 'Fizik Lab'
                    : isGeography
                      ? 'Harita Lab'
                      : isLiterature
                        ? 'Edebiyat Lab'
                        : isHistory
                          ? 'Tarih Lab'
                          : isReligion
                            ? 'Din Lab'
                            : isPhilosophy
                              ? 'Felsefe Lab'
                              : 'İyon Lab'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchTab('dictionary')}
              aria-current={activeTab === 'dictionary' ? 'page' : undefined}
              className={`relative min-h-[58px] sm:min-h-[60px] py-2 flex flex-col items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                activeTab === 'dictionary'
                  ? isBiology
                    ? 'text-[#7dd3fc]'
                    : isPhysics
                      ? 'text-[#c4b5fd]'
                      : isGeography
                        ? 'text-[#fcd34d]'
                        : isLiterature
                          ? 'text-[#fda4af]'
                          : isHistory
                            ? 'text-[#fdba74]'
                            : isReligion
                              ? 'text-[#5eead4]'
                              : isPhilosophy
                                ? 'text-[#a5b4fc]'
                                : 'text-[#6ee7b7]'
                  : isBiology
                    ? 'text-sky-100/50 hover:text-sky-100/85'
                    : isPhysics
                      ? 'text-violet-100/50 hover:text-violet-100/85'
                      : isGeography
                        ? 'text-amber-100/50 hover:text-amber-100/85'
                        : isLiterature
                          ? 'text-rose-100/50 hover:text-rose-100/85'
                          : isHistory
                            ? 'text-orange-100/50 hover:text-orange-100/85'
                            : isReligion
                              ? 'text-teal-100/50 hover:text-teal-100/85'
                              : isPhilosophy
                                ? 'text-indigo-100/50 hover:text-indigo-100/85'
                                : 'text-emerald-100/50 hover:text-emerald-100/80'
              }`}
            >
              {activeTab === 'dictionary' && (
                <span
                  className={`absolute top-0 left-0 right-0 h-[2.5px] ${
                    isBiology
                      ? 'bg-gradient-to-r from-sky-400/60 via-[#7dd3fc] to-sky-400/60 shadow-[0_0_14px_rgba(56,189,248,0.9)]'
                      : isPhysics
                        ? 'bg-gradient-to-r from-violet-400/60 via-[#c4b5fd] to-violet-400/60 shadow-[0_0_14px_rgba(167,139,250,0.9)]'
                        : isGeography
                          ? 'bg-gradient-to-r from-amber-400/60 via-[#fcd34d] to-amber-400/60 shadow-[0_0_14px_rgba(245,158,11,0.9)]'
                          : isLiterature
                            ? 'bg-gradient-to-r from-rose-400/60 via-[#fda4af] to-rose-400/60 shadow-[0_0_14px_rgba(244,63,94,0.9)]'
                            : isHistory
                              ? 'bg-gradient-to-r from-orange-400/60 via-[#fdba74] to-orange-400/60 shadow-[0_0_14px_rgba(249,115,22,0.9)]'
                              : isReligion
                                ? 'bg-gradient-to-r from-teal-400/60 via-[#5eead4] to-teal-400/60 shadow-[0_0_14px_rgba(20,184,166,0.9)]'
                                : isPhilosophy
                                  ? 'bg-gradient-to-r from-indigo-400/60 via-[#a5b4fc] to-indigo-400/60 shadow-[0_0_14px_rgba(99,102,241,0.9)]'
                                  : 'bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]'
                  }`}
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
                  ? isBiology
                    ? 'text-[#7dd3fc]'
                    : isPhysics
                      ? 'text-[#c4b5fd]'
                      : isGeography
                        ? 'text-[#fcd34d]'
                        : isLiterature
                          ? 'text-[#fda4af]'
                          : isHistory
                            ? 'text-[#fdba74]'
                            : isReligion
                              ? 'text-[#5eead4]'
                              : isPhilosophy
                                ? 'text-[#a5b4fc]'
                                : 'text-[#6ee7b7]'
                  : isBiology
                    ? 'text-sky-100/50 hover:text-sky-100/85'
                    : isPhysics
                      ? 'text-violet-100/50 hover:text-violet-100/85'
                      : isGeography
                        ? 'text-amber-100/50 hover:text-amber-100/85'
                        : isLiterature
                          ? 'text-rose-100/50 hover:text-rose-100/85'
                          : isHistory
                            ? 'text-orange-100/50 hover:text-orange-100/85'
                            : isReligion
                              ? 'text-teal-100/50 hover:text-teal-100/85'
                              : isPhilosophy
                                ? 'text-indigo-100/50 hover:text-indigo-100/85'
                                : 'text-emerald-100/50 hover:text-emerald-100/80'
              }`}
            >
              {activeTab === 'guide' && (
                <span
                  className={`absolute top-0 left-0 right-0 h-[2.5px] ${
                    isBiology
                      ? 'bg-gradient-to-r from-sky-400/60 via-[#7dd3fc] to-sky-400/60 shadow-[0_0_14px_rgba(56,189,248,0.9)]'
                      : isPhysics
                        ? 'bg-gradient-to-r from-violet-400/60 via-[#c4b5fd] to-violet-400/60 shadow-[0_0_14px_rgba(167,139,250,0.9)]'
                        : isGeography
                          ? 'bg-gradient-to-r from-amber-400/60 via-[#fcd34d] to-amber-400/60 shadow-[0_0_14px_rgba(245,158,11,0.9)]'
                          : isLiterature
                            ? 'bg-gradient-to-r from-rose-400/60 via-[#fda4af] to-rose-400/60 shadow-[0_0_14px_rgba(244,63,94,0.9)]'
                            : isHistory
                              ? 'bg-gradient-to-r from-orange-400/60 via-[#fdba74] to-orange-400/60 shadow-[0_0_14px_rgba(249,115,22,0.9)]'
                              : isReligion
                                ? 'bg-gradient-to-r from-teal-400/60 via-[#5eead4] to-teal-400/60 shadow-[0_0_14px_rgba(20,184,166,0.9)]'
                                : isPhilosophy
                                  ? 'bg-gradient-to-r from-indigo-400/60 via-[#a5b4fc] to-indigo-400/60 shadow-[0_0_14px_rgba(99,102,241,0.9)]'
                                  : 'bg-gradient-to-r from-emerald-400/60 via-[#6ee7b7] to-emerald-400/60 shadow-[0_0_14px_rgba(110,231,183,0.9)]'
                  }`}
                  aria-hidden="true"
                />
              )}
              <BookText className="w-5 h-5" />
              <span className="text-[11px] sm:text-xs font-medium tracking-tight">Rehber</span>
            </button>
          </div>
        </nav>
      )}

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

      {/* Biology Term Detail Modal */}
      {detailBioTerm && (
        <Suspense fallback={null}>
          <BioDetailModal
            term={detailBioTerm}
            isFavorite={bioFavoritesSet.has(detailBioTerm.id)}
            stats={bioStats[detailBioTerm.id]}
            onToggleFavorite={handleToggleBioFavorite}
            onClose={() => setDetailBioTerm(null)}
          />
        </Suspense>
      )}

      {/* Physics Term Detail Modal */}
      {detailPhysTerm && (
        <Suspense fallback={null}>
          <PhysicsDetailModal
            term={detailPhysTerm}
            isFavorite={physFavoritesSet.has(detailPhysTerm.id)}
            stats={physStats[detailPhysTerm.id]}
            onToggleFavorite={handleTogglePhysFavorite}
            onClose={() => setDetailPhysTerm(null)}
          />
        </Suspense>
      )}

      {/* Geography Term Detail Modal */}
      {detailGeoTerm && (
        <Suspense fallback={null}>
          <GeoDetailModal
            term={detailGeoTerm}
            isFavorite={geoFavoritesSet.has(detailGeoTerm.id)}
            stats={geoStats[detailGeoTerm.id]}
            onToggleFavorite={handleToggleGeoFavorite}
            onClose={() => setDetailGeoTerm(null)}
          />
        </Suspense>
      )}

      {/* Turkish & Literature Term Detail Modal */}
      {detailLitTerm && (
        <Suspense fallback={null}>
          <LitDetailModal
            term={detailLitTerm}
            isFavorite={litFavoritesSet.has(detailLitTerm.id)}
            stats={litStats[detailLitTerm.id]}
            onToggleFavorite={handleToggleLitFavorite}
            onClose={() => setDetailLitTerm(null)}
          />
        </Suspense>
      )}

      {/* History Term Detail Modal */}
      {detailHistTerm && (
        <Suspense fallback={null}>
          <HistDetailModal
            term={detailHistTerm}
            isFavorite={histFavoritesSet.has(detailHistTerm.id)}
            stats={histStats[detailHistTerm.id]}
            onToggleFavorite={handleToggleHistFavorite}
            onClose={() => setDetailHistTerm(null)}
          />
        </Suspense>
      )}

      {/* Religion Term Detail Modal */}
      {detailRelTerm && (
        <Suspense fallback={null}>
          <RelDetailModal
            term={detailRelTerm}
            isFavorite={relFavoritesSet.has(detailRelTerm.id)}
            stats={relStats[detailRelTerm.id]}
            onToggleFavorite={handleToggleRelFavorite}
            onClose={() => setDetailRelTerm(null)}
          />
        </Suspense>
      )}

      {/* Philosophy Term Detail Modal */}
      {detailPhilTerm && (
        <Suspense fallback={null}>
          <PhilDetailModal
            term={detailPhilTerm}
            isFavorite={philFavoritesSet.has(detailPhilTerm.id)}
            stats={philStats[detailPhilTerm.id]}
            onToggleFavorite={handleTogglePhilFavorite}
            onClose={() => setDetailPhilTerm(null)}
          />
        </Suspense>
      )}

      {/* Offline Status Toast */}
      <OfflineIndicator />
    </div>
  );
}
