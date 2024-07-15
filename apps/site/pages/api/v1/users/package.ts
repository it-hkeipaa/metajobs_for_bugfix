import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";
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

apiRoute.put(async (req, res) => {
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

  const packageId = req.body.packageId;

  const reqQuery = {
    accessToken: session?.user.accessToken
      ? session?.user.accessToken
      : accessToken,
    packageId,
  };

  await connect.updateUserPackage(reqQuery);

  res.status(200).send({
    message: "Successfully updated user package",
  });
});

export default apiRoute;
