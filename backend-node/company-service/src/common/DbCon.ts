import { MongoClient, Db } from "mongodb";
import { MONGO_URI } from "../config/config";

let db: Db;
let client: MongoClient;

export const connectToTheDatabase = async (): Promise<Db> => {
    try {
        console.log('Connecting to the database...');
        if (!client) {
            client = new MongoClient(MONGO_URI);
            await client.connect();
            db = client.db();
            console.log('Database connected successfully');
        }
    } catch (error) {
        console.error(`Unable to connect to the database: ${error}`);
        process.exit(1); // Exit the process if the database connection fails
    }
    return db;
};

export const getDb = (): Db => {
    if (!db) {
        throw new Error("Database connection not established. Call connectToTheDatabase first.");
    }
    return db;
};

export const disconnectFromDatabase = async (): Promise<void> => {
    if (client) {
        await client.close();
        console.log('Database connection closed');
    }
};
