import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const mongourl = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongourl);
        console.log('MongoDB connected successfully');
       
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

export default connectDB;

