import { testApiHandler } from 'next-test-api-route-handler'; // ◄ Must be first import
import showsHandler from '@/pages/api/shows/index';
test('does what I want', async () => {
  await testApiHandler({
    appHandler: showsHandler,
    async test({ fetch }) {
      const res = await fetch({ method: 'GET' });
     // await expect(res.status).toBe(200);
    },
  });
});
