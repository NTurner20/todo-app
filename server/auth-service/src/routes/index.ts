import { Router } from 'express';
import authRoutes from './authRoutes';  // Import your specific routes

const router = Router();

// Use authentication routes
router.use('/auth', authRoutes);  // Set up your routes

export default router;
