import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Billing from '../models/Billing';

/**
 * Get the billing information of the current user.
 */
export const getBillingInfo = asyncHandler(async (req: Request, res: Response) => {
  const billing = await Billing.findOne({ user: req.user._id }).lean();
  if (!billing) {
    res.status(404).json({ message: 'Billing information not found' });
    return;
  }
  res.status(200).json(billing);
});

/**
 * Update or create billing information for the current user.
 */
export const updateBillingInfo = asyncHandler(async (req: Request, res: Response) => {
  const billing = await Billing.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    { new: true, runValidators: true, upsert: true } // Creates a new document if none exists
  );
  if (!billing) {
    res.status(500).json({ message: 'Failed to update billing information' });
    return;
  }
  res.status(200).json(billing);
});

/**
 * Retrieve all transactions (invoices) for the current user.
 */
export const getInvoices = asyncHandler(async (req: Request, res: Response) => {
  const billing = await Billing.findOne({ user: req.user._id }).lean();
  if (!billing) {
    res.status(404).json({ message: 'Billing information not found' });
    return;
  }
  res.status(200).json(billing.transactions);
});

/**
 * Retrieve a specific invoice by ID for the current user.
 */
export const getInvoice = asyncHandler(async (req: Request, res: Response) => {
  // Validate the ID parameter
  const { id } = req.params;
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json({ message: 'Invalid invoice ID format' });
    return;
  }

  // Find the user's billing record
  const billing = await Billing.findOne({ user: req.user._id });
  if (!billing) {
    res.status(404).json({ message: 'Billing information not found' });
    return;
  }

  // Find the specific transaction by ID
  const invoice = billing.transactions.id(id);
  if (!invoice) {
    res.status(404).json({ message: 'Invoice not found' });
    return;
  }

  res.status(200).json(invoice);
});
