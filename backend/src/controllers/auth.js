import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { generateVerificationToken } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendSuccessEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../sendgrid/emails.js";
import crypto from "crypto"

export async function signup (req, res) {
    try{
        const {name, email, password} = req.body
        const findUser = await User.findOne({email})
        if (findUser){
            return res.status(409).json({message: "User already exists", success: false})
        }
        const verificationToken = generateVerificationToken();
        const newUser = new User({
            name, 
            email, 
            password, 
            verificationToken, 
            verificationTokenExpiresAt: Date.now() + (24*60*60*1000)
        });
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save()

        //JWT TOKEN GEN REFRESH TOKEN
        const token = generateTokenAndSetCookie(res, newUser._id)
        try{
            await sendVerificationEmail(newUser.email, verificationToken)
        }catch(error){
            console.log(error)
            return res.status(500).json({message: "Issue in sendVericationEmail"})
        }

        res.status(201).json({
            message: "Signup successfull", 
            success: true,
            user: {
                ...newUser._doc,
                password: undefined
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to register the user", success: false})
    }
}

export async function login(req, res) {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        const AuthFailedMessage = "Auth failed, email or password is wrong"
        if (!user){
            return res.status(403).json({message : AuthFailedMessage, success: false})
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid){
            return res.status(403).json({message : AuthFailedMessage, success: false})
        }
        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date();
        await user.save()
        res.status(200).json({message: "Login success", success: true, user: {...user._doc, password: undefined}})
    }catch(error){
        res.status(500).json({message: "Failed to login", success: false})
    }
}

export function logout(req, res) {
    res.clearCookie("token")
    res.status(200).json({success: true, message: "Logged out successfully"})
}

export async function verifyEmail(req, res){
    const {verificationToken} = req.body
    try{
        const user = await User.findOne({verificationToken, verificationTokenExpiresAt: {$gt: Date.now()}})
        if (!user) {
            return res.status(400).json({message: "Invalid or expired verification code", success: false})
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        await sendSuccessEmail(user.email, user.name)

        res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
    }catch(error){
        res.status(500).json({message: "Internal server error", success: false})
    }
}

export async function forgotPassword(req, res){
    const {email} = req.body
    try{
        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({success: false, message: "user doesn't exist"})
        }

        //generating reset token
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 60*60*1000 //1hr
        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt
        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Password reset email send successfully"})
    }catch(error){
        res.status(400).json({success: false, message: error.message})
    }
}

export async function resetPassword(req, res){
    try{    
        const {token} = req.params
        const {password} = req.body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: {$gt: Date.now()}
        });

        if (!user){
            return res.status(400).json({success: false, message: "Invalid or expired reset token"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined
        user.save()

        await sendResetSuccessEmail(user.email)

        res.status(200).json({success: true, message: "Password reset successfully"})
    }catch(error){
        res.status(400).json({success: false, message: error.message})
    }
}

export async function checkAuth(req, res){
    try{
        const user = await User.findById(req.userId).select("-password")
        if (!user){
            return res.status(400).json({success: false, message: "User not found"})
        }
        res.status(200).json({success: true, user})
    }catch(error){
        res.status(400).json({success: false, message: error.message})
    }
}