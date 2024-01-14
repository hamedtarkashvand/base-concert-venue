import { createHandler } from '@/lib/api/handler';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== 'test') {
    return res
      .status(401)
      .json({ message: 'endpoint only available for test use ' });
  }

  const secret = req.query.secret;
  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'invalid revalidation secret' });
  }

  res.revalidate('/bands')
  res.revalidate('/shows')
  return res.status(200).json({ revalidated : true});
});

export default handler;

// export default async function handler(req, res) {
//   // Check for secret to confirm this is a valid request
//   if (req.query.secret !== process.env.REVALIDATION_SECRET) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }

//   try {
//     await res.unstable_revalidate('/path-to-revalidate');
//     return res.json({ revalidated: true });
//   } catch (err) {
//     // If there was an error, Next.js will continue
//     // to show the last successfully generated page
//     return res.status(500).send('Error revalidating');
//   }
// }
