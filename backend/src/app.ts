import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import instanceRoutes from './routes/instances';
import backtestRoutes from './routes/backtests';
import storageRoutes from './routes/storage';
import billingRoutes from './routes/billing';
import composerRoutes from './routes/composer';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/instances', instanceRoutes);
app.use('/api/backtests', backtestRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/composer', composerRoutes);

app.use(errorHandler);

export default app;