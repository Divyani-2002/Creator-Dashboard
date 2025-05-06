import express from 'express';
import { protect, authorize } from '../middleware/auth';
import {
    getUsersAnalytics,
    getAllUsersCredits,
    updateUserCredits
} from '../controllers/adminController';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/users/analytics', getUsersAnalytics);
router.get('/credits', getAllUsersCredits);
router.put('/credits/:userId', updateUserCredits);

export default router;
