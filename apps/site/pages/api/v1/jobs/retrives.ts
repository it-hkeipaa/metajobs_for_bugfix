import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";
// @ts-ignore
import { Formidable } from "formidable";

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

    const headerImage = data?.files?.headerImage
      ? data?.files?.headerImage[0]?.filepath
      : null;

    const jobData = {
      company: data?.fields?.company ? data?.fields?.company[0] : "",
      jobTitle: data?.fields?.jobTitle ? data?.fields?.jobTitle[0] : "",
      location: data?.fields?.location ? data?.fields?.location[0] : "",
      region: data?.fields?.region ? data?.fields?.region[0] : "",
      jobTypes: data?.fields?.jobTypes
        ? data?.fields?.jobTypes[0].split(",")
        : [],
      category: data?.fields?.category ? data?.fields?.category[0] : "",
      jobExperience: data?.fields?.jobExperience
        ? data?.fields?.jobExperience[0]
        : "",
      specialTags: data?.fields?.specialTags
        ? data?.fields?.specialTags[0].split(",")
        : [],
      jobDescription: data?.fields?.jobDescription
        ? data?.fields?.jobDescription[0]
        : "",
      email: data?.fields?.email ? data?.fields?.email[0] : "",
      applyDeadline: data?.fields?.applyDeadline
        ? data?.fields?.applyDeadline[0]
        : "",
      hourlyrate: {
        minimum: data?.fields?.hourlyrateMinimum
          ? data?.fields?.hourlyrateMinimum[0]
          : "",
        maximum: data?.fields?.hourlyrateMaximum
          ? data?.fields?.hourlyrateMaximum[0]
          : "",
      },
      salary: {
        minimum: data?.fields?.salaryMinimum
          ? data?.fields?.salaryMinimum[0]
          : "",
        maximum: data?.fields?.salaryMaximum
          ? data?.fields?.salaryMaximum[0]
          : "",
      },
      applyLink: data?.fields?.applyLink ? data?.fields?.applyLink[0] : "",
    };

    const reqQuery = {
      accessToken: session?.user.accessToken
        ? session?.user.accessToken
        : accessToken,
      jobData,
      headerImage,
    };
    const job = await connect.createJob(reqQuery);
    res.status(200).send({
      message: "Successfully created a job",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
});

// find all jobs
apiRoute.get(async (req, res) => {
  try {
    const connect = await apiConnector;
    const jobs = await connect.getJobs();

    res.status(200).send({
      message: "Successfully fetched all jobs",
      data: jobs,
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
