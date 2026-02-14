import { VERIFICATION_EMAIL_TEMPLATE, VERIFICATION_SUCCESS_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email , verificationToken) => {
    const recipient = email
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: [{email: recipient}],
            subject: "verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "email verification"
        })

        console.log("Email send successfully", response)
    }catch(error){
        console.log("Error sending verification email", error)
        throw new Error(error)
    }
}

export const sendSuccessEmail = async (email, username) => {
    const recipient = email
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: [{email: recipient}],
            subject: "verify your email",
            html : VERIFICATION_SUCCESS_EMAIL_TEMPLATE.replace("{username}", username),
            category: "email verification"
        })

        console.log("Email send successfully", response)
    }catch(error){
        console.log("Error sending success email", error)
        throw new Error(error)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = email
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: [{email: recipient}],
            subject: "Reset Your Password",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Email send successfully", response)
    }catch(error){
        console.log("Error sending password reset email", error)
        throw new Error(error)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = email
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: [{email: recipient}],
            subject: "Reset Password Successfull",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("Email send successfully", response)
    }catch(error){
        console.log("Error sending password reset SUCCESS email", error)
        throw new Error(error)
    }
}