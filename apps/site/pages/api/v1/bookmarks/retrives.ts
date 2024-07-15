import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";

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

//get all bookmarks of an user
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

    const bookmarks = await connect.getBookmarks(
      session?.user.accessToken ? session?.user.accessToken : accessToken,
    );

    if (bookmarks[0].bookmarks.length == 0) {
      return res.status(200).send({
        message: "No Bookmark Found",
        data: [],
      });
    }
    res.status(200).send({
      message: "Successfully find all bookmarks",
      data: bookmarks[0].bookmarks,
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

//create a bookmarks
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

    const reqQuery = {
      accessToken: session?.user.accessToken
        ? session?.user.accessToken
        : accessToken,
      body: {
        ...req.body,
      },
    };
    const bookmark = await connect.createBookmark(reqQuery);

    res.status(200).send({
      message: "Bookmark successfully created",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

export default apiRoute;
