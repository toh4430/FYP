import express from 'express';
import { protect } from '../middleware/auth';
import {
  uploadFile,
  getFiles,
  getFile,
  deleteFile
} from '../controllers/storageController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getFiles)
  .post(uploadFile);

router.route('/:id')
  .get(getFile)
  .delete(deleteFile);

export default router;