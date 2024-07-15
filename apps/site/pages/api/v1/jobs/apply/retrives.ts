import { authOptions } from "@/pages/api/auth/[...nextauth]";
import upload from "@/src/lib/multer";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";

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

apiRoute.use(upload.single("cvFile"));

//create a job application
apiRoute.post(async (req, res) => {
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

    const { file } = req as any;
    const cvFile = file?.path;
    const applyData = {
      fullName: req.body.fullName,
      email: req.body.email,
      coverLetter: req.body.coverLetter,
      jobItem: req.body.jobItem,
    };

    const reqQuery = {
      accessToken: session?.user.accessToken
        ? session?.user.accessToken
        : accessToken,
      applyData,
      cvFile,
    };
    const job = await connect.createJobApply(reqQuery);

    res.status(200).send({
      message: "You have successfully applied a job",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

//get all applications of an user
apiRoute.get(async (req, res) => {
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

    const applications = await connect.getUserApplication(
      session?.user.accessToken ? session?.user.accessToken : accessToken,
    );

    res.status(200).send({
      message: "Successfully fetched all applications for this user",
      data: applications,
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
