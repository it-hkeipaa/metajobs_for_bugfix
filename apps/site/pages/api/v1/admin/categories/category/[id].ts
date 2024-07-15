import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Formidable } from "formidable";
import { unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";

/**
 * Call API function to fetch Review Data.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

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

// get all categories
apiRoute.get(async (req, res) => {
  try {
    const connect = await apiConnector;

    const { id } = req.query;
    const reqQuery = {
      categoryID: id,
    };
    const category = await connect.getSingleCategory(reqQuery);
    res.status(200).send({
      message: "Successfully fetched category",
      data: category,
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

// update a category by id
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

    // get body from request
    const data: any = await new Promise((resolve, reject) => {
      const form = new Formidable();

      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    const categoryData = {
      categoryTitle: data.fields.categoryTitle[0] || "",
      subCategory: data.fields.subCategory
        ? data.fields.subCategory[0].split(",")
        : [],
    };

    const categoryIcon = data.files.categoryIcon
      ? data.files.categoryIcon[0].filepath
      : null;

    const category = await connect.updateCategory(
      session?.user.accessToken ? session?.user.accessToken : accessToken,
      categoryData,
      categoryIcon,
      id,
    );

    res.status(200).send({
      message: "Successfully updated category",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

// delete a category by id
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
      categoryId: id,
    };

    const category = await connect.deleteCategory(reqQuery);

    res.status(200).send({
      message: "Successfully deleted category",
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
