import express from 'express';
import { protect } from '../middleware/auth';
import {
  createStrategy,
  getStrategies,
  getStrategy,
  updateStrategy,
  deleteStrategy,
  testStrategy
} from '../controllers/composerController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getStrategies)
  .post(createStrategy);

router.route('/:id')
  .get(getStrategy)
  .put(updateStrategy)
  .delete(deleteStrategy);

router.post('/:id/test', testStrategy);

export default router;