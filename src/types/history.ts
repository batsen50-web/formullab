import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type HistoryCategoryId =
  | 'ILK_ORTA_TURK'
  | 'TURK_ISLAM_SELCUKLU'
  | 'OSMANLI_KLASIK'
  | 'OSMANLI_DEGISIM_SON'
  | 'INKILAP_CAGDAS';

export type HistoryExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type HistoryQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type HistoryTopicFilter = 'ALL' | HistoryCategoryId;

export type HistoryDictionaryFilterChip = 'ALL' | HistoryCategoryId | 'TYT' | 'AYT';

export interface HistoryTerm {
  id: string;
  term: string;
  shortCode: string;
  eraOrDate: string;
  category: HistoryCategoryId;
  examLevel: HistoryExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface HistoryExamQuestion {
  id: string;
  category: HistoryCategoryId;
  examLevel: HistoryExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface HistoryQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: HistoryQuestionMode;
  questionCount: 10 | 15 | 20 | 30;
  topic: HistoryTopicFilter;
}

export interface HistoryConceptQuestion {
  kind: 'CONCEPT';
  term: HistoryTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: HistoryTerm[];
}

export interface HistoryScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: HistoryExamQuestion;
  term: HistoryTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type HistoryQuestion = HistoryConceptQuestion | HistoryScenarioQuestion;

export interface HistoryAnswerRecord {
  question: HistoryQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface HistoryQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: HistoryTerm[];
}

export type HistoryStatsMap = StatsMap;
