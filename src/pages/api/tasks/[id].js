import { dbConnect } from "utils/db";
import Task from "models/task";

dbConnect()
export default async (req, res) => {
    console.log(req.query);
    switch (req.method) {
        case "GET":
            try{
            const task = await Task.findById(req.query.id);
            if (!task) return res.status(404).send("Task not found");
            return res.status(200).json(task);
            }catch(err){
                return res.status(500).send(err);
                console.log(err);
            }
        case "DELETE":
            try{
                const deletedTask = await Task.findByIdAndDelete(req.query.id);
                if (!deletedTask) return res.status(404).send("Task not found");
                return res.status(200).json(deletedTask);   

            }catch(err){
                return res.status(500).send(err);
            }
        case "PUT":
            try{
                const updatedTask = await Task.findByIdAndUpdate(req.query.id, req.body, {new: true});
                if (!updatedTask) return res.status(404).send("Task not found");    
                return res.status(200).json(updatedTask);
            }catch(err){
                return res.status(500).send(err);
            }
        case "POST":
            try{
                const task = new Task(req.body);
                const result = await task.save();
                return res.status(201).json(result);
            }catch(err){
                return res.status(500).send(err);
            }
            
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
    }
    return res.status(200).json("recibido");
}
