export type CategoryId =
  | 'YAYGIN_ADLAR'
  | 'IYONIK'
  | 'KOVALENT'
  | 'ASIT_BAZ_TUZ'
  | 'ORGANIK';

export type ExamLevel = 'TYT' | 'AYT' | 'TYT_AYT';

export type AppTab = 'test' | 'ionlab' | 'dictionary' | 'guide';

export type QuizSource = 'ALL' | 'FAVORITES' | 'MISTAKES' | 'HIGH_YIELD';

export type ExamFilter = 'ALL' | 'TYT' | 'AYT';

export type QuestionMode = 'MIXED' | 'FORMULA_TO_NAME' | 'NAME_TO_FORMULA';

export type TopicFilter = 'ALL' | CategoryId;

export type DictionaryFilterChip = 'ALL' | CategoryId | 'TYT' | 'AYT';

export interface Compound {
  id: string;
  formula: string;
  plainFormula: string;
  commonName: string;
  systematicName: string;
  category: CategoryId;
  examLevel: ExamLevel;
  bondType: string;
  examTip: string;
  isHighYield: boolean;
}

export interface CompoundStats {
  correct: number;
  wrong: number;
}

export type StatsMap = Record<string, CompoundStats>;

export interface QuizConfig {
  source: QuizSource;
  examFilter: ExamFilter;
  questionMode: QuestionMode;
  questionCount: 10 | 15 | 20;
  topic: TopicFilter;
}

export type EffectiveQuestionType = 'FORMULA_TO_NAME' | 'NAME_TO_FORMULA';

export interface QuizQuestion {
  compound: Compound;
  type: EffectiveQuestionType;
  choices: Compound[];
}

export interface QuizAnswerRecord {
  question: QuizQuestion;
  selectedCompoundId: string;
  isCorrect: boolean;
}

export interface QuizSummary {
  total: number;
  correctCount: number;
  percentage: number;
  bestStreak: number;
  mistakes: Compound[];
}
