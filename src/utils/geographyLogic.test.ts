import assert from 'node:assert/strict';
import test from 'node:test';
import {GEOGRAPHY_TERMS} from '../data/geography';
import {GEOGRAPHY_EXAM_QUESTIONS} from '../data/geographyQuestions';
import type {GeographyQuizConfig} from '../types/geography';
import {
  TURKEY_MAP_HOTSPOTS,
  WORLD_MAP_HOTSPOTS,
  calculateGeographySummary,
  calculateLocalTimeDifference,
  calculateScaleAndSlope,
  filterGeographyTerms,
  generateGeographyQuestions,
  getGeographyQuizPool,
} from './geographyLogic';

const BASE_CONFIG: GeographyQuizConfig = {
  source: 'ALL',
  examFilter: 'ALL',
  questionMode: 'MIXED',
  questionCount: 10,
  topic: 'ALL',
};

test('GEOGRAPHY_TERMS has 80 unique entries across 5 balanced categories (16 each)', () => {
  assert.equal(GEOGRAPHY_TERMS.length, 80);

  const idSet = new Set<string>();
  const termSet = new Set<string>();
  const counts: Record<string, number> = {};

  for (const t of GEOGRAPHY_TERMS) {
    assert.ok(!idSet.has(t.id), `Duplicate id: ${t.id}`);
    assert.ok(!termSet.has(t.term.toLowerCase()), `Duplicate term: ${t.term}`);
    idSet.add(t.id);
    termSet.add(t.term.toLowerCase());
    counts[t.category] = (counts[t.category] ?? 0) + 1;
  }

  assert.equal(counts.HARITA_KONUM, 16);
  assert.equal(counts.IKLIM_BIYOM, 16);
  assert.equal(counts.YERYUZU_SU, 16);
  assert.equal(counts.NUFUS_EKONOMI, 16);
  assert.equal(counts.ULUSLARARASI_AFET, 16);
});

test('GEOGRAPHY_EXAM_QUESTIONS has 40 valid YKS questions (8 per category) with valid term links', () => {
  assert.equal(GEOGRAPHY_EXAM_QUESTIONS.length, 40);
  const validIds = new Set(GEOGRAPHY_TERMS.map((t) => t.id));
  const counts: Record<string, number> = {};

  for (const q of GEOGRAPHY_EXAM_QUESTIONS) {
    assert.ok(validIds.has(q.relatedTermId), `Invalid relatedTermId: ${q.relatedTermId}`);
    assert.equal(q.choices.length, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
    counts[q.category] = (counts[q.category] ?? 0) + 1;
  }

  assert.equal(counts.HARITA_KONUM, 8);
  assert.equal(counts.IKLIM_BIYOM, 8);
  assert.equal(counts.YERYUZU_SU, 8);
  assert.equal(counts.NUFUS_EKONOMI, 8);
  assert.equal(counts.ULUSLARARASI_AFET, 8);
});

test('filterGeographyTerms filters by Turkish search, exam level, and favorites', () => {
  const f1 = filterGeographyTerms(GEOGRAPHY_TERMS, {
    searchQuery: 'cebelitarık',
    source: 'ALL',
    chip: 'ALL',
    favorites: new Set(),
    stats: {},
  });
  assert.ok(f1.some((t) => t.id === 'geo_ua_01'));

  const favs = new Set(['geo_hk_01', 'geo_ib_05']);
  const f2 = filterGeographyTerms(GEOGRAPHY_TERMS, {
    searchQuery: '',
    source: 'FAVORITES',
    chip: 'TYT',
    favorites: favs,
    stats: {},
  });
  assert.equal(f2.length, 2);
});

test('generateGeographyQuestions produces MIXED, EXAM_STYLE, and concept modes', () => {
  const pool = getGeographyQuizPool(GEOGRAPHY_TERMS, BASE_CONFIG, new Set(), {});
  const mixed = generateGeographyQuestions(
    pool,
    GEOGRAPHY_TERMS,
    BASE_CONFIG,
    Math.random,
    GEOGRAPHY_EXAM_QUESTIONS,
  );
  assert.equal(mixed.length, 10);
  assert.ok(mixed.some((q) => q.kind === 'EXAM_STYLE'));
  assert.ok(mixed.some((q) => q.kind === 'CONCEPT'));

  const examOnly = generateGeographyQuestions(
    pool,
    GEOGRAPHY_TERMS,
    {...BASE_CONFIG, questionMode: 'EXAM_STYLE', questionCount: 15},
    Math.random,
    GEOGRAPHY_EXAM_QUESTIONS,
  );
  assert.equal(examOnly.length, 15);
  assert.ok(examOnly.every((q) => q.kind === 'EXAM_STYLE'));

  const summary = calculateGeographySummary([
    {question: mixed[0], selectedId: 'x', isCorrect: true},
    {question: mixed[1], selectedId: 'y', isCorrect: false},
  ]);
  assert.equal(summary.total, 2);
  assert.equal(summary.correctCount, 1);
  assert.equal(summary.percentage, 50);
  assert.equal(summary.mistakes.length, 1);
});

test('WORLD_MAP_HOTSPOTS (12) and TURKEY_MAP_HOTSPOTS (14) coordinates stay within SVG bounds', () => {
  assert.equal(WORLD_MAP_HOTSPOTS.length, 12);
  for (const spot of WORLD_MAP_HOTSPOTS) {
    assert.ok(spot.x > 0 && spot.x < 600);
    assert.ok(spot.y > 0 && spot.y < 300);
  }

  assert.equal(TURKEY_MAP_HOTSPOTS.length, 14);
  for (const spot of TURKEY_MAP_HOTSPOTS) {
    assert.ok(spot.x > 0 && spot.x < 600);
    assert.ok(spot.y > 0 && spot.y < 280);
  }
});

test('calculateLocalTimeDifference computes Turkey 26E to 45E (76 min) and meridian shifts accurately', () => {
  const trDiff = calculateLocalTimeDifference(26, 'E', 12, 0, 45, 'E');
  assert.equal(trDiff.meridianDiff, 19);
  assert.equal(trDiff.totalMinutesDiff, 76);
  assert.equal(trDiff.hoursDiff, 1);
  assert.equal(trDiff.minutesRemainder, 16);
  assert.equal(trDiff.targetTimeFormatted, '13:16');
  assert.equal(trDiff.directionLabel, 'Doğuda (+İleri)');

  const crossPrime = calculateLocalTimeDifference(15, 'E', 10, 0, 15, 'W');
  assert.equal(crossPrime.meridianDiff, 30);
  assert.equal(crossPrime.totalMinutesDiff, 120);
  assert.equal(crossPrime.targetTimeFormatted, '08:00');
  assert.equal(crossPrime.directionLabel, 'Batıda (-Geri)');
});

test('calculateScaleAndSlope computes real km, classification, and % slope accurately', () => {
  const res = calculateScaleAndSlope(200_000, 5, 250, 5);
  assert.equal(res.realDistanceKm, 10);
  assert.equal(res.scaleClass, 'Büyük Ölçekli (Plan / Topoğrafya)');
  assert.equal(res.slopePercent, 5);
  assert.equal(res.slopePermille, 50);

  const small = calculateScaleAndSlope(1_000_000, 4, 300, 10);
  assert.equal(small.realDistanceKm, 40);
  assert.equal(small.scaleClass, 'Küçük Ölçekli (Atlas / Duvar)');
});
