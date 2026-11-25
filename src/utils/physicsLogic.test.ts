import assert from 'node:assert/strict';
import test from 'node:test';
import {PHYSICS_TERMS} from '../data/physics.ts';
import {PHYSICS_EXAM_QUESTIONS} from '../data/physicsQuestions.ts';
import type {PhysicsAnswerRecord, PhysicsQuizConfig} from '../types/physics.ts';
import {
  analyzeElectricCircuit,
  calculatePhysicsSummary,
  evaluatePhotoelectricEffect,
  filterPhysicsTerms,
  generatePhysicsQuestions,
  getPhysicsExamQuestionPool,
  getPhysicsQuizPool,
  simulateProjectileMotion,
} from './physicsLogic.ts';

test('physics dataset invariants: 80 unique terms (16 per category) and 40 YKS questions (8 per category)', () => {
  assert.equal(PHYSICS_TERMS.length, 80);
  const termIds = new Set(PHYSICS_TERMS.map((t) => t.id));
  assert.equal(termIds.size, 80);

  const highYieldCount = PHYSICS_TERMS.filter((t) => t.isHighYield).length;
  assert.ok(highYieldCount >= 55);

  assert.equal(PHYSICS_EXAM_QUESTIONS.length, 40);
  const examIds = new Set(PHYSICS_EXAM_QUESTIONS.map((q) => q.id));
  assert.equal(examIds.size, 40);

  for (const eq of PHYSICS_EXAM_QUESTIONS) {
    assert.equal(eq.choices.length, 4);
    assert.ok(eq.correctIndex >= 0 && eq.correctIndex < 4);
    assert.ok(termIds.has(eq.relatedTermId), `Missing relatedTermId: ${eq.relatedTermId}`);
  }
});

test('filterPhysicsTerms supports Turkish normalization, source, and category/exam chips', () => {
  const favorites = new Set(['phys-ozkutle', 'phys-fotoelektrik']);

  const bySearch = filterPhysicsTerms(PHYSICS_TERMS, {
    searchQuery: 'ozkutle',
    source: 'ALL',
    chip: 'ALL',
    favorites,
  });
  assert.ok(bySearch.some((t) => t.id === 'phys-ozkutle'));

  const favAll = filterPhysicsTerms(PHYSICS_TERMS, {
    searchQuery: '',
    source: 'FAVORITES',
    chip: 'ALL',
    favorites,
  });
  assert.equal(favAll.length, 2);

  const favAyt = filterPhysicsTerms(PHYSICS_TERMS, {
    searchQuery: '',
    source: 'FAVORITES',
    chip: 'AYT',
    favorites,
  });
  assert.equal(favAyt.length, 1);

  const elecCount = filterPhysicsTerms(PHYSICS_TERMS, {
    searchQuery: '',
    source: 'ALL',
    chip: 'ELEKTRIK_MANYETIZMA',
    favorites,
  });
  assert.equal(elecCount.length, 16);
});

test('generatePhysicsQuestions supports EXAM_STYLE and MIXED YKS scenarios alongside concept drills', () => {
  const examConfig: PhysicsQuizConfig = {
    source: 'ALL',
    examFilter: 'ALL',
    questionMode: 'EXAM_STYLE',
    questionCount: 15,
    topic: 'ALL',
  };
  const examPool = getPhysicsExamQuestionPool(
    PHYSICS_EXAM_QUESTIONS,
    PHYSICS_TERMS,
    examConfig,
    new Set(),
  );
  assert.equal(examPool.length, 40);

  const examQs = generatePhysicsQuestions(
    PHYSICS_TERMS,
    PHYSICS_TERMS,
    examConfig,
    () => 0.42,
    PHYSICS_EXAM_QUESTIONS,
  );
  assert.equal(examQs.length, 15);
  for (const q of examQs) {
    assert.equal(q.kind, 'EXAM_STYLE');
    if (q.kind === 'EXAM_STYLE') {
      assert.equal(q.shuffledChoices.length, 4);
      assert.equal(q.shuffledChoices.filter((c) => c.isCorrect).length, 1);
    }
  }

  const mixedConfig: PhysicsQuizConfig = {
    source: 'ALL',
    examFilter: 'AYT',
    questionMode: 'MIXED',
    questionCount: 10,
    topic: 'CEMBER_MODERN',
  };
  const pool = getPhysicsQuizPool(PHYSICS_TERMS, mixedConfig, new Set());
  assert.equal(pool.length, 16);

  const mixedQs = generatePhysicsQuestions(
    pool,
    PHYSICS_TERMS,
    mixedConfig,
    () => 0.42,
    PHYSICS_EXAM_QUESTIONS,
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

test('calculatePhysicsSummary computes percentage, streak, and deduplicated mistakes', () => {
  const pool = PHYSICS_TERMS.slice(0, 3);
  const questions = generatePhysicsQuestions(
    pool,
    PHYSICS_TERMS,
    {questionMode: 'TERM_TO_DESC', questionCount: 10},
    () => 0.1,
    PHYSICS_EXAM_QUESTIONS,
  );
  const records: PhysicsAnswerRecord[] = [
    {question: questions[0], selectedId: questions[0].term.id, isCorrect: true},
    {question: questions[1], selectedId: 'wrong-id', isCorrect: false},
    {question: questions[2], selectedId: questions[2].term.id, isCorrect: true},
  ];
  const summary = calculatePhysicsSummary(records);
  assert.equal(summary.total, 3);
  assert.equal(summary.correctCount, 2);
  assert.equal(summary.percentage, 67);
  assert.equal(summary.bestStreak, 1);
  assert.equal(summary.mistakes.length, 1);
});

test('physics lab simulation math functions compute projectile, circuit, and photoelectric models', () => {
  // Complementary angles (37 and 53) yield ~equal range
  const p37 = simulateProjectileMotion(50, 37, 10);
  const p53 = simulateProjectileMotion(50, 53, 10);
  assert.ok(Math.abs(p37.range - p53.range) < 0.2);
  assert.ok(p53.maxHeight > p37.maxHeight);

  // 45 deg gives max range = v0^2 / g = 2500 / 10 = 250 m
  const p45 = simulateProjectileMotion(50, 45, 10);
  assert.ok(Math.abs(p45.range - 250) < 0.1);

  // Electric circuits: series vs parallel
  const series = analyzeElectricCircuit(12, 2, 4, 'series');
  assert.equal(series.equivalentResistance, 6);
  assert.equal(series.totalCurrent, 2);
  assert.equal(series.voltage1, 4);
  assert.equal(series.voltage2, 8);

  const parallel = analyzeElectricCircuit(12, 6, 3, 'parallel');
  assert.equal(parallel.equivalentResistance, 2);
  assert.equal(parallel.totalCurrent, 6);
  assert.equal(parallel.current1, 2);
  assert.equal(parallel.current2, 4);

  // Photoelectric: 12400 / 3100 A = 4.0 eV -> Cesium (2.0 eV) emits with 2.0 V, Zinc (4.3 eV) does not emit
  const cesiumEmit = evaluatePhotoelectricEffect('cesium', 3100, 80);
  assert.equal(cesiumEmit.emitsElectrons, true);
  assert.equal(cesiumEmit.photonEnergyEv, 4);
  assert.equal(cesiumEmit.stoppingVoltageV, 2);
  assert.equal(cesiumEmit.relativeCurrentPct, 80);

  const zincBlocked = evaluatePhotoelectricEffect('zinc', 3100, 100);
  assert.equal(zincBlocked.emitsElectrons, false);
  assert.equal(zincBlocked.maxKineticEv, 0);
  assert.equal(zincBlocked.relativeCurrentPct, 0);
});
