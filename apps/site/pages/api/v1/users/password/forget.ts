import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
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

//forget password
apiRoute.put(async (req, res) => {
  try {
    const connect = await apiConnector;
    const reqQuery = {
      email: req.body.email,
    };
    const send = await connect.forgetPassword(reqQuery);

    return res.status(200).send({
      message: "Reset password email sent, please follow the instruction",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

//forgot password reset
apiRoute.patch(async (req, res) => {
  try {
    const connect = await apiConnector;

    const reqQuery = {
      resetLink: req.body.resetLink,
      newPassword: req.body.newPassword,
    };
    const send = await connect.forgetPassReset(reqQuery);

    return res.status(200).send({
      message: "You have successfully updated your password",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Server Error",
      error: e.message,
    });
  }
});

export default apiRoute;
