import assert from 'node:assert/strict';
import test from 'node:test';
import {BIOLOGY_TERMS} from '../data/biology.ts';
import {BIOLOGY_EXAM_QUESTIONS} from '../data/biologyQuestions.ts';
import type {BiologyAnswerRecord, BiologyQuizConfig} from '../types/biology.ts';
import {
  analyzeDnaTriplet,
  evaluateEnzymeRate,
  evaluateOsmosis,
  generateBioLabChallenge,
} from './bioLabLogic.ts';
import {
  calculateBiologySummary,
  filterBiologyTerms,
  generateBiologyQuestions,
  getBiologyExamQuestionPool,
  getBiologyQuizPool,
} from './biologyLogic.ts';

test('biology dataset invariants: 80 unique concepts and 40 YKS exam questions across 5 categories', () => {
  assert.equal(BIOLOGY_TERMS.length, 80);
  const termIds = new Set(BIOLOGY_TERMS.map((t) => t.id));
  assert.equal(termIds.size, 80);

  const highYieldCount = BIOLOGY_TERMS.filter((t) => t.isHighYield).length;
  assert.ok(highYieldCount >= 50);

  assert.equal(BIOLOGY_EXAM_QUESTIONS.length, 40);
  const examIds = new Set(BIOLOGY_EXAM_QUESTIONS.map((q) => q.id));
  assert.equal(examIds.size, 40);

  for (const eq of BIOLOGY_EXAM_QUESTIONS) {
    assert.equal(eq.choices.length, 4);
    assert.ok(eq.correctIndex >= 0 && eq.correctIndex < 4);
    assert.ok(termIds.has(eq.relatedTermId), `Missing relatedTermId: ${eq.relatedTermId}`);
  }
});

test('filterBiologyTerms supports Turkish normalization, source, and category/exam chips', () => {
  const favorites = new Set(['bio-mitokondri', 'bio-adh']);

  const bySearch = filterBiologyTerms(BIOLOGY_TERMS, {
    searchQuery: 'mitokondri',
    source: 'ALL',
    chip: 'ALL',
    favorites,
  });
  assert.ok(bySearch.some((t) => t.id === 'bio-mitokondri'));

  const favAyt = filterBiologyTerms(BIOLOGY_TERMS, {
    searchQuery: '',
    source: 'FAVORITES',
    chip: 'AYT',
    favorites,
  });
  assert.equal(favAyt.length, 2);

  const sistemi = filterBiologyTerms(BIOLOGY_TERMS, {
    searchQuery: '',
    source: 'ALL',
    chip: 'SISTEMLER',
    favorites,
  });
  assert.equal(sistemi.length, 17);
});

test('generateBiologyQuestions supports EXAM_STYLE and MIXED YKS scenarios alongside concept drills', () => {
  const examConfig: BiologyQuizConfig = {
    source: 'ALL',
    examFilter: 'ALL',
    questionMode: 'EXAM_STYLE',
    questionCount: 15,
    topic: 'ALL',
  };
  const examPool = getBiologyExamQuestionPool(
    BIOLOGY_EXAM_QUESTIONS,
    BIOLOGY_TERMS,
    examConfig,
    new Set(),
  );
  assert.equal(examPool.length, 40);

  const examQs = generateBiologyQuestions(
    BIOLOGY_TERMS,
    BIOLOGY_TERMS,
    examConfig,
    () => 0.42,
    BIOLOGY_EXAM_QUESTIONS,
  );
  assert.equal(examQs.length, 15);
  for (const q of examQs) {
    assert.equal(q.kind, 'EXAM_STYLE');
    if (q.kind === 'EXAM_STYLE') {
      assert.equal(q.shuffledChoices.length, 4);
      assert.equal(q.shuffledChoices.filter((c) => c.isCorrect).length, 1);
    }
  }

  const mixedConfig: BiologyQuizConfig = {
    source: 'ALL',
    examFilter: 'AYT',
    questionMode: 'MIXED',
    questionCount: 10,
    topic: 'METABOLIZMA',
  };
  const pool = getBiologyQuizPool(BIOLOGY_TERMS, mixedConfig, new Set());
  assert.equal(pool.length, 16);

  const mixedQs = generateBiologyQuestions(
    pool,
    BIOLOGY_TERMS,
    mixedConfig,
    () => 0.42,
    BIOLOGY_EXAM_QUESTIONS,
  );
  assert.equal(mixedQs.length, 10);
  assert.ok(mixedQs.some((q) => q.kind === 'EXAM_STYLE'));
  assert.ok(mixedQs.some((q) => q.kind === 'CONCEPT'));

  for (const q of mixedQs) {
    if (q.kind === 'CONCEPT') {
      assert.equal(q.choices.length, 4);
      assert.ok(q.choices.some((c) => c.id === q.term.id));
      assert.equal(new Set(q.choices.map((c) => c.id)).size, 4);
    } else {
      assert.equal(q.shuffledChoices.length, 4);
      assert.equal(q.shuffledChoices.filter((c) => c.isCorrect).length, 1);
    }
  }
});

test('calculateBiologySummary computes percentage, streak, and deduplicated mistakes', () => {
  const pool = BIOLOGY_TERMS.slice(0, 3);
  const questions = generateBiologyQuestions(
    pool,
    BIOLOGY_TERMS,
    {questionMode: 'TERM_TO_DESC', questionCount: 10},
    () => 0.1,
    BIOLOGY_EXAM_QUESTIONS,
  );
  const records: BiologyAnswerRecord[] = [
    {question: questions[0], selectedId: questions[0].term.id, isCorrect: true},
    {question: questions[1], selectedId: 'wrong-id', isCorrect: false},
    {question: questions[2], selectedId: questions[2].term.id, isCorrect: true},
  ];
  const summary = calculateBiologySummary(records);
  assert.equal(summary.total, 3);
  assert.equal(summary.correctCount, 2);
  assert.equal(summary.percentage, 67);
  assert.equal(summary.bestStreak, 1);
  assert.equal(summary.mistakes.length, 1);
});

test('bioLabLogic: analyzeDnaTriplet handles AUG start, UAA stop, and H-bond counts', () => {
  const start = analyzeDnaTriplet(['T', 'A', 'C']);
  assert.equal(start.mrnaCodon, 'AUG');
  assert.equal(start.trnaAnticodon, 'UAC');
  assert.equal(start.isStart, true);
  assert.equal(start.isStop, false);
  assert.equal(start.dnaHydrogenBonds, 7);

  const stop = analyzeDnaTriplet(['A', 'T', 'T']);
  assert.equal(stop.mrnaCodon, 'UAA');
  assert.equal(stop.trnaAnticodon, null);
  assert.equal(stop.isStop, true);
  assert.equal(stop.dnaHydrogenBonds, 6);
});

test('bioLabLogic: evaluateEnzymeRate handles optimal vs denatured states and osmosis outcomes', () => {
  const optimal = evaluateEnzymeRate('pepsin', 37, 2.0, 90);
  assert.equal(optimal.status, 'OPTIMAL');
  assert.ok(optimal.ratePercent >= 80);

  const denatured = evaluateEnzymeRate('amylase', 62, 7.0, 90);
  assert.equal(denatured.status, 'DENATURED');
  assert.equal(denatured.ratePercent, 0);

  const plantHypo = evaluateOsmosis('plant', 'hypotonic');
  assert.ok(plantHypo.title.includes('Turgor'));

  const animalHypo = evaluateOsmosis('animal', 'hypotonic');
  assert.ok(animalHypo.title.includes('Hemoliz'));

  const challenge = generateBioLabChallenge(undefined, () => 0.3);
  assert.equal(challenge.options.length, 4);
  assert.ok(challenge.options.includes(challenge.correctAnswer));
});
