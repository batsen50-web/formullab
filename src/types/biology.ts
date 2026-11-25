import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type SubjectId =
  | 'chemistry'
  | 'biology'
  | 'physics'
  | 'geography'
  | 'literature'
  | 'history'
  | 'religion'
  | 'philosophy';

export type ScreenMode = 'home' | SubjectId;

export type BiologyCategoryId =
  | 'CANLI_TEMEL'
  | 'HUCRE_ORGANEL'
  | 'METABOLIZMA'
  | 'SISTEMLER'
  | 'GENETIK_EKOLOJI';

export type BiologyExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type BiologyQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type BiologyTopicFilter = 'ALL' | BiologyCategoryId;

export type BiologyDictionaryFilterChip = 'ALL' | BiologyCategoryId | 'TYT' | 'AYT';

export interface BiologyTerm {
  id: string;
  term: string;
  shortCode: string;
  locationOrSystem: string;
  category: BiologyCategoryId;
  examLevel: BiologyExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface BiologyExamQuestion {
  id: string;
  category: BiologyCategoryId;
  examLevel: BiologyExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface BiologyQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: BiologyQuestionMode;
  questionCount: 10 | 15 | 20;
  topic: BiologyTopicFilter;
}

export type EffectiveBiologyQuestionType = 'TERM_TO_DESC' | 'DESC_TO_TERM' | 'EXAM_STYLE';

export interface BiologyConceptQuestion {
  kind: 'CONCEPT';
  term: BiologyTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: BiologyTerm[];
}

export interface BiologyScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: BiologyExamQuestion;
  term: BiologyTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type BiologyQuestion = BiologyConceptQuestion | BiologyScenarioQuestion;

export interface BiologyAnswerRecord {
  question: BiologyQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface BiologyQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: BiologyTerm[];
}

export type BiologyStatsMap = StatsMap;
