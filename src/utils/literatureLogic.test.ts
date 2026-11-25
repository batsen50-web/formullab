import assert from 'node:assert/strict';
import test from 'node:test';
import {LITERATURE_TERMS} from '../data/literature';
import {LITERATURE_EXAM_QUESTIONS} from '../data/literatureQuestions';
import type {LiteratureQuizConfig} from '../types/literature';
import {
  analyzeTurkishWordSound,
  buildWorkAuthorQuizItem,
  calculateLiteratureSummary,
  filterLiteratureTerms,
  generateLiteratureQuestions,
  getLiteratureExamQuestionPool,
  getLiteratureQuizPool,
  ORTHOGRAPHY_TRAPS,
  VERSE_DEVICE_ITEMS,
  WORK_AUTHOR_ITEMS,
} from './literatureLogic';

test('LITERATURE_TERMS dataset has 100 unique terms balanced across 5 categories', () => {
  assert.equal(LITERATURE_TERMS.length, 100);
  const ids = new Set(LITERATURE_TERMS.map((t) => t.id));
  assert.equal(ids.size, 100);

  const counts = new Map<string, number>();
  for (const term of LITERATURE_TERMS) {
    counts.set(term.category, (counts.get(term.category) ?? 0) + 1);
  }
  assert.equal(counts.get('DIL_YAZIM_ANLAM'), 20);
  assert.equal(counts.get('SOZCUK_CUMLE_DILBILGISI'), 20);
  assert.equal(counts.get('SIIR_SANAT_DONEMLER'), 20);
  assert.equal(counts.get('TANZIMAT_CUMHURIYET_SIIR'), 20);
  assert.equal(counts.get('NESIR_ROMAN_TIYATRO_AKIM'), 20);
});

test('LITERATURE_EXAM_QUESTIONS has 80 valid YKS questions linked to existing terms', () => {
  assert.equal(LITERATURE_EXAM_QUESTIONS.length, 80);
  const validIds = new Set(LITERATURE_TERMS.map((t) => t.id));
  const qIds = new Set<string>();
  const counts = new Map<string, number>();

  for (const q of LITERATURE_EXAM_QUESTIONS) {
    assert.equal(qIds.has(q.id), false);
    qIds.add(q.id);
    assert.equal(validIds.has(q.relatedTermId), true, `Missing relatedTermId: ${q.relatedTermId}`);
    assert.equal(q.choices.length, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
    counts.set(q.category, (counts.get(q.category) ?? 0) + 1);
  }

  assert.equal(counts.get('DIL_YAZIM_ANLAM'), 16);
  assert.equal(counts.get('SOZCUK_CUMLE_DILBILGISI'), 16);
  assert.equal(counts.get('SIIR_SANAT_DONEMLER'), 16);
  assert.equal(counts.get('TANZIMAT_CUMHURIYET_SIIR'), 16);
  assert.equal(counts.get('NESIR_ROMAN_TIYATRO_AKIM'), 16);
});

test('filterLiteratureTerms filters by Turkish search query and topic/exam chip', () => {
  const results = filterLiteratureTerms(LITERATURE_TERMS, {
    searchQuery: 'tevriye',
    source: 'ALL',
    chip: 'AYT',
    favorites: new Set(),
    stats: {},
  });
  assert.ok(results.length >= 1);
  assert.ok(results.some((r) => r.id === 'lit_edebi_sanatlar_2'));
});

test('generateLiteratureQuestions supports 30-question AYT mixed & exam-style sessions', () => {
  const config: LiteratureQuizConfig = {
    source: 'ALL',
    examFilter: 'AYT',
    questionMode: 'MIXED',
    questionCount: 30,
    topic: 'ALL',
  };
  const pool = getLiteratureQuizPool(LITERATURE_TERMS, config, new Set(), {});
  const examPool = getLiteratureExamQuestionPool(
    LITERATURE_EXAM_QUESTIONS,
    LITERATURE_TERMS,
    config,
    new Set(),
    {},
  );
  assert.equal(pool.length, 60);
  assert.equal(examPool.length, 48);

  const generated = generateLiteratureQuestions(
    pool,
    LITERATURE_TERMS,
    config,
    () => 0.42,
    LITERATURE_EXAM_QUESTIONS,
  );
  assert.equal(generated.length, 30);

  const summary = calculateLiteratureSummary(
    generated.slice(0, 4).map((q, idx) => ({
      question: q,
      selectedId: idx < 3 ? 'ok' : 'wrong',
      isCorrect: idx < 3,
    })),
  );
  assert.equal(summary.correctCount, 3);
  assert.equal(summary.percentage, 75);
  assert.equal(summary.bestStreak, 3);
  assert.equal(summary.mistakes.length, 1);
});

test('Interactive Lab datasets and Turkish sound analyzer evaluate rules accurately', () => {
  assert.ok(WORK_AUTHOR_ITEMS.length >= 25);
  assert.ok(VERSE_DEVICE_ITEMS.length >= 10);
  assert.ok(ORTHOGRAPHY_TRAPS.length >= 12);

  const quizItem = buildWorkAuthorQuizItem(WORK_AUTHOR_ITEMS, () => 0.25);
  assert.ok(quizItem !== null);
  assert.equal(quizItem.choices.length, 4);
  assert.ok(quizItem.choices.includes(quizItem.target.author));

  const good = analyzeTurkishWordSound('kömürlük');
  assert.equal(good.passesBigHarmony, true);
  assert.equal(good.passesSmallHarmony, true);

  const badYor = analyzeTurkishWordSound('geliyor');
  assert.equal(badYor.passesBigHarmony, false);
  assert.equal(badYor.passesSmallHarmony, false);
  assert.ok(badYor.specialNote !== null);

  const kavun = analyzeTurkishWordSound('kavun');
  assert.equal(kavun.passesBigHarmony, true);
  assert.equal(kavun.passesSmallHarmony, false);
});
