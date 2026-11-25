import type {ExamFilter, QuizSource, StatsMap} from './chemistry';

export type LiteratureCategoryId =
  | 'DIL_YAZIM_ANLAM'
  | 'SOZCUK_CUMLE_DILBILGISI'
  | 'SIIR_SANAT_DONEMLER'
  | 'TANZIMAT_CUMHURIYET_SIIR'
  | 'NESIR_ROMAN_TIYATRO_AKIM';

export type LiteratureExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type LiteratureQuestionMode = 'MIXED' | 'EXAM_STYLE' | 'TERM_TO_DESC' | 'DESC_TO_TERM';

export type LiteratureTopicFilter = 'ALL' | LiteratureCategoryId;

export type LiteratureDictionaryFilterChip = 'ALL' | LiteratureCategoryId | 'TYT' | 'AYT';

export interface LiteratureTerm {
  id: string;
  term: string;
  shortCode: string;
  periodOrTopic: string;
  category: LiteratureCategoryId;
  examLevel: LiteratureExamLevel;
  mechanism: string;
  examTip: string;
  isHighYield: boolean;
}

export interface LiteratureExamQuestion {
  id: string;
  category: LiteratureCategoryId;
  examLevel: LiteratureExamLevel;
  isHighYield: boolean;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  examTip: string;
  relatedTermId: string;
}

export interface LiteratureQuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: LiteratureQuestionMode;
  questionCount: 10 | 15 | 20 | 30;
  topic: LiteratureTopicFilter;
}

export interface LiteratureConceptQuestion {
  kind: 'CONCEPT';
  term: LiteratureTerm;
  type: 'TERM_TO_DESC' | 'DESC_TO_TERM';
  choices: LiteratureTerm[];
}

export interface LiteratureScenarioQuestion {
  kind: 'EXAM_STYLE';
  examQuestion: LiteratureExamQuestion;
  term: LiteratureTerm;
  type: 'EXAM_STYLE';
  shuffledChoices: {id: string; label: string; isCorrect: boolean}[];
}

export type LiteratureQuestion = LiteratureConceptQuestion | LiteratureScenarioQuestion;

export interface LiteratureAnswerRecord {
  question: LiteratureQuestion;
  selectedId: string;
  isCorrect: boolean;
}

export interface LiteratureQuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: LiteratureTerm[];
}

export type LiteratureStatsMap = StatsMap;
