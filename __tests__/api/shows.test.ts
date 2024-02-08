/* File: test/unit.test.ts */

import { testApiHandler } from 'next-test-api-route-handler'; // ◄ Must be first import
import  showHandler from '@/pages/api/shows/index';
import  showIdHandler from '@/pages/api/shows/[showId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
test('GET api/shows 200 status and  get data ', async () => {
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
test('GET  data after pass sent parameters url call endpoint ', async () => {
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

test('POST api/shows returns 401 status for incorrect revalidate secret', async () => {

 await testApiHandler({
   handler: showHandler,
   paramsPatcher: (param) => {
     param.queryStringURLParams = {secret : 'not the real secret'}
   },
   test: async ({fetch}) => {
     
     const rsp = await fetch({
       method: 'POST',
     });

     expect(rsp.status).toEqual(401);
    
   }
 });

});