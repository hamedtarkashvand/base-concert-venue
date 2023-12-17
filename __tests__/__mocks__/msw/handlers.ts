import { rest } from 'msw';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  // http.get('/user', ({ request }) => {
  //   return HttpResponse.json({ name: 'John' });
  // }),
  rest.get('http://localhost:3000/api/show:showId', async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    return res(ctx.json({ show: fakeShows[0] }));
  }),
];
