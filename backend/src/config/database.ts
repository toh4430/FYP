import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unexpected error during database connection');
    }
    process.exit(1);
  }
};

export default connectDB;