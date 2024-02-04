import { testApiHandler } from 'next-test-api-route-handler'; // ◄ Must be first import
import userHandler from '@/pages/api/users/index';
import userReservationsHandler from '@/pages/api/users/[userId]/reservations';
jest.mock('@/lib/auth/utils')
test('GET api/users/[userId]/reservations receives check token', async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (param) => {
      param.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: 'GET',
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toHaveProperty('userReservations');
      expect(json.userReservations).toHaveLength(2);
    },
  });
});
jest.mock('@/lib/auth/utils');
test('GET /user/[userId]/reservations  not receives', async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (param) => {
      param.userId = 123456;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });
      expect(res.status).toBe(200);
      const dataRes = await res.json();
      expect(dataRes.userReservations).toHaveLength(0);
    },
  });
});

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
      
      expect(json).toHaveProperty('user')
      expect(json.user).toHaveProperty('id')
      expect(json.user.id).toEqual(1)
      expect(json.user).toHaveProperty('email')
      expect(json.user.email).toEqual('test@test.test');
      expect(json.user).toHaveProperty('token');


    },
  });
});
