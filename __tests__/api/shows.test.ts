/* File: test/unit.test.ts */

import { testApiHandler } from 'next-test-api-route-handler'; // ◄ Must be first import
import  showHandler from '@/pages/api/shows/index';
import  showIdHandler from '@/pages/api/shows/[showId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
test('should get data after call endpoint ', async () => {
  await testApiHandler({
    handler: showHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const resp = await res.json();
      const { fakeShows } = await readFakeData();
      expect(resp).toEqual({ shows: fakeShows });
    },
  });
});
test('should get data after pass sent parameters url call endpoint ', async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const resp = await res.json();
      const { fakeShows } = await readFakeData();
      expect(resp).toEqual({ show: fakeShows[0] });
    },
  });
});
