import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

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

        const message = await connect.findMessageRoom(
          session?.user.accessToken ? session?.user.accessToken : accessToken,
        );

        if (message.length === 0) {
          return res.status(200).send({
            message: "No Message Found",
            data: [],
          });
        }

        res.status(200).send({
          message: "Fetched message rooms",
          data: message,
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
        const { body } = req;

        const message = await connect.createMessageRoom(body);

        if (message.length === 0) {
          return res.status(200).send({
            message: "No Message Found",
            data: [],
          });
        }

        res.status(200).send({
          message: "Messages sent successfully",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
  }
}
