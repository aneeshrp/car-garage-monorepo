import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the .env file");
}
export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGODB_URI;
export const SERVICE_NAME = process.env.SERVICE_NAME;