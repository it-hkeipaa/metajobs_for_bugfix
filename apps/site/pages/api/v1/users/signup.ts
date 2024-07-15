import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from "@metajob/api-connector";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "POST":
      try {
        const connect = await apiConnector;
        const user = await connect.createUser(req.body);
        res.status(200).send({
          message: "Successfully Created User",
          data: user,
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
