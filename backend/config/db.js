import mongoose from 'mongoose';
import config from './default.json' assert { type: "json" };

const db = config.mongoURI;

const connectDB = async () => {
    try {
      await mongoose.connect(db);
  
      console.log('MongoDB is Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  export default connectDB