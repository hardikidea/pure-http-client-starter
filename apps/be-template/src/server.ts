import env from './env';
import { ApiServer } from './app/ApiServer';

const startApplication = async (): Promise<void> => {
  try {
    const server = ApiServer.create(+env.PORT);
    console.log(+env.PORT, 'be-template');
    server.listen();
    // await ORM.getInstance().authenticate();
  } catch (err) {
    console.error('Error starting server', err);
    process.exit(1);
  }
};

void startApplication();
