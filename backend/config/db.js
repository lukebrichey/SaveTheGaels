import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DATABASE_URI || process.env.DEVELOPMENT_DATABASE_URI;

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    try {
      await mongoose.connect(db);
  
      console.log('MongoDB is Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  export default connectDB