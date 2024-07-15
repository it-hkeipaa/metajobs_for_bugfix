import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from "@metajob/api-connector";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "POST":
      try {
        const inputData = {
          ...req.body,
        };
        const connect = await apiConnector;

        const email = await connect.sendContactEmail(inputData);

        return res.status(200).send({
          message: "Thank you for giving us an email",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
      break;
  }
}
