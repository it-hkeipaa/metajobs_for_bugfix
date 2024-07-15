import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { emailTemplates } from "@/src/config/email";
import { sendNotificationEmail } from "@/src/utils/nodeMailer";
import theme_config from "@/theme_config";
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

apiRoute.post(async (req, res) => {
  const connect = await apiConnector;
  try {
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
    const data = await connect.requireUser(
      session?.user.accessToken ? session?.user.accessToken : accessToken,
    );

    const emailType = req.body.emailType; // Assuming emailType is provided in the request body

    if (!emailType) {
      return res.status(400).send({
        message: "emailType is required in the request body",
      });
    }

    const templateInput = emailTemplates[emailType];

    if (!templateInput) {
      return res.status(400).send({
        message: "Invalid emailType",
      });
    }
    const { site_name } = theme_config;
    // Create emailData directly from the template
    const emailData = {
      senderAddress: site_name,
      subject: templateInput.subject,
      message: templateInput.message,
      emailType,
    };

    const inputEmailData = {
      userEmail: data.email,
      emailData,
      userId: data?._id,
      emailType,
    };

    await sendNotificationEmail(inputEmailData);

    res.status(200).send({
      message: "Email sent successfully",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Email not sent",
      error: e.message,
    });
  }
});

export default apiRoute;
