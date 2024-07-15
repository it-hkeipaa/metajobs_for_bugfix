import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

/**
 * Call API function to fetch Review Data.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "PUT":
      try {
        const { id } = req.query;
        const status = req.body.status;

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

        const reqQuery = {
          accessToken: session?.user.accessToken
            ? session?.user.accessToken
            : accessToken,
          notificationId: id,
          status,
        };

        const notifications = await connect.updateNotification(reqQuery);

        res.status(200).send({
          message: "Successfully updated notofication status",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
  }
}
