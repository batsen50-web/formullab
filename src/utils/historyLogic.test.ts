import assert from 'node:assert/strict';
import test from 'node:test';
import {HISTORY_TERMS} from '../data/history';
import {HISTORY_EXAM_QUESTIONS} from '../data/historyQuestions';
import {
  buildBattleQuizItem,
  buildChronologyChallenge,
  calculateHistorySummary,
  filterHistoryTerms,
  generateHistoryQuestions,
  getHistoryQuizPool,
  HIST_BATTLES_TREATIES,
  HIST_TIMELINE_EVENTS,
} from './historyLogic';

test('HISTORY_TERMS has 75 unique terms evenly balanced across 5 categories', () => {
  assert.equal(HISTORY_TERMS.length, 75);
  const ids = new Set(HISTORY_TERMS.map((t) => t.id));
  assert.equal(ids.size, 75);

  const byCategory = new Map<string, number>();
  for (const term of HISTORY_TERMS) {
    byCategory.set(term.category, (byCategory.get(term.category) ?? 0) + 1);
  }
  assert.equal(byCategory.size, 5);
  for (const count of byCategory.values()) {
    assert.equal(count, 15);
  }
});

test('HISTORY_EXAM_QUESTIONS has 50 valid questions linked to valid terms', () => {
  assert.equal(HISTORY_EXAM_QUESTIONS.length, 50);
  const termIds = new Set(HISTORY_TERMS.map((t) => t.id));
  const qIds = new Set<string>();

  for (const q of HISTORY_EXAM_QUESTIONS) {
    assert.ok(!qIds.has(q.id), `Duplicate question id: ${q.id}`);
    qIds.add(q.id);
    assert.ok(termIds.has(q.relatedTermId), `Invalid relatedTermId: ${q.relatedTermId}`);
    assert.equal(q.choices.length, 4);
    assert.ok(!q.stem.includes('<u>'), `Question stem should not contain HTML tags: ${q.id}`);
  }
});

test('History quiz generator produces mixed & exam-style questions properly', () => {
  const config = {
    source: 'ALL' as const,
    examFilter: 'ALL' as const,
    questionMode: 'MIXED' as const,
    questionCount: 20 as const,
    topic: 'ALL' as const,
  };
  const pool = getHistoryQuizPool(HISTORY_TERMS, config, new Set(), {});
  const questions = generateHistoryQuestions(
    pool,
    HISTORY_TERMS,
    config,
    () => 0.42,
    HISTORY_EXAM_QUESTIONS,
    new Set(),
    {},
  );
  assert.equal(questions.length, 20);
  assert.ok(questions.some((q) => q.kind === 'EXAM_STYLE'));
  assert.ok(questions.some((q) => q.kind === 'CONCEPT'));

  const summary = calculateHistorySummary([
    {question: questions[0], selectedId: 'a', isCorrect: true},
    {question: questions[1], selectedId: 'b', isCorrect: false},
  ]);
  assert.equal(summary.total, 2);
  assert.equal(summary.correctCount, 1);
  assert.equal(summary.percentage, 50);
  assert.equal(summary.mistakes.length, 1);
});

test('History filter & interactive lab helpers work reliably', () => {
  const filtered = filterHistoryTerms(HISTORY_TERMS, {
    searchQuery: 'Lozan',
    source: 'ALL',
    chip: 'ALL',
    favorites: new Set(),
    stats: {},
  });
  assert.ok(filtered.length >= 1);

  const chrono = buildChronologyChallenge(HIST_TIMELINE_EVENTS, () => 0.3);
  assert.equal(chrono.events.length, 4);
  const minYear = Math.min(...chrono.events.map((e) => e.year));
  const pickedEarliest = chrono.events.find((e) => e.id === chrono.earliestId);
  assert.equal(pickedEarliest?.year, minYear);

  const battleQuiz = buildBattleQuizItem(HIST_BATTLES_TREATIES, () => 0.5);
  assert.equal(battleQuiz.choices.length, 4);
  assert.ok(battleQuiz.choices.includes(battleQuiz.target.name));
});
