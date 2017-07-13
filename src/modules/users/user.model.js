import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const UserSchema = new Schema({
  phone: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator(phone) {
        return validator.isMobilePhone(phone,'vi-VN');
      },
      message: '{VALUE} is not a valid phone number!'
    },
    required: true,
  },
  code: {
    type: String,
  },
  codeValid: {
    type: Boolean,
  },
  name: {
    type: String,
    trim: true,
    minlength: [2, 'Name need to be longer!'],
    maxlength: [25, 'Name need to be shorter!'],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!'
    },
  },
  role: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
