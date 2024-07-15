import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "GET":
      try {
        const connect = await apiConnector;
        const countData = await connect.getTotalCount();

        res.status(200).send({
          message: "Successfully found total count for jobs, resume, company",
          data: countData,
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
