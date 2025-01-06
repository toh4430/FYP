import express from 'express';
import { protect } from '../middleware/auth';
import {
  getBillingInfo,
  updateBillingInfo,
  getInvoices,
  getInvoice
} from '../controllers/billingController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getBillingInfo)
  .put(updateBillingInfo);

router.get('/invoices', getInvoices);
router.get('/invoices/:id', getInvoice);

export default router;