import { NextApiRequest, NextApiResponse } from "next";

/**
 * Call API function to fetch Review Data.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully approved review",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully reported review",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
  }
}
