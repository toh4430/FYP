import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITransaction {
  amount: number;
  date: Date;
  description: string;
}

export interface IBilling extends Document {
  user: mongoose.Types.ObjectId;
  plan: string;
  amount: number;
  currency: string;
  status: 'active' | 'inactive' | 'cancelled';
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: Date;
  paymentMethod: {
    type: string;
    last4: string;
    expirationDate: string;
  };
  transactions: Types.DocumentArray<ITransaction & Document>;
}

const transactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

const billingSchema = new Schema<IBilling>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active',
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    nextBillingDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: 'Next billing date must be in the future.',
      },
    },
    paymentMethod: {
      type: {
        type: String,
        required: true,
      },
      last4: {
        type: String,
        required: true,
      },
      expirationDate: {
        type: String,
        required: true,
      },
    },
    transactions: [transactionSchema], // Subdocument schema
  },
  { timestamps: true }
);

export default mongoose.model<IBilling>('Billing', billingSchema);
