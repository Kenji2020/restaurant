import {dbConnect} from 'utils/db';
import Task from 'models/task';

dbConnect()
const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
}
const createTask = async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    const result = await task.save();
    return res.status(201).json(result);
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await getTasks(req, res);
            break;
        case 'POST':
            await createTask(req, res);
            break;
        case 'PUT':
            await updateTask(req, res);
            break;
        case 'DELETE':
            await deleteTask(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
    }
  }
  