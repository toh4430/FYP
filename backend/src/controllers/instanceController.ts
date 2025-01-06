import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createInstanceService,
  getInstancesService,
  getInstanceService,
  updateInstanceService,
  deleteInstanceService,
  startInstanceService,
  stopInstanceService,
} from '../services/instanceService';
import multer from 'multer';

// Extend the Request type to include the user property
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
  files: Express.Multer.File[];
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/zip', 'application/x-zip-compressed'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only ZIP files are allowed.'));
    }
    cb(null, true);
  },
});

export const createInstance = [
  upload.array('botFiles'),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded. Please provide the trading bot files.' });
    }

    try {
      const instance = await createInstanceService(req.body, req.user._id, req.files);
      res.status(201).json(instance);
    } catch (error) {
      console.error('Error creating instance:', error);
      res.status(500).json({ message: 'Failed to create instance. Please try again.' });
    }
  }),
];

export const getInstances = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const instances = await getInstancesService(req.user._id);
  res.json(instances);
});

export const getInstance = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const instance = await getInstanceService(req.params.id, req.user._id);
  if (!instance) {
    return res.status(404).json({ message: 'Instance not found' });
  }
  res.json(instance);
});

export const updateInstance = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const instance = await updateInstanceService(req.params.id, req.body, req.user._id);
  if (!instance) {
    return res.status(404).json({ message: 'Instance not found' });
  }
  res.json(instance);
});

export const deleteInstance = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    await deleteInstanceService(req.params.id, req.user._id);
    res.json({ message: 'Instance removed' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Instance not found') {
      res.status(404).json({ message: 'Instance not found' });
    } else {
      throw error; // Let the global error handler deal with other types of errors
    }
  }
});

export const startInstance = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const instance = await startInstanceService(req.params.id, req.user._id);
  if (!instance) {
    return res.status(404).json({ message: 'Instance not found' });
  }
  res.json(instance);
});

export const stopInstance = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const instance = await stopInstanceService(req.params.id, req.user._id);
  if (!instance) {
    return res.status(404).json({ message: 'Instance not found' });
  }
  res.json(instance);
});