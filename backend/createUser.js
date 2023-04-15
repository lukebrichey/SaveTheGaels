import crypto from 'crypto';
import mongoose from 'mongoose';
import User from './models/user.js';
import connectDB from './config/db.js';

(async () => {
  // Connect to the database
  await connectDB();

  // Choose username and password
  const username = 'test';
  const password = '123';

  // Generate a random salt that is 16 bytes long
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash the password using the same hash function and iterations that you use to verify passwords
  const hashIterations = 310000;
  const hashLength = 32;
  const hashAlgorithm = 'sha256';

  crypto.pbkdf2(password, salt, hashIterations, hashLength, hashAlgorithm, async (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }

    // Save the user to the database
    const user = new User({
      username,
      hashedPassword: hashedPassword.toString('hex'),
      salt,
    });

    try {
      const savedUser = await user.save();
      console.log('User created successfully:', savedUser);
      // Close the connection to the database
      mongoose.connection.close();
    } catch (error) {
      console.error('Error creating user:', error);
      // Close the connection to the database
      mongoose.connection.close();
    }
  });
})();

