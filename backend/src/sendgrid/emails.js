import {
  VERIFICATION_EMAIL_TEMPLATE,
  VERIFICATION_SUCCESS_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplates.js";

import { sendMail } from "./sendgrid.config.js"; // adjust path if needed

const sender = {
  email: "support@abhinavsreejith.online",
  name: "Modus Task Manager"
};

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await sendMail({
      to: email,
      from: sender,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      text: `Your verification code is ${verificationToken}`
    });

    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending verification email", error);
    throw error;
  }
};

export const sendSuccessEmail = async (email, username) => {
  try {
    await sendMail({
      to: email,
      from: sender,
      subject: "Email Verified Successfully",
      html: VERIFICATION_SUCCESS_EMAIL_TEMPLATE.replace("{username}", username),
      text: `Hi ${username}, your email has been successfully verified.`
    });

    console.log("Success email sent successfully");
  } catch (error) {
    console.log("Error sending success email", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    await sendMail({
      to: email,
      from: sender,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      text: `Reset your password using this link: ${resetURL}`
    });

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.log("Error sending password reset email", error);
    throw error;
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    await sendMail({
      to: email,
      from: sender,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      text: "Your password has been successfully reset."
    });

    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.log("Error sending password reset SUCCESS email", error);
    throw error;
  }
};
