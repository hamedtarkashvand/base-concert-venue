import { validateToken } from '@/lib/auth/utils';
import reservationsHandler from '@/pages/api/reservations/[reservationId]';
import userReservationsHandler from '@/pages/api/users/[userId]/reservations';

import { testApiHandler } from 'next-test-api-route-handler';

jest.mock('@/lib/auth/utils');
const mockValidationToken = validateToken as jest.Mock; +
  
test('POST add new reservation  ', async () => {
  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (param) => {
      param.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const response = await fetch({
        method: 'POST',
        headers: {
          'content-type': 'application/json', // Must use correct content type
        },
        body: JSON.stringify({
          seatCount: 3,
          userId: 1,
          showId: 0,
        }),
      });

      expect(response.status).toBe(201);
    },
  });

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (param) => {
      param.userId = 1;
    },
    test: async ({ fetch }) => {
      const resp = await fetch({
        method: 'GET',
      });

      expect(resp.status).toBe(200);
      const dataResponse = await resp.json();

      expect(dataResponse.userReservations).toHaveLength(3);
    },
  });
});

test('POST /user/[userId]/reservations  return 401 status  when  not authorize', async () => {
  mockValidationToken.mockResolvedValue(false);

  await testApiHandler({
    handler: reservationsHandler,
    paramsPatcher: (param) => {
      param.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const response = await fetch({
        method: 'POST',
        headers: {
          'content-type': 'application/json', // Must use correct content type
        },
        body: JSON.stringify({
          seatCount: 3,
          userId: 1,
          showId: 0,
        }),
      });

      expect(response.status).toBe(401);
    },
  });
});