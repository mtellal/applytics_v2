import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { testI18n } from './i18n';

beforeEach(async () => {
  await testI18n.changeLanguage('fr');
  // Freeze only Date so user-event and component timers keep running normally.
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-09-17T12:00:00Z'));
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
