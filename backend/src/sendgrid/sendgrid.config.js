import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv'
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

dotenv.config({quiet: true})

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const msg = {
  to: "falconthegreat24@gmail.com",
  from: "support@abhinavsreejith.online",
  subject: "Verify your email",
  html: VERIFICATION_EMAIL_TEMPLATE
};

export const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
};
