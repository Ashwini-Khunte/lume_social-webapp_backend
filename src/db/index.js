import mongoose from 'mongoose';
import { DB_NAME } from '../contsant.js';

const connectDB = async() => {
    try {
        const connectionInstatnce = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected: ${connectionInstatnce.connection.host}`);
        
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;