import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { unique: true, type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model('user', userSchema);

export { userModel, userSchema };
