
import Task from "../model/taskModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';


const SORT_MAP = {
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  priority: { priority: 1 },    
  completion: { completed: -1 },  
};

export const getTasks = async (req, res) => {
    try {
        const { category, sort = "latest" } = req.query;
        const graceDate = new Date();
        graceDate.setDate(graceDate.getDate() - 2);
        const filter = { author_id: req.user._id };
        //lazy deletion after the due date
        await Task.deleteMany({
            author_id: req.user._id,
            completed: true,
            "schedule.to": { $lt: graceDate }
        });

        if (category) {
            filter.category = category.toLowerCase();
        }

        const sortOption = SORT_MAP[sort] || { createdAt: -1 };
        const tasks = await Task.find(filter).sort(sortOption);
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "failed to fetch tasks" });
        console.log(error);
    }
}

export const createTask = async (req, res) => {
    try{
        const newTask = new Task({...req.body})
        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    }catch(error){
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

export const getTask = async (req, res) => {
    try{
        const {id} = req.params
        const task = await Task.findById(id)
        if (!task) return res.status(404).json({message: "Task not found"})
        if (task.author_id != req.user._id){
            return res.status(403).json({message: "task doesn't exist"})
        } 
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}

export const editTask = async (req, res) => {
    try{
        const {id} = req.params
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true})
        if (!updatedTask) return res.status(404).json({message: "task not found"})
        res.status(200).json({message: "task updated succesfully"})
    }catch(error){
        console.error("Error in editTask controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const deleteTask = async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if (!deletedTask){
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({message: "Task deleted successfully"})
    }catch(error){
        console.error("Error in deleteTask controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}


export const getAiSubtasks = async (req, res) => {
  try {
    const { task, desc } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API Key is missing from .env file" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: { 
        responseMimeType: "application/json" 
      } 
    });

    // We refine the prompt to ensure it doesn't try to "talk" to you
    const prompt = `Generate a JSON array of strings containing 3 to 5 subtasks for:
                    Task: ${task}
                    Description: ${desc || "No description provided"}
                    Return ONLY the JSON. Example: ["Step 1", "Step 2"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json(JSON.parse(text)); 

  } catch (error) {
      if (error.status === 429) {
          res.status(429).json({ message: "AI is taking a nap. Please wait a minute and try again!" });
      }
    console.error("GEMINI API ERROR:", error);
    res.status(500).json({ error: "AI failed to generate tasks", details: error.message });
  }
};

export const updateTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // 1. Logic: If subTasks are being updated, auto-calculate 'completed'
    if (updateData.subTasks && Array.isArray(updateData.subTasks)) {
      updateData.completed = 
        updateData.subTasks.length > 0 && 
        updateData.subTasks.every(st => st.completed === true);
    }

    // 2. Find and Update with whatever fields were sent
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


