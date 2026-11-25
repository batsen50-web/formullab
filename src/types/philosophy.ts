import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type PhilosophyCategoryId =
  | 'FELSEFE_DUSUNME'
  | 'VARLIK_BILGI_BILIM'
  | 'AHLAK_DIN_SIYASET_SANAT'
  | 'ILK_ORTA_YENI_CAG'
  | 'AYDINLANMA_CAGDAS_TURK';

export type PhilosophyExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type PhilosophyQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type PhilosophyTopicFilter = 'ALL' | PhilosophyCategoryId;

export type PhilosophyDictionaryFilterChip = 'ALL' | PhilosophyCategoryId | 'TYT' | 'AYT';

export interface PhilosophyTerm {
  id: string;
  term: string;
  shortCode: string;
  thinkerOrField: string;
  category: PhilosophyCategoryId;
  examLevel: PhilosophyExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface PhilosophyExamQuestion {
  id: string;
  category: PhilosophyCategoryId;
  examLevel: PhilosophyExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface PhilosophyQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: PhilosophyQuestionMode;
  questionCount: 10 | 15 | 20 | 30;
  topic: PhilosophyTopicFilter;
}

export interface PhilosophyConceptQuestion {
  kind: 'CONCEPT';
  term: PhilosophyTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: PhilosophyTerm[];
}

export interface PhilosophyScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: PhilosophyExamQuestion;
  term: PhilosophyTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type PhilosophyQuestion = PhilosophyConceptQuestion | PhilosophyScenarioQuestion;

export interface PhilosophyAnswerRecord {
  question: PhilosophyQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface PhilosophyQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: PhilosophyTerm[];
}

export type PhilosophyStatsMap = StatsMap;
