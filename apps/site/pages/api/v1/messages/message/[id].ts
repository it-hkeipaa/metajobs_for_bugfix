import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

/**
 * Call API function to message.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "GET":
      try {
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
          message: "Successfully get message",
          data: message,
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
        const { body } = req;

        const message = await connect.updateMessageRoom(id, body);

        if (message.length === 0) {
          return res.status(200).send({
            message: "No Message Found",
            data: [],
          });
        }

        res.status(200).send({
          message: "Successfully updated message",
          data: message,
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
  }
}
