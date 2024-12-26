import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";
//Load environment variables
dotenv.config();

const app = express();

//Middleware population
app.use(express.json());

//Database connectivity, MongoDB
const connectToDataBase =  async() => {
  try {
    await mongoose.connect( process.env.MONGO_URI as string || '');
    console.log('Db connection successful');
  } catch( error) {
      console.log("Database connection error", error);
      process.exit(1);
  }
};
connectToDataBase();
  

//Distribute Routes
app.use('/auth', authRoutes);

//Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('Auth Service is running')
});

//Start the application server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`)
});

export default app;