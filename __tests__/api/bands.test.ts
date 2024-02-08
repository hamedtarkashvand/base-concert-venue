import { testApiHandler } from 'next-test-api-route-handler'; // ◄ Must be first import

import bandsHandler from '@/pages/api/bands/index'

test('POST api/bands get status 401 for or incorrect revalidate secret ', async () => {
  await testApiHandler({
    handler: bandsHandler,
    paramsPatcher: (param) => {
      param.queryStringURLParams =  { secret : ' not real secret code '}
    }, 
    test: async ({fetch}) => {
      const response = await fetch({
        method: 'POST',
      });
      expect(response.status).toEqual(401)
    }
   })
});