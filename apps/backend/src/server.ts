import { routes } from './routers';
import { ORM } from './config/orm';
import env from './env';
import { ApiServer } from './app/api-server';

const startApplication = async (): Promise<void> => {
  try {
    const server = ApiServer.create({
      routers: [routes()],
    });
    await server.start(env.PORT);

    await ORM.getInstance().authenticate();
  } catch (err) {
    console.error('Error starting server', err);
    process.exit(1);
  }
};

void startApplication();

// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import detect from 'detect-port';
//
// dotenv.config();
//
// const app = express();
//
// const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
//
// app.use(cors());
// app.use(express.json());
//
// app.get('/', (req: Request, res: Response) => {
//   res.send('Backend API Server Running! 🚀');
// });
//
// // Fallback if PORT is occupied
// detect(DEFAULT_PORT)
//   .then((port) => {
//     if (port === DEFAULT_PORT) {
//       app.listen(DEFAULT_PORT, () => {
//         console.log(`🚀 Backend Server started on port ${DEFAULT_PORT}`);
//       });
//     } else {
//       console.log(`⚠️ Port ${DEFAULT_PORT} is in use. Trying next free port ${port}...`);
//       app.listen(port, () => {
//         console.log(`🚀 Backend Server started on port ${port}`);
//       });
//     }
//   })
//   .catch((err) => {
//     console.error('❌ Error detecting port:', err);
//   });
