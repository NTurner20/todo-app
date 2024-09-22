import { Router, Request, Response } from 'express';
import Todo  from '../models/todo';
import  verifyJWT from '../middleware/verifyJWT';
const router = Router();

//  get all todos for user
router.get('/todos', verifyJWT, async (req: Request, res: Response) => {
    try {
        
        const todos = await Todo.findAll({ where: { user_id: req.userId } });
        res.status(200).json({todos, userId: req.userId, userName: req.userName});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get todos' });
    }
});

//  add todo for user
router.post('/todos', verifyJWT, async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const todo = await Todo.create({ user_id: req.userId!, description });
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

// update todo for user
router.put('/todos/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const todo = await Todo.findOne({ where: { todo_id: req.params.id, user_id: req.userId } });
        if (todo) {
            todo.description = description;
            await todo.save();
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// delete todo
router.delete('/todos/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findOne({ where: { todo_id: req.params.id, user_id: req.userId } });
        if (todo) {
            await todo.destroy();
            res.json({ message: 'Todo deleted' });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

export default router;