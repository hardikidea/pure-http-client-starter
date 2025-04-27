import { Router } from 'express';
import { healthRouter } from './healthRouter';

export const mainRouter = Router();

// Health check endpoint (basic sanity route)
mainRouter.use('/', healthRouter);
