import mongoose, { Schema, Document } from 'mongoose';

export interface IInstance extends Document {
  name: string;
  status: 'pending' | 'running' | 'stopped' | 'terminated';
  type: string;
  region: string;
  userId: mongoose.Types.ObjectId;
  ec2InstanceId?: string;
  publicDnsName?: string;
  state?: string;
  createdAt: Date;
  updatedAt: Date;
}

const instanceSchema = new Schema<IInstance>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'stopped', 'terminated'],
    default: 'pending',
  },
  type: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ec2InstanceId: {
    type: String,
  },
  publicDnsName: {
    type: String,
  },
  state: {
    type: String,
  },
}, { timestamps: true });

export const Instance = mongoose.model<IInstance>('Instance', instanceSchema);