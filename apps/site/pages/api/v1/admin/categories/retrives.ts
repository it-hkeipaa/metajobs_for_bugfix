import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Formidable } from "formidable";
import { unstable_getServerSession } from "next-auth";
// import upload from '../../../../src/lib/multer'

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

//create a job
apiRoute.post(async (req, res) => {
  try {
    const connect = await apiConnector;
    // get body from request
    const data: any = await new Promise((resolve, reject) => {
      const form = new Formidable();

      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

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
      categoryTitle: data.fields.categoryTitle[0] || "",
      subCategory: data.fields.subCategory
        ? data.fields.subCategory[0].split(",")
        : [],
      categoryIcon: data.files.categoryIcon[0].filepath || "",
      accessToken: session?.user.accessToken
        ? session?.user.accessToken
        : accessToken,
    };

    const jobAlert = await connect.createCategory(reqData);

    res.status(200).send({
      message: "Successfully created a job",
    });
  } catch (e: any) {
    res.status(500).send({
      message: e.message,
      error: "Server error",
    });
  }
});

// find all jobs
apiRoute.get(async (req, res) => {
  try {
    const connect = await apiConnector;
    const categories = await connect.getCategories();

    res.status(200).send({
      message: "Successfully fetched all jobs",
      data: categories,
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
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
