import { NextApiRequest, NextApiResponse } from "next";

/**
 * Call API function to fetch Review Data.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully fetched review",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully updated review",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully deleted review",
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
