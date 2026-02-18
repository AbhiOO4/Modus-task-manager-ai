
import Joi from 'joi'

export const taskValidation = (req, res, next) => {
    if (req.userId) {
        req.body.author_id = req.userId;
    }
    const taskSchema = Joi.object({
        task: Joi.string().min(1).max(60).required(),
        desc: Joi.string().min(1).required(),
        category: Joi.string().min(1).max(20).required(),
        subTasks: Joi.array().items(
            Joi.object({
                title: Joi.string().trim().required(),
                completed: Joi.boolean().default(false)
            })
        ).default([]),
        schedule: Joi.object({
            from: Joi.date().required(),
            to: Joi.date().greater(Joi.ref("from")).required(),
        }).required(),
        priority: Joi.number().valid(1,2,3,4,5).default(5),
        completed: Joi.boolean().default(false),
        autoDeleteAfterDue: Joi.boolean().default(false),
        author_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })

    const {error} = taskSchema.validate(req.body)
    if (error){
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

export const updationTaskValidation = (req, res, next) => {
    if (req.userId) {
        req.body.author_id = req.userId;
    }
    const taskSchema = Joi.object({
        task: Joi.string().min(1).max(60).required(),
        desc: Joi.string().min(1).required(),
        category: Joi.string().min(1).max(20).required(),
        subTasks: Joi.array().items(
            Joi.object({
                title: Joi.string().trim().required(),
                completed: Joi.boolean().default(false)
            })
        ).default([]),
        schedule: Joi.object({
            from: Joi.date().required(),
            to: Joi.date().greater(Joi.ref("from")).required(),
        }).required(),
        priority: Joi.number().valid(1,2,3,4,5).default(5),
        completed: Joi.boolean().default(false),
        autoDeleteAfterDue: Joi.boolean().default(false),
        author_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date().required(),
        __v: Joi.number()
    })

    const {error} = taskSchema.validate(req.body)
    if (error){
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}