import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type GeographyCategoryId =
  | 'HARITA_KONUM'
  | 'IKLIM_BIYOM'
  | 'YERYUZU_SU'
  | 'NUFUS_EKONOMI'
  | 'ULUSLARARASI_AFET';

export type GeographyExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type GeographyQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type GeographyTopicFilter = 'ALL' | GeographyCategoryId;

export type GeographyDictionaryFilterChip = 'ALL' | GeographyCategoryId | 'TYT' | 'AYT';

export interface GeographyTerm {
  id: string;
  term: string;
  shortCode: string;
  regionOrScope: string;
  category: GeographyCategoryId;
  examLevel: GeographyExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface GeographyExamQuestion {
  id: string;
  category: GeographyCategoryId;
  examLevel: GeographyExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface GeographyQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: GeographyQuestionMode;
  questionCount: 10 | 15 | 20;
  topic: GeographyTopicFilter;
}

export interface GeographyConceptQuestion {
  kind: 'CONCEPT';
  term: GeographyTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: GeographyTerm[];
}

export interface GeographyScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: GeographyExamQuestion;
  term: GeographyTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type GeographyQuestion = GeographyConceptQuestion | GeographyScenarioQuestion;

export interface GeographyAnswerRecord {
  question: GeographyQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface GeographyQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: GeographyTerm[];
}

export type GeographyStatsMap = StatsMap;
