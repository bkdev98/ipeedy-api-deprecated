import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15,
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

CategorySchema.pre('validate', function (next) {
  this._slugify();
  next();
});

CategorySchema.methods = {
  _slugify() {
    this.slug = slug(this.name);
  }
}

CategorySchema.statics = {
  createCategory(args, user) {
    return this.create({
      ...args,
      user,
    });
  }
}

export default mongoose.model('Category', CategorySchema);
