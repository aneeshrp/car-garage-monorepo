import express, { Application } from 'express';
import router from './routes';
import { SERVICE_NAME } from './config/config';
import { connectToTheDatabase } from './common/DbCon';


const createServer = async (): Promise<Application> => {
    const app: Application = express();
    console.log('INIT PROCESS....');
    try {
        await connectToTheDatabase();
        console.log('Db conn success !!');

        app.use(express.json());
        app.use(`/${SERVICE_NAME}`, router);


    } catch (error: any) {
        console.log("Server intit failed:", error)
    }

    return app;
}

export default createServer;