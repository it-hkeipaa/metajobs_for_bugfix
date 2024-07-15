import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully fetched all reviews for this job",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
  }
}
