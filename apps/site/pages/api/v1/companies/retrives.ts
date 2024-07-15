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

apiRoute.use(
  upload.fields([
    { name: "logoImage", maxCount: 1 },
    { name: "headerImage", maxCount: 1 },
  ]),
);
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

//create a company profile
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

    const { files } = req as any;
    const inputFiles = files;
    let logoImage = "";
    let headerImage = "";
    if (inputFiles.logoImage) {
      logoImage = inputFiles.logoImage[0]?.path;
    }
    if (inputFiles.headerImage) {
      headerImage = inputFiles.headerImage[0]?.path;
    }
    const images = {
      logoImage,
      headerImage,
    };
    const companyInput = {
      companyName: req.body.companyName,
      companyTagline: req.body.companyTagline,
      category: req.body.category,
      companyEmail: req.body.companyEmail,
      phoneNumber: req.body.phoneNumber,
      eatablishedDate: req.body.eatablishedDate,
      companyWebsite: req.body.companyWebsite,
      avarageSalary: req.body.avarageSalary,
      companySize: req.body.companySize,
      description: req.body.description,
      location: req.body.location,
      locationMap: {
        latitude: req.body.locationLatitude,
        longitude: req.body.locationLongitude,
      },
      videoLink: req.body.videoLink,
      socialLink: {
        linkedin: req.body.linkedinLink,
        facebook: req.body.facebookLink,
        twitter: req.body.twitterLink,
      },
    };

    const reqQuery = {
      accessToken: session?.user.accessToken
        ? session?.user.accessToken
        : accessToken,
      companyInput,
      images,
    };
    await connect.createCompany(reqQuery);
    res.status(200).send({
      message: "Successfully created a company profile",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
});

//
apiRoute.get(async (req, res) => {
  try {
    res.status(200).send({
      message: "Successfully fetched all company",
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
