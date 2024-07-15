import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();
  switch (req.method) {
    case "PUT":
      try {
        const connect = await apiConnector;
        const { id } = req.query;
        const session = await unstable_getServerSession(req, res, authOptions);

        const { headers } = req as any;
        const accessToken = await headers.authorization?.substring(
          7,
          headers.authorization.length,
        );

        if (!accessToken && !session?.user.accessToken) {
          res.status(401).send({
            message: "User not authenticated",
            error: "Server Error",
          });
          return;
        }

        const rewQuery = {
          accessToken: session?.user.accessToken
            ? session?.user.accessToken
            : accessToken,
          jobId: id,
          jobStatus: req.body.status,
        };
        const message = await connect.updateJobStatus(rewQuery);

        res.status(200).send({
          message,
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
  }
}
