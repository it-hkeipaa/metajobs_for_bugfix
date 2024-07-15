import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";
import { authOptions } from "../../auth/[...nextauth]";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(async (req, res, next) => {
  try {
    const connect = await apiConnector;
    await connect.connectDB();
    next();
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

apiRoute.post(async (req, res) => {
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
    };
    const send = await connect.resendConfirmEmail(reqQuery);

    return res.status(200).send({
      message: "Confirmation email sent successfully",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

export default apiRoute;
