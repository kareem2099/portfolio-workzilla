import mongoose, { Schema, model, models } from 'mongoose';

const adminSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

const Admin = model('Admin', adminSchema);

export default Admin;
