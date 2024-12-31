import express, {Application} from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import connectToDatabase from '../common/db';

//Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

//Initi Db connection
const mongoURI: string = process.env.MONGO_URI!;
connectToDatabase(mongoURI);


app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Auth Service is running on port ${PORT}`));