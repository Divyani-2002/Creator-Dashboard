import express from 'express';
import { protect } from '../middleware/auth';
import { getFeed, saveFeedItem } from '../controllers/feedController';

const router = express.Router();

router.get('/', protect, getFeed);
router.post('/save', protect, saveFeedItem);

export default router;
