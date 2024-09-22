import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateToken } from '../config/jwt'


// register
export const register = async(req: Request, res: Response): Promise<void> => {
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({user_name: name, user_email: email, user_password: hashedPassword});
        const token = generateToken(newUser);
        res.json({token})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Registration Failed' })
    }
}


// login
export const login = async(req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { user_email: email }});
        if(!user || !(await bcrypt.compare(password, user.user_password))) {
            res.status(401).json({error: 'Invalid credentials' });
        } else {
            const token = generateToken(user);
            res.json({token})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Login Failed'})
    }
};

// verify
export const verify = async(req: Request, res: Response): Promise<void> => {
    try {
        res.json(true)
    } catch (error) {
        console.error(error);
        res.status(400).json({error: 'Failed to verify'})
    }
};
