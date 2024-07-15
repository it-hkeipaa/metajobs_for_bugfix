import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const connect = await apiConnector;
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

        const jobAlerts = await connect.getJobAlerts(
          session?.user.accessToken ? session?.user.accessToken : accessToken,
        );

        res.status(200).send({
          message: "Successfully fetched all alert by this user",
          data: jobAlerts,
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
        const connect = await apiConnector;
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

        const reqData = {
          body: req.body,
          accessToken: session?.user.accessToken
            ? session?.user.accessToken
            : accessToken,
        };
        const jobAlert = await connect.createJobAlerts(reqData);

        res.status(200).send({
          message: "Job alert created successfully",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
  }
}
