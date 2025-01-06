import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  name: string;
  url: string;
  size: number;
  type: string;
  user: mongoose.Types.ObjectId;
}

const fileSchema = new Schema<IFile>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<IFile>('File', fileSchema);