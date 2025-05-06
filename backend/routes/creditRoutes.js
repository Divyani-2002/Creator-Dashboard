import express from 'express';
import { protect } from '../middleware/auth';
import { getCredits, earnCredits } from '../controllers/creditController';

const router = express.Router();

router.get('/', protect, getCredits);
router.post('/earn', protect, earnCredits);

export default router;
