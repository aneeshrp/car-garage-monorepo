import mongoose from 'mongoose';


const connectToDatabase = async (uri: string) : Promise<void> => {
    try {
        await mongoose.connect(uri);
        console.log( 'Connected to the MongoDB');
    } catch( error ){
        console.log('Error connecting Mongo: '+ error);
        process.exit(1);
    }
}

export default connectToDatabase;