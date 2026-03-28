import { expect, test } from 'vitest';
import { getFaviconUrl } from '@/shared/lib/utils/getFaviconUrl';

test('getFaviconUrl should return correct favicon URL for a given website URL', () => {
  const url = 'https://www.facebook.com/';
  const expectedFaviconUrl = 'https://www.google.com/s2/favicons?sz=64&domain=facebook.com';
  const faviconUrl = getFaviconUrl(url);
  expect(faviconUrl).toBe(expectedFaviconUrl);
});
