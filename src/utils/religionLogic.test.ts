import assert from 'node:assert/strict';
import test from 'node:test';
import {RELIGION_TERMS} from '../data/religion';
import {RELIGION_EXAM_QUESTIONS} from '../data/religionQuestions';
import {
  buildRelConceptQuiz,
  calculateReligionSummary,
  filterReligionTerms,
  generateReligionQuestions,
  getReligionQuizPool,
  REL_CONCEPT_ITEMS,
} from './religionLogic';

test('RELIGION_TERMS has 75 unique terms evenly balanced across 5 categories', () => {
  assert.equal(RELIGION_TERMS.length, 75);
  const ids = new Set(RELIGION_TERMS.map((t) => t.id));
  assert.equal(ids.size, 75);

  const byCategory = new Map<string, number>();
  for (const term of RELIGION_TERMS) {
    byCategory.set(term.category, (byCategory.get(term.category) ?? 0) + 1);
  }
  assert.equal(byCategory.size, 5);
  for (const count of byCategory.values()) {
    assert.equal(count, 15);
  }
});

test('RELIGION_EXAM_QUESTIONS has 50 valid questions linked to valid terms', () => {
  assert.equal(RELIGION_EXAM_QUESTIONS.length, 50);
  const termIds = new Set(RELIGION_TERMS.map((t) => t.id));
  const qIds = new Set<string>();

  for (const q of RELIGION_EXAM_QUESTIONS) {
    assert.ok(!qIds.has(q.id), `Duplicate question id: ${q.id}`);
    qIds.add(q.id);
    assert.ok(termIds.has(q.relatedTermId), `Invalid relatedTermId: ${q.relatedTermId}`);
    assert.equal(q.choices.length, 4);
    assert.ok(!q.stem.includes('<u>'), `Question stem should not contain HTML tags: ${q.id}`);
  }
});

test('Religion quiz generator & search filter behave properly', () => {
  const config = {
    source: 'ALL' as const,
    examFilter: 'ALL' as const,
    questionMode: 'MIXED' as const,
    questionCount: 20 as const,
    topic: 'ALL' as const,
  };
  const pool = getReligionQuizPool(RELIGION_TERMS, config, new Set(), {});
  const questions = generateReligionQuestions(
    pool,
    RELIGION_TERMS,
    config,
    () => 0.35,
    RELIGION_EXAM_QUESTIONS,
    new Set(),
    {},
  );
  assert.equal(questions.length, 20);
  assert.ok(questions.some((q) => q.kind === 'EXAM_STYLE'));

  const summary = calculateReligionSummary([
    {question: questions[0], selectedId: 'a', isCorrect: true},
  ]);
  assert.equal(summary.percentage, 100);

  const mat = filterReligionTerms(RELIGION_TERMS, {
    searchQuery: 'Matüridi',
    source: 'ALL',
    chip: 'ALL',
    favorites: new Set(),
    stats: {},
  });
  assert.ok(mat.length >= 1);

  const labQuiz = buildRelConceptQuiz(REL_CONCEPT_ITEMS, () => 0.25);
  assert.equal(labQuiz.choices.length, 4);
  assert.ok(labQuiz.choices.includes(labQuiz.target.answer));
});
