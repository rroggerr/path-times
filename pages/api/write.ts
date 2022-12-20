import { writeFile } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const content = req.query.text;
  if (typeof content === "string") {
    await writeFile("/tmp/test.txt", content);
    res.status(200).json({ content });
  }
}
