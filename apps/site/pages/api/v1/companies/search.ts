import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from "@metajob/api-connector";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "GET":
      try {
        const queries = req.query;

        const companyResult = await connect.getSearchCompany(queries);

        res.status(200).send({
          message: "Successfully fetched all searched company",
          data: companyResult,
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
