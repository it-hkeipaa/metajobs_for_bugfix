import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from "@metajob/api-connector";
import { setCookie } from "cookies-next";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "POST":
      try {
        const connect = await apiConnector;

        const { accessToken } = await connect.loginUser(req.body);
        // setCookie('token', accessToken, { req, res })

        // set accessToken to cookie
        setCookie("accessToken", accessToken, {
          req,
          res,
          httpOnly: true,
          maxAge: 900000, //15 min
          path: "/",
          secure: false,
        });
        res.status(200).send({
          message: "Successfully user logged in",
          accessToken,
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: e.message,
        });
      }
  }
}
