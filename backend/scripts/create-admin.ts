import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tradescape';
    console.log('Connecting to MongoDB...', uri);
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const adminEmail = 'taoah12@gmail.com';
    const adminPassword = 'admin';

    // Check if admin already exists
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (adminUser) {
      console.log('Admin user already exists. Updating password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      adminUser.password = hashedPassword;
    } else {
      console.log('Creating new admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isSubscribed: true
      });
    }

    await adminUser.save();
    console.log('Admin user created/updated successfully');

    // Verify admin user
    const verifyAdmin = await User.findOne({ email: adminEmail });
    console.log('Verified admin user:', {
      email: verifyAdmin?.email,
      role: verifyAdmin?.role,
      isSubscribed: verifyAdmin?.isSubscribed
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdminUser();