
import Task from "../model/taskModel.js";

const SORT_MAP = {
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  priority: { priority: 1 },    
  completion: { completed: 1 },  
};

export const getTasks = async (req, res) => {
    try{
        const { category, sort = "latest" } = req.query;
        const filter = {author_id: req.user._id}
        if (category) {
            filter.category = category.toLowerCase();
        }
        const sortOption = SORT_MAP[sort] 
        const tasks = await Task.find(filter).sort(sortOption)
        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({message: "failed to fetch tasks"})
        console.log(error)
    }
}

export const createTask = async (req, res) => {
    try{
        const newTask = new Task({...req.body, author_id: req.user._id})
        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    }catch(error){
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

