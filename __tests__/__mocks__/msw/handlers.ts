import { rest } from 'msw';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { getReservationsByUserId } from '@/lib/features/users/queries';
import { fakeUserReservations } from '../fakeData/userReservations';
export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  // http.get('/user', ({ request }) => {
  //   return HttpResponse.json({ name: 'John' });
  // }),
  rest.get('http://localhost:3000/api/shows/:showId', async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;
    // index showId = 0  has seats available in fake data
    // index showId = 1  has No seats available in fake data
    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }),
  rest.get(
    'http://localhost:3000/api/users/:userId/reservations',
    async (req, res, ctx) => {
      const { userId } = req.params;
      // index showId = 0  has No reservations show in fake data
      // index showId = 1  has reservations show in fake data
      const typeNumberUserId = Number(userId);
      return res(
        ctx.json({
          userReservations: typeNumberUserId ? fakeUserReservations : [],
        })
      );
    }
  ),
];
