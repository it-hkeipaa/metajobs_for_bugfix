import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        res.status(200).send({
          message: "Successfully fetched all jobs",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "POST":
      try {
        const { id } = req.query;
        const connect = await apiConnector;
        await connect.connectDB();
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

        const reqQuery = {
          accessToken: session?.user.accessToken
            ? session?.user.accessToken
            : accessToken,
          emailType: req.body.emailType,
          body: req.body,
        };

        await connect.createEmailSettings(reqQuery);

        res.status(200).send({
          message: 'Email template created successfully" ',
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
  }
}
