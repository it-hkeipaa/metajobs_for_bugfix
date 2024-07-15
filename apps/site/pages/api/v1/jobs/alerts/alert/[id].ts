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
  switch (req.method) {
    case "POST":
      try {
        const { id } = req.query;

        res.status(200).send({
          message: "Successfully emailed alert result",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "GET":
      try {
        const { id } = req.query;
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
          alertId: id,
        };

        const jobAlert = await connect.getSingleJobAlert(reqQuery);

        res.status(200).send({
          message: "Successfully fetched alert",
          data: jobAlert,
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
          alertId: id,
          body: req.body,
        };

        const jobAlert = await connect.updateJobAlert(reqQuery);

        res.status(200).send({
          message: "Successfully updated alert",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "PATCH":
      try {
        const { id } = req.query;
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
          alertId: id,
          active: req.body.active,
        };

        const jobAlerts = await connect.updateJobAlertStatus(reqQuery);
        res.status(200).send({
          message: "Successfully changed alert status",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
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
          alertId: id,
        };

        const jobAlerts = await connect.deleteJobAlert(reqQuery);
        res.status(200).send({
          message: "Successfully deleted job alert",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
  }
}
