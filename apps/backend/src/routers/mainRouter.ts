import { Router } from 'express';
import { healthRouter } from './healthRouter';
import { UserRouter } from './userRouter';

export const mainRouter = Router();

// Mount routers
mainRouter.use('/', healthRouter);
mainRouter.use('/', UserRouter.create().expressRouterInstance);
