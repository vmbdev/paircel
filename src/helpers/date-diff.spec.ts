import { describe, test, expect, beforeEach, afterAll, vi } from 'vitest';

import { dateDiffToNow } from '@/helpers/date-diff';

describe('Date differences', () => {
  beforeEach(() => {
    const mockDate = new Date(2024, 1, 1, 12, 20, 0);
    vi.setSystemTime(mockDate);
  });

  test('Calculate the time difference in days', () => {
    const date = dateDiffToNow(new Date(2023, 12, 1));
    expect(date.difference).toBe(32);
    expect(date.unit).toBe('days');
  });
  test('Calculate the time difference in hours', () => {
    const date = dateDiffToNow(new Date(2023, 12, 31, 23, 59, 0));
    expect(date.difference).toBe(12);
    expect(date.unit).toBe('hours');
  });
  test('Calculate the time difference in minutes', () => {
    const date = dateDiffToNow(new Date(2024, 1, 1, 12, 0, 0));
    expect(date.difference).toBe(20);
    expect(date.unit).toBe('minutes');
  });

  afterAll(() => {
    vi.useRealTimers();
  });
});
