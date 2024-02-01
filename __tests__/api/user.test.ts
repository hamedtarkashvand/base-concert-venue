import { testApiHandler } from 'next-test-api-route-handler'; // ◄ Must be first import
import userHandler from '@/pages/api/users/index';

test('POST api/users receives token with correct credentials', async () => {
  await testApiHandler({
    handler: userHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'POST',
        headers: {
          'content-type': 'application/json', // Must use correct content type
        },
        body: JSON.stringify({
          email: 'test@test.test',
          password: 'test',
        }),
      });

      expect(res.status).toBe(200);

      const json = await res.json();
      console.log(json);
    },
  });
});
