import mongoose, { Document, Schema } from 'mongoose';

export interface IBacktest extends Document {
  name: string;
  description: string;
  strategy: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: any;
  user: mongoose.Types.ObjectId;
}

const backtestSchema = new Schema<IBacktest>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  strategy: {
    type: Schema.Types.ObjectId,
    ref: 'Strategy',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'completed', 'failed'],
    default: 'pending',
  },
  results: {
    type: Schema.Types.Mixed,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IBacktest>('Backtest', backtestSchema);