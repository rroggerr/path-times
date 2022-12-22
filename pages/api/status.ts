import type { NextApiRequest, NextApiResponse } from 'next';

const sha = process.env.VERCEL_GIT_COMMIT_SHA ?? 'localdev';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<string>
) {
  res.status(200).send(sha);
}
