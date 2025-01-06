import express from 'express';
import { protect } from '../middleware/auth';
import {
  createInstance,
  getInstances,
  getInstance,
  updateInstance,
  deleteInstance,
  startInstance,
  stopInstance,
} from '../controllers/instanceController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getInstances)
  .post(createInstance);

router.route('/:id')
  .get(getInstance)
  .put(updateInstance)
  .delete(deleteInstance);

router.post('/:id/start', startInstance);
router.post('/:id/stop', stopInstance);

export default router;