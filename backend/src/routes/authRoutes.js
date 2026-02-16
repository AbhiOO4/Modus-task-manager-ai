
import express from 'express'
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth } from '../controllers/auth.js'
import { signUpValidation, loginValidation,  } from '../middlewares/authValidation.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router  = express.Router()


router.get('/check-auth', verifyToken, checkAuth)

router.post('/login', loginValidation, login)  

router.post('/signup', signUpValidation, signup)

router.post('/logout', logout)

router.post('/verify-email', verifyEmail)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', resetPassword)




export default router