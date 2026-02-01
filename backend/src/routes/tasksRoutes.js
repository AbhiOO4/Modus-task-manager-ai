
import express from 'express'

import {getTasks, createTask, getTask, deleteTask, editTask, getAiSubtasks} from '../controllers/tasksController.js'

import { taskValidation } from '../middlewares/taskValidation.js'

import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.use(authenticate)

//get one task
router.get('/:id', getTask)

//get all tasks
router.get('/', getTasks)

//create tasks
router.post('/', taskValidation, createTask)

//edit a task
router.put('/:id', editTask)

//delete a task
router.delete('/:id', deleteTask)

//generate subtasks using gemini ai
router.post('/ai/task-breakdown', getAiSubtasks)



export default router
 