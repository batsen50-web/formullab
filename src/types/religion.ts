import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type ReligionCategoryId =
  | 'BILGI_IMAN_ALLAH'
  | 'IBADET_AHIRET_PEYGAMBER'
  | 'AHLAK_DEGERLER_GUNCEL'
  | 'MEDENIYET_BILIM_SAHSIYET'
  | 'MEZHEP_TASAVVUF_DINLER';

export type ReligionExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type ReligionQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type ReligionTopicFilter = 'ALL' | ReligionCategoryId;

export type ReligionDictionaryFilterChip = 'ALL' | ReligionCategoryId | 'TYT' | 'AYT';

export interface ReligionTerm {
  id: string;
  term: string;
  shortCode: string;
  scopeOrSource: string;
  category: ReligionCategoryId;
  examLevel: ReligionExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface ReligionExamQuestion {
  id: string;
  category: ReligionCategoryId;
  examLevel: ReligionExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface ReligionQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: ReligionQuestionMode;
  questionCount: 10 | 15 | 20 | 30;
  topic: ReligionTopicFilter;
}

export interface ReligionConceptQuestion {
  kind: 'CONCEPT';
  term: ReligionTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: ReligionTerm[];
}

export interface ReligionScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: ReligionExamQuestion;
  term: ReligionTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type ReligionQuestion = ReligionConceptQuestion | ReligionScenarioQuestion;

export interface ReligionAnswerRecord {
  question: ReligionQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface ReligionQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: ReligionTerm[];
}

export type ReligionStatsMap = StatsMap;
