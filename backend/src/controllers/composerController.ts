import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Strategy from '../models/Strategy'; // Assuming we have a Strategy model

export const createStrategy = asyncHandler(async (req: Request, res: Response) => {
  const strategy = await Strategy.create({ ...req.body, user: req.user._id });
  res.status(201).json(strategy);
});

export const getStrategies = asyncHandler(async (req: Request, res: Response) => {
  const strategies = await Strategy.find({ user: req.user._id });
  res.json(strategies);
});

export const getStrategy = asyncHandler(async (req: Request, res: Response) => {
  const strategy = await Strategy.findOne({ _id: req.params.id, user: req.user._id });
  if (!strategy) {
    res.status(404);
    throw new Error('Strategy not found');
  }
  res.json(strategy);
});

export const updateStrategy = asyncHandler(async (req: Request, res: Response) => {
  const strategy = await Strategy.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!strategy) {
    res.status(404);
    throw new Error('Strategy not found');
  }
  res.json(strategy);
});

export const deleteStrategy = asyncHandler(async (req: Request, res: Response) => {
  const strategy = await Strategy.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!strategy) {
    res.status(404);
    throw new Error('Strategy not found');
  }
  res.json({ message: 'Strategy removed' });
});

export const testStrategy = asyncHandler(async (req: Request, res: Response) => {
  const strategy = await Strategy.findOne({ _id: req.params.id, user: req.user._id });
  if (!strategy) {
    res.status(404);
    throw new Error('Strategy not found');
  }
  // This is a placeholder and should be replaced with actual strategy testing logic
  res.json({ message: 'Strategy test initiated', results: 'Pending' });
});