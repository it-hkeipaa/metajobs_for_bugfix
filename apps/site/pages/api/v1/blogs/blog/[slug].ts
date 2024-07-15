import blogDataLocal from "@/src/data/blogData.json";
import { NextApiRequest, NextApiResponse } from "next";
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

// gey single blog
apiRoute.get(async (req, res) => {
  try {
    res.status(200).send({
      message: "Successfully fetched a blog",
      data: blogDataLocal[0],
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server error",
      error: e.message,
    });
  }
});

export default apiRoute;
