import assert from 'node:assert/strict';
import test from 'node:test';
import {
  canShowDailyAd,
  DAILY_AD_STORAGE_KEY,
  getLocalDateKey,
  markDailyAdShown,
  type StorageLike,
} from './adFrequency';

function createMemoryStorage(): StorageLike {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
  };
}

test('getLocalDateKey formats YYYY-MM-DD using local calendar date', () => {
  const sample = new Date(2026, 10, 5, 14, 30, 0);
  assert.equal(getLocalDateKey(sample), '2026-11-05');
});

test('canShowDailyAd allows once per calendar day and resets next day', () => {
  const storage = createMemoryStorage();
  const dayOne = new Date(2026, 10, 23, 9, 45, 0);
  const dayOneLater = new Date(2026, 10, 23, 22, 15, 0);
  const dayTwo = new Date(2026, 10, 24, 8, 0, 0);

  assert.equal(canShowDailyAd(dayOne, storage), true);
  assert.equal(markDailyAdShown(dayOne, storage), true);
  assert.equal(storage.getItem(DAILY_AD_STORAGE_KEY), '2026-11-23');

  assert.equal(canShowDailyAd(dayOneLater, storage), false);
  assert.equal(canShowDailyAd(dayTwo, storage), true);
});

test('adFrequency handles missing storage safely', () => {
  const sample = new Date(2026, 10, 23);
  assert.equal(canShowDailyAd(sample, null), false);
  assert.equal(markDailyAdShown(sample, null), false);
});
