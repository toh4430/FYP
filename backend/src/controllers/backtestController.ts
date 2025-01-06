import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Backtest from '../models/Backtest'; // Assuming we have a Backtest model

export const createBacktest = asyncHandler(async (req: Request, res: Response) => {
  const backtest = await Backtest.create({ ...req.body, user: req.user._id });
  res.status(201).json(backtest);
});

export const getBacktests = asyncHandler(async (req: Request, res: Response) => {
  const backtests = await Backtest.find({ user: req.user._id });
  res.json(backtests);
});

export const getBacktest = asyncHandler(async (req: Request, res: Response) => {
  const backtest = await Backtest.findOne({ _id: req.params.id, user: req.user._id });
  if (!backtest) {
    res.status(404);
    throw new Error('Backtest not found');
  }
  res.json(backtest);
});

export const updateBacktest = asyncHandler(async (req: Request, res: Response) => {
  const backtest = await Backtest.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!backtest) {
    res.status(404);
    throw new Error('Backtest not found');
  }
  res.json(backtest);
});

export const deleteBacktest = asyncHandler(async (req: Request, res: Response) => {
  const backtest = await Backtest.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!backtest) {
    res.status(404);
    throw new Error('Backtest not found');
  }
  res.json({ message: 'Backtest removed' });
});

export const runBacktest = asyncHandler(async (req: Request, res: Response) => {
  const backtest = await Backtest.findOne({ _id: req.params.id, user: req.user._id });
  if (!backtest) {
    res.status(404);
    throw new Error('Backtest not found');
  }
  // Logic to run the backtest
  // This is a placeholder and should be replaced with actual backtest execution logic
  backtest.status = 'completed';
  await backtest.save();
  res.json(backtest);
});