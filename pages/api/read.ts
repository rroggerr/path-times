import { readFile } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const content = await(await readFile("/tmp/test.txt")).toString();
  res.status(200).json({ content });
}
