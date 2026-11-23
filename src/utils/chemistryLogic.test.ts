import assert from 'node:assert/strict';
import test from 'node:test';
import {COMPOUNDS} from '../data/compounds.ts';
import type {QuizAnswerRecord, QuizConfig} from '../types/chemistry.ts';
import {
  calculateQuizSummary,
  filterDictionaryCompounds,
  formatCompoundNameForPrompt,
  generateQuizQuestions,
  getQuizPool,
  parseFormulaTokens,
} from './chemistryLogic.ts';

test('dataset invariants: exactly 81 unique compounds with 49 high-yield items', () => {
  assert.equal(COMPOUNDS.length, 81);
  const highYieldCount = COMPOUNDS.filter((c) => c.isHighYield).length;
  assert.equal(highYieldCount, 49);

  const ids = new Set(COMPOUNDS.map((c) => c.id));
  assert.equal(ids.size, 81);

  const formulas = new Set(COMPOUNDS.map((c) => c.plainFormula));
  assert.equal(formulas.size, 81);
});

test('parseFormulaTokens converts underscore digits into subscript tokens', () => {
  assert.deepEqual(parseFormulaTokens('H_2SO_4'), [
    {text: 'H', isSub: false},
    {text: '2', isSub: true},
    {text: 'SO', isSub: false},
    {text: '4', isSub: true},
  ]);

  assert.deepEqual(parseFormulaTokens('C_12H_22O_11'), [
    {text: 'C', isSub: false},
    {text: '12', isSub: true},
    {text: 'H', isSub: false},
    {text: '22', isSub: true},
    {text: 'O', isSub: false},
    {text: '11', isSub: true},
  ]);

  assert.deepEqual(parseFormulaTokens('HF'), [{text: 'HF', isSub: false}]);
});

test('filterDictionaryCompounds supports Turkish normalization, subscripts, source, and chips', () => {
  const favorites = new Set(['hno3', 'hf']);

  // Search by common name
  const byKezzap = filterDictionaryCompounds(COMPOUNDS, {
    searchQuery: 'kezzap',
    source: 'ALL',
    chip: 'ALL',
    favorites,
  });
  assert.equal(byKezzap.length, 1);
  assert.equal(byKezzap[0].plainFormula, 'HNO3');

  // Search by unicode subscript formula
  const byUnicodeSub = filterDictionaryCompounds(COMPOUNDS, {
    searchQuery: 'H₂SO₄',
    source: 'ALL',
    chip: 'ALL',
    favorites,
  });
  assert.equal(byUnicodeSub.length, 1);
  assert.equal(byUnicodeSub[0].id, 'h2so4');

  // Filter by FAVORITES + AYT (TYT_AYT counts as both)
  const favAyt = filterDictionaryCompounds(COMPOUNDS, {
    searchQuery: '',
    source: 'FAVORITES',
    chip: 'AYT',
    favorites,
  });
  assert.equal(favAyt.length, 2);

  // Filter by HIGH_YIELD count
  const highYieldAll = filterDictionaryCompounds(COMPOUNDS, {
    searchQuery: '',
    source: 'HIGH_YIELD',
    chip: 'ALL',
    favorites,
  });
  assert.equal(highYieldAll.length, 49);
});

test('getQuizPool respects TYT_AYT inclusion across TYT and AYT filters', () => {
  const configTyt: QuizConfig = {
    source: 'ALL',
    examFilter: 'TYT',
    questionMode: 'MIXED',
    questionCount: 10,
    topic: 'ORGANIK',
  };
  const tytOrganic = getQuizPool(COMPOUNDS, configTyt, new Set());
  assert.ok(tytOrganic.length > 0);
  assert.ok(tytOrganic.every((c) => c.examLevel === 'TYT' || c.examLevel === 'TYT_AYT'));

  const emptyFavConfig: QuizConfig = {
    source: 'FAVORITES',
    examFilter: 'ALL',
    questionMode: 'MIXED',
    questionCount: 10,
    topic: 'ALL',
  };
  assert.equal(getQuizPool(COMPOUNDS, emptyFavConfig, new Set()).length, 0);

  const stats = {
    h2so4: {correct: 1, wrong: 2},
    naoh: {correct: 3, wrong: 0},
  };
  const mistakesPool = getQuizPool(
    COMPOUNDS,
    {...emptyFavConfig, source: 'MISTAKES'},
    new Set(),
    stats,
  );
  assert.deepEqual(
    mistakesPool.map((c) => c.id),
    ['h2so4'],
  );

  const mistakesDict = filterDictionaryCompounds(COMPOUNDS, {
    searchQuery: '',
    source: 'MISTAKES',
    chip: 'ALL',
    favorites: new Set(),
    stats,
  });
  assert.deepEqual(
    mistakesDict.map((c) => c.id),
    ['h2so4'],
  );
});

test('generateQuizQuestions alternates MIXED mode and prioritizes same-category distractors', () => {
  const pool = COMPOUNDS.filter((c) => c.category === 'ORGANIK').slice(0, 6);
  let seed = 0.25;
  const deterministicRng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const questions = generateQuizQuestions(
    pool,
    COMPOUNDS,
    {questionMode: 'MIXED', questionCount: 10},
    deterministicRng,
  );

  // Pool has 6 compounds so it caps cleanly at 6
  assert.equal(questions.length, 6);

  // Alternating types in MIXED mode
  assert.equal(questions[0].type, 'FORMULA_TO_NAME');
  assert.equal(questions[1].type, 'NAME_TO_FORMULA');
  assert.equal(questions[2].type, 'FORMULA_TO_NAME');

  // Every question has 4 unique choices including target and all choices in ORGANIK
  for (const q of questions) {
    assert.equal(q.choices.length, 4);
    const choiceIds = new Set(q.choices.map((c) => c.id));
    assert.equal(choiceIds.size, 4);
    assert.ok(choiceIds.has(q.compound.id));
    assert.ok(q.choices.every((c) => c.category === 'ORGANIK'));
  }
});

test('formatCompoundNameForPrompt avoids duplicating identical names and nested parens', () => {
  const identical = COMPOUNDS.find((c) => c.id === 'al-oh-3')!;
  assert.equal(formatCompoundNameForPrompt(identical), 'Alüminyum hidroksit');

  const distinct = COMPOUNDS.find((c) => c.id === 'hf')!;
  assert.equal(formatCompoundNameForPrompt(distinct), 'Cam Asidi (Hidroflorik asit)');

  const withParens = COMPOUNDS.find((c) => c.id === 'fe2o3')!;
  assert.equal(
    formatCompoundNameForPrompt(withParens),
    'Demir Pası (Hematit) · Demir(III) oksit',
  );
});

test('calculateQuizSummary computes percentage, bestStreak, and deduplicated mistakes', () => {
  const c1 = COMPOUNDS[0];
  const c2 = COMPOUNDS[1];
  const c3 = COMPOUNDS[2];
  const c4 = COMPOUNDS[3];

  const records: QuizAnswerRecord[] = [
    {question: {compound: c1, type: 'FORMULA_TO_NAME', choices: [c1, c2, c3, c4]}, selectedCompoundId: c1.id, isCorrect: true},
    {question: {compound: c2, type: 'NAME_TO_FORMULA', choices: [c1, c2, c3, c4]}, selectedCompoundId: c2.id, isCorrect: true},
    {question: {compound: c3, type: 'FORMULA_TO_NAME', choices: [c1, c2, c3, c4]}, selectedCompoundId: c1.id, isCorrect: false},
    {question: {compound: c4, type: 'NAME_TO_FORMULA', choices: [c1, c2, c3, c4]}, selectedCompoundId: c4.id, isCorrect: true},
  ];

  const summary = calculateQuizSummary(records);
  assert.equal(summary.total, 4);
  assert.equal(summary.correctCount, 3);
  assert.equal(summary.percentage, 75);
  assert.equal(summary.bestStreak, 2);
  assert.deepEqual(
    summary.mistakes.map((m) => m.id),
    [c3.id],
  );
});
