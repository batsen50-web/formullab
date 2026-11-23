export const DAILY_AD_STORAGE_KEY = 'formullab_last_daily_ad_date';

export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function resolveStorage(storage?: StorageLike | null): StorageLike | null {
  if (storage !== undefined) return storage;
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

export function canShowDailyAd(
  date: Date = new Date(),
  storage?: StorageLike | null,
): boolean {
  const targetStorage = resolveStorage(storage);
  if (!targetStorage) return false;
  try {
    const lastShown = targetStorage.getItem(DAILY_AD_STORAGE_KEY);
    return lastShown !== getLocalDateKey(date);
  } catch {
    return false;
  }
}

export function markDailyAdShown(
  date: Date = new Date(),
  storage?: StorageLike | null,
): boolean {
  const targetStorage = resolveStorage(storage);
  if (!targetStorage) return false;
  try {
    targetStorage.setItem(DAILY_AD_STORAGE_KEY, getLocalDateKey(date));
    return true;
  } catch {
    return false;
  }
}
