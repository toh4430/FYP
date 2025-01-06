import mongoose, { Document, Schema } from 'mongoose';

export interface IStrategy extends Document {
  name: string;
  description: string;
  code: string;
  parameters: {
    [key: string]: any;
  };
  user: mongoose.Types.ObjectId;
}

const strategySchema = new Schema<IStrategy>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  parameters: {
    type: Schema.Types.Mixed,
    default: {},
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IStrategy>('Strategy', strategySchema);