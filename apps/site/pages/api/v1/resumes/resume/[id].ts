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

apiRoute.use(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "docFile", maxCount: 1 },
  ]),
);

//update resume
apiRoute.put(async (req, res) => {
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
    const { files } = req as any;
    const requestFiles = files;
    let image = "";
    let docFile = "";
    if (requestFiles.image) {
      image = requestFiles.image[0]?.path;
    }
    if (requestFiles.docFile) {
      docFile = requestFiles.docFile[0]?.path;
    }
    const inputFiles = {
      image,
      docFile,
    };
    let sortSkills = [];
    if (req.body.skills.length !== 0 && req.body.skills) {
      sortSkills = JSON.parse(req.body.skills);
    }

    const resumeInput = {
      name: req.body.fullName,
      email: req.body.email,
      region: req.body.region,
      professionalTitle: req.body.professionalTitle,
      location: req.body.location,
      video: req.body.video,
      category: req.body.category,
      workingRate: req.body.workingRate,
      education: JSON.parse(req.body.education),
      resumeContent: req.body.resumeContent,
      skills: sortSkills,
      url: JSON.parse(req.body.url),
      experience: JSON.parse(req.body.experience),
    };

    const reqQuery = {
      accessToken: session?.user.accessToken
        ? session?.user.accessToken
        : accessToken,
      resumeInput,
      inputFiles,
      resumeId: id,
    };
    const resume = await connect.updateResume(reqQuery);

    res.status(200).send({
      message: "Successfully updated user",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
});

apiRoute.get(async (req, res) => {
  try {
    const { id } = req.query;
    const connect = await apiConnector;

    const resume = await connect.getSingleResume(id);
    res.status(200).send({
      message: "Successfully get a resume",
      data: resume,
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
});

apiRoute.delete(async (req, res) => {
  try {
    const connect = await apiConnector;
    const { id } = req.query;
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
      resumeId: id,
    };
    const company = await connect.deleteResume(reqQuery);

    res.status(200).send({
      message: "Successfully deleted resume",
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
