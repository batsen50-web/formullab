import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type PhysicsCategoryId =
  | 'MADDE_HAREKET'
  | 'ISI_BASINC'
  | 'ELEKTRIK_MANYETIZMA'
  | 'DALGA_OPTIK'
  | 'CEMBER_MODERN';

export type PhysicsExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type PhysicsQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type PhysicsTopicFilter = 'ALL' | PhysicsCategoryId;

export type PhysicsDictionaryFilterChip = 'ALL' | PhysicsCategoryId | 'TYT' | 'AYT';

export interface PhysicsTerm {
  id: string;
  term: string;
  formula: string;
  siUnit: string;
  category: PhysicsCategoryId;
  examLevel: PhysicsExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface PhysicsExamQuestion {
  id: string;
  category: PhysicsCategoryId;
  examLevel: PhysicsExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface PhysicsQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: PhysicsQuestionMode;
  questionCount: 10 | 15 | 20;
  topic: PhysicsTopicFilter;
}

export interface PhysicsConceptQuestion {
  kind: 'CONCEPT';
  term: PhysicsTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: PhysicsTerm[];
}

export interface PhysicsScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: PhysicsExamQuestion;
  term: PhysicsTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type PhysicsQuestion = PhysicsConceptQuestion | PhysicsScenarioQuestion;

export interface PhysicsAnswerRecord {
  question: PhysicsQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface PhysicsQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: PhysicsTerm[];
}

export type PhysicsStatsMap = StatsMap;
