import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import constants from '../../config/constants';

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator(phone) {
          return validator.isMobilePhone(phone, 'vi-VN');
        },
        message: '{VALUE} is not a valid phone number!',
      },
      required: true,
    },
    code: {
      type: Number,
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
        message: '{VALUE} is not a valid email!',
      },
    },
    role: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.methods = {
  generateAuthToken() {
    this.token = jwt.sign(
      {
        _id: this._id.toHexString(),
      },
      constants.JWT_SECRET,
    );

    return this.save().then(() => this.token);
  },
  removeToken() {
    return this.update({
      token: null,
    });
  },
  toAuthJson() {
    return {
      _id: this._id,
      phone: this.phone,
      token: this.token,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      phone: this.phone,
      role: this.role,
    };
  },
};

UserSchema.statics = {
  findByToken(token) {
    let decoded;

    try {
      decoded = jwt.verify(token, constants.JWT_SECRET);
    } catch (err) {
      return Promise.reject(err);
    }

    return this.findOne({
      _id: decoded._id,
      token,
    });
  },
};

export default mongoose.model('User', UserSchema);
