import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        res.status(200).send({
          message: "Job-review created successfully",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
  }
}
