import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import Admin from '../src/models/Admin'; // No .js extension needed with tsx

dotenv.config({ path: '.env.local' });

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log('Connected to MongoDB');
    const hashedPassword = await bcrypt.hash('password1234', 10);
    const newAdmin = new Admin({
      email: 'admin1234',
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
