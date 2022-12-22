import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<{ env: string; sha: string; git: string }>
) {
  res.status(200).json({
    env: process.env.VERCEL_ENV ?? 'local',
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? 'localdev',
    git: process.env.VERCEL_GIT_COMMIT_MESSAGE ?? 'localdev',
  });
}
