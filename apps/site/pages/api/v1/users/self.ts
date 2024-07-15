import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
// @ts-ignore
import { Formidable } from "formidable";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something Happened! ${error.message}`,
    });
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

  // get body from request
  const data: any = await new Promise((resolve, reject) => {
    const form = new Formidable();

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const imageData = data?.files?.profileImage
    ? data?.files?.profileImage[0].filepath
    : null;
  const userData = {
    fullName: {
      firstName: data?.fields?.firstName ? data?.fields?.firstName[0] : "",
      lastName: data?.fields?.lastName ? data?.fields?.lastName[0] : "",
    },
    // email: req.body?.email,
    phoneNumber: data?.fields?.phoneNumber ? data?.fields?.phoneNumber[0] : "",
    aboutMe: data?.fields?.aboutMe ? data?.fields?.aboutMe[0] : "",
  };

  const reqQuery = {
    accessToken: session?.user.accessToken
      ? session?.user.accessToken
      : accessToken,
    userData,
  };

  const user = await connect.updateUser(reqQuery, imageData);

  res.status(200).send({
    message: "Successfully updated user",
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
