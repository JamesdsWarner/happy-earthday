import express from 'express';
import authRoutes from './auth';
import birthdayRoutes from './birthday';
import checkAuth from '../utils/checkAuth';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/birthday', checkAuth, birthdayRoutes);

export default router;
