
import express from 'express'
import { login, logout, signup } from '../controllers/auth.js'
import { signUpValidation, loginValidation } from '../middlewares/authValidation.js'

const router  = express.Router()

router.post('/login', loginValidation, login)  

router.post('/signup', signUpValidation, signup)

router.post('/logout', logout)




export default router