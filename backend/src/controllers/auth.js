import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateVerificationToken } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

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
        const jwtToken = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET, {expiresIn: '168h'})
        res.status(200).json({message: "Login success", success: true, jwtToken, email, name: user.name})
    }catch(error){
        res.status(500).json({message: "Failed to login", success: false})
    }
}

export function logout(req, res) {
    
}