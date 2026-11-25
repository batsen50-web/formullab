import assert from 'node:assert/strict';
import test from 'node:test';
import {PHILOSOPHY_TERMS} from '../data/philosophy';
import {PHILOSOPHY_EXAM_QUESTIONS} from '../data/philosophyQuestions';
import {
  buildThinkerQuizItem,
  calculatePhilosophySummary,
  filterPhilosophyTerms,
  generatePhilosophyQuestions,
  getPhilosophyQuizPool,
  PHIL_THINKERS,
} from './philosophyLogic';

test('PHILOSOPHY_TERMS has 75 unique terms evenly balanced across 5 categories', () => {
  assert.equal(PHILOSOPHY_TERMS.length, 75);
  const ids = new Set(PHILOSOPHY_TERMS.map((t) => t.id));
  assert.equal(ids.size, 75);

  const byCategory = new Map<string, number>();
  for (const term of PHILOSOPHY_TERMS) {
    byCategory.set(term.category, (byCategory.get(term.category) ?? 0) + 1);
  }
  assert.equal(byCategory.size, 5);
  for (const count of byCategory.values()) {
    assert.equal(count, 15);
  }
});

test('PHILOSOPHY_EXAM_QUESTIONS has 50 valid questions linked to valid terms', () => {
  assert.equal(PHILOSOPHY_EXAM_QUESTIONS.length, 50);
  const termIds = new Set(PHILOSOPHY_TERMS.map((t) => t.id));
  const qIds = new Set<string>();

  for (const q of PHILOSOPHY_EXAM_QUESTIONS) {
    assert.ok(!qIds.has(q.id), `Duplicate question id: ${q.id}`);
    qIds.add(q.id);
    assert.ok(termIds.has(q.relatedTermId), `Invalid relatedTermId: ${q.relatedTermId}`);
    assert.equal(q.choices.length, 4);
    assert.ok(!q.stem.includes('<u>'), `Question stem should not contain HTML tags: ${q.id}`);
  }
});

test('Philosophy quiz generator, search, and thinker quiz helpers work cleanly', () => {
  const config = {
    source: 'ALL' as const,
    examFilter: 'ALL' as const,
    questionMode: 'MIXED' as const,
    questionCount: 20 as const,
    topic: 'ALL' as const,
  };
  const pool = getPhilosophyQuizPool(PHILOSOPHY_TERMS, config, new Set(), {});
  const questions = generatePhilosophyQuestions(
    pool,
    PHILOSOPHY_TERMS,
    config,
    () => 0.4,
    PHILOSOPHY_EXAM_QUESTIONS,
    new Set(),
    {},
  );
  assert.equal(questions.length, 20);
  assert.ok(questions.some((q) => q.kind === 'EXAM_STYLE'));

  const summary = calculatePhilosophySummary([
    {question: questions[0], selectedId: 'a', isCorrect: true},
  ]);
  assert.equal(summary.percentage, 100);

  const kant = filterPhilosophyTerms(PHILOSOPHY_TERMS, {
    searchQuery: 'Kant',
    source: 'ALL',
    chip: 'ALL',
    favorites: new Set(),
    stats: {},
  });
  assert.ok(kant.length >= 1);

  const thinkerQuiz = buildThinkerQuizItem(PHIL_THINKERS, () => 0.5);
  assert.equal(thinkerQuiz.choices.length, 4);
  assert.ok(thinkerQuiz.choices.includes(thinkerQuiz.target.thinker));
});
