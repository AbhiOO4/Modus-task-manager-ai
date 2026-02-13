import { VERIFICATION_EMAIL_TEMPLATE, VERIFICATION_SUCCESS_EMAIL_TEMPLATE } from "./emailTemplates.js"
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
        console.log("Error sending verification email", error)
        throw new Error(error)
    }
}