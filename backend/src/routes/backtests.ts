import express from 'express';
import { protect } from '../middleware/auth';
import {
  createBacktest,
  getBacktests,
  getBacktest,
  updateBacktest,
  deleteBacktest,
  runBacktest
} from '../controllers/backtestController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getBacktests)
  .post(createBacktest);

router.route('/:id')
  .get(getBacktest)
  .put(updateBacktest)
  .delete(deleteBacktest);

router.post('/:id/run', runBacktest);

export default router;