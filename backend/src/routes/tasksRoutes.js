
import express from 'express'

import {getTasks, createTask} from '../controllers/tasksController.js'

import { taskValidation } from '../middlewares/taskValidation.js'

import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.use(authenticate)

//view tasks
router.get('/', getTasks)

router.post('/', taskValidation, createTask)


export default router
 